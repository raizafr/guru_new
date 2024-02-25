import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  createPaymentProfile,
  createUserProfile,
  getUsersPaymentProfile,
} from "./userdata.js";
// Create an Express application
const app = express();
const corsOptions = {
  origin: "*", // Allow requests from example.com
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/createUser", async (req, res) => {
  //save name, email, password,
  const usersInfo = req.body;
  const usersId = await createUserProfile(usersInfo);
  res.send(usersId);
});
app.post("/storeCardDetails", async (req, res) => {
  console.log("about to store card details");
  const body = req.body;
  await createPaymentProfile(body);
  console.log(body);
  res.send(true);
});
app.post("/verifyUserPayment", async (req, res) => {
  const info = req.body;
  const cardDetails = await getUsersPaymentProfile(info["userId"]);
  if (cardDetails != null) {
    res.send(cardDetails);
  } else {
    res.send(null);
  }
  console.log(info);
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
