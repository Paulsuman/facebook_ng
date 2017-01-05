import { Component, OnInit, NgZone} from '@angular/core';
import {FacebookService} from './facebook.service';

declare const FB:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [FacebookService]
})
export class AppComponent implements OnInit{
	name="";
	isUser = false;

  	constructor(
  		private _ngZone: NgZone,
		private _facebookService: FacebookService
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
		    }
		    else{
		        console.log('User cancelled login or did not fully authorize.');
		    }
		}, {scope: 'email'});
}}
