const express = require("express");
const mongoose = require("mongoose");
const {dbConnect} = require("./db.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
dbConnect();

mongoose.connection.once("open", () => {
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);
});

const favSchema = new mongoose.Schema({
    name : String,
    fav_ids : Array
});

const favModel = mongoose.model("user_favorites",favSchema);

app.get("/fav_ids_get",async(req,res)=>{
    try{
        let data = await favModel.find();
        console.log(data);
        res.send(data);
    }
    catch(err){
        console.error("❌ Error fetching data:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/fav_ids_post",async(req,res)=>{
    try{

        let post = await favModel.create(req.body);
        res.send({
            message: "✅ Data inserted successfully into marustunna",
            newData: post
        })
    }
    catch(err){
        console.error("❌ Error fetching data:", err);
        res.status(500).send({ error: "Internal Server Error" });
    }
})

app.listen(port,()=>{
    console.log(`server started at http:localhost:${port}`);
})