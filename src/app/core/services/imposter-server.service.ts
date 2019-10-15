import { Injectable } from '@angular/core';

import { InMemoryDbService, RequestInfoUtilities, ParsedRequestUrl, STATUS, ResponseOptions, RequestInfo } from 'angular-in-memory-web-api';
import { ContentCard, IUser, EContentType } from 'core/models';

import { environment } from 'environments/environment';

@Injectable()
export class ImposterServerService implements InMemoryDbService {

  private postGoogleAuthcode = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTY3NTA3NzIyLCJleHAiOjE1NzAwOTk3MjJ9.CSWF6vvdt8z4rFiZ-jmqdysbav9_zOyhiTpgOR1Sqt8',
  };

  /**
   * Intercept post methods
   * @param  requestInfo Describes the request
   * @return             The appropiate data simulating a response from a real server
   */
  public post(requestInfo: RequestInfo) {

    if (!environment.serveFromCache) return null;

    console.log('posting lol -------');
    let data = {};

    const urlParts: string[] = requestInfo.url.split('?')[0].split('/');

    if (urlParts[1] === 'auth') {
      if (urlParts[2] === 'google-authcode') {
        console.log('made it to authcode route');
        data = this.postGoogleAuthcode;
      }
    }

    const options: ResponseOptions = {
      body: data,
      status: STATUS.OK,
      headers: requestInfo.headers,
      url: requestInfo.url,
    };

    // use createResponse$ to return proper response //
    return requestInfo.utils.createResponse$(() => options);

  }

  /**
   * Intercept url's and modifies requests as necessary, this allows the backend-service
   * to format request url's the same way it would when requesting from a live server
   */
  public parseRequestUrl(url: string, requestInfoUtils: RequestInfoUtilities): ParsedRequestUrl {

    console.log('local');
    console.log(url);

    // Break the url into juicy bits //
    const params: Map<string, string[]> = requestInfoUtils.parseRequestUrl(url).query;
    const urlParts: string[] = url.split('?')[0].split('/');

    if (urlParts[0] !== 'api') return requestInfoUtils.parseRequestUrl(url);

    // If the api url is accessing the user resource than format as follows //
    if (urlParts[1] === 'user') {
      const id: string = urlParts[2];

      if (urlParts[3] === 'network') {

        const userItemType: string = params.get('category')[0];

        console.log(`'Collect users from userid: ${id}`);
        const newUrl = `app/${userItemType}`;

        return requestInfoUtils.parseRequestUrl(newUrl);

      }

      const newUrl = `app/profile/${id}`;
      return requestInfoUtils.parseRequestUrl(newUrl);

    }

    if (urlParts[1] === 'content') {
      return requestInfoUtils.parseRequestUrl('app/contentCardList');
    }

    if (urlParts[1] === 'canvas') {

      if (urlParts[3] === 'memes') {
        return requestInfoUtils.parseRequestUrl('app/contentCardList');
      }

      return requestInfoUtils.parseRequestUrl(`app/contentCardList/${urlParts[2]}`);

    }

    if (urlParts[1] === 'search') {
      if (urlParts[2] === 'users') {
        return requestInfoUtils.parseRequestUrl('app/searchUsers');
      }
    }

    return requestInfoUtils.parseRequestUrl(url);
  }

  /**
   * Create the database for the imposter server
   */
  public createDb() {

    const profile: Partial<IUser>[] = [
      { id: 1, firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, followers: 31, contentNumber: 70, photo: '/assets/svg-img/default-profile-picture.svg' },
      { id: 2, firstName: 'Jake', username: 'user12143', influence: 33124, followers: 3221, contentNumber: 310, photo: '/assets/img/test/testi1.jpg' },
      { id: 3, firstName: 'Malinda', username: 'user2441212', influence: 223, followers: 1, contentNumber: 70, photo: '/assets/img/test/testi2.jpg' },
      { id: 4, firstName: 'Johanne', username: 'user9272311', influence: 11, followers: 641, contentNumber: 20, photo: '/assets/img/test/testi3.jpg' },
      { id: 5, firstName: 'Chris', username: 'wutisdis', influence: 14, followers: 61, contentNumber: 75, photo: '/assets/img/test/testi2.jpg' },
    ];

    const user_items: Partial<IUser>[] = [ // tslint:disable-line
      { id: 3, firstName: 'Malinda', username: 'user2441212', influence: 223, photo: '/assets/img/test/testi2.jpg', activeCanvases: 1 },
      { id: 5, firstName: 'Chris', username: 'wutisdis', influence: 14, photo: '/assets/img/test/testi2.jpg', activeCanvases: 4 },
      { id: 2, firstName: 'Jake', username: 'user12143', influence: 33124, photo: '/assets/img/test/testi1.jpg', activeCanvases: 1 },
      { id: 1, firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 4, firstName: 'Johanne', username: 'user9272311', influence: 11, photo: '/assets/img/test/testi3.jpg' },
    ];

    const follow_backs: Partial<IUser>[]  = [ // tslint:disable-line
      { id: 5, firstName: 'Chris', username: 'wutisdis', influence: 14, photo: '/assets/img/test/testi2.jpg', activeCanvases: 4 },
      { id: 2, firstName: 'Jake', username: 'user12143', influence: 33124, photo: '/assets/img/test/testi1.jpg', activeCanvases: 1  },
    ];

    const following: Partial<IUser>[] = [
      { id: 4, firstName: 'Johanne', username: 'user9272311', influence: 11, photo: '/assets/img/test/testi3.jpg' },
    ];

    const followers: Partial<IUser>[] = [
      { id: 3, firstName: 'Malinda', username: 'user2441212', influence: 223, photo: '/assets/img/test/testi2.jpg', activeCanvases: 1 },
    ];

    const searchUsers: Partial<IUser>[] = [
      { id: 3, firstName: 'Malinda', username: 'user2441212', influence: 223, photo: '/assets/img/test/testi2.jpg' },
      { id: 5, firstName: 'Chris', username: 'wutisdis', influence: 14, photo: '/assets/img/test/testi2.jpg' },
      { id: 2, firstName: 'Jake', username: 'user12143', influence: 33124, photo: '/assets/img/test/testi1.jpg' },
      { id: 1, firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 4, firstName: 'Johanne', username: 'user9272311', influence: 11, photo: '/assets/img/test/testi3.jpg' },
    ];

    const contentCardList: ContentCard[] = [
      { id: 1, cid: 2, type: EContentType.MemeWithHost, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 5, firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://www.roberthompson.co.uk/meme-app/meme.jpg', description: 'This is a description',  stars: 56, starred: false, utcTime: 1560082767243 },

      { id: 2, type: EContentType.Canvas, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1', description: 'Yo there',  stars: 100000, starred: false, utcTime: 1551072737432 },

      { id: 3, cid: 2, type: EContentType.MemeWithHost, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 5, firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://amp.businessinsider.com/images/5b2b605b1ae6621d008b543e-750-563.jpg', description: 'More content lol',  stars: 114, starred: true, utcTime: 1541081490342 },

      { id: 4, cid: 5, type: EContentType.MemeWithHost, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 5, firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://www.todaysparent.com/wp-content/uploads/2017/06/when-your-kid-becomes-a-meme-1024x576-1497986561.jpg', description: 'Something else?',  stars: 442, starred: false, utcTime: 1531081123432 },

      { id: 5, type: EContentType.Canvas, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://pbs.twimg.com/media/CPRE4hiUEAA3vyG.png',  stars: 1456, starred: false, utcTime: 1561081352435 },
    ];

    const canvases: ContentCard[] = [
      { id: 5, type: EContentType.Canvas, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://pbs.twimg.com/media/CPRE4hiUEAA3vyG.png',  stars: 1456, starred: false, utcTime: 1561081352435 },

      { id: 2, type: EContentType.Canvas, users: {
        primary: { id: 1, firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1', description: 'Yo there',  stars: 100000, starred: false, utcTime: 1551072737432 },

    ];

    return { profile, user_items, followers, following, follow_backs, contentCardList, canvases, searchUsers };
  }

}
