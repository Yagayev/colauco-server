const express = require('express');
const cors = require("cors");
const mysql = require("mysql2/promise");

const env = require('./env');

const app = express();

const PORT = env.PORT || 3000;


app.use(cors());
app.use(express.json());

async function main(){

    const db = await mysql.createConnection(env.CLEARDB_DATABASE_URL);
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
        
    app.get("/duck", (req, res) =>{
        res.send('QUACK!');
    });

    app.get("/createAnimal", async (req, res) =>{
        const {name, sound} = req.query;
        // console.log(`name:${name}\nsound:${sound}\n`)
        let [ans] = await db.query(`
            INSERT INTO animals(
                name,
                sound
            ) VALUES(
                '${name}',
                '${sound}'
            )
        `);

        res.send(ans);
    })

    app.get("/greetAnimal", async (req, res) =>{
        const {name} = req.query;
        // const db = await mysql.createConnection(env.CLEARDB_DATABASE_URL);
        let [rows, fields] = await db.query(`
            SELECT 
                sound 
            FROM 
                animals
            WHERE name='${name}'
        `);
        
        res.send(rows);
        db.close()
    })
}


// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "PasswordManager",
// });

// db.query(`
//         CREATE TABLE animals(
//             name VARCHAR(20) NOT NULL PRIMARY KEY,
//             sound VARCHAR(100) NOT NULL
//         )
//     `, (error, results, fields) => {
//         console.log(`results:${results}\nerror:${error}\nfields:${fields}\n`)
//       });

// db.query(`
//         CREATE TABLE animals(
//             name VARCHAR(20) NOT NULL PRIMARY KEY,
//             sound VARCHAR(100) NOT NULL
//         )
//     `, (error, results, fields) => {
//         console.log(`results:${JSON.stringify(results)}\nerror:${error}\nfields:${fields}\n`)
//       });

// app.get("/createAnimal", (req, res) =>{
//     const {name, sound} = req.query;
//     // console.log(`name:${name}\nsound:${sound}\n`)
//     db.query(`
//         INSERT INTO animals(
//             name,
//             sound
//         ) VALUES(
//             '${name}',
//             '${sound}'
//         )
//     `, (error, results, fields) => {
//     console.log(`results:${JSON.stringify(results)}\nerror:${error}\nfields:${fields}\nname:${name}\nsound:${sound}\n`)
//     res.send(results);
//     });
// })



main();
