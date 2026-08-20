const dashboardRoutes = require("./routes/dashboardRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const executeRoutes = require("./routes/executeRoutes");

const app = express();


// ===============================
// CORS
// ===============================

app.use(cors({
    origin: [
        "http://localhost:4200",
        "https://codeverse-frontend-ig5z.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());


// ===============================
// JSON
// ===============================

app.use(express.json());


// ===============================
// ROUTES
// ===============================

app.use("/api/questions", questionRoutes);

app.use("/api/auth", authRoutes);

console.log("SUBMISSION ROUTES LOADED:", submissionRoutes);

app.use("/api/submissions", submissionRoutes);

app.use("/api/execute", executeRoutes);

app.use("/api/dashboard", dashboardRoutes);


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.send("CodeVerse Backend Running 🚀");
});


// ===============================
// MONGODB
// ===============================

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server Running on Port ${PORT}`);
    });

})
.catch(err => console.log(err));