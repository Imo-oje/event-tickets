import User from "../model/user-model";
import asyncHandler from "../utils/asyc-handler";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ userId: req.userId }).exec();

  if (!user) {
    return res.status(404).send("User not found");
  }

  return res.status(200).render("profile-get", { user });
});
