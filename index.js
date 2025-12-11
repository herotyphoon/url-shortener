require('dotenv').config();
const express = require('express');

const {connectDB} = require('./config/db.config.js');
const rootRoutes = require('./routes/root.routes.js');
const urlRoutes = require('./routes/url.routes.js');
const {logReqRes} = require('./middleware/log.middleware.js');

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString)
    .then(() => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes('./logs/logs.json'));

app.use('/', rootRoutes);
app.use('/url', urlRoutes);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})