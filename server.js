const express = require('express');
const request = require('request-promise');
const listEndpoints = require('express-list-endpoints');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5800;

const apiKey = process.env.apiKey;

const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.')
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {

        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(response);

    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log("App running on server http://localhost:" + PORT);
    console.log(listEndpoints(app));
})