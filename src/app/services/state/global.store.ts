import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { GlobalState } from './global.state';

import { Store } from 'rxjs-observable-store';

@Injectable()
export class GlobalStore extends Store<GlobalState>{

  constructor(private storage: Storage) {
    super(new GlobalState());
    this.getStateFromStorage();
  }

  async getStateFromStorage() {
    this.storage.get('state').then((val: GlobalState) => {
      if(val != null) {
        this.setState(val); //meow
      }
    });
  }

  updateUser() {
    this.setState({
      ...this.state,
      user: this.state.user + 1,
    });

    this.storage.set('state', this.state);
  }
}
