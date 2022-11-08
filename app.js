const express = require('express');

// Using Express JS
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/', require('./routes/auth'))
const port = 5000;
app.listen(port, ()=>{
    console.log("Listening to port 3000");
})