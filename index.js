import express from 'express';
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
// const PORT = 4000;

const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json()); // middleware -- all the body will be parsed as JSON


app.get('/', (req, res) => {
    res.send("hello !!!!!!!!@*%^&*()");
})

app.get("/products",async(request,response) =>{
    const products = await getproducts();
    response.send(products);
    console.log(products);
});
// app.post("/products",async(request,response) =>{
//     const productdata = request.body;
//     const products = await addproducts();
//     response.send(products);
//     console.log(products);
// });
async function getproducts() {
    const client = await createConnection();
    const result = await client.db("Rentalpage").collection("Products").find({}).toArray();
    return result;
}
app.post("/products",async(request,response) =>{
    const productdata = request.body;
    
    const client = await createConnection();
    const result = await client.db("Rentalpage").collection("Products").insertMany(productdata);
    response.send(result);
    response.send({msg: "Created user"});
});

//function called create connection

export async function createConnection() {
    const client =new MongoClient(MONGO_URL);
    await client.connect();
    return client;
}    

app.listen(PORT, () => console.log("The server is started!!",PORT));


