import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styles: []
})
export class AuthLayoutComponent implements OnInit {

  registered = false
  accessDenied = false
  sessionExpired = false

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

/*    if (this.auth.isAuthenticated()){
      this.router.navigate(['/main'])
    }*/

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.registered = true
      } else {this.registered = false}
      if (params['accessDenied']) {
        this.accessDenied = true
      } else {this.accessDenied = false}
      if (params['sessionExpired']) {
        this.sessionExpired = true
      } else {this.sessionExpired = false}
    })
  }
}

