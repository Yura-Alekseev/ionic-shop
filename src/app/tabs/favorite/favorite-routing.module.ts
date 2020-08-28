import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritePage } from './favorite.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  },
  {
    path: ':id',
    loadChildren: () => import('./favorite-item/favorite-item.module').then( m => m.FavoriteItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritePageRoutingModule {}
