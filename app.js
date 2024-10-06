require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());

const permitRouter = require('./routes/permit');
app.use('/permits', permitRouter);


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`))