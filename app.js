const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/contactDance');
const port = 8000;

//Defining mongoose schema:---
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    concern: String
});

//Changing schema to model:--
const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('views engine', 'pug') //Set the templates engine as pug
app.set('views', path.join(__dirname, 'views'))//Set the views directory 

//ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})


//getting post request from contact page :---
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(() => {
            res.status(200).render('submit.pug');
            // res.send("This item has been save to the database");
        })
        .catch(() => {
            res.status(400).send("Item is not saved to the database")
        });
});


//START THE SERVER
app.listen(port, () => {
    console.log(`The application Started successfully on port ${port}`);
});