import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styles: []
})
export class RegPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;
  userExists = false;
  wrongAdmissionCode = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['userExists']) {
        this.userExists = true
      } else { this.userExists = false}
      if (params['wrongAdmissionCode']) {
        this.wrongAdmissionCode = true
      } else { this.wrongAdmissionCode = false}
    })

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      admissionCode: new FormControl(null, [Validators.required])
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        this.form.enable()
        if (error.error.userExists) {
          this.router.navigate(['/registration'], {
            queryParams: {
              userExists: true
            }
          })
        } else if (error.error.wrongAdmissionCode) {
          this.router.navigate(['/registration'], {
            queryParams: {
              wrongAdmissionCode: true
            }
          })
        }
      }
    )
  }

//end
}
