import {
  debounce,
  deDupsClasslist,
  playlistParser,
  qureyUrl,
  setElementText
} from '../utils'
import { IElement } from '../types/element'
import { IItems, IPlaylist } from '../types/playlist'
import {
  channelInfo,
  channelLabel,
  channelLogo,
  menuItem
} from '../datas/elements'
import { player } from '../player'
import { categories } from '../datas/categories'
import { REQUEST_INIT, TV_DOMAIN } from '../datas/constants'
import { menuHandle } from './listeners'

export function generateNodes(
  nodeDatas: IElement[],
  element: HTMLElement,
  refs: WeakSet<object> | null = null,
  once: HTMLElement | boolean = false
) {
  if (!refs) refs = new WeakSet()
  if (refs.has(nodeDatas)) return

  nodeDatas.forEach(node => {
    const el = generateElements(node, element)
    if (!once) once = el

    if ('object' === typeof node.subelement) {
      refs!.add(node)
      generateNodes(node.subelement, el, refs)
    }
  })

  return once
}

export function generateElements(
  data: IElement,
  element: HTMLElement
): HTMLElement {
  const el = document.createElement(data.tagName)

  if (data.innerHtml) el.innerHTML = data.innerHtml
  if (data.id) el.setAttribute('id', data.id)
  if (data.attribute) {
    for (const attr of Object.keys(data.attribute)) {
      el.setAttribute(attr, data.attribute[attr] as string)
    }
  }
  if (data.classList) {
    el.classList.add(...deDupsClasslist(data.classList))
  }

  element.appendChild(el)
  return el
}

export async function generateButtons(item: IItems<string>) {
  const channelList = document.querySelector('#channel-list') as HTMLDivElement
  channelLabel.innerHtml = item.name
  channelLogo.attribute['alt'] = item.name
  channelLogo.attribute['src'] = item.tvg ? item.tvg.logo : ''

  const btn = generateNodes([channelInfo], channelList) as HTMLElement

  btn.addEventListener('click', debounce(play).bind({}, item))
}

function play() {
  const item = arguments[0]
  player(item.url, item.name)
  setElementText('#channelMessage', item.name)
}

export function randomPlay(item: IItems<string>[]) {
  const index = Math.ceil(Math.random() * item.length)
  const qyUrl = qureyUrl(item[index].url)
  if (qyUrl) {
    player(item[index].url, item[index].name)
    setElementText('#channelMessage', item[index].name)
  } else {
    setElementText('no channel')
  }
}

export function generateMenu() {
  categories.forEach(category => {
    generateCategories(category)
  })
}

function generateCategories(category: string) {
  const menuPop = document.querySelector('#menu-pop') as HTMLElement
  menuItem.innerHtml = category

  const btn = generateNodes([menuItem], menuPop) as HTMLElement

  btn.addEventListener('click', menuEventHandle.bind({}, category))
}

export let playlist: IPlaylist<string> = undefined

function menuEventHandle() {
  const category = arguments[0]

  fetch(`${TV_DOMAIN}categories/${category.toLowerCase()}.m3u`, REQUEST_INIT)
    .then(response => {
      if (response.ok) {
        return response.text()
      } else {
        new Error(`Network response was not ok.`)
      }
    })
    .then(response => {
      playlist = playlistParser(response)

      clearList()

      generateItems()

      menuHandle()
    })
}

export function generateItems(length = 50) {
  console.log(playlist.items.length)
  const l = playlist.items.length > length ? length : playlist.items.length

  for (let i = 0; i < l; i++) shimsItem(playlist.items.shift())
}

function shimsItem(item: IItems<string>) {
  const qyUrl = qureyUrl(item.url)
  if (qyUrl) {
    item.url = qyUrl
    setTimeout(() => {
      generateButtons(item)
    }, 50)
  }
}

function clearList() {
  return (document.querySelector('#channel-list')!.innerHTML = '')
}

function addMoreLabel() {
  return document.querySelector('#channel-list')!.innerHTML += 'More ...'
}