import { IElement } from '../types/element'
import { tab } from './tab'

const menuPop: IElement = {
  tagName: 'div',
  id: 'menu-pop',
  attribute: {
    role: 'menu',
    'aria-orientation': 'vertical',
    'aria-labelledby': 'menu-button',
    tabindex: '-1'
  },
  classList:
    ' w-auto h-auto z-10 mx-8 p-2 mt-2 right-0 bg-white hidden' +
    ' origin-top-right absolute  rounded-md shadow-2xl' +
    ' border border-indigo-50' +
    ' focus:outline-none',
  subelement: [tab]
}

const menuButton: IElement = {
  tagName: 'button',
  id: 'menu-button',
  attribute: { 'aria-expanded': 'true', 'aria-haspopup': 'true' },
  classList:
    ' w-10 h-10 mt-1 text-blue-900' +
    ' col-span-1 row-span-1 rounded-full ' +
    ' justify-self-center items-center' +
    ' focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [
    { tagName: 'i', classList: 'fad fa-bars text-2xl w-full h-full' },
    { tagName: 'i', classList: 'fad fa-times text-2xl w-full h-full hidden' }
  ]
}

export const bars: IElement = {
  tagName: 'div',
  id: 'bars',
  classList: 'col-span-2 row-span-1 justify-self-start',
  subelement: [menuButton, menuPop]
}
