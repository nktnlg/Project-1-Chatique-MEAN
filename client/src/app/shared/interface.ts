export interface User {
  username: string,
  password: string,
  avatarSrc?: string,
  _id?: string
}
export interface Chat {
  title: string,
  user?: string,
  date?: Date,
  lastMessage?: string,
  _id?: string,
  messageCount?: number
}
