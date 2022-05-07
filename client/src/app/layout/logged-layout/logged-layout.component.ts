import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from "../../shared/services/token.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styles: [
  ]
})
export class LoggedLayoutComponent implements OnInit {

  name = ''

  constructor( private tokenService: TokenService
  ) {
  }

  ngOnInit(): void{
    this.name = this.tokenService.tokenUsername()
  }

  reset(){
    this.name = this.tokenService.tokenUsername()
  }


}
