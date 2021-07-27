const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const path = require('path');

const boardSchema = buildSchema(`
    type Query {
        name: String
        baud: Int
    }
`)

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const emailRouter = require('./routes/emails');

app.use('/emails', emailRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

