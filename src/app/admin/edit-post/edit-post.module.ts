import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPostPageRoutingModule } from './edit-post-routing.module';

import { EditPostPage } from './edit-post.page';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "../../auth/auth.interceptor";

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPostPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [EditPostPage],
  providers: [
      INTERCEPTOR_PROVIDER
  ]
})
export class EditPostPageModule {}
