import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chat} from "../shared/interface";
import {ChatService} from "../shared/services/chat.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {TokenService} from "../shared/services/token.service";

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styles: [`
    .chatbox {
      border: 1px solid black;
      height: 600px;
    }
  `
  ]
})
export class ChatPageComponent implements OnInit, OnDestroy {

  chatInfo: Chat = {
    title : ''
  }
  deleteForm = false
  wrongPasswordDel = false
  form: FormGroup
  name = ''
  id = ''
  chatId = ''
  chatOwner = false
  aSub: Subscription
  bSub: Subscription
  cSub: Subscription

  constructor(
    private chat: ChatService,
    private route: ActivatedRoute,
    private  auth: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.name = this.tokenService.tokenUsername()
    this.id = this.tokenService.tokenId()

    this.chatId = this.route.params['_value']['id']

    this.form = new FormGroup({
      passwordDel: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.aSub = this.route.queryParams.subscribe((params: Params) => {
      if (params['wrongPasswordDel']) {
        this.wrongPasswordDel = true
      } else { this.wrongPasswordDel = false}
    })

    this.bSub = this.route.params.pipe( switchMap( (params: Params) => {
            if (params['id']) {
              //If id in params, we fetch Category observable (by id)
              return this.chat.fetchOne(params['id'])
            }
            //If not, we return Null observable
            return of(null)
          }))
      .subscribe(
        (chatById: Chat) => {
          this.chatInfo = chatById
          //console.log(chatById.user)
          //console.log(this.id)
          this.chatOwner = chatById.user == this.id
      },
        error => console.log(error)
    )


  }




  deleteChat() {
    this.cSub = this.auth.passCheck({
      username: this.name,
      password: this.form.value.passwordDel
    })
      .subscribe(
        res => {
          if (res.allow) {
            this.chat.delete(this.chatId).subscribe(
              res => {
                this.router.navigate(['/main'])
              },
              error => console.log(error.error.message),
              () => this.form.reset()
            )
          } else {
            console.log('wrong password')
            this.router.navigate(['/chat', this.chatId], {
              queryParams: {
                wrongPasswordDel: true
              }
            })
          }
        })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.bSub) {
      this.bSub.unsubscribe()
    }
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }
//end
}
