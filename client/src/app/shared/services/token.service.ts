import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {


  tokenUsername(): string{
    const json = JSON.parse(atob(localStorage.getItem('auth-token').split(' ')[1].split('.')[1].replace('-', '+').replace('_', '/')))
    return json.username
  }

  tokenId(): string{
    const json = JSON.parse(atob(localStorage.getItem('auth-token').split(' ')[1].split('.')[1].replace('-', '+').replace('_', '/')))
    return json.userId
  }

}
