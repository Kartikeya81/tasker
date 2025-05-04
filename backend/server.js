require('dotenv').config();
const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');

const cors=require('cors');
const authrouter=require('./routes/authroutes');
const taskrouter=require('./routes/taskroutes');

app.use(cookieparser());


const path=require('path')
const body_parser=require('body-parser');

app.set('view engine','ejs');


app.use(express.urlencoded({extended:true}));
app.use(body_parser.json());


app.use(cors(
  {
    origin:["http://localhost:5173"],
    credentials:true,
  }
));
const db=require('../backend/config/db')
app.use(express.json());


app.use('/api/auth',authrouter);
app.use('/api/tasks',taskrouter);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`Server started at ${PORT}`);
})