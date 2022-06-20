const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config()

const app = express();

// cors
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
    console.log("Connected established!");
});

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Server listening on port 4000");
});