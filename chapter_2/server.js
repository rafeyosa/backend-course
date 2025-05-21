// The address of this server connected to the network is:
// URL -> http://localhost:3000
// IP -> 127.0.0.1:3000
const express = require("express");
const app = express();
const PORT = 3000;

// ENDPOINT - HTTP VERBS (method) && Routes (or paths)
// The method informs the nature of request and the route is a further subdirectory (basically we direct the request to the body of code to respond appropriately, and these locations or routes are called endpoints)

let data = ["Rafeyosa"];

// Middleware
app.use(express.json());

// Type 1 - Website endpoints (these endpoints are for sending back html and they typically come when a user enters a url in a browser)

app.get("/", (req, res) => {
  console.log("Hit an endpoint /", req.method);
  console.log("User requested the home page website");
  res.send(`
        <body style="background:pink;color: blue;">
        <h1>DATA:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `);
});

app.get("/dashboard", (req, res) => {
  console.log("Hit an endpoint /dashboard", req.method);
  res.send(`
        <body>
        <h1>Dashboard</h1>
        <a href="/">Home</a>
        </body>
        `);
});

// Type 2 - API endpoints (non visual)
//CRUD-method create-post read-get update-put and delete-delete

app.get("/api/data", (req, res) => {
  console.log("This one was for data");
  res.send(data);
});

app.post("/api/data", (req, res) => {
  // someone wants to create a user (for example when they click a sign up button)
  // the user clicks the sign up button after entering their credentials, and their browser is wired up to send out a network request to the server to handle that action
  const newData = req.body;
  console.log(newData);
  data.push(newData.name);
  const message = {
    message: "Success",
  };
  res.status(201).send(message);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("We deleted the element off the end of the array");
  res.sendStatus(203);
});

app.listen(PORT, () => {
  console.log(`Server has starter on: ${PORT}`);
});
