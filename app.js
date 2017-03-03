var express=require("express");
var bodyParser=require("body-parser");
var path = require("path");

var index=require("./routes/index");
var todos=require("./routes/todos");

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname,'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(function(req,res,next){
 res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
})
app.use('/',index);
app.use('/api/v1',todos);

app.listen(3000);
console.log("Server running at 3000.");
