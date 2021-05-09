import { IElement } from '../types/element'
import { bars } from './menu'


const randomButton: IElement = {
  tagName: 'button',
  id: 'random-button',
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
  id: 'channel-message',
  classList:
    ' col-span-6 row-span-1 justify-self-center' +
    ' text-2xl text-blue-900 font-bold cursor-wait'
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
  classList: 'outline-none'
}

const videoWrap: IElement = {
  tagName: 'div',
  id: 'video-wrap',
  classList:
    ' top-0 bg-gray-800 rounded-b-3xl z-10 sticky' + //sticky
    ' grid justify-items-center',
  subelement: [videoElement, navigate]
}

const channels: IElement = {
  tagName: 'div',
  id: 'channel-list',
  attribute: { disabled: '' }, // disabled: '',
  classList:
    ' h-max filter ' +
    ' grid grid-cols-1 gap-1' +
    ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
}

const playerWrap: IElement = {
  tagName: 'div',
  subelement: [videoWrap, channels]
}

export const rootNode: IElement = {
  tagName: 'div',
  classList: ' font-mono ',
  subelement: [playerWrap]
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
    ' h-14 w-auto p-2 rounded-md' +
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

export const menuItem: IElement = {
  tagName: 'button',
  classList:
    ' m-2 px-3 py-1 text-blue-900 text-md font-semibold' +
    ' rounded-full shadow-md antialiased  cursor-pointer' +
    ' border border-indigo-50' +
    ' hover:bg-gray-100 focus:outline-none'
}
