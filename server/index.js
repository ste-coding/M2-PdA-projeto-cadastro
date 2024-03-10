const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ItemModel = require('./models/Items.js')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/cadastro")

app.get('/', (req, res) => {
    ItemModel.find({})
    .then(items => res.json(items))
    .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    ItemModel.findById({_id:id})
    .then(items => res.json(items))
    .catch(err => res.json(err));
});

app.put('/updateItem/:id', (req, res) => {
    const id = req.params.id
    ItemModel.findByIdAndUpdate({_id:id}, {
        description: req.body.description, 
        size: req.body.size, 
        condition: req.body.condition})
    .then(items => res.json(items))
    .catch(err => res.json(err));
});

app.delete('/deleteItem/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.post("/createItem", (req,res) => {
    ItemModel.create(req.body)
    .then(items => res.json(items))
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is running")
});