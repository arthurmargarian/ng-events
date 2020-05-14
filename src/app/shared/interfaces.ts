export interface ILoginRes {
  access_token: string,
  user: IUser
}

export interface IUser {
  id: number,
  name: string,
  srName: string,
  email: string,
  password: string,
  isAdmin: boolean
}

export interface IEvent {
  id?: number,
  name: string,
  description: string,
  date: string,
  eventType: number,
  image?: string,
}

export interface IEventType {
  value: number,
  type: string
}
