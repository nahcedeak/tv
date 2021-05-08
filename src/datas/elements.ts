import { IElement } from '../types/element'

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
  classList: 'outline-none'
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
  attribute: { disabled: '' }, // disabled: '',
  classList:
    ' h-max filter' +
    ' grid grid-cols-1 gap-1' +
    ' sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
    innerHtml:`<!-- This example requires Tailwind CSS v2.0+ -->
    <div class="relative inline-block text-left z-50">
      <div>
        <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
          Options
          <!-- Heroicon name: solid/chevron-down -->
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    
      <!--
        Dropdown menu, show/hide based on menu state.
    
        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      -->
      <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Duplicate</a>
        </div>
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Archive</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Move</a>
        </div>
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</a>
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</a>
        </div>
        <div class="py-1" role="none">
          <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</a>
        </div>
      </div>
    </div>
    `
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

export const menuItem: IElement = {
  tagName: 'div',
  classList:
    ' m-1 px-4 py-1 font-bold  text-xl text-blue-900 ' +
    ' rounded-full shadow-md antialiased  cursor-pointer' +
    ' inline-block border border-indigo-50' +
    ' hover:bg-gray-100'
}
