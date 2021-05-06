import { IElement } from '../types/element'

const randomButton: IElement = {
  id: 'randomBtn',
  tagName: 'button',
  classList:
    ' w-10 h-10 text-blue-900 ' +
    ' col-span-1 row-span-1' +
    ' justify-self-center' +
    ' focus:text-blue-500 focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [{ tagName: 'i', classList: 'fad fa-random text-2xl' }]
}

const barsButton: IElement = {
  id: 'barsomBtn',
  tagName: 'button',
  classList:
    ' w-10 h-10 text-blue-900 ' +
    ' col-span-1 row-span-1' +
    ' justify-self-center' +
    ' focus:text-blue-500 focus:outline-none' +
    ' hover:text-blue-500',
  subelement: [{ tagName: 'i', classList: 'fad fa-bars text-2xl' }]
}

const channelMessage: IElement = {
  tagName: 'div',
  id: 'channelMessage',
  classList:
    ' col-span-8 row-span-1 justify-self-center' + 
    ' text-2xl text-blue-900 font-bold'
}

const navigate: IElement = {
  tagName: 'figure',
  id: 'nav',
  attribute: {},
  classList:
    ' w-full rounded-b-2xl' +
    ' grid grid-rows-1 grid-cols-10' +
    ' bg-gradient-to-r from-indigo-100 via-purple-50 to-indigo-100',
  subelement: [
    randomButton,
    channelMessage,
    barsButton
  ]
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
    ' my-2' +
    ' grid grid-cols-1 gap-1' +
    ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
}

const playerWarp: IElement = {
  tagName: 'div',
  subelement: [videoWarp, channels]
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
