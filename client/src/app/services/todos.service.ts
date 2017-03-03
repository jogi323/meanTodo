import { Injectable } from '@angular/core';
import {todos_app} from '../interface';
import 'rxjs/add/operator/map';
import { Http,Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()

export class TodosService{
  constructor(private _http:Http){

  }
  getTodos(): Observable<todos_app[]> {
    return this._http.get('http://localhost:3000/api/v1/todos')
               .map((response) => <todos_app[]>response.json() );

  }
  saveTodo(todo){
    var headers= new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/api/v1/todo',JSON.stringify(todo),{headers:headers})
    .map((response) => <todos_app[]>response.json() );
  }
    updateTodo(todo){
    var headers= new Headers();
    headers.append('Content-Type','application/json');
    return this._http.put('http://localhost:3000/api/v1/todo/'+ todo._id,JSON.stringify(todo),{headers:headers})
    .map((response) =>response.json() );
  }
  deleteTodo(id){
    return this._http.delete('http://localhost:3000/api/v1/todo/'+id)
    .map((response) =>response.json() );
  }
}
