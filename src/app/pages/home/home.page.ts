import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { GlobalStore } from '../../services/state/global.store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  postData=[];

  constructor(
    private http: HttpClient,
    private nav: NavController,
    private toastController: ToastController,
    private globalStore: GlobalStore
  ) { }

  ngOnInit(infiniteScroll?) {

    // State Change //
    this.globalStore.state$.subscribe(state => {
      this.presentToast(state.user);
    });


    // Test Http Get // get reqest can later be changed to get relevent data from server, eg in this case it would need to get memes from the user's network
    this.http.get('api/heroes').subscribe((response) => {
      this.postData = this.postData.concat(response);
      if(infiniteScroll)
      {
        infiniteScroll.target.complete();
      }
    });
  }

  loadPosts(infiniteScroll) {
    this.ngOnInit(infiniteScroll);
  }

  openMeme() {
    this.nav.navigateRoot('/meme-focus');
  }

  changeState() {
    this.globalStore.updateUser();
  }

  async presentToast(uid: number) {
    const toast = await this.toastController.create({
      message: `Lol it changed to ${uid}`,
      duration: 2000
    });
    toast.present();
  }
}
