import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  postData=[];

  constructor(private http: HttpClient, private nav: NavController) { }

  ngOnInit(infiniteScroll?) {
    // Test Http Get // get reqest can later be changed to get relevent data from server, eg in this case it would need to get memes from the user's network
    this.http.get('https://app.roberthompson.co.uk/meme-app/example.json').subscribe((response) => {
      this.postData = this.postData.concat(response);
      if(infiniteScroll)
      {
        infiniteScroll.target.complete();
      }
    });
  }

  loadPosts(infiniteScroll){
    this.ngOnInit(infiniteScroll);
  }

  openMeme()
  {
    this.nav.navigateRoot('/meme-focus');
  }

}
