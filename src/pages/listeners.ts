import { IItems } from '../types/playlist'
import { randomPlay } from './make'

export function addElementEventListeners(channels: IItems<string>[]) {
  document.querySelector('#randomBtn')?.addEventListener('click', () => {
    randomPlay(channels)
  })
}
