export interface User {
  username: string,
  password: string,
  avatarSrc?: string,
  _id?: string
}
export interface Chat {
  title?: string,
  user?: string,
  date?: Date,
  lastMessage?: string,
  _id?: string,
  messageCount?: number
}

export interface ChatMessagesPackage {
  count: number
  messages: [{
    _id?: string
    message: string,
    chat?: string,
    date?: Date,
    user?: {
      avatarSrc?: String,
      _id?: String,
      username?: String
    }
  }]
}
export interface ChatMessages {
    _id?: string
    message: string,
    chat?: string,
    date?: Date,
    user?: {
      avatarSrc?: String,
      _id?: String,
      username?: String
    }
  }
