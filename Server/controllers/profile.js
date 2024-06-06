import User from "../models/user.js";

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
