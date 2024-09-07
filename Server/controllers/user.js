import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { CreateToken } from "../middlewares/middlewares.js";
import User from "../models/user.js";
import nodemailer from "nodemailer"

export const signUp = async (req, res) => {
  const {
    name,
    mobile,
    email,
    password,
    role,
    profilePicture,
    city,
    country,
    bio,
  } = req.body;
  //validation for all the input fields
  if (!name || !mobile || !email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" });
  }
  try {
    let existingUser;
    //chaecking whether user already sign up or not based on the email
    try {
      existingUser = await User.findOne({
        $or: [{ email: email }, { mobile: mobile }],
      });
    } catch (err) {
      console.error(err);
    }

    if (existingUser) {
      if (existingUser.email == email) {
        return res
          .status(409)
          .json({ message: "A User is already signUp with this email" });
      } else if (existingUser.mobile == mobile) {
        return res
          .status(409)
          .json({ message: "A User is already signUp with this mobile" });
      }
    }

    const salt = await bcrypt.genSalt(6);
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    //creating a new User
    const user = new User({
      name,
      mobile,
      email,
      password: hashedpassword,
      role: role,
      profilePicture,
      city,
      country,
      bio,
    });

    await user.save();
    return res.status(201).json({
      message: "Account Creation is success, Login to your account",
      User: user,
    });
    //sending the new user details with token as a message for the response
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Error in saving user in DB" });
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
      return res.status(403).json({ message: "Login first" });
    }
    const token = cookies.split("=")[1];

    if (!token) {
      return res.status(403).json({ message: "Token not found" });
    } else {
      const decode = jsonwebtoken.verify(token, process.env.JWTAUTHSECRET);
      req.userId = decode.id;

      return res.status(200).json({ message: "Authorized User" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error in the token checking", err });
  }
};

export const forgetPassword = async (req, res) =>{
  try {
    const user = await User.findOne({email: req.bod.email});

    if(!user){
      return res.status(404).send({message:"User not found"})
    }

    const token = jwt.sign({userId: user._id}, process.env.JWTAUTHSECRET,{expiresIn:"10m"})

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

        // Email configuration
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset Password",
          html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
        };
    
        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          res.status(200).send({ message: "Email sent" });
        });

  } catch (error) {
    res.status(500).send({ message: err.message });
  }
}

export const resetPassword = async (req, res) =>{
  try {
    // Verify the token sent by the user
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );

    // If the token is invalid, return an error
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    
    // Hash the new password
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    // Update user's password, clear reset token and expiration time
    user.password = req.body.newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Send error response if any error occurs
    res.status(500).send({ message: err.message });
  }
}
