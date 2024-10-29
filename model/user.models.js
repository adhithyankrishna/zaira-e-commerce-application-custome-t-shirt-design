const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);  // Validates that the phone number contains exactly 10 digits
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "customer" },
}, {
    timestamps: true  
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();  // Only hash the password if it's new or modified

    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt for hashing
        this.password = await bcrypt.hash(this.password, salt);  // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
