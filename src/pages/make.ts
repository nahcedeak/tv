import { debounce, deDupsClasslist, qureyUrl, setElementText } from '../utils'
import { IElement } from '../types/element'
import { IItems } from '../types/playlist'
import { channelInfo, channelLabel, channelLogo } from '../datas/elements'
import { player } from '../player'

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

export function generateButtons(item: IItems<string>) {
  const channelList = document.querySelector('#channel-list') as HTMLDivElement
  channelLabel.innerHtml = item.name
  channelLogo.attribute['alt'] = item.name
  channelLogo.attribute['src'] = item.tvg.logo

  const btn = generateNodes([channelInfo], channelList) as HTMLElement

  btn.addEventListener('click', debounce(play).bind({}, item))
}

function play() {
  const item = arguments[0]
  player(item.url, item.name)
  setElementText('#channelMessage',item.name)
}

export function randomPlay(item: IItems<string>[]) {
  const index = Math.ceil(Math.random() * item.length)
  const qyUrl = qureyUrl(item[index].url)
  if (qyUrl) {
    player(item[index].url, item[index].name)
    setElementText('#channelMessage',item[index].name)
  } else {
    console.log('no connection')
  }
}


