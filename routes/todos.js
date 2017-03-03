var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var db=mongojs("mongodb://jogi:jogi@ds029787.mlab.com:29787/meantodos",["todos"]);
/* GET todos*/
router.get('/todos', function(req, res, next) {
  db.todos.find(function(err,data){
      if(err){
          throw err;
      }else{
          res.json(data);
      }
  })
});
// get single todo
router.get('/todos/:id',function(req,res,next) {
    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,data){
        if(err){
          throw err;
        }else{
          res.json(data);
      }
    })
});
// save todo
router.post('/todo',function(req,res,next){
    var todo=req.body;
    if(!todo.text){
        res.status(400);
        res.json({"error":"Inavalid Entry"});
    }else{
        db.todos.save(todo,function(err,result){
            if(err){
                throw err;
            }else{
                res.json(result);
            }
        })
    }
});
//update todo
router.put('/todo/:id',function(req,res,next){
    var todo=req.body;
    var updObj={};
    if(todo.isCompleted){
        updObj.isCompleted=todo.isCompleted;
    }
    if(todo.text){
        updObj.text=todo.text;
    }
    if(!updObj){
        res.status(400);
        res.json({"error":"Inavalid Entry"});
    }else{
        db.todos.update({
            _id:mongojs.ObjectId(req.params.id)
        },updObj,{},function(err,result){
            if(err){
                throw err;
            }else{
                res.json(result);
            }
        })
    }
});
//delete todo
router.delete('/todo/:id',function(req,res,next){
    db.todos.remove({
        _id:mongojs.ObjectId(req.params.id)
    },'',function(err,result){
        if(err){
                throw err;
            }else{
                res.json(result);
            }
    })
});
module.exports = router;
