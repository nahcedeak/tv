import { IItems } from '../types/playlist'
import { randomPlay } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {

  const randomBtn = document.querySelector('#randomBtn')!
  randomBtn.addEventListener('click', () => {
    randomPlay(channels)
  })
  // @ts-ignore
  document.querySelector('#nav')!.ondblclick=()=>{
    console.log('db')
  }
}
