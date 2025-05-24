const Product = require('../models/product'); //Product Model  
const mongoose = require('mongoose'); //Database

exports.createProduct = async (req, res) => { 
    const { name, description, price, stock, category,imageUrl } = req.body; //Destructuring the request body
    //Validation of Prospective new product input
    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'All Products details must be duly inputed' });
    }

    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ message: 'Price and stock must be numeric values' });
    }

    //Proper Error Handling, standard
    try {
        //Creating && Saving the new product
        const newProduct = new Product({
            name: name.trim(),
            description: description.trim(),
            price,
            stock,
            category: category.trim(), 
            imageUrl
        });
        await newProduct.save();
        console.log(`A New product added to database ✅:`, newProduct);
        res.status(201).json({message: `You have added ${newProduct.name} to products successfully`});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up' });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: `${products.length} Products found`, 
            products
        });
    } 

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up' });
    }
}

exports.getProductById = async (req, res) => { 
        //Check if the ID is a valid ObjectId in MongoDB
    const id = req.params.id; //Destructuring req.body and extracting UserID
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }

    //Proper Error Handling, standard
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${id} was not found, Enter correct ID` });
        }
        res.status(200).json({
            message: `Product with the ID: ${id} was found`,
            product
        });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up' });
    }
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
  
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: req.body }, // updates based on request body
        { new: true, runValidators: true } // return updated doc, enforce validation
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct
      });
      console.log(`Product with ID ${id} updated successfully ✅:`, updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Oops, something went wrong. Please try again.' });
    }
  };

  exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({
        message: 'Product deleted successfully',
        product: deletedProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Oops, something went wrong while deleting the product.' });
    }
  };