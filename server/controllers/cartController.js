const Session = require("../models/session"); //Session Model
const Product = require("../models/product"); //Product Model
const Cart = require("../models/cart"); //Cart Model
const mongoose = require("mongoose"); //Database

exports.createCart = async (req, res) => {
  const userId = req.user.id;
  const { sessionId, products } = req.body;

  let totalPrice = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  if (!userId) {
    return res.status(400).json({
      message: "You are not signed in or do not have an account",
    });
  }

  if (
    !products ||
    !Array.isArray(products) ||
    products.length === 0 ||
    !totalPrice
  ) {
    return res.status(400).json({
      message: "Cart is empty. Add products to your cart",
    });
  }

  try {
    const enrichedProducts = products.map((p) => ({
      productId: p.productId,
      quantity: p.quantity,
      addedBy: userId,
      addedAt: new Date(),
    }));

    const newCart = new Cart({
      userId,
      sessionId,
      products: enrichedProducts,
      totalPrice,
    });

    await newCart.save();

    if (sessionId) {
      await Session.findByIdAndUpdate(sessionId, {
        cartId: newCart._id,
      });
    }

    console.log(`✅ New cart added:`, newCart);

    res.status(201).json({
      message: `You have created a cart successfully`,
      cart: newCart,
    });
  } catch (error) {
    console.error("  Error creating cart:", error);
    res.status(500).json({
      message: "Something went wrong. We're fixing it.",
    });
  }
};

exports.getCartByUserId = async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const carts = await Cart.find({ userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .populate({
        path: "products.addedBy",
        model: "User",
        select: "name avatar",
      })
      .populate({
        path: "sessionId",
        model: "Session",
        select: "sessionName sessionType invitedUsers createdBy status",
      })
      .populate({
        path: "sessionId.invitedUsers.userId",
        model: "User",
        select: "email name",
      })
      .populate({
        path: "sessionId.createdBy",
        model: "User",
        select: "email name",
      });

    if (!carts || carts.length === 0) {
      return res.status(404).json({
        message: `Oops, you do not seem to have any existing cart(s)`,
      });
    }

    res.status(200).json({
      message: `We found your ${carts.length} cart(s) and we are pulling them up`,
      carts,
    });
  } catch (error) {
    console.error("getCartByUserId error:", error);
    res.status(500).json({
      message:
        "Oops, something went wrong. It’s not you, it’s us and we’re fixing it.",
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
      { new: true, runValidators: true },
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
      return res.status(403).json({
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

exports.updateCartQuantity = async (req, res) => {
  const { cartId } = req.params;
  const { productId, change } = req.body; // change: +1 or -1

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find(
      (p) => p.productId.toString() === productId,
    );
    if (!product)
      return res.status(404).json({ message: "Product not in cart" });

    product.quantity += change;

    if (product.quantity < 1) {
      // remove item entirely if quantity < 1
      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== productId,
      );
    }

    // Recalculate totalPrice
    let total = 0;
    for (let item of cart.products) {
      const prod = await Product.findById(item.productId);
      total += prod.price * item.quantity;
    }
    cart.totalPrice = total;

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (err) {
    console.error("🛠️ updateCartQuantity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeProductFromCart = async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const originalLength = cart.products.length;

    // Filter out the product
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId,
    );

    if (cart.products.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Recalculate total
    let total = 0;
    for (let item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    cart.totalPrice = total;

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error("🗑️ removeProductFromCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addProductToCart = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Product ID and valid quantity are required" });
  }

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const existingItem = cart.products.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        addedBy: req.user.id,
        addedAt: new Date(),
      });
    }

    let total = 0;
    for (let item of cart.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    cart.totalPrice = total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("products.productId", "title price image")
      .populate("products.addedBy", "name email");

    console.log(`✅ Product added to cart:`, populatedCart);
    res.status(200).json({
      message: "Product added to cart successfully",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("➕ addProductToCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId)
      .populate("sessionId")
      .populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ cart });
  } catch (error) {
    console.error("getSingleCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("clearCart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCart = async (req, res) => {
  const cartId = req.params.cartId;

  // Validate cart ID
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ message: "Invalid cart ID format" });
  }

  try {
    // Find the cart first
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: "Oops, this cart doesn't exist or has already been deleted.",
      });
    }

    // Delete the cart
    await cart.deleteOne();

    // End the connected session (if exists)
    if (cart.sessionId) {
      const session = await Session.findById(cart.sessionId);
      if (session && session.status !== "ended") {
        session.status = "ended";
        await session.save();
      }
    }

    // Respond to client
    res.status(200).json({
      message: "Cart deleted successfully and session (if linked) ended.",
      cartId: cart._id,
    });
  } catch (error) {
    console.error("  deleteCart error:", error);
    res.status(500).json({
      message: "Oops, something went wrong while deleting your cart.",
    });
  }
};
