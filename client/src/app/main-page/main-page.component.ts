import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ChatService} from "../shared/services/chat.service";

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

  constructor(
    private chat: ChatService,
    private auth: AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.auth.logout()
  }

}
