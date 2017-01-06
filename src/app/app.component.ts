import { Component, OnInit, NgZone} from '@angular/core';
import {FacebookService} from './facebook.service';
import {UserService} from './user.service';

declare const FB:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [FacebookService,UserService]
})
export class AppComponent implements OnInit{
	name="";
	isUser = false;

  	constructor(
  		private _ngZone: NgZone,
		private _facebookService: FacebookService,
		private _userservice: UserService
  	){}

	ngOnInit(){
    		this._facebookService.loadAndInitFBSDK();
	}

	login(){
		var self = this;
		FB.login(function(response)
		 {
		    if (response.authResponse)
		     {
		        FB.api('/me',{fields:'name,email'}, function(response)
		         {
		          	self._ngZone.run(() => {
				        // self.name = response.name;
				        // self.isUser = true;

				        console.log(response);
			        });

		        });
		        this._userservice.postUserData(response.email,response.name)
		        	.subscribe(data=>console.log("inserted data"),
		        		error=>console.log(error),
		        		()=>console.log("completed"));
		    }
		    else{
		        console.log('User cancelled login or did not fully authorize.');
		    }
		}, {scope: 'email'});
}}
