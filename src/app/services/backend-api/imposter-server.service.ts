import { Injectable } from '@angular/core';

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ContentCard, ContentType, UserItem, Profile } from './response';

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

    let profiles: Profile[] = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, followers: 31, contentNumber: 70, photo: '/assets/svg-img/default-profile-picture.svg' },
      { id: '3cf330126531201b48a0fcc4', firstName: 'Jake', username: 'user12143', influence: 33124, followers: 3221, contentNumber: 310, photo: '/assets/img/test/testi1.jpg' },
      { id: 'ccfssffe101b48a0ddddfcc4', firstName: 'Malinda', username: 'user2441212', influence: 223, followers: 1, contentNumber: 70, photo: '/assets/img/test/testi2.jpg' },
      { id: 'fcf330860fasdasdfe10cdd4', firstName: 'Johanne', username: 'user9272311', influence: 11, followers: 641, contentNumber: 20, photo: '/assets/img/test/testi3.jpg' },
      { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', influence: 14, followers: 61, contentNumber: 75, photo: '/assets/img/test/testi2.jpg' },
    ];

    let followBacks: UserItem[]  = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: '3cf330126531201b48a0fcc4', firstName: 'Jake', username: 'user12143', influence: 33124, photo: '/assets/img/test/testi1.jpg' },
      { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', influence: 14, photo: '/assets/img/test/testi2.jpg' },
    ];

    let following: UserItem[] = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 'fcf330860fasdasdfe10cdd4', firstName: 'Johanne', username: 'user9272311', influence: 11, photo: '/assets/img/test/testi3.jpg' },
    ];

    let followers: UserItem[] = [
      { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', influence: 7089, photo: '/assets/svg-img/default-profile-picture.svg' }, // Client user always at position 0
      { id: 'ccfssffe101b48a0ddddfcc4', firstName: 'Malinda', username: 'user2441212', influence: 223, photo: '/assets/img/test/testi2.jpg' },
    ];

    let contentCardList: ContentCard[] = [
      { id: 'ccfssffe1f4h48a0dddfcc94', cid: 'fcf330860fdhdisnfe10cdd4', type: ContentType.Meme, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://www.roberthompson.co.uk/meme-app/meme.jpg', description: 'This is a description',  stars: 56, utcTime: 1560082767243 },

      { id: 'fcf330860fdhdisnfe10cdd4', type: ContentType.Canvas, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1', description: 'Yo there',  stars: 100000, utcTime: 1551072737432 },

      { id: 'asdas0860fffdvsb48a0fcc4', cid: 'fcf330860fdhdisnfe10cdd4', type: ContentType.Meme, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://amp.businessinsider.com/images/5b2b605b1ae6621d008b543e-750-563.jpg', description: 'More content lol',  stars: 114, utcTime: 1541081490342 },

      { id: 'dfaerrfavfaewasdfe3acdd4', cid: 'saerrfavfaewasdaadfafeee', type: ContentType.Meme, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
        secondary: { id: 'bcaaa3060fasdasdfe3acdd4', firstName: 'Chris', username: 'wutisdis', photo: '/assets/img/test/testi2.jpg' },
      }, imagePath: 'https://www.todaysparent.com/wp-content/uploads/2017/06/when-your-kid-becomes-a-meme-1024x576-1497986561.jpg', description: 'Something else?',  stars: 442, utcTime: 1531081123432 },

      { id: 'saerrfavfaewasdaadfafeee', type: ContentType.Canvas, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://pbs.twimg.com/media/CPRE4hiUEAA3vyG.png',  stars: 1456, utcTime: 1561081352435 }
    ];

    let canvasList: ContentCard[] = [
      { id: 'saerrfavfaewasdaadfafeee', type: ContentType.Canvas, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://pbs.twimg.com/media/CPRE4hiUEAA3vyG.png',  stars: 1456, utcTime: 1561081352435 },

      { id: 'fcf330860fdhdisnfe10cdd4', type: ContentType.Canvas, users: {
        primary: { id: '5cf330860ffe101b48a0fcc4', firstName: 'Tristan', username: 'ghoststeam217', photo: '/assets/svg-img/default-profile-picture.svg' },
      }, imagePath: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1', description: 'Yo there',  stars: 100000, utcTime: 1551072737432 },

    ];

    return { profiles, heroes, followBacks, following, followers, contentCardList, canvasList };
  }

}
