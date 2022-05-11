export interface User {
  username: string,
  password: string,
  avatarSrc?: string
}
export interface Chat {
  title: string,
  user?: User,
  date?: Date,
  lastMessage?: string,
  _id?: string,
  messageCount?: number
}
