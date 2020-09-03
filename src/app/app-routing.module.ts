import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'personal-account',
    loadChildren: () => import('./personal-account/personal-account.module').then(m => m.PersonalAccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./tabs/products/products.module').then(m => m.ProductsPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./tabs/favorite/favorite.module').then(m => m.FavoritePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./tabs/cart/cart.module').then(m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-item',
    loadChildren: () => import('./tabs/products/product-item/product-item.module').then(m => m.ProductItemPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorite-item',
    loadChildren: () => import('./tabs/favorite/favorite-item/favorite-item.module').then(m => m.FavoriteItemPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
