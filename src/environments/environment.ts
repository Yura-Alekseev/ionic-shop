// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "./interface";

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCgRyNr6KNEABLtXsPNoUzcXdQedKj32tg",
    authDomain: "ionic-shop-8b704.firebaseapp.com",
    databaseURL: "https://ionic-shop-8b704.firebaseio.com",
    projectId: "ionic-shop-8b704",
    storageBucket: "ionic-shop-8b704.appspot.com",
    messagingSenderId: "709415589767",
    appId: "1:709415589767:web:806831c863424f38492522"
  },
  fbDbUrl: 'https://ionic-shop-8b704.firebaseio.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
