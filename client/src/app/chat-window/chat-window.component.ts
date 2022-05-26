import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Chat, ChatMessages, User} from "../shared/interface";
import {ChatMessageService} from "../shared/services/chat-message.service";
import {ProfileService} from "../shared/services/profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../shared/services/token.service";
import {ChatService} from "../shared/services/chat.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styles: [`.messages {
    overflow-y: scroll;
    height: 94%;
    background: lightblue;
    padding: 5px;
    display: flex;
    flex-direction: column-reverse;
  }

  .input {
    height: 6%;
    background: lightblue;
  }

  .sender {
    cursor: pointer;
  }
  `
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @Input('chatId') chatId: string
  chatMessages$: any
  messagesCount$: number
  result: number

  joined$: Observable<any>

  form: FormGroup


  userId = ''
  toDelete = ''
  msgDeleted = false

  constructor(
    private msgService: ChatMessageService,
    private profile: ProfileService,
    private tokenService: TokenService,
    private chat: ChatService
  ) {
  }


  ngOnInit(): void {

    this.userId = this.tokenService.tokenId()

    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required, Validators.minLength(1)])
    })


    this.chatMessages$ = this.msgService.fetchByChat(this.chatId).pipe(tap(res => this.messagesCount$ = res.length))

  }

  sendMsg() {
    //send Chat with lastMsg=msg and messageCount++ date=now()
    const msg = this.form.value

    if (this.form.valid){
      const chatUpdate: Chat = {
        date: new Date(Date.now()),
        lastMessage: msg.message,
        messageCount: this.messagesCount$ + 1
      }

      this.msgService.create(this.chatId, msg).subscribe(
        res => {
          this.form.reset()
          this.form.enable()
          this.ngOnInit()
          this.chat.update(this.chatId, chatUpdate).subscribe(
            () => {
            },
            error => console.error(error)
          )
        },
        error => {
          console.log(error)
          this.form.enable()
        }
      )
    }
  }

  delete() {
    const chatUpdate: Chat = {
      messageCount: this.messagesCount$ - 1
    }
    this.msgService.delete(this.toDelete).subscribe(
      () => {
        this.msgDeleted = true
        this.ngOnInit()
        this.chat.update(this.chatId, chatUpdate).subscribe(
          () => {
          },
          error => console.error(error)
        )
      },
      error => {
        console.error(error)
      }
    )
  }


  ngOnDestroy(): void {

  }

//end
}
