const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(cors());

const data = require('./api/api');

app.get('/members', (req, res) => {
    data.members().then((datalist) => {
        res.send(datalist);
    });
});

app.get('/members/:id', (req, res) => {
    data.members().then((datalist) => {
        const item = datalist.find(member => member.userId === parseInt(req.params.id));
        if(item){
            res.send(item);
        }

    });
});

app.get('/absences', (req, res) => {
    data.absences().then((datalist) => {
        res.send(datalist);
    });
});

app.listen(port, () => {
    console.log(`REST api listening at http://localhost:${port}`);
});
