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

app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
console.log("SUBMISSION ROUTES LOADED:", submissionRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/execute", executeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.send("CodeVerse Backend Running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");

    app.listen(5000, () => {

        console.log("Server Running on Port 5000");

    });

})
.catch(err => console.log(err));