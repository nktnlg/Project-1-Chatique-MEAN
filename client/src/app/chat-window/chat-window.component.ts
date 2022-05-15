import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: [`.messages {
    overflow-y: scroll;
    max-height: 80%;
  }`
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy{

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

}
