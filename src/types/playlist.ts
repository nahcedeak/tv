export interface IPlaylist<T> {
  header?: IHeader<T>
  items?: IItems<T>[]
}

export interface IHeader<T> {
  attrs?: { [key: string]: string }
  raw?: T
}

export interface IItems<T> {
  name?: T
  tvg?: ITVGuide<T>
  group?: IGroup<T>
  http?: IHttp<T>
  url?: T
  raw?: T
}

export interface ITVGuide<T> {
  id?: T
  name?: T
  language?: T
  country?: T
  url?: T
  logo?: T
}

export interface IGroup<T> {
  title?: T
}

export interface IHttp<T> {
  referrer?: T
  'user-agent'?: T
}

export interface IChannel {
  name: string
  logo: string
  url: string
  category: string
  languages: { code: string; name: string }[]
  countries: { code: string; name: string }[]
  tvg: { id: string; name: string; url: string }
}
