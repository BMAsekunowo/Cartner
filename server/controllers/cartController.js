const Session = require("../models/session"); //Session Model
const Product = require("../models/product"); //Product Model
const Cart = require("../models/cart"); //Cart Model
const mongoose = require("mongoose"); //Database

exports.createCart = async (req, res) => {
  const userId = req.user.id; //Getting user ID from token
  const { sessionId, products} = req.body; //Destructuring the request body

  let totalPrice = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  //Validation if Account exists && cart Exists
  if (!userId) {
    return res
      .status(400)
      .json({
        message:
          "oops, It looks like you are not signed in or you do not have an account with us",
      });
  }

  if (
    !products ||
    !Array.isArray(products) ||
    products.length === 0 ||
    !totalPrice
  ) {
    return res
      .status(400)
      .json({
        message: "Cart is empty,Shop to add to your new products to your cart",
      });
  }

  //Proper Error Handling, standard
  try {
    //Creating and saving the new cart
    const newCart = new Cart({
      userId,
      sessionId,
      products,
      totalPrice,
    });
    await newCart.save();
    console.log(`A New cart added to database ✅:`, newCart);
    res.status(201).json({
      message: `You have created a cart successfully`,
      cart: newCart,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up",
      });
  }
};

exports.getCartByUserId = async (req, res) => {
  const userId = req.user.id; //Getting user ID from token

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const carts = await Cart.find({ userId }).sort({ createdAt: -1 }); // ← No conversion needed here

    if (!carts || carts.length === 0) {
      return res.status(404).json({
        message: `Oops, you do not seem to have any existing cart(s)`
      });
    }

    res.status(200).json({
      message: `We found your ${carts.length} cart(s) and we are pulling them up`,
      carts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Oops, something went wrong. It’s not you, it’s us and we’re fixing it."
    });
  }
};

exports.updateCart = async (req, res) => {
  const cartId = req.params.cartId; //Destructuring the request body

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "Invalid cart ID format" });
  }

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });

    //Prevent actions on ended sessions
    const session = await Session.findById(cart.sessionId);
    if (session && session.status === "ended") {
      return res
        .status(403)
        .json({
          message: "This session has ended. Cart can no longer be modified.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Oops, something went wrong. Please try again." });
  }
};

exports.deleteCart = async (req, res) => {
  const cartId = req.params.cartId; //Destructuring the request body

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "Invalid cart ID format" });
  }

  //Proper Error Handling, standard
  try {
    const cart = await Cart.findByIdAndDelete(cartId);

    if (!cart) {
      return res
        .status(404)
        .json({ message: `oops, you do not seem to have an existing cart` });
    }

    res.status(200).json({
      message: `We have deleted your cart successfully`,
      cart,
    });

    //Prevent actions on ended sessions
    const session = await Session.findById(cart.sessionId);
    if (session && session.status === "ended") {
      return res
        .status(403)
        .json({
          message: "This session has ended. Cart can no longer be modified.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up",
      });
  }
};
