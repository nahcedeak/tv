import {
  debounce,
  deDupsClasslist,
  playlistParser,
  qureyUrl,
  setElementText
} from '../utils'
import { IElement } from '../types/element'
import { IItems, IPlaylist } from '../types/playlist'
import { channelInfo, channelLabel, channelLogo, menuItem } from '../components'
import { player } from '../player'

import { REQUEST_INIT, TV_DOMAIN } from '../datas/constants'
import { menuHandle } from './listeners'
import { ILanguageAndCountry } from '../datas/categories'

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
  player(item)
  setElementText('#channel-message', item)
}

export function randomPlay(item: IItems<string>[]) {
  const index = Math.ceil(Math.random() * item.length)
  const qyUrl = qureyUrl(item[index].url)
  if (qyUrl) {
    player(item[index])
    setElementText('#channel-message', item[index])
  } else {
    setElementText('#channel-message', { name: 'no channel' })
  }
}

export function generateMenu(
  lang: ILanguageAndCountry,
  country: ILanguageAndCountry,
  categories: string[]
) {
  for (const key in lang)
    generateCategories([key, lang[key], 'languages'], 'language')

  for (const key in country)
    generateCategories([key, country[key], 'countries'], 'country')

  categories.forEach(category => generateCategories(category, 'category'))
}

function generateCategories(category: string | object, tab = 'category') {
  //  console.log(category);

  const _tab =
    tab === 'language'
      ? '#tab-language'
      : tab === 'country'
      ? '#tab-country'
      : '#tab-category'
  const label = typeof category === 'string' ? category : category[0]
  const e = document.querySelector(_tab) as HTMLElement

  menuItem.innerHtml = label

  const btn = generateNodes([menuItem], e) as HTMLElement

  btn.addEventListener(
    'click',
    debounce(menuEventHandle.bind({}, category), 200)
  )
}

export let playlist: IPlaylist<string> = null

function menuEventHandle() {
  const _category = arguments[0]
  let shimsUrl: string
  if (typeof _category === 'string')
    shimsUrl = `categories/${_category.toLowerCase()}`
  else shimsUrl = `${_category[2]}/${_category[1]}`

  console.log(shimsUrl)
  fetch(`${TV_DOMAIN}${shimsUrl}.m3u`, REQUEST_INIT)
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

export function generateItems(length = 88) {
  const l = playlist.items.length > length ? length : playlist.items.length
  console.log(`${playlist.items.length} channel`)
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
  return (document.querySelector('#channel-list')!.innerHTML += 'More ...')
}
