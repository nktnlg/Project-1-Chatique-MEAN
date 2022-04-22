import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit {

  chats = [
    {lastMsg: 'some words..', unreadMsg: 3},
    {lastMsg: 'some other words..', unreadMsg: 5}
    ]

  constructor() { }

  ngOnInit(): void {
  }

}
