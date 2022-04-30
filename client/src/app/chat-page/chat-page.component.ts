import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styles: [`
    .chatbox {
      border:1px solid black;
      height: 400px;
    }
  `
  ]
})
export class ChatPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
