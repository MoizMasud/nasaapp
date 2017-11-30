//INSTALLED nodemon for updated the server every time by itself with having to restard it from the comand line

//call in modules
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');//parses incoming requests bodies, such as submitting a form
//we dont need res.header(Access-Controll...etc) anymore cause we use cors
const cors=require('cors');//allows to make a request to our api from a different domain name
const passport =require('passport');
const mongoose = require('mongoose');
const config=require('./config/database');


//connect to mongoose, database is stored in the config file
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
  console.log('Connected to database'+config.database);
});


//for database error
mongoose.connection.on('error',(err)=>{
  console.log('Database Error'+err);
});




//initialize app variable with expresss
const app=express();

//all user routes put in a seperate file
const users=require('./routes/users');

app.use(cors());//later useful for authentication, because we can disable some routes to the user if not loged in

//Body Parser middleware
app.use(bodyParser.json());

//We use passport for authentication
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);//passing in passport
//anything that is localhost:3000/user/WHATEVER will go to the user file and in that file it'll go to the WHATEVER Route
app.use('/users',users);


//we need a Place to put the client side files
//set static file
//we called the file public
app.use(express.static(path.join(__dirname,'public')));


//for home page, when you load localhost:3000, this is a route to the home page
//() is a the same as sayin function ()
//req=request, res=response
app.get('/',(req,res)=>{
  res.send("invalid endpoint");//sending out a string
});


//make sure every route aside from the ones we specified, goes to the index.html files
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'));
});

//defining what port
const port=3000;
app.listen(port, ()=>{
  console.log('Server started on port: '+port);
});
