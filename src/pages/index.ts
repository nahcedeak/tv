import { M3U_JP, TV_DOMAIN } from '../datas/constants'
import { rootNode } from '../components'
import { prePlay } from '../player'
import { playlistParser, qureyUrl } from '../utils'
import { generateButtons, generateMenu, generateNodes } from './make'
import { IItems, IPlaylist } from '../types/playlist'
import { addElementEventListeners } from './listeners'
import { categories, countries, languages } from '../datas/categories'

export class Pages {
  private playlist: IPlaylist<string>
  private channels: IItems<string>[]
  init() {
    const body = document.querySelector('body') as HTMLElement
    // `${TV_DOMAIN}index.m3u`
    fetch(`${TV_DOMAIN}index.m3u`, )
      .then(response => {
        if (response.ok) {
          return response.text()
        } else {
          new Error(`Network response was not ok.`)
        }
      })
      .then(response => {
        this.playlist = playlistParser(response)
        this.channels = this.playlist.items

        const pl = playlistParser(M3U_JP)

        localStorage.setItem('length', this.channels.length.toString())

        generateNodes([rootNode], body)

        pl.items.forEach(item => {
          const qyUrl = qureyUrl(item.url!)
          if (qyUrl) {
            item.url = qyUrl
            setTimeout(() => {
              generateButtons(item)
            }, 50)
          }
        })

        prePlay()

        addElementEventListeners(this.channels)
        generateMenu(languages,countries,categories)
      })
  }
}
