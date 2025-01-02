import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { CreateToken } from "../middlewares/middlewares.js";
import ImageFile from "../models/image.js";
import User from "../models/user.js";

export const signUp = async (req, res) => {
  const { name, mobile, email, password, role, city, state, country, bio } =
    req.body;

  if (!name || !mobile || !email || !password) {
    return res.status(422).json({ message: "All fields should be filled" });
  }

  let profilePictureId = null;

  if (req.file) {
    try {
      const imageFile = new ImageFile({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      });
      await imageFile.save();

      profilePictureId = imageFile._id;
    } catch (err) {
      console.error("Error uploading image", err);
      return res
        .status(500)
        .json({ message: "Error uploading profile picture" });
    }
  }

  try {
    let existingUser;
    existingUser = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email is already in use" });
      } else if (existingUser.mobile === mobile) {
        return res
          .status(409)
          .json({ message: "Mobile number is already in use" });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      role,
      profilePicture: profilePictureId,
      city,
      state,
      country,
      bio,
    });

    await user.save();

    return res.status(201).json({
      message: "Account created successfully, please log in",
      User: user,
    });
  } catch (err) {
    console.error("Error saving user", err);
    return res.status(400).json({ message: "Error saving user in DB" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //checking whether pasword and login fields are filled or not
  if (!email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" });
  }

  let loggedUser;

  try {
    loggedUser = await User.findOne({ email: email });

    if (!loggedUser) {
      return res
        .status(404)
        .json({ message: "Email is not found, Check it and try again" });
    }
    //checking password and compare it with exist user's password in the db
    const isPasswordCorrect = bcrypt.compareSync(password, loggedUser.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid password, Check it and try again" });
    }
    const token = CreateToken(loggedUser._id);

    //Create and setting a cookie with the user's ID and token
    res.cookie(String(loggedUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 36000),
      httpOnly: true, //if this option isn't here cookie will be visible to the frontend
      sameSite: "lax",
    });

    //send this message along with logged user details
    return res
      .status(200)
      .json({ message: "Successfully logged in", User: loggedUser });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req, res) => {
  const cookies = req.headers.cookie; //request cookie from the header

  //extracting token from the cookies
  const previousToken = cookies.split("=")[1];

  //if token is not found return this response
  if (!previousToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  //varifying token using secret key from the environmental variables
  jsonwebtoken.verify(
    String(previousToken),
    process.env.JWTAUTHSECRET,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
        //if not verified return this error
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    }
  );
};

export const getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    if (!allusers) {
      return res.status(404).json({ message: "There are not any users" });
    } else {
      res.status(200).json({ allusers });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in getting the Users" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return res.status(401).json({ message: "Login first" });
    }
    const token = cookies.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    } else {
      const decode = jsonwebtoken.verify(token, process.env.JWTAUTHSECRET);
      req.userId = decode.id;

      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Authorized User", user });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error in the token checking", err });
  }
};
