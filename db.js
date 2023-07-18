
const mongoose = require('mongoose');

const USER = 'pholguin';
const PASSWORD = 'butcamps1234';
const DATABASE_NAME = 'Carshop_db';

//mongodb+srv://pholguin:<password>@cluster0.dtfysnx.mongodb.net/?retryWrites=true&w=majority
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.dtfysnx.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(URL)
.then(() => {
    console.log('Database connected!');
})
.catch((error)=> {
    console.log('Error connecting:', error);
});
