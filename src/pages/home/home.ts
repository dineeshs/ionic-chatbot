import { Component, NgZone } from '@angular/core';

import { Platform } from 'ionic-angular';

declare var ApiAIPromises: any;
export class Message {
  constructor(public content: string, public sentBy: string) {}
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages = [];

  constructor(public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {

      ApiAIPromises.init({
        clientAccessToken: "09af47400a3441c6ad33b01ca04b3531"
      })
      .then((result) =>  console.log(result))
        
    });
  }

  ask(question) {
    this.messages.push(new Message(question, "user"));
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.messages.push(new Message(speech, "bot"));
       });
    })
  }
}