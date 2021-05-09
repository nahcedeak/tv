import { IItems } from '../types/playlist'
import { setElementText } from '../utils'
import { Hls } from './hls'

const config = {
  autoStartLoad: true,
  startPosition: -1,
  debug: false,
  initialLiveManifestSize: 1,
  maxBufferLength: 6,
  maxMaxBufferLength: 6,
  backBufferLength: 30,
  maxBufferSize: 30 * 1000,
  maxBufferHole: 0.5
}
export function player(item: IItems<string>) {
  const video = document.querySelector('video') as HTMLVideoElement

  video.volume = 0.5
  const hls = new Hls(config)
  hls.attachMedia(video)
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.loadSource(item.url) //https://12156.vod.adultiptv.net/ph5adecf7111738/play.m3u8
  })

  hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    console.log(hls.levels)
    if (hls.levels.length > 1) {
      hls.loadSource(hls.levels[hls.levels.length - 1].url[0])
    }

    var highestLevel = data.levels.length - 1
    hls.loadLevel = highestLevel

    var playPromise = video.play()
    if (playPromise) {
      playPromise.catch(function (error) {
        console.log(
          ' > video.play() failed with error: [ ' +
            error.name +
            ' ] 💣 🗡 ' +
            error.message
        )
        if (error.name === 'NotAllowedError') {
          console.log('[test] > Attempting to play with video muted')
          video.muted = true
          return video.play()
        }
      })
    }

    localStorage.setItem('previous', JSON.stringify(item))
  })

  hls.on(Hls.Events.ERROR, (event, data) => {
    if (data.fatal) {
      // data.fatal && hls.recoverMediaError()
      data.type === Hls.ErrorTypes.NETWORK_ERROR && hls.startLoad()
    }
  })
}

export function prePlay() {
  const previous = JSON.parse(localStorage.getItem('previous'))
  if (previous) {
    player(previous)
    setElementText('#channel-message', previous)
  }
}

var isFullScreen = function () {
  return !!document.fullscreenElement
}
