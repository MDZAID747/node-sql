const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) {
        console.log(error);
    }
    else {
        console.log("my sql connected");
    }
})


app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log("server is up and running on port 3000");
}); 