import { Component,OnInit } from '@angular/core';
import {TodosService} from '../services/todos.service';
import {todos_app} from '../interface';
@Component({
  selector: 'todos-root',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers:[TodosService]
})
export class TodosComponent implements OnInit {
  title = 'Todos Component';
  todos:todos_app[];
 
  constructor(private todosservice:TodosService ){}
  getTodo():void{
    this.todosservice.getTodos().subscribe(todos => this.todos = todos);
  }
  ngOnInit():void{
    this.getTodo();
     //this.todosservice.getTodos().subscribe(todos => this.todos = todos);
    console.log("hai gud mrng");
  }
  addTodo($event,todoText):void{
    if($event.which ===1){
        var newTodo={
          _id:todoText.id,
          text:todoText.value,
          isCompleted:false
        };
        this.todosservice.saveTodo(newTodo)
        .subscribe(x => {
          this.todos.push(newTodo)
          todoText.value="";
        })
    }
  }
  updateStatus(todo){
    var _todo={
      _id:todo._id,
      text:todo.text,
      isCompleted:!todo.isCompleted,
    };
    this.todosservice.updateTodo(_todo)
    .subscribe(data =>{
      todo.isCompleted=!todo.isCompleted;
    })
  }
  // setEditMode(todo,state){
  //   if(state){
  //     todo.isCompleted=state;
  //   }else{
  //     delete todo.isEditMode;
  //   }
  // }
//   updateTodoText($event,todo){
//     if($event.which ===13){
//       todo.text=$event.target.value;
//       var _todo={
//       _id:todo._id,
//       text:todo.text,
//       isCompleted:todo.isCompleted,
//       }
  
//       this.todosservice.updateTodo(_todo)
//       .subscribe(data =>{
//       this.setEditMode(todo,false);
//     })
//   }
// }
deleteTodo(id){
  var todos=this.todos;
     this.todosservice.deleteTodo(id)
      .subscribe(data =>{
      if(data.n == 1){
        for(var i=0;i<todos.length;i++){
          if(todos[i]._id ==id){
            todos.splice(i,1);
            }

        }
      }
    })

}
}
