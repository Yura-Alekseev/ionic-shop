import { Component, OnInit } from '@angular/core';
import {ViewWillEnter} from "@ionic/angular";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.page.html',
  styleUrls: ['./personal-account.page.scss'],
})
export class PersonalAccountPage implements OnInit, ViewWillEnter {

  userName: string;
  userPhoto: string;
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('userPhoto');
  }

  ionViewWillEnter() {
    this.userName = localStorage.getItem('userName');
    this.userPhoto = localStorage.getItem('userPhoto');
  }

}
