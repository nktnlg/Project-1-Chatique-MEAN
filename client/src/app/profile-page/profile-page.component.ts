import {Component, OnInit} from '@angular/core';
import {TokenService} from "../shared/services/token.service";
import {ProfileService} from "../shared/services/profile.service";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interface";
import {LoggedLayoutComponent} from "../layout/logged-layout/logged-layout.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styles: []
})
export class ProfilePageComponent implements OnInit {

  form: FormGroup
  form2: FormGroup
  name = ''
  id = ''
  changeForm = false
  deleteForm = false
  userExists = false
  wrongPassword = false
  wrongPasswordDel = false

  constructor(
    private profile: ProfileService,
    private tokenService: TokenService,
    private auth: AuthService,
    private router: Router,
    private layout: LoggedLayoutComponent,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.name = this.tokenService.tokenUsername()
    this.id = this.tokenService.tokenId()

    this.route.queryParams.subscribe((params: Params) => {
      if (params['userExists']) {
        this.userExists = true
      } else { this.userExists = false}
      if (params['wrongPassword']) {
        this.wrongPassword = true
      } else { this.wrongPassword = false}
      if (params['wrongPasswordDel']) {
        this.wrongPasswordDel = true
      } else { this.wrongPasswordDel = false}
    })

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.form2 = new FormGroup({
      passwordDel: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  changeName() {
    const user1: User = {
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.auth.passCheck({
      username: this.name,
      password: user1.password
    })
      .subscribe(
        res => {
          if (res.allow) {
            this.profile.changeName(this.id, user1.username).subscribe(
              () => this.auth.login(user1).subscribe(
                () => {
                  this.name = this.tokenService.tokenUsername()
                  this.id = this.tokenService.tokenId()
                  this.changeForm = false
                  this.form.reset()
                  this.layout.reset()
                },
                error => console.log(error.error.message),
                () => console.log(`changeName>login complete`)
              ),
              error => {
                if (error.error.userExists) {
                  this.router.navigate(['/profile'], {
                    queryParams: {
                      userExists: true
                    }
                  })
                } else console.log(error.error.message)},
              () => console.log('changeName complete')
            )
          } else {
            console.log('wrong password')
            this.router.navigate(['/profile'], {
              queryParams: {
                wrongPassword: true
              }
            })
          }

        },
        error => console.log(`changeName>passCheck returned error: ${error.error.message}`),
        () => {
          console.log(`passCheck complete`)
        }
      )

  }

  delete() {
    this.auth.passCheck({
      username: this.name,
      password: this.form2.value.passwordDel
    })
      .subscribe(
        res => {
          if (res.allow) {
            this.profile.delete(this.id).subscribe(
              res => {
                this.auth.logout()
                console.log(res)
              },
              error => console.log(error.error.message),
              () => this.form2.reset()
            )
          } else {
            console.log('wrong password')
            this.router.navigate(['/profile'], {
              queryParams: {
                wrongPasswordDel: true
              }
            })
          }
        })
  }

    //end
  }
