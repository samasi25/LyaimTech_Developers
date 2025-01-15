const express = require("express");
const { ConnectToDB } = require("./connection");
const router = require("./routes/allRoute");
require("dotenv").config();
const app = express();


const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

ConnectToDB(process.env.MONGO_URL).then(() => {
    console.log("DataBase is Connected")
}).catch((err) => {
    console.log("Error in Mongodb Connection", err)
})


app.use(router)

app.get("/", (req, res) => {
    res.status(200).send("Hey, Hello From Layim Tech Server")
})


app.listen(PORT, () => {
    console.log(`Layim Tech Server is Started at ${PORT} Port`)
})