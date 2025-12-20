require('dotenv').config({quiet: true});
const express = require('express');
const cookieParser = require('cookie-parser');

const {connectDB} = require('./config/db.config.js');
const rootRoutes = require('./routes/root.routes.js');
const urlRoutes = require('./routes/url.routes.js');
const pageRoutes = require('./routes/pages.routes.js');
const userRoutes = require('./routes/user.routes.js');
const {checkForAuthentication, restrictTo} = require('./middleware/auth.middleware.js');
const {logReqRes} = require('./middleware/log.middleware.js');
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString)
    .then(() => console.log('Connected to MongoDB'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logReqRes('./logs/logs.json'));
app.use(checkForAuthentication);

app.use('/user', userRoutes);     // login, signup first
app.use('/pages', pageRoutes);
app.use('/url', restrictTo(['NORMAL']), urlRoutes );
app.use('/', rootRoutes);

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})