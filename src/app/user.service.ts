import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

@Injectable()
export class UserService {
	private _url = "http://localhost:3000/v1/";
  constructor(private http : Http) { }
  
  postUserData(email,name){
    let user = JSON.stringify({"user":
        {
          "email" : email,
          "password" : "workingfine",
          "name" : name
        }}); 
    let p_url = this._url + "users";
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(p_url,user,{ headers : headers}) 
    .map(res => res.json());
  }


}
