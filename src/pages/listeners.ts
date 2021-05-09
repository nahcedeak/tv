import { IItems } from '../types/playlist'
import { debounce, setElementText } from '../utils'
import { playlist, randomPlay } from './make'
import { generateItems } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {
  document.addEventListener('wheel', debounce(scrollEventHandle, 200))

  document.addEventListener('scroll', debounce(scrollEventHandle, 200))

  document
    .querySelector('#random-button')
    .addEventListener('click', () => randomPlay(channels))

  document
    .querySelector('#menu-button')
    .addEventListener('click', debounce(menuHandle, 50))
}

function scrollEventHandle(e?: Event) {
  // setElementText('#channel-message',navigator.userAgent)
  if (/Mobile/i.test(navigator.userAgent)) {
    generateItems(20)
  }else if (isBottom() && playlist) {
    generateItems(20)
  }
}

export function menuHandle(e?: Event) {
  const channelList = document.querySelector(
    '#channel-list'
  ) as HTMLButtonElement
  channelList.classList.toggle('blur-sm')

  document.querySelector('#video-wrap').classList.toggle('sticky')
  document.querySelector('#menu-pop').classList.toggle('hidden')
  document
    .querySelectorAll('#menu-button>svg')
    .forEach(i => i.classList.toggle('hidden'))
}

function isBottom() {
  const docScrollTop = document.documentElement.scrollTop
  const docClientHeight = document.documentElement.clientHeight
  const docScrollHeight = document.documentElement.scrollHeight

  // setElementText(
  //   '#channel-message',
  //   (docScrollTop + docClientHeight - docScrollHeight).toString()
  // )

  return docScrollTop + docClientHeight === docScrollHeight ? true : false
}

function testScroll() {
  console.log(
    `
    doc body clientWidth [ ${document.body.clientWidth} ]
    doc body clientHeight [ ${document.body.clientHeight} ]
    doc body offsetWidth [ ${document.body.offsetWidth} ]
    doc body offsetHeight [ ${document.body.offsetHeight} ]
    doc body scrollWidth [ ${document.body.scrollWidth} ]
    doc body scrollHeight [ ${document.body.scrollHeight} ]
    doc body scrollTop [ ${document.body.scrollTop} ]
    doc body scrollLeft [ ${document.body.scrollLeft} ]
    win screenTop [ ${window.screenTop} ] 
    win screenLeft [ ${window.screenLeft} ] 
    win screen.height [ ${window.screen.height} ]
    win screen.width [ ${window.screen.width} ]
    win screen.availHeight [ ${window.screen.availHeight} ]
    win screen.availWidth [ ${window.screen.availWidth} ]
    doc ele scrollTop [ ${document.documentElement.scrollTop} ]
    doc ele clientHeight [ ${document.documentElement.clientHeight} ]
    doc ele scrollHeight [ ${document.documentElement.scrollHeight} ]
    `
  )
}
