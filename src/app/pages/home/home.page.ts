import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  postData=[];

  constructor(private http: HttpClient) { }

  ngOnInit(infiniteScroll?) {
    // Test Http Get //
    this.http.get('https://app.roberthompson.co.uk/meme-app/example.json').subscribe((response) => {
      this.postData = this.postData.concat(response);
      console.log(this.postData);
      if(infiniteScroll)
      {
        infiniteScroll.target.complete();
      }
    });
  }

  loadPosts(infiniteScroll){
    this.ngOnInit(infiniteScroll);
  }

}
