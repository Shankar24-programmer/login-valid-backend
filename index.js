import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {MongoClient} from 'mongodb';
const app=express()
app.use(cors())
app.use(express.json());

const MONGODB_URL = "mongodb://localhost:27017"
async function createConnection() {
    const client = new MongoClient(MONGODB_URL);
    await client.connect();
    console.log("Mongodb Connected");
    return client;
}
export const client = await createConnection();
app.post("/login", async function(request, response) {
    let result;
    const {username, password} = request.body;
    const user = await client.db("login").collection("data").findOne({username: username});
    if(user)
    {
        const pass=user.password;
        if(pass === password){
            response.send({msg:"Login Successfully"});
        }else{
            response.status(401).send("incorrect passwords");
        }
        
    }
    else{
       // response.status(401).send("invalid credential")

    const user = await client.db("login").collection("data").insertOne(request.body);
    response.send({msg:"Signup Successfully"});
    }
})

app.listen(4000, () => {

console.log(`Example app listening on port `)

})