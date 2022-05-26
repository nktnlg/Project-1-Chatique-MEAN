import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ChatMessagesPackage} from "../interface";
import {Observable} from "rxjs";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Injectable({providedIn: "root"})
export class ChatMessageService {
  constructor(private http: HttpClient) {
  }

  fetchByChat(chatId: string): Observable<any>{
    return this.http.get<any>(`/api/message/${chatId}`)
  }

  create(chatId: string, msg: string): Observable<ChatMessagesPackage>{
    return this.http.post<ChatMessagesPackage>(`/api/message/${chatId}`, msg)
  }

  delete(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/message/${id}`)
  }
}
