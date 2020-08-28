import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteItemPage } from './favorite-item.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteItemPageRoutingModule {}
