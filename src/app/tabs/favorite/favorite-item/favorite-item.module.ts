import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteItemPageRoutingModule } from './favorite-item-routing.module';

import { FavoriteItemPage } from './favorite-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteItemPageRoutingModule
  ],
  declarations: [FavoriteItemPage]
})
export class FavoriteItemPageModule {}
