const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const port = 7000

//Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post("https://reqres.in/api/login", { email, password });
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: "Login Failed" });
  }
});

//Get All Users
app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("https://reqres.in/api/users?page=1");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//Get User By ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ error: "User not found" });
  }
});

//Update User (Dummy for assignment)
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;
    const response = await axios.put(`https://reqres.in/api/users/${id}`, {
      first_name,
      last_name,
      email,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

//Delete User (Dummy)
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`https://reqres.in/api/users/${id}`);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

//Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
