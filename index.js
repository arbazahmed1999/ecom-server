const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.get("/", (req, res) => {
  res.send("hello from the server side");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        console.log("Success");
        res.json({ msg: "Success", userDetail: user });
      } else {
        res.json({ msg: "Password incorrect  " });
      }
    } else {
      res.json({ msg: "User not found" });
    }
  });
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  //   EmployeeModel.create(req.body)
  //     .then((employees) => res.json(employees))
  //     .catch((err) => res.json(err));
  try {
    // console.log(req.body);
    const registerInfo = await EmployeeModel.create(req.body);
    console.log(registerInfo);
    res.json({ msg: "success", userDetail: registerInfo });
  } catch (error) {
    res.json(error);
  }
});

app.post("/addAddress", async (req, res) => {
  try {
    const { name, address, pincode, city } = req.body;
    console.log(name, address, pincode, city);
  } catch {
    console.log("error");
  }
});

app.listen(5000, () => {
  console.log("server is running on 5000");
});
