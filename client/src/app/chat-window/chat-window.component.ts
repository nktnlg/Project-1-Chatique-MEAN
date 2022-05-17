import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subscription} from "rxjs";
import {Chat, ChatMessage, User} from "../shared/interface";
import {ChatMessageService} from "../shared/services/chat-message.service";
import {ProfileService} from "../shared/services/profile.service";
import {map, switchMap} from "rxjs/operators";
import {uniq} from "lodash"
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../shared/services/token.service";
import {ChatService} from "../shared/services/chat.service";


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
    .sender{
      cursor: pointer;
    }
  `
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @Input('chatId') chatId: string
  chatMessages$: Observable<ChatMessage[]>
  chatUsers$: Observable<User[]>
  messagesCount$: number

  joined$: Observable<any>

  form: FormGroup
  aSub: Subscription
  bSub: Subscription
  userId = ''
  toDelete= ''
  msgDeleted = false

  constructor(
    private msgService: ChatMessageService,
    private profile: ProfileService,
    private tokenService: TokenService,
    private chat: ChatService
  ) {
  }


  ngOnInit(): void {
    /*this.thisChat$ = this.chat.fetchOne().subscribe(
      res=>{res.},
      error => {console.error(error)}
    )*/

    this.userId = this.tokenService.tokenId()

    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required, Validators.minLength(1)])
    })


    this.chatMessages$ = this.msgService.fetchByChat(this.chatId)
    this.chatUsers$ = this.profile.getUsers()
    this.chatMessages$.subscribe(
      res=>{this.messagesCount$ = res.length}, error => console.error(error)
    )

    this.joined$ = this.chatMessages$.pipe(
      //first
      switchMap(chatMessages => {
        const userIds = uniq(chatMessages.map(msgs => msgs.user))
        //массив с айдишниками
        // console.log(userIds)

        return combineLatest(
          //сообщения
          of(chatMessages),
          // объекты юзеры (айди и юзернейм)
          combineLatest(
            // берем массив айдишек и по каждому обращаемся к потоку запроса юзеров
            userIds.map(
              userId => this.profile.getUser(userId)
                .pipe(map(users => users[0]))
            )
          )
        )
      }),
      //then
      map(([chatMessages, users]) => {
          return chatMessages.map(chatMessage => {
            return {
              ...chatMessage,
              username: users.find(a => a._id === chatMessage.user)
            }
          })
        }
      )
    )

  }

  ngOnDestroy(): void {
  }

  sendMsg(){
    //send Chat with lastMsg=msg and messageCount++ date=now()
    this.form.disable()
    const msg = this.form.value
    const counter = this.messagesCount$

    const chatUpdate: Chat = {
      date: new Date(Date.now()),
      lastMessage: msg.message,
      messageCount: counter
    }

    this.aSub = this.msgService.create(this.chatId, msg).subscribe(
      res => {
        this.form.reset()
        this.form.enable()
        this.ngOnInit()
        this.chat.update(this.chatId, chatUpdate).subscribe(
          ()=>{console.log('ya molodets')},
          error => console.error(error)
        )
      },
      error => {
        console.log(error)
        this.form.enable()}
    )
  }

  delete(){
    console.log(this.toDelete)
    this.msgService.delete(this.toDelete).subscribe(
      ()=>{
        this.msgDeleted = true
        this.ngOnInit()
      },
      error => {console.error(error)}
    )
  }

//end
}
