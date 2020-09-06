import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';

import { AdminPagePage } from './admin-page.page';
import {ProductsPageModule} from "../../tabs/products/products.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminPagePageRoutingModule,
        ProductsPageModule
    ],
  declarations: [AdminPagePage]
})
export class AdminPagePageModule {}
