const express = require('express');
const app = express();
var path = require('path');
var public = path.join(__dirname, 'src/public');



app.use(express.static(public));

const PORT = process.env.PORT || 5000;
console.log("TCL: PORT", PORT)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))