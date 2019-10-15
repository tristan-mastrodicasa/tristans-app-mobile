import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { BackendApiService } from 'core/services';
import { IUser, ContentCard } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private posts = [] as ContentCard[];
  private cardsPerRequest = 6;
  private page = 1;

  public ownProfile: boolean;
  private profile: Partial<IUser> = {
    id: null,
    firstName: '',
    username: '',
    photo: '/assets/svg-img/default-profile-picture.svg',
    influence: 0,
    contentNumber: 0,
    followers: 0,
  };

  constructor(
    private http: BackendApiService,
    private globalStore: GlobalStore,
    private route: ActivatedRoute,
  ) { }

  /**
   * Builds the user profile based on the id passed via the URL
   */
  public ngOnInit() {

    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.http.getProfileById(id).pipe(first()).subscribe((res) => {

      this.profile = res;

      if (id === this.globalStore.state.userId) this.ownProfile = true;
      else this.ownProfile = false;

    });

    this.http.getContentCards('profile', id, this.cardsPerRequest, this.page).toPromise().then((res) => {
      this.posts = this.posts.concat(res);
    });

  }

  /**
   * When users scroll near the bottom of the view, call for more posts
   * @param  event Event object
   */
  public loadPosts(event: any) {

    this.page += 1;
    this.http.getContentCards('profile', this.profile.id, this.cardsPerRequest, this.page).toPromise().then((res) => {

      this.posts = this.posts.concat(res);

      event.target.complete();

    });

  }

}
