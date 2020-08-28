import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.page.html',
  styleUrls: ['./personal-account.page.scss'],
})
export class PersonalAccountPage implements OnInit {

  userName: string;
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

}
