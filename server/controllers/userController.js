const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.json({ msg: "Username already Exists!!!", status: false });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.json({ msg: "Email already Exists!!!", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Username or Email is Invalid", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userImage = req.body.image;
    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: userImage,
    });

    return res.json({
      isSet: user.isAvatarImageSet,
      image: user.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "email",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.panel = { register, login, setAvatar, getAllUser };
