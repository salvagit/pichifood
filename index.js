const express = require('express');

let app = new express();

// app.use('/', express.static('/'));
// app.use('/', express.static());
// app.use(app.static(__dirname, '/'));
app.use(express.static(__dirname + '/'));

// app.get('/', (req,res) => res.json({pilin:'food'}) );

console.log(__dirname);

app.listen('1234', () => console.log('front started on 1234'));
