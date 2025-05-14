const User = require('../models/User'); //User Model
const JWT = require('jsonwebtoken'); //Handling Authentication
const bcrypt = require('bcryptjs'); //Hashing and Comparison

exports.registerUser = async (req, res) => { const { name, email, password } = req.body; //Destructuring the request body
    //Validation of Prospective new user input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    //Proper Error Handling, standard
    try {
        //Checking if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'oops, Looks like you already have an account with us' });
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   
        
        //Creating && Saving the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        console.log('A New user added to databas ✅ :', newUser);
        res.status(201).json({message: 'Congratulations You have been registered successfully'});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up' });
    }
};

exports.loginUser = async (req, res) => { const { email, password } = req.body; //Destructuring the request body 
    //Validation of user input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in both email and password' });
    }

    //Proper Error Handling, standard
    try {
        //Checking if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Oops, we cant find an account with that email or password. Double check your input'});
        }

        //Comparing the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Oops, we cant find an account with that email or password. Double check your input'});
        }

        //Generating JWT token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.status(200).json({token, user:{
            name:user.name,
            email:user.email
        }
        }); //Sending the token and user data back to the client
        console.log('MongoDB was accessed ✅ User logged in successfully ');
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'oops, We are sorry 😞. Something went wrong, Its not you its us and we are fixing up' });
    }
};