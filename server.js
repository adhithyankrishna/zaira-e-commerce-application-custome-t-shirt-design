require('dotenv').config();  // Load environment variables

const express = require("express");
const user = require('./routes/user');
const connectDB = require("./config/db");
const session = require("express-session");
const addProduct = require("./routes/addProduct");
const search = require("./routes/search");
const cart = require("./routes/cartCreate");
const cartRoute = require("./routes/cart");
const app = express();
const getProduct = require("./routes/getProduct");
app.use(express.json());

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  
}));

const path = "/zaira/api";


// Connect to the database
connectDB(process.env.MONGO_URI);

app.use(path, user);
app.use(path,addProduct);
app.use(path,search);
app.use(path,getProduct);
app.use(path,cart);
app.use(path,cartRoute);

app.listen(8080, () => {
  console.log(`Server is listening on port 8080`);
});
