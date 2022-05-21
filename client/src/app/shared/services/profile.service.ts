import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {User} from "../interface";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`api/profile/`)
  }

  getUser(id: string) : Observable<User>{
    console.log(id)
    return this.http.get<User>(`api/profile/${id}`)
  }

  changeName(id: string, newName: string){
    console.log(`profile.service: new name is: ${newName}`)
    return this.http.patch(`/api/profile/${id}`, {username: newName})
  }

  delete(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/profile/${id}`)
  }
}
