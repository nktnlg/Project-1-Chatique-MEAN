import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat} from "../interface";
import {Observable} from "rxjs";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({providedIn: "root"})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Chat[]>{
    return this.http.get<Chat[]>('/api/chat')
  }

  fetchOne(id: string): Observable<Chat>{
    return this.http.get<Chat>(`/api/chat/${id}`)
  }

  create(chat: Chat): Observable<Chat>{
    return this.http.post<Chat>('/api/chat/', chat)
  }

  update(id: string, newData: Chat): Observable<Chat>{
    return this.http.patch<Chat>(`/api/chat/${id}`, newData)
  }

  delete(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/chat/${id}`)
  }
}
