export type User = {
  username: string,
  id: number,
  isPremium: boolean,
  avatar: string
}

export type Session = {
  userId: number,
  username: string
}
