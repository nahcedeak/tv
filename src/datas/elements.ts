import { IElement } from '../types/element'

const randomButton: IElement = {
  tagName: 'button',
  id: 'randomBtn',
  classList:
    ' w-10 h-10 text-blue-900' +
    ' col-span-2 row-span-1 rounded-full' +
    ' justify-self-end items-center' +
    ' focus:text-blue-500 focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [{ tagName: 'i', classList: 'fad fa-random text-2xl' }]
}

const channelMessage: IElement = {
  tagName: 'div',
  id: 'channelMessage',
  classList:
    ' col-span-6 row-span-1 justify-self-center' +
    ' text-2xl text-blue-900 font-bold'
}

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
    ' focus:outline-none'
}

const menuButton: IElement = {
  tagName: 'button',
  id: 'menu-button',
  attribute: { 'aria-expanded': 'true', 'aria-haspopup': 'true' },
  classList:
    ' w-10 h-10 mt-1 bg-red-50 text-blue-900' +
    ' col-span-1 row-span-1 rounded-full ' +
    ' justify-self-center items-center' +
    ' focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [
    { tagName: 'i', classList: 'fad fa-bars text-2xl w-full h-full' },
    { tagName: 'i', classList: 'fad fa-times text-2xl w-full h-full hidden' }
  ]
}

const bars: IElement = {
  tagName: 'div',
  id: 'bars',
  classList: 'col-span-2 row-span-1 justify-self-start',
  subelement: [menuButton, menuPop]
}

const navigate: IElement = {
  tagName: 'figure',
  id: 'nav',
  attribute: {},
  classList:
    ' w-full rounded-b-2xl' +
    ' grid grid-rows-1 grid-cols-10 items-center' +
    ' bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100',
  subelement: [randomButton, channelMessage, bars]
}

const videoElement: IElement = {
  tagName: 'video',
  attribute: {
    controls: 'controls',
    crossOrigin: 'anonymous',
    preload: 'metadata'
  },
  classList: 'outline-none',
}

const videoWarp: IElement = {
  tagName: 'div',
  classList:
    ' top-0 bg-gray-800 rounded-b-3xl z-40 sticky' + //sticky
    ' grid justify-items-center',
  subelement: [videoElement, navigate]
}

const channels: IElement = {
  tagName: 'div',
  id: 'channel-list',
  attribute: { disabled: ''}, // disabled: '',
  classList:
    ' h-max filter' +
    ' grid grid-cols-1 gap-1' +
    ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
}

const playerWarp: IElement = {
  tagName: 'div',
  subelement: [videoWarp, channels]
}

export const rootNode: IElement = {
  tagName: 'div',
  classList: ' font-mono ',
  subelement: [playerWarp]
}

export const channelLabel: IElement = {
  tagName: 'label',
  classList:
    ' w-full px-4 text-blue-900 truncate cursor-pointer' +
    ' col-span-5 row-span-1 text-center'
}

export const channelLogo: IElement = {
  tagName: 'img',
  attribute: {},
  classList:
    ' h-14 w-auto shadow-sm p-2' +
    ' col-span-4 row-span-2 object-fill justify-self-center' +
    ' text-gray-400 text-sm italic'
}

const icon: IElement = {
  tagName: 'i',
  classList: 'fad fa-play-circle text-4xl text-blue-900  '
}

export const channelInfo: IElement = {
  tagName: 'div',
  classList:
    ' mx-3 my-2 h-24 bg-white shadow-lg cursor-pointer' +
    ' font-bold antialiased text-bule-500 text-xl' +
    ' rounded-md appearance-none border border-indigo-50' +
    ' grid grid-rows-3 grid-cols-5' +
    ' focus:text-purple-700 focus:outline-none' +
    ' hover:text-purple-700 hover:shadow-lg' +
    ' transform hover:scale-105',
  subelement: [channelLabel, channelLogo, icon]
}

export const menuItem:IElement ={
  tagName: 'div',
  classList:'m-2 cursor-pointer inline-block'
}