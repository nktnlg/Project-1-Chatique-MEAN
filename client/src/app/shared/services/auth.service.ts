import {Injectable} from "@angular/core";
import {User} from "../interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class AuthService {
  private token = null

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
    ) {
  }

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register', user)
  }


  passCheck(user: User): Observable<any>{
    //console.log(user)
    return this.http.post<User>('/api/auth/passwordCheck', user)
  }

  login(user: User): Observable<{token:string}>{
    //console.log(`auth.service.login: login attempt, now token is ${this.token}, entering as ${user.username}`)
    return this.http.post<{token:string}>('/api/auth/login', user).pipe(
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
          this.tokenService.tokenUsername()
          this.tokenService.tokenId()
          //console.log(`auth.service.login: gettoken now is ${this.getToken()}`)
          //console.log(`auth.service.login: isAuthenticated now is ${this.isAuthenticated()}`)
        }
      )
    )
  }

  setToken(token: String){
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout(){
    this.setToken(null)
    localStorage.clear()
    this.router.navigate(['/'])
  }

///end
}
