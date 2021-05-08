import { IItems } from '../types/playlist'
import { debounce } from '../utils'
import { playlist, randomPlay } from './make'
import { generateItems } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {
  document.addEventListener('wheel', debounce(scrollEventHandle, 100))

  document.addEventListener('scroll', debounce(scrollEventHandle, 100))

  document
    .querySelector('#randomBtn')
    .addEventListener('click', () => randomPlay(channels))

  document.querySelector('#menu-button').addEventListener('click', menuHandle)
}

function scrollEventHandle(e?: Event) {
  if (isBottom() && playlist) generateItems(20)
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

function isBottom() {
  const docScrollTop = document.documentElement.scrollTop
  const docClientHeight = document.documentElement.clientHeight
  const docScrollHeight = document.documentElement.scrollHeight

  return docScrollTop + docClientHeight === docScrollHeight ? true : false
}
