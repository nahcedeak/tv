import { IItems } from '../types/playlist'
import { debounce } from '../utils'
import { playlist, randomPlay } from './make'
import { generateItems } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {
  document.addEventListener('wheel', debounce(scrollEventHandle, 500))

  document.addEventListener('scroll', debounce(scrollEventHandle, 500))

  document
    .querySelector('#randomBtn')
    .addEventListener('click', () => randomPlay(channels))

  document.querySelector('#menu-button').addEventListener('click', menuHandle)
}

function scrollEventHandle(e?: Event) {
  if (isBottom()) alert('bottom')
  if (isBottom() && playlist) generateItems(20)
}

export function menuHandle(e?: Event) {
  const channelList = document.querySelector(
    '#channel-list'
  ) as HTMLButtonElement
  channelList.classList.toggle('blur-sm')

  document.querySelector('#menu-pop').classList.toggle('hidden')
  document
    .querySelectorAll('#menu-button>svg')
    .forEach(i => i.classList.toggle('hidden'))
}

function isBottom() {
  // const docScrollTop = document.documentElement.scrollTop
  // const docClientHeight = document.documentElement.clientHeight
  // const docScrollHeight = document.documentElement.scrollHeight

  return getScrollTop() + getWindowHeight() === getScrollHeight() ? true : false
}


function getScrollTop(){
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;
  }
  //文档的总高度
  function getScrollHeight(){
  　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
  }
  function getWindowHeight(){
  　　var windowHeight = 0;
  　　if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　}else{
  　　　　windowHeight = document.body.clientHeight;
  　　}
  　　return windowHeight;
  }