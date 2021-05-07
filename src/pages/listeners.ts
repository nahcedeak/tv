import { IItems } from '../types/playlist'
import { randomPlay } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {
  document
    .querySelector('#randomBtn')
    .addEventListener('click', () => randomPlay(channels))

  document.querySelector('#menu-button').addEventListener('click', eventHandle)
}

function eventHandle(e: Event) {
  // const target = e.target as HTMLElement
  // classname = target.className filter blur-sm
  const channelList = document.querySelector('#channel-list') as HTMLDivElement
  document.querySelector('#pop-menu').classList.toggle('invisible')
  channelList.classList.toggle('filter')
  channelList.classList.toggle('blur-sm')
}
