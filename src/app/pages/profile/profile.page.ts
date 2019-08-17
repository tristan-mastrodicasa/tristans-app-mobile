import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { HelpersService } from '../../services/helpers/helpers.service';
import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { Profile, ContentCard } from '../../services/backend-api/response';
import { GlobalStore } from '../../state/global.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private posts = [] as ContentCard[];
  private cardsPerRequest = 6;
  private page = 1;

  private ownProfile: boolean;
  private profile: Profile = {
    id: '',
    firstName: '',
    username: '',
    photo: '/assets/svg-img/default-profile-picture.svg',
    influence: 0,
    contentNumber: 0,
    followers: 0
  };

  constructor(
    private nav: NavController,
    private http: BackendApiService,
    private globalStore: GlobalStore,
    private route: ActivatedRoute
    // private helpersService: HelpersService
  ) { }

  /**
   * Builds the user profile based on the id passed via the URL
   */
  public ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id'); // '5cf330860ffe101b48a0fcc4'

    this.http.getProfileById(id).pipe(first()).subscribe((res) => {

      this.profile = res;

      if (this.globalStore.state.user_data._id === id) this.ownProfile = true;
      else this.ownProfile = false;

    });

    this.http.getContentCards({name: 'profile', extra: { id }}, this.cardsPerRequest, this.page).pipe(first()).subscribe((res) => {
      this.posts = this.posts.concat(res);
    });

  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  private loadPosts(event: any) {

    this.page++;
    this.http.getContentCards({name: 'profile', extra: { id: this.profile.id }}, this.cardsPerRequest, this.page).pipe(first()).subscribe((res) => {

      this.posts = this.posts.concat(res);

      event.target.complete();

    });

  }


}
