import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatMessage} from "../interface";
import {Observable} from "rxjs";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({providedIn: "root"})
export class ChatMessageService {
  constructor(private http: HttpClient) {
  }

  fetchByChat(chatId: string): Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(`/api/message/${chatId}`)
  }

  create(chatId: string, msg: string): Observable<ChatMessage>{
    return this.http.post<ChatMessage>(`/api/message/${chatId}`, msg)
  }

  delete(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/message/${id}`)
  }
}
