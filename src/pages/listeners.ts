import { IItems } from '../types/playlist'
import { randomPlay } from './make'

let scrollTop = 0
let preScroll = 0

export function addElementEventListeners(channels: IItems<string>[]) {
  window.addEventListener('wheel', e => {
    // console.log(e)
    scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop

    if (scrollTop > preScroll) {
      
      preScroll = scrollTop
    }

  })

  document
    .querySelector('#randomBtn')
    .addEventListener('click', () => randomPlay(channels))

  document.querySelector('#menu-button').addEventListener('click', menuHandle)
}

export function menuHandle(e?: Event) {
  const channelList = document.querySelector(
    '#channel-list'
  ) as HTMLButtonElement
  channelList.classList.toggle('blur-sm')

  document.querySelector('#menu-pop').classList.toggle('invisible')
  document
    .querySelectorAll('#menu-button>svg')
    .forEach(i => i.classList.toggle('hidden'))
}
