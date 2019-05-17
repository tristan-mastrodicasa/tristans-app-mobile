import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-meme-canvas-index',
  templateUrl: './meme-canvas-index.page.html',
  styleUrls: ['./meme-canvas-index.page.scss'],
})
export class MemeCanvasIndexPage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

	  postData=[];

	  constructor(private http: HttpClient, private nav: NavController) { }

	  ngOnInit(infiniteScroll?) {
	    // Test Http Get // get request can later be changed to get relevent data from the server, eg for this it would need to get globaly rising memes
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
