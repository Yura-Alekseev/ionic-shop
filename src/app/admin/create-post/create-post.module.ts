import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './create-post-routing.module';

import { CreatePostPage } from './create-post.page';
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
        CreatePostPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CreatePostPage],
    providers: [
        INTERCEPTOR_PROVIDER
    ]
})
export class CreatePostPageModule {}
