const User = require("../models/user"); //User Model
const JWT = require("jsonwebtoken"); //Handling Authentication
const bcrypt = require("bcryptjs"); //Hashing and Comparison
const { sendWelcomeEmail } = require("../utils/email/emailService");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body; //Destructuring the request body
  //Validation of Prospective new user input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  //Proper Error Handling, standard
  try {
    //Checking if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "oops, Looks like you already have an account with us",
      });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating && Saving the new user
    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });
    await newUser.save();
    console.log("A New user added to database ✅ :", newUser);
    await sendWelcomeEmail(user.email, user.name);
    res.status(201).json({
      message: "Congratulations You have been registered successfully",
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body; //Destructuring the request body
  //Validation of user input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in both email and password" });
  }

  //Proper Error Handling, standard
  try {
    //Checking if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message:
          "Oops, we cant find an account with that email or password. Double check your input",
      });
    }

    //Comparing the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message:
          "Oops, we cant find an account with that email or password. Double check your input",
      });
    }

    //Generating JWT token
    const token = JWT.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" },
    );

    res.status(200).json({
      message: `Congratulations ${user.name} your login was successful`,
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    }); //Sending the token and user data back to the client
    console.log("MongoDB was accessed ✅ User logged in successfully ");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up",
    });
  }
};

exports.validateToken = (req, res) => {
  console.log("req.user:", req.user); // 🔍 Check if user is defined

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const newToken = JWT.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  console.log("Token refreshed successfully ✅");
  res.json({ token: newToken });
};

exports.updateUserCredentials = async (req, res) => {
  const userId = req.user.id;
  const { email, password, currentPassword } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      message: "Provide at least one field to update: email or password",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Email update
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing && existing._id.toString() !== userId) {
        return res.status(400).json({
          message: "This email is already in use by another account",
        });
      }
      user.email = email;
    }

    //  Password update
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Provide your current password to update password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(200).json({
      message: "Account updated successfully",
      updatedFields: {
        ...(email && { email }),
        ...(password && { password: true }),
      },
    });
  } catch (error) {
    console.error("❌ updateUserCredentials error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating credentials",
    });
  }
};
