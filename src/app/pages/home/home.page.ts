import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  postData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // Test Http Get //
    this.http.get('https://app.roberthompson.co.uk/meme-app/example.json').subscribe((response) => {
      console.log(response[0].memeID);
      this.postData = response;
      console.log(this.postData);
    });

    /*
    this.postData = this.http.get('https://app.roberthompson.co.uk/meme-app/example.json');
    this.postData.subscribe(data => {
      console.log(data);
    })
    //console.log(this.postData);
    */

  }

}
