require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect Mongo Database
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

// Use Express Json to get Body Data
app.use(express.json());

// Router Section
const permitRouter = require('./routes/permit');
const roleRouter = require('./routes/role');

app.use('/permits', permitRouter);
app.use('/roles', roleRouter);

// Error Handling
app.use((err, req, res, next) => {
    // console.error(err.stack)
    err.status = err.status || 500;
    res.status(err.status).json({ con: false, msg: err.message });
});

// Migration Default Data
const defaultData = async () => {
    let migrator = require('./migrations/migrator');
    // await migrator.migrate();
    await migrator.backup();
}

// defaultData();

// Run Server
app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`));