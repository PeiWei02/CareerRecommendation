import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await User.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createProfile = async (req, res) => {
//   try {
//     const Profile = await User.create(req.body);
//     res.status(200).json(Profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const Profile = await User.findByIdAndUpdate(id, req.body);

    if (!Profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProfile = await User.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Id is not found, Check it and try again" });
    }
    //checking password and compare it with exist user's password in the db
    const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const salt = await bcrypt.genSalt(6);
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(newPassword, salt);

    const body = {
      password: hashedpassword,
    };

    const Profile = await User.findByIdAndUpdate(id, body);

    if (!Profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const updatedProfile = await User.findById(id);
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
