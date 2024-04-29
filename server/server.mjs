import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json());
app.use(express.text())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const dbInfo = {
    "collection": process.env.COLLECTIONS,
    "database": process.env.DATABASE,
    "dataSource": process.env.DATASOURCE,
};

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'Accept': 'application/json',
    'apiKey': process.env.API_KEY,
};

app.get('/get-products', (req, res) => {
    const config = {
        method: 'post',
        url: `${process.env.API_URL}/find`,
        headers: HEADERS,
        data: JSON.stringify(dbInfo)
    };

    axios(config).then(function (response) {
            res.status(200).send(response.data)
        }).catch(function (error) {
            console.log(error);
        });
})


app.post('/add-product', (req, res) => {
    const info = {
        ...dbInfo, "document": req.body
    };

    const config = {
        method: 'post',
        url: `${process.env.API_URL}/insertOne`,
        headers: HEADERS,
        data: JSON.stringify(info)
    };

    axios(config).then(function (response) {
            res.status(200).send(response.data)
        }).catch(function (error) {
            console.log(error);
        });
})



