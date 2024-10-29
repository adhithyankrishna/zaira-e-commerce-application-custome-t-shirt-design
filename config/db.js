const mongoose = require("mongoose");



const connectDB = async() => {
   
    
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        

        // Event listener for successful connection
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB library database.");
        });

       

        // Event listener for disconnection
        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB library database.");
        });

        // Event listener for connection errors
        mongoose.connection.on("error", (error) => {
            console.error("Error occurred in MongoDB:", error);
        });
    }

    catch(error){
        console.log(error);

    }
}


module.exports =connectDB;