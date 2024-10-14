require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

// Connect Mongo Database
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

// Use Express Json to get Body Data
app.use(express.json());
app.use(fileUpload());

// Router Section
const permitRouter = require('./routes/permit');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');

// For validation
const { validateToken, validateRole } = require('./utils/validator');

app.use('/permits', permitRouter);
app.use('/roles', validateToken(), validateRole('Owner'), roleRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/subcategories', subCategoryRouter);

// Error Handling
app.use((err, req, res, next) => {
    // console.error(err.stack)
    err.status = err.status || 500;
    res.status(err.status).json({ con: false, msg: err.message });
});

// Migration Default Data
const defaultData = async () => {
    let migrator = require('./migrations/migrator');
    await migrator.migrate();
    await timer(1);
    await migrator.rolePermitMigrate();
    await timer(1);
    await migrator.addRoleToUser('Owner', 'Owner');
    await timer(1);
    await migrator.backup();
}

const timer = async (second) => {
    await new Promise(resolve => setTimeout(resolve, second * 1000));
}

// Call all Default Data
// defaultData();

// Run Server
app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT}`));