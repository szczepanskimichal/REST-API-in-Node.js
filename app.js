// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://michal:marysia7@goit.wxsnxmw.mongodb.net/gfg-employees",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Define schema for employee-data collection
const employeeSchema = new mongoose.Schema({
  employeeName: String,
  employeeDepartment: String,
  employeeSalary: Number,
});

// Create a model around employeeSchema
const EmployeeData = mongoose.model("EmployeeData", employeeSchema);

// Route to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const results = await EmployeeData.find();
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to fetch a specific employee by name
app.get("/employees/:employeeName", async (req, res) => {
  try {
    const findEmployee = await EmployeeData.findOne({
      employeeName: req.params.employeeName,
    });
    if (findEmployee) {
      res.send(findEmployee);
    } else {
      res.send("Employee not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to update a specific employee by name
app.put("/employees/:employeeName", async (req, res) => {
  try {
    const { employeeName } = req.params;
    const { employeeDepartment, employeeSalary } = req.body;

    const updateEmployee = await EmployeeData.findOneAndUpdate(
      { employeeName },
      { employeeDepartment, employeeSalary },
      { new: true }
    );

    if (updateEmployee) {
      res.send(updateEmployee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to partially update a specific employee by name
app.patch("/employees/:employeeName", async function (req, res) {
  try {
    const result = await EmployeeData.updateOne(
      { employeeName: req.params.employeeName },
      { $set: req.body }
    );

    if (result.nModified == 0) {
      res.status(404).send("No employee found with the given name.");
    } else {
      res.send("Successfully updated employee's salary.");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to delete a specific employee by name or id
app.delete("/employees/:employee", async function (req, res) {
  try {
    const { employee } = req.params;
    let deleteResult;

    if (mongoose.Types.ObjectId.isValid(employee)) {
      deleteResult = await EmployeeData.findByIdAndDelete(employee);
    } else {
      deleteResult = await EmployeeData.findOneAndDelete({
        employeeName: employee,
      });
    }

    if (deleteResult) {
      res.send(`Successfully deleted employee: ${employee}`);
    } else {
      res.send(`Employee '${employee}' not found.`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to create a new employee
app.post("/employees", async function (req, res) {
  try {
    const { employeeName, employeeDepartment, employeeSalary } = req.body;

    const newEmployee = new EmployeeData({
      employeeName: employeeName,
      employeeDepartment: employeeDepartment,
      employeeSalary: employeeSalary,
    });

    console.log("Before save:", newEmployee); // log before save

    const savedEmployee = await newEmployee.save();

    console.log("After save:", savedEmployee); // log after save

    res.status(201).send({
      employeeName: savedEmployee.employeeName,
      employeeDepartment: savedEmployee.employeeDepartment,
      employeeSalary: savedEmployee.employeeSalary,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
