import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ChatService} from "../shared/services/chat.service";
import {Observable, Subscription} from "rxjs";
import {Chat} from "../shared/interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [
  ]
})
export class MainPageComponent implements OnInit, OnDestroy {


  chats$: Observable<Chat[]>
  form: FormGroup
  aSub: Subscription
  newChatDone: Boolean = false

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

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  logout(){
    this.auth.logout()
  }

  createChat(){
    this.form.disable()
    const chat: Chat = {
      title: this.form.value.title,
      lastMessage: this.form.value.message
    }
    this.aSub = this.chat.create(chat).subscribe(
      () =>{
        this.form.reset()
        this.form.enable()
        this.chats$ = this.chat.fetch()
        this.newChatDone = true
      },
      error => {
        this.form.enable()
        console.log(error)
      }
    )
  }

  ///end
}
