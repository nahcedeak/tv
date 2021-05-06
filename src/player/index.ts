import { Hls } from './hls'

const config = {
  autoStartLoad: true,
  startPosition: -1,
  debug: false,
  initialLiveManifestSize: 1,
  maxBufferLength: 6,
  maxMaxBufferLength: 6,
  backBufferLength: 30,
  maxBufferSize: 60 * 1000,
  maxBufferHole: 0.5
}
export function player(url: string, name: string) {
  const video = document.querySelector('video') as HTMLVideoElement

  video.volume = 0.5
  const hls = new Hls(config)
  hls.attachMedia(video)
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.loadSource(url)
  })


  hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
     console.log(hls.levels)

    var highestLevel = data.levels.length - 1;
    hls.loadLevel = highestLevel;

    var playPromise = video.play()
    if (playPromise) {
      playPromise.catch(function (error) {
        console.log(
          '[test] > video.play() failed with error: ' +
            error.name +
            ' 💣 ' +
            error.message
        )
        if (error.name === 'NotAllowedError') {
          console.log('[test] > Attempting to play with video muted')
          video.muted = true
          return video.play()
        }
      })
    }

    localStorage.setItem('preName', name)
    localStorage.setItem('preUrl', url)
  })

  hls.on(Hls.Events.ERROR, (event, data) => {
    if (data.fatal) {
      // data.fatal && hls.recoverMediaError()
      data.type === Hls.ErrorTypes.NETWORK_ERROR && hls.startLoad()
    }
  })
}

export function prePlay() {
  const preUrl = localStorage.getItem('preUrl')
  const preName = localStorage.getItem('preName')
  player(preUrl, preName)
}

var isFullScreen = function () {
  return !!document.fullscreenElement
}
