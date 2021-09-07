const express = require('express');
const app = express();
// const mysql = require("mysql");
const cors = require("cors");
const PORT = 3000;

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "PasswordManager",
// });

app.get("/duck", (req, res) =>{
    res.send('QUACK!');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});