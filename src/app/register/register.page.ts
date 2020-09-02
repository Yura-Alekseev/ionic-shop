import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {User} from "../shared/interfaces";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
      private navCtrl: NavController,
      private auth: AuthService,
      private router: Router
  ) { }

  ngOnInit() {


    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
  }

  onSwitchSignin() {
    this.navCtrl.navigateForward(['/login'], {animated:false});
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.doRegister(user).subscribe(() => {
      localStorage.setItem('userName', user.email);
      this.form.reset();
      this.router.navigate(['/personal-account']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

  doGoogleAuth() {
    this.auth.doGoogleAuth().then(() => {
          this.router.navigate(['/personal-account']);
        }, err => console.log(err)
    );
  }

  doFacebookAuth() {
    this.auth.doFacebookAuth().then(() => {
          this.router.navigate(['/personal-account']);
        }, err => console.log(err)
    );
  }
}
