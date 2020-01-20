const path = require('path');
const config = require('./gulp-config');
const express = require('express');
const app = express();
const port = 3000;
const public = path.join(__dirname, config.DEST);

app.use(express.static(public));

app.get('/', (req, res) => res.sendFile(path.join(public, 'index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
