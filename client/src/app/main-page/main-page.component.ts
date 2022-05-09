import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ChatService} from "../shared/services/chat.service";
import {Observable} from "rxjs";
import {Chat} from "../shared/interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit {

  chats$: Observable<Chat[]>
  form: FormGroup

  constructor(
    private chat: ChatService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.chats$ = this.chat.fetch()

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      message: new FormControl(null)
    })
  }

  logout(){
    this.auth.logout()
  }

  createChat(){}
}
