const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { Web3 } = require("web3");
const routes = require("./router/routes");
const { CONTACT_ADDRESS, CONTRACT_ABI } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

// Define MongoDB connection URI
const uri = "";

// Define the async function to connect to MongoDB and perform operations
async function run() {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();

    const db = client.db("Cluster0");

    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    const accounts = await web3.eth.getAccounts();

    const contactList = new web3.eth.Contract(CONTRACT_ABI, CONTACT_ADDRESS);

    routes(app, db, accounts, contactList);
    app.listen(process.env.PORT || 3001, () => {
      console.log("Listening on port " + (process.env.PORT || 3001));
    });

    console.log("Connected to MongoDB and started server successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);
