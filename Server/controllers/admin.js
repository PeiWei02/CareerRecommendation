import User from "../models/user.js";

export const checkAdminRole = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({ isAdmin: false });
    }

    return res.status(200).json({ isAdmin: user.role === "admin" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
