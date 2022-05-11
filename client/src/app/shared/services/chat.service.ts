import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat} from "../interface";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Chat[]>{
    return this.http.get<Chat[]>('/api/chat')
  }

  create(chat: Chat): Observable<Chat>{
    return this.http.post<Chat>('/api/chat/', chat)
  }

}
