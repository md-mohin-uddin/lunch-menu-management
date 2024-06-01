const express = require("express");
const cors = require("cors");
require("dotenv").config();
const menuRouter = require("./routes/menu_router.js");
const employeeRouter = require("./routes/employee_menu_router.js");
const authRouter = require("./routes/authRoute.js");
const { ApiError, errorConverter, errorHandler } = require("./utis/error.js");

const app = express();

// middleware
app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api/menu", menuRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/auth", authRouter);

// testing api
app.get("/", (req, res) => {
  res.json({ message: "Hello from API" });
});

// Error handling middleware
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
