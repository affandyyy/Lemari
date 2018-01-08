import { Component } from '@angular/core';

import { CameraPage } from '../camera/camera';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
