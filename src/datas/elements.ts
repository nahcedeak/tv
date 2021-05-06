import { IElement } from '../types/element'

const randomButton: IElement = {
  id: 'randomBtn',
  tagName: 'button',
  classList:
    ' w-10 h-10 text-blue-900' +
    ' flex items-center justify-center' +
    ' ' +
    ' focus:text-blue-500 focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [{ tagName: 'i', classList: 'fad fa-random text-2xl' }]
}

const navigate: IElement = {
  tagName: 'figure',
  id: 'nav',
  attribute: {},
  classList:
    ' px-4 py-2 w-full rounded-b-2xl flex' +
    ' bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100',
  subelement: [randomButton]
}

const videoElement: IElement = {
  tagName: 'video',
  attribute: {
    controls: 'controls',
    crossOrigin: 'anonymous',
    preload: 'metadata'
  },
  classList: 'outline-none',
  subelement: [
    {
      tagName: 'track',
      attribute: {
        label: 'English',
        kind: 'subtitles',
        srclong: 'en',
        src: '/en.vtt',
        default: 'default'
      }
    }
  ]
}

const videoWarp: IElement = {
  tagName: 'div',
  classList:
    ' top-0 bg-gray-800 rounded-b-3xl z-40 sticky' +
    ' grid justify-items-center',
  subelement: [videoElement, navigate]
}

const channels: IElement = {
  id: 'channel-list',
  tagName: 'div',
  classList:
    ' grid grid-cols-1 gap-1 my-2' +
    ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
}

const playerWarp: IElement = {
  tagName: 'div',
  subelement: [videoWarp, channels]
}

const menuButton: IElement = {
  tagName: 'button',
  id: 'channelsMenu',
  classList:
    'fixed z-40 bottom-7 right-8 w-10 h-10 rounded-full bg-gray-100 text-purple-700 block focus:outline-none ring-4 ring-purple-700 ring-opacity-70  hover:bg-purple-200',
  subelement: [{ tagName: 'i', classList: 'fad fa-bars' }]
}

export const rootNode: IElement = {
  tagName: 'div',
  classList:
    ' bg-white font-mono w-screen h-screen shadow-xl mx-auto' +
    ' rounded-b-3xl overflow-auto',
  subelement: [playerWarp]
}

export const channelLabel: IElement = {
  tagName: 'label',
  classList: 'text-blue-900 truncate cursor-pointer' + ' col-span-3 row-span-1 '
}

export const channelLogo: IElement = {
  tagName: 'img',
  attribute: {},
  classList:
    ' h-14 w-auto ' +
    ' col-span-3 row-span-2 object-fill justify-self-center' +
    ' text-gray-400 text-sm italic'
}

const icon: IElement = {
  tagName: 'div',
  classList: ' text-blue-900 text-4xl' + ' col-span-1 row-span-1 ',
  subelement: [{ tagName: 'i', classList: 'fad fa-play-circle' }]
}

export const channelInfo: IElement = {
  tagName: 'button',
  classList:
    ' m-1 h-24 p-1 bg-white shadow-md subpixel-antialiased' +
    ' font-bold antialiased text-bule-500 text-xl' +
    ' rounded-md appearance-none border border-indigo-50 ' +
    ' grid grid-rows-3 grid-cols-4' +
    ' focus:text-purple-700 focus:outline-none' +
    ' hover:text-purple-700 hover:shadow-md hover:scale-105' +
    ' transform ',
  subelement: [channelLabel, channelLogo, icon]
}
