import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of} from "rxjs";
import {ChatMessage, User} from "../shared/interface";
import {ChatMessageService} from "../shared/services/chat-message.service";
import {ProfileService} from "../shared/services/profile.service";
import {map, switchMap} from "rxjs/operators";
import {uniq} from "lodash"
import {FormControl, FormGroup, Validators} from "@angular/forms";


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

  joined$: Observable<any>

  form: FormGroup

  constructor(
    private msgService: ChatMessageService,
    private profile: ProfileService
  ) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required, Validators.minLength(1)])
    })


    this.chatMessages$ = this.msgService.fetchByChat(this.chatId)
    this.chatUsers$ = this.profile.getUsers()

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

  }

//end
}
