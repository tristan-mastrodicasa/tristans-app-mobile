import { Injectable } from '@angular/core';
import { ResponseOptions } from '@angular/http';

import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class ImposterServerService implements InMemoryDbService {

  /**
   * Create the database for the imposter server
   */
  public createDb() {

    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    let profiles = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, followers: 31, contentNumber: 70, photo: '/assets/svg-img/default-profile-picture.svg' },
      { id: '3cf330126531201b48a0fcc4', firstName: 'Jake', username: 'user12143', influence: 33124, followers: 3221, contentNumber: 310, photo: '/assets/img/test/testi1.jpg' },
      { id: 'ccfssffe101b48a0ddddfcc4', firstName: 'Malinda', username: 'user2441212', influence: 223, followers: 1, contentNumber: 70, photo: '/assets/img/test/testi2.jpg' },
      { id: 'fcf330860fasdasdfe10cdd4', firstName: 'Johanne', username: 'user9272311', influence: 11, followers: 641, contentNumber: 20, photo: '/assets/img/test/testi3.jpg' },
      { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', influence: 14, followers: 61, contentNumber: 75, photo: '/assets/img/test/testi2.jpg' },
    ];

    let followBacks = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: '3cf330126531201b48a0fcc4', firstName: 'Jake', username: 'user12143', influence: 33124, photo: '/assets/img/test/testi1.jpg' },
      { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', influence: 14, followers: 61, contentNumber: 75, photo: '/assets/img/test/testi2.jpg' },
    ];

    let following = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 'fcf330860fasdasdfe10cdd4', firstName: 'Johanne', username: 'user9272311', influence: 11, photo: '/assets/img/test/testi3.jpg' },
    ];

    let followers = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 'ccfssffe101b48a0ddddfcc4', firstName: 'Malinda', username: 'user2441212', influence: 223, photo: '/assets/img/test/testi2.jpg' },
    ];

    return {profiles, heroes, followBacks, following, followers};
  }

  /**
   * Intercept devAPI requests and format the response correctly
   * @param  res ResponseOptions
   * @param  ri  RequestInfo
   * @return     ResponseOptions
   */
  protected responseInterceptor(res: ResponseOptions, ri: RequestInfo): ResponseOptions {
    res.body = { error: { exists: false }, content: res.body };
    return res;
  }

}
