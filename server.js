import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// import cors from 'cors';
import userRoute from './routes/userRoute';


dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(console.reason));

const app = express();

/* app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); */


app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req,res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id===productId);
    if (product){
        res.send(product);
    }
    else {
        res.status(404).send({ msg: "Product not found."})
    }
});
app.get("/api/products", (req,res) => {

    res.send(data.products);
});

app.listen(5000, () => { console.log('server started at loaclhost:5000')});