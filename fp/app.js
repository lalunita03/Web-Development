"use strict";
const express = require("express");
const app = express();

app.get("/trees", (req, res) => {
    res.type("json");
    res.send({"message": "Hello you are looking at all the trees"});
});

app.get("/:name", (req, res) => {
    res.type("json");
    res.send({"message": "Hello you are looking at " + req.params["name"]});
});

app.get("/experience/:level", (req, res) => {
    res.type("json");
    res.send({"message": "Hello you are looking at the " + req.params["level"] + " level"});
});

app.get("/category/:type", (req, res) => {
    res.type("json");
    res.send({"message": "Hello you are looking at the " + req.params["type"] + " trees"});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("lostening on port " + PORT)); 
