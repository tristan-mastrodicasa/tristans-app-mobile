import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { GlobalStore } from '../../state/global.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private profile = {
    own: false,
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
  ) { }

  /**
   * Builds the user profile based on the id passed via the URL
   */
  public ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id'); // '5cf330860ffe101b48a0fcc4'

    this.http.getProfileById(id).pipe(first()).subscribe((res) => {

      this.profile.firstName = res.content.firstName;
      this.profile.username = res.content.username;
      this.profile.photo = res.content.photo;

      this.profile.influence = res.content.influence;
      this.profile.contentNumber = res.content.contentNumber;
      this.profile.followers = res.content.followers;

      if (this.globalStore.state.user_data._id === id) this.profile.own = true;
      else this.profile.own = false;

    });

  }


}
