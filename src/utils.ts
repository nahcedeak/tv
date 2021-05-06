import { TV_DOMAIN } from './datas/constants'
import { IPlaylist } from './types/playlist'

const SPACE_RE = /\s+/g
const MEDIE_URL_RE = /^https?:\/\/(.*?)\.m3u8?$/
const PATH_RE = /^([a-zA-Z]+)[^a-zA-Z]+([a-zA-Z]+)$/

export function deDupsClasslist(classlist: string): string[] {
  const list = new Set<string>()
  classlist
    .trim()
    .split(SPACE_RE)
    .forEach(c => list.add(c))
  return [...list]
}


export function qureyUrl(url: string): string | null {
  if (MEDIE_URL_RE.test(url)) {
    return url.indexOf('https') > -1 ? url : url.replace('http', 'https')
  }
  return null
}

export function qureyPath(categories:string) {
  const filter = (arr: string[]) => arr.filter(key => key.trim() !== '')
  const p = filter(categories.split(PATH_RE))
  return `${TV_DOMAIN}/`
}

export function getRandomCode() {
  const encode = '%u0000'
  const char = Math.ceil(Math.random() * (40959 - 2048 + 1) + 2048).toString(16)
  return unescape(encode.substring(0, encode.length - char.length) + char)
}

/**
 * https://github.com/freearhey/iptv-playlist-parser
 */
export function playlistParser(content: string): IPlaylist<string> {
  let playlist: IPlaylist<string> = {
    header: {},
    items: []
  }

  let manifest = content.split(/(?=#EXTINF)/).map(line => line.trim())

  const firstLine = manifest.shift()
  // console.log(manifest)
  if (!firstLine || !/#EXTM3U/.test(firstLine))
    throw new Error('Playlist is not valid')

  playlist.header = parseHeader(firstLine)

  for (let line of manifest) {
    const item = {
      name: getName(line),
      tvg: {
        id: getAttribute(line, 'tvg-id'),
        name: getAttribute(line, 'tvg-name'),
        language: getAttribute(line, 'tvg-language'),
        country: getAttribute(line, 'tvg-country'),
        logo: getAttribute(line, 'tvg-logo'),
        url: getAttribute(line, 'tvg-url'),
        rec: getAttribute(line, 'tvg-rec')
      },
      group: {
        title: getGroup(line) || getAttribute(line, 'group-title')
      },
      http: {
        referrer: getVlcOption(line, 'http-referrer'),
        'user-agent': getVlcOption(line, 'http-user-agent')
      },
      url: getURL(line),
      raw: line
    }

    playlist.items!.push(item)
  }

  return playlist
}

function parseHeader(line: string) {
  const supportedAttrs = ['x-tvg-url']

  let attrs: { [key: string]: string } = {}
  for (let attrName of supportedAttrs) {
    const tvgUrl: string = getAttribute(line, attrName)
    if (tvgUrl) {
      attrs['x-tvg-url'] = tvgUrl
    }
  }

  return {
    attrs,
    raw: line
  }
}
function getAttribute(line: string, name: string) {
  let regex = new RegExp(name + '="(.*?)"', 'gi')
  let match: RegExpExecArray = regex.exec(line)!

  return match && match[1] ? match[1] : ''
}

function getName(line: string) {
  let name = line
    .split(/[\r\n]+/)
    .shift()!
    .split(',')
    .pop()

  return name || ''
}

function getVlcOption(line: string, name: string) {
  let regex = new RegExp('#EXTVLCOPT:' + name + '=(.*)', 'gi')
  let match = regex.exec(line)

  return match && match[1] && typeof match[1] === 'string'
    ? match[1].replace(/\"/g, '')
    : ''
}

function getGroup(line: string) {
  let regex = new RegExp('#EXTGRP:(.*)', 'gi')
  let match = regex.exec(line)

  return match && match[1] ? match[1] : ''
}

function getURL(line: string) {
  const supportedTags = ['#EXTVLCOPT', '#EXTINF', '#EXTGRP']
  const last = line
    .split('\n')
    .filter(l => l)
    .map(l => l.trim())
    .filter(l => {
      return supportedTags.every(t => !l.startsWith(t))
    })
    .shift()

  return last || ''
}

export function hasValue(value: any, searchString: string) {
  let has = false
  if (Object.prototype.toString.call(value) === '[object Array]') {
    for (const key in value) {
      if (value[key].toLocaleLowerCase() === searchString) return (has = true)
    }
  } else {
    Object.keys(value).forEach(k => {
      if (value[k] === searchString) return (has = true)
    })
  }

  return has
}

export function getMystical() {
  let mystical: string = ''
  for (let i = 0; i < 3; i++) {
    console.log(mystical)
    mystical += String.fromCharCode(120)
  }
  return mystical
}

export function setElementText(selectors: string,text = '') {
  const element = document.querySelector(selectors)
  element.innerHTML = text
}

export function debounce(fn: EventListener,delay = 888) {
  let timer: any
  return function () {
    const context = this
    const args = arguments
    
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context,args)
    }, delay)
  }
}


