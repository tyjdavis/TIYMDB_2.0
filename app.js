// AIzaSyCdRw7-oDIY3-YvdBaKdAMNrVQ7LcTAY8c

const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', function(req, res){
  try {
    res.sendFile(__dirname  + '/index.html');
  } catch(e) {
    res.send(e.message);
    console.log(e.message);
  }
});

app.listen(3000, function(){
  console.log('Come take a look at 127.0.0.1:3000');
});
