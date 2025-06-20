// fixAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import your User model here
//const User = require("./models/User"); // Adjust path as needed

// Connect to MongoDB and update the admin user
async function updateAdminUser() {
  try {
    await mongoose.connect("mongodb://localhost:27017/BookStore", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const result = await User.updateOne(
      { username: "admin" },
      {
        $set: {
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin"
        }
      }
    );

    console.log("✅ Admin user updated:", result);
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error updating admin user:", err);
  }
}

updateAdminUser();
