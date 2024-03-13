const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ItemModel = require('./models/Items.js')
require('dotenv').config();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

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

app.use('/uploads', express.static('uploads'));

app.post("/createItem", upload.single('image'), (req,res) => {
    const { description, size, condition } = req.body;
    const imageUrl = req.file ? req.file.path : ''; // Adiciona o caminho da imagem
    ItemModel.create({ description, size, condition, imageUrl })
    .then(items => res.json(items))
    .catch(err => res.json(err))
});

app.listen(3001, () => {
    console.log("Server is running")
});