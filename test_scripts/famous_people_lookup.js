const pg = require('pg');
const settings = require('../settings'); //settings.json
const myArgs = process.argv[2];


const client = new pg.Client({
    user : settings.user,
    password : settings.password,
    database : settings.database,
    host : settings.hostname,
    port : settings.port,
    ssl : settings.ssl
});

const returnCelebrity = function (err, result) {
    if (err) {
        return console.error("error running query", err);
    }
    console.log('Found ' + result.rows.length + ' person(s) by the name ' + myArgs);

    result.rows.forEach(function (person) {
        console.log(' - ' + person.id + ': ' + person.first_name + ' ' + person.last_name + ' born ' + person.birthdate);
    })
};

client.connect((err) => {
    if (err) {
        return console.error('Connection Error', err);
    }
    client.query("SELECT * FROM famous_people WHERE first_name = $1", [myArgs], (err, result) => {
        returnCelebrity(err, result);
        client.end();
    });
});