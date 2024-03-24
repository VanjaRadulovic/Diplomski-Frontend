import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { BackendContent } from 'src/app/models/backend-content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  response: string = 'empty';
  showHeader=true;
  


  constructor(private router: Router, private http: HttpClient) {
    router.events.subscribe((val) =>{
      if (val instanceof NavigationEnd){
        if(val.url == '/login' || val.url == '/register') {
          this.showHeader = false;
        }
        else{
          this.showHeader = true;
        }
      }
    })
  }
  ngOnInit() {
    // this.http.get<BackendContent>('http://localhost:8080/api/v1/greetings').subscribe(data => {
    //   this.response = data.content;
    // });
  }

  restaurantOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];

  homeServicesOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];

  autoServicesOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];

  moreOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];


}
