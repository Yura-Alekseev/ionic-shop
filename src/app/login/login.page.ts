import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController} from "@ionic/angular";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../shared/interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(
      private navCtrl: NavController,
      private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.errorMessage = 'Please sign in';
      }
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    })
  }

  onSwitchSignup() {
    this.navCtrl.navigateForward(['/register'], {animated:false});
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.auth.doLogin(user).subscribe(() => {
      localStorage.setItem('userName', user.email);
      this.form.reset();
      this.router.navigate(['/personal-account']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
