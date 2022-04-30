import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styles: []
})
export class AuthLayoutComponent implements OnInit {

  registered = false
  accessDenied = false
  sessionExpired = false

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

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

