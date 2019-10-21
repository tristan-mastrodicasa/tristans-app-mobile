import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs/operators';

import { BackendApiService } from 'core/services';
import { IProfile, ContentCard } from 'core/models';
import { GlobalStore } from 'state/global.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private posts = [] as ContentCard[];
  public page = 1;
  public results = 5;

  public ownProfile: boolean;
  private profile: IProfile = {
    id: null,
    firstName: '',
    username: '',
    photo: '/assets/svg-img/default-profile-picture.svg',
    influence: 0,
    contentNumber: 0,
    followers: 0,
    youAreFollowing: false,
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
    this.getProfileCard();
    this.getContentCardSet();
  }

  /**
   * Refresh the content card list
   */
  public ionViewWillEnter() {

    this.route.queryParamMap.pipe(first()).subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.getProfileCard();
        this.getContentCardSet();
      }
    });

  }

  /**
   * Get the users content cards
   */
  public getContentCardSet() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.http.getUserContentCards(id).toPromise().then((res) => {
      this.posts = [];
      this.page = 1;
      this.posts = this.posts.concat(res);
    });
  }

  /**
   * Get the profile card
   */
  public getProfileCard() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.http.getProfileById(id).pipe(first()).subscribe((res) => {

      this.profile = res;

      if (id === this.globalStore.state.userId) this.ownProfile = true;
      else this.ownProfile = false;

    });
  }

   /**
    * Show more users while scrolling
    * @param  event Ionic stuff
    */
  public showMoreUsers(event: any) {
    this.page += 1;
    event.target.complete();
  }

  /**
   * Reload page
   */
  public doRefresh(event: any) {
    this.getProfileCard();
    this.getContentCardSet();

    event.target.disabled = true;
    event.target.complete();
    setTimeout(
      () => {
        event.target.disabled = false;
      },
      100,
    );
  }

  /**
   * Unfollow the user
   */
  public unfollow() {
    this.http.unfollow(this.profile.id).toPromise().then(_ => null);
    this.profile.youAreFollowing = false;
  }

  /**
   * Follow the user
   */
  public follow() {
    this.http.follow(this.profile.id).toPromise().then(_ => null);
    this.profile.youAreFollowing = true;
  }

}
