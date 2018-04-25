import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShufflePage } from './shuffle';

@NgModule({
  declarations: [
    ShufflePage,
  ],
  imports: [
    IonicPageModule.forChild(ShufflePage),
  ],
})
export class ShufflePageModule {}
