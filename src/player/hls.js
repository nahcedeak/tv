var __create = Object.create
var __defProp = Object.defineProperty
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __getOwnPropNames = Object.getOwnPropertyNames
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __markAsModule = target => __defProp(target, '__esModule', { value: true })
var __commonJS = (cb, mod) => () => (
  mod || cb((mod = { exports: {} }).exports, mod), mod.exports
)
var __reExport = (target, module, desc) => {
  if ((module && typeof module === 'object') || typeof module === 'function') {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== 'default')
        __defProp(target, key, {
          get: () => module[key],
          enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
        })
  }
  return target
}
var __toModule = module => {
  return __reExport(
    __markAsModule(
      __defProp(
        module != null ? __create(__getProtoOf(module)) : {},
        'default',
        module && module.__esModule && 'default' in module
          ? { get: () => module.default, enumerable: true }
          : { value: module, enumerable: true }
      )
    ),
    module
  )
}

// node_modules/url-toolkit/src/url-toolkit.js
var require_url_toolkit = __commonJS((exports, module) => {
  ;(function (root) {
    var URL_REGEX = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#.*)?$/
    var FIRST_SEGMENT_REGEX = /^([^\/?#]*)(.*)$/
    var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g
    var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g
    var URLToolkit3 = {
      buildAbsoluteURL: function (baseURL, relativeURL, opts) {
        opts = opts || {}
        baseURL = baseURL.trim()
        relativeURL = relativeURL.trim()
        if (!relativeURL) {
          if (!opts.alwaysNormalize) {
            return baseURL
          }
          var basePartsForNormalise = URLToolkit3.parseURL(baseURL)
          if (!basePartsForNormalise) {
            throw new Error('Error trying to parse base URL.')
          }
          basePartsForNormalise.path = URLToolkit3.normalizePath(
            basePartsForNormalise.path
          )
          return URLToolkit3.buildURLFromParts(basePartsForNormalise)
        }
        var relativeParts = URLToolkit3.parseURL(relativeURL)
        if (!relativeParts) {
          throw new Error('Error trying to parse relative URL.')
        }
        if (relativeParts.scheme) {
          if (!opts.alwaysNormalize) {
            return relativeURL
          }
          relativeParts.path = URLToolkit3.normalizePath(relativeParts.path)
          return URLToolkit3.buildURLFromParts(relativeParts)
        }
        var baseParts = URLToolkit3.parseURL(baseURL)
        if (!baseParts) {
          throw new Error('Error trying to parse base URL.')
        }
        if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
          var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path)
          baseParts.netLoc = pathParts[1]
          baseParts.path = pathParts[2]
        }
        if (baseParts.netLoc && !baseParts.path) {
          baseParts.path = '/'
        }
        var builtParts = {
          scheme: baseParts.scheme,
          netLoc: relativeParts.netLoc,
          path: null,
          params: relativeParts.params,
          query: relativeParts.query,
          fragment: relativeParts.fragment
        }
        if (!relativeParts.netLoc) {
          builtParts.netLoc = baseParts.netLoc
          if (relativeParts.path[0] !== '/') {
            if (!relativeParts.path) {
              builtParts.path = baseParts.path
              if (!relativeParts.params) {
                builtParts.params = baseParts.params
                if (!relativeParts.query) {
                  builtParts.query = baseParts.query
                }
              }
            } else {
              var baseURLPath = baseParts.path
              var newPath =
                baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
                relativeParts.path
              builtParts.path = URLToolkit3.normalizePath(newPath)
            }
          }
        }
        if (builtParts.path === null) {
          builtParts.path = opts.alwaysNormalize
            ? URLToolkit3.normalizePath(relativeParts.path)
            : relativeParts.path
        }
        return URLToolkit3.buildURLFromParts(builtParts)
      },
      parseURL: function (url) {
        var parts = URL_REGEX.exec(url)
        if (!parts) {
          return null
        }
        return {
          scheme: parts[1] || '',
          netLoc: parts[2] || '',
          path: parts[3] || '',
          params: parts[4] || '',
          query: parts[5] || '',
          fragment: parts[6] || ''
        }
      },
      normalizePath: function (path) {
        path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '')
        while (
          path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length
        ) {}
        return path.split('').reverse().join('')
      },
      buildURLFromParts: function (parts) {
        return (
          parts.scheme +
          parts.netLoc +
          parts.path +
          parts.params +
          parts.query +
          parts.fragment
        )
      }
    }
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = URLToolkit3
    else if (typeof define === 'function' && define.amd)
      define([], function () {
        return URLToolkit3
      })
    else if (typeof exports === 'object') exports['URLToolkit'] = URLToolkit3
    else root['URLToolkit'] = URLToolkit3
  })(exports)
})

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  'use strict'
  var has = Object.prototype.hasOwnProperty
  var prefix = '~'
  function Events2() {}
  if (Object.create) {
    Events2.prototype = Object.create(null)
    if (!new Events2().__proto__) prefix = false
  }
  function EE(fn, context, once) {
    this.fn = fn
    this.context = context
    this.once = once || false
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function')
    }
    var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event
    if (!emitter._events[evt])
      (emitter._events[evt] = listener), emitter._eventsCount++
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener)
    else emitter._events[evt] = [emitter._events[evt], listener]
    return emitter
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events2()
    else delete emitter._events[evt]
  }
  function EventEmitter3() {
    this._events = new Events2()
    this._eventsCount = 0
  }
  EventEmitter3.prototype.eventNames = function eventNames() {
    var names = [],
      events,
      name
    if (this._eventsCount === 0) return names
    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name)
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events))
    }
    return names
  }
  EventEmitter3.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event,
      handlers = this._events[evt]
    if (!handlers) return []
    if (handlers.fn) return [handlers.fn]
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn
    }
    return ee
  }
  EventEmitter3.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event,
      listeners = this._events[evt]
    if (!listeners) return 0
    if (listeners.fn) return 1
    return listeners.length
  }
  EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return false
    var listeners = this._events[evt],
      len = arguments.length,
      args,
      i
    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, void 0, true)
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true
        case 2:
          return listeners.fn.call(listeners.context, a1), true
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i]
      }
      listeners.fn.apply(listeners.context, args)
    } else {
      var length = listeners.length,
        j
      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true)
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context)
            break
          case 2:
            listeners[i].fn.call(listeners[i].context, a1)
            break
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2)
            break
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3)
            break
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j]
              }
            listeners[i].fn.apply(listeners[i].context, args)
        }
      }
    }
    return true
  }
  EventEmitter3.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false)
  }
  EventEmitter3.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true)
  }
  EventEmitter3.prototype.removeListener = function removeListener(
    event,
    fn,
    context,
    once
  ) {
    var evt = prefix ? prefix + event : event
    if (!this._events[evt]) return this
    if (!fn) {
      clearEvent(this, evt)
      return this
    }
    var listeners = this._events[evt]
    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        clearEvent(this, evt)
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i])
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events
      else clearEvent(this, evt)
    }
    return this
  }
  EventEmitter3.prototype.removeAllListeners = function removeAllListeners(
    event
  ) {
    var evt
    if (event) {
      evt = prefix ? prefix + event : event
      if (this._events[evt]) clearEvent(this, evt)
    } else {
      this._events = new Events2()
      this._eventsCount = 0
    }
    return this
  }
  EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener
  EventEmitter3.prototype.addListener = EventEmitter3.prototype.on
  EventEmitter3.prefixed = prefix
  EventEmitter3.EventEmitter = EventEmitter3
  if (typeof module !== 'undefined') {
    module.exports = EventEmitter3
  }
})

// src/hls.ts
var URLToolkit2 = __toModule(require_url_toolkit())

// src/events.ts
var Events
;(function (Events2) {
  Events2['MEDIA_ATTACHING'] = 'hlsMediaAttaching'
  Events2['MEDIA_ATTACHED'] = 'hlsMediaAttached'
  Events2['MEDIA_DETACHING'] = 'hlsMediaDetaching'
  Events2['MEDIA_DETACHED'] = 'hlsMediaDetached'
  Events2['BUFFER_RESET'] = 'hlsBufferReset'
  Events2['BUFFER_CODECS'] = 'hlsBufferCodecs'
  Events2['BUFFER_CREATED'] = 'hlsBufferCreated'
  Events2['BUFFER_APPENDING'] = 'hlsBufferAppending'
  Events2['BUFFER_APPENDED'] = 'hlsBufferAppended'
  Events2['BUFFER_EOS'] = 'hlsBufferEos'
  Events2['BUFFER_FLUSHING'] = 'hlsBufferFlushing'
  Events2['BUFFER_FLUSHED'] = 'hlsBufferFlushed'
  Events2['MANIFEST_LOADING'] = 'hlsManifestLoading'
  Events2['MANIFEST_LOADED'] = 'hlsManifestLoaded'
  Events2['MANIFEST_PARSED'] = 'hlsManifestParsed'
  Events2['LEVEL_SWITCHING'] = 'hlsLevelSwitching'
  Events2['LEVEL_SWITCHED'] = 'hlsLevelSwitched'
  Events2['LEVEL_LOADING'] = 'hlsLevelLoading'
  Events2['LEVEL_LOADED'] = 'hlsLevelLoaded'
  Events2['LEVEL_UPDATED'] = 'hlsLevelUpdated'
  Events2['LEVEL_PTS_UPDATED'] = 'hlsLevelPtsUpdated'
  Events2['LEVELS_UPDATED'] = 'hlsLevelsUpdated'
  Events2['AUDIO_TRACKS_UPDATED'] = 'hlsAudioTracksUpdated'
  Events2['AUDIO_TRACK_SWITCHING'] = 'hlsAudioTrackSwitching'
  Events2['AUDIO_TRACK_SWITCHED'] = 'hlsAudioTrackSwitched'
  Events2['AUDIO_TRACK_LOADING'] = 'hlsAudioTrackLoading'
  Events2['AUDIO_TRACK_LOADED'] = 'hlsAudioTrackLoaded'
  Events2['SUBTITLE_TRACKS_UPDATED'] = 'hlsSubtitleTracksUpdated'
  Events2['SUBTITLE_TRACKS_CLEARED'] = 'hlsSubtitleTracksCleared'
  Events2['SUBTITLE_TRACK_SWITCH'] = 'hlsSubtitleTrackSwitch'
  Events2['SUBTITLE_TRACK_LOADING'] = 'hlsSubtitleTrackLoading'
  Events2['SUBTITLE_TRACK_LOADED'] = 'hlsSubtitleTrackLoaded'
  Events2['SUBTITLE_FRAG_PROCESSED'] = 'hlsSubtitleFragProcessed'
  Events2['CUES_PARSED'] = 'hlsCuesParsed'
  Events2['NON_NATIVE_TEXT_TRACKS_FOUND'] = 'hlsNonNativeTextTracksFound'
  Events2['INIT_PTS_FOUND'] = 'hlsInitPtsFound'
  Events2['FRAG_LOADING'] = 'hlsFragLoading'
  Events2['FRAG_LOAD_EMERGENCY_ABORTED'] = 'hlsFragLoadEmergencyAborted'
  Events2['FRAG_LOADED'] = 'hlsFragLoaded'
  Events2['FRAG_DECRYPTED'] = 'hlsFragDecrypted'
  Events2['FRAG_PARSING_INIT_SEGMENT'] = 'hlsFragParsingInitSegment'
  Events2['FRAG_PARSING_USERDATA'] = 'hlsFragParsingUserdata'
  Events2['FRAG_PARSING_METADATA'] = 'hlsFragParsingMetadata'
  Events2['FRAG_PARSED'] = 'hlsFragParsed'
  Events2['FRAG_BUFFERED'] = 'hlsFragBuffered'
  Events2['FRAG_CHANGED'] = 'hlsFragChanged'
  Events2['FPS_DROP'] = 'hlsFpsDrop'
  Events2['FPS_DROP_LEVEL_CAPPING'] = 'hlsFpsDropLevelCapping'
  Events2['ERROR'] = 'hlsError'
  Events2['DESTROYING'] = 'hlsDestroying'
  Events2['KEY_LOADING'] = 'hlsKeyLoading'
  Events2['KEY_LOADED'] = 'hlsKeyLoaded'
  Events2['LIVE_BACK_BUFFER_REACHED'] = 'hlsLiveBackBufferReached'
  Events2['BACK_BUFFER_REACHED'] = 'hlsBackBufferReached'
})(Events || (Events = {}))

// src/errors.ts
var ErrorTypes
;(function (ErrorTypes2) {
  ErrorTypes2['NETWORK_ERROR'] = 'networkError'
  ErrorTypes2['MEDIA_ERROR'] = 'mediaError'
  ErrorTypes2['KEY_SYSTEM_ERROR'] = 'keySystemError'
  ErrorTypes2['MUX_ERROR'] = 'muxError'
  ErrorTypes2['OTHER_ERROR'] = 'otherError'
})(ErrorTypes || (ErrorTypes = {}))
var ErrorDetails
;(function (ErrorDetails2) {
  ErrorDetails2['KEY_SYSTEM_NO_KEYS'] = 'keySystemNoKeys'
  ErrorDetails2['KEY_SYSTEM_NO_ACCESS'] = 'keySystemNoAccess'
  ErrorDetails2['KEY_SYSTEM_NO_SESSION'] = 'keySystemNoSession'
  ErrorDetails2['KEY_SYSTEM_LICENSE_REQUEST_FAILED'] =
    'keySystemLicenseRequestFailed'
  ErrorDetails2['KEY_SYSTEM_NO_INIT_DATA'] = 'keySystemNoInitData'
  ErrorDetails2['MANIFEST_LOAD_ERROR'] = 'manifestLoadError'
  ErrorDetails2['MANIFEST_LOAD_TIMEOUT'] = 'manifestLoadTimeOut'
  ErrorDetails2['MANIFEST_PARSING_ERROR'] = 'manifestParsingError'
  ErrorDetails2['MANIFEST_INCOMPATIBLE_CODECS_ERROR'] =
    'manifestIncompatibleCodecsError'
  ErrorDetails2['LEVEL_EMPTY_ERROR'] = 'levelEmptyError'
  ErrorDetails2['LEVEL_LOAD_ERROR'] = 'levelLoadError'
  ErrorDetails2['LEVEL_LOAD_TIMEOUT'] = 'levelLoadTimeOut'
  ErrorDetails2['LEVEL_SWITCH_ERROR'] = 'levelSwitchError'
  ErrorDetails2['AUDIO_TRACK_LOAD_ERROR'] = 'audioTrackLoadError'
  ErrorDetails2['AUDIO_TRACK_LOAD_TIMEOUT'] = 'audioTrackLoadTimeOut'
  ErrorDetails2['SUBTITLE_LOAD_ERROR'] = 'subtitleTrackLoadError'
  ErrorDetails2['SUBTITLE_TRACK_LOAD_TIMEOUT'] = 'subtitleTrackLoadTimeOut'
  ErrorDetails2['FRAG_LOAD_ERROR'] = 'fragLoadError'
  ErrorDetails2['FRAG_LOAD_TIMEOUT'] = 'fragLoadTimeOut'
  ErrorDetails2['FRAG_DECRYPT_ERROR'] = 'fragDecryptError'
  ErrorDetails2['FRAG_PARSING_ERROR'] = 'fragParsingError'
  ErrorDetails2['REMUX_ALLOC_ERROR'] = 'remuxAllocError'
  ErrorDetails2['KEY_LOAD_ERROR'] = 'keyLoadError'
  ErrorDetails2['KEY_LOAD_TIMEOUT'] = 'keyLoadTimeOut'
  ErrorDetails2['BUFFER_ADD_CODEC_ERROR'] = 'bufferAddCodecError'
  ErrorDetails2['BUFFER_INCOMPATIBLE_CODECS_ERROR'] =
    'bufferIncompatibleCodecsError'
  ErrorDetails2['BUFFER_APPEND_ERROR'] = 'bufferAppendError'
  ErrorDetails2['BUFFER_APPENDING_ERROR'] = 'bufferAppendingError'
  ErrorDetails2['BUFFER_STALLED_ERROR'] = 'bufferStalledError'
  ErrorDetails2['BUFFER_FULL_ERROR'] = 'bufferFullError'
  ErrorDetails2['BUFFER_SEEK_OVER_HOLE'] = 'bufferSeekOverHole'
  ErrorDetails2['BUFFER_NUDGE_ON_STALL'] = 'bufferNudgeOnStall'
  ErrorDetails2['INTERNAL_EXCEPTION'] = 'internalException'
  ErrorDetails2['INTERNAL_ABORTED'] = 'aborted'
  ErrorDetails2['UNKNOWN'] = 'unknown'
})(ErrorDetails || (ErrorDetails = {}))

// src/utils/logger.ts
var noop = function () {}
var fakeLogger = {
  trace: noop,
  debug: noop,
  log: noop,
  warn: noop,
  info: noop,
  error: noop
}
var exportedLogger = fakeLogger
function consolePrintFn(type) {
  const func = self.console[type]
  if (func) {
    return func.bind(self.console, `[${type}] >`)
  }
  return noop
}
function exportLoggerFunctions(debugConfig, ...functions) {
  functions.forEach(function (type) {
    exportedLogger[type] = debugConfig[type]
      ? debugConfig[type].bind(debugConfig)
      : consolePrintFn(type)
  })
}
function enableLogs(debugConfig) {
  if (
    (self.console && debugConfig === true) ||
    typeof debugConfig === 'object'
  ) {
    exportLoggerFunctions(debugConfig, 'debug', 'log', 'info', 'warn', 'error')
    try {
      exportedLogger.log()
    } catch (e) {
      exportedLogger = fakeLogger
    }
  } else {
    exportedLogger = fakeLogger
  }
}
var logger = exportedLogger

// src/utils/typed-array.ts
function sliceUint8(array, start, end) {
  return Uint8Array.prototype.slice
    ? array.slice(start, end)
    : new Uint8Array(Array.prototype.slice.call(array, start, end))
}

// src/loader/fragment.ts
var import_url_toolkit2 = __toModule(require_url_toolkit())

// src/loader/level-key.ts
var import_url_toolkit = __toModule(require_url_toolkit())
var LevelKey = class {
  constructor(absoluteOrBaseURI, relativeURL) {
    this._uri = null
    this.method = null
    this.keyFormat = null
    this.keyFormatVersions = null
    this.keyID = null
    this.key = null
    this.iv = null
    if (relativeURL) {
      this._uri = (0, import_url_toolkit.buildAbsoluteURL)(
        absoluteOrBaseURI,
        relativeURL,
        {
          alwaysNormalize: true
        }
      )
    } else {
      this._uri = absoluteOrBaseURI
    }
  }
  static fromURL(baseUrl, relativeUrl) {
    return new LevelKey(baseUrl, relativeUrl)
  }
  static fromURI(uri) {
    return new LevelKey(uri)
  }
  get uri() {
    return this._uri
  }
}

// src/loader/load-stats.ts
var LoadStats = class {
  constructor() {
    this.aborted = false
    this.loaded = 0
    this.retry = 0
    this.total = 0
    this.chunkCount = 0
    this.bwEstimate = 0
    this.loading = { start: 0, first: 0, end: 0 }
    this.parsing = { start: 0, end: 0 }
    this.buffering = { start: 0, first: 0, end: 0 }
  }
}

// src/loader/fragment.ts
var ElementaryStreamTypes
;(function (ElementaryStreamTypes2) {
  ElementaryStreamTypes2['AUDIO'] = 'audio'
  ElementaryStreamTypes2['VIDEO'] = 'video'
  ElementaryStreamTypes2['AUDIOVIDEO'] = 'audiovideo'
})(ElementaryStreamTypes || (ElementaryStreamTypes = {}))
var BaseSegment = class {
  constructor(baseurl) {
    this._byteRange = null
    this._url = null
    this.elementaryStreams = {
      [ElementaryStreamTypes.AUDIO]: null,
      [ElementaryStreamTypes.VIDEO]: null,
      [ElementaryStreamTypes.AUDIOVIDEO]: null
    }
    this.baseurl = baseurl
  }
  setByteRange(value, previous) {
    const params = value.split('@', 2)
    const byteRange = []
    if (params.length === 1) {
      byteRange[0] = previous ? previous.byteRangeEndOffset : 0
    } else {
      byteRange[0] = parseInt(params[1])
    }
    byteRange[1] = parseInt(params[0]) + byteRange[0]
    this._byteRange = byteRange
  }
  get byteRange() {
    if (!this._byteRange) {
      return []
    }
    return this._byteRange
  }
  get byteRangeStartOffset() {
    return this.byteRange[0]
  }
  get byteRangeEndOffset() {
    return this.byteRange[1]
  }
  get url() {
    if (!this._url && this.baseurl && this.relurl) {
      this._url = (0, import_url_toolkit2.buildAbsoluteURL)(
        this.baseurl,
        this.relurl,
        {
          alwaysNormalize: true
        }
      )
    }
    return this._url || ''
  }
  set url(value) {
    this._url = value
  }
}
var Fragment = class extends BaseSegment {
  constructor(type, baseurl) {
    super(baseurl)
    this._decryptdata = null
    this.rawProgramDateTime = null
    this.programDateTime = null
    this.tagList = []
    this.duration = 0
    this.sn = 0
    this.loader = null
    this.level = -1
    this.cc = 0
    this.start = 0
    this.stats = new LoadStats()
    this.urlId = 0
    this.bitrateTest = false
    this.title = null
    this.type = type
  }
  get decryptdata() {
    if (!this.levelkey && !this._decryptdata) {
      return null
    }
    if (!this._decryptdata && this.levelkey) {
      let sn = this.sn
      if (typeof sn !== 'number') {
        if (
          this.levelkey &&
          this.levelkey.method === 'AES-128' &&
          !this.levelkey.iv
        ) {
          logger.warn(
            `missing IV for initialization segment with method="${this.levelkey.method}" - compliance issue`
          )
        }
        sn = 0
      }
      this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, sn)
    }
    return this._decryptdata
  }
  get end() {
    return this.start + this.duration
  }
  get endProgramDateTime() {
    if (this.programDateTime === null) {
      return null
    }
    if (!Number.isFinite(this.programDateTime)) {
      return null
    }
    const duration = !Number.isFinite(this.duration) ? 0 : this.duration
    return this.programDateTime + duration * 1e3
  }
  get encrypted() {
    if (this.decryptdata?.keyFormat && this.decryptdata.uri) {
      return true
    }
    return false
  }
  createInitializationVector(segmentNumber) {
    const uint8View = new Uint8Array(16)
    for (let i = 12; i < 16; i++) {
      uint8View[i] = (segmentNumber >> (8 * (15 - i))) & 255
    }
    return uint8View
  }
  setDecryptDataFromLevelKey(levelkey, segmentNumber) {
    let decryptdata = levelkey
    if (levelkey?.method === 'AES-128' && levelkey.uri && !levelkey.iv) {
      decryptdata = LevelKey.fromURI(levelkey.uri)
      decryptdata.method = levelkey.method
      decryptdata.iv = this.createInitializationVector(segmentNumber)
      decryptdata.keyFormat = 'identity'
    }
    return decryptdata
  }
  setElementaryStreamInfo(
    type,
    startPTS,
    endPTS,
    startDTS,
    endDTS,
    partial = false
  ) {
    const { elementaryStreams } = this
    const info = elementaryStreams[type]
    if (!info) {
      elementaryStreams[type] = {
        startPTS,
        endPTS,
        startDTS,
        endDTS,
        partial
      }
      return
    }
    info.startPTS = Math.min(info.startPTS, startPTS)
    info.endPTS = Math.max(info.endPTS, endPTS)
    info.startDTS = Math.min(info.startDTS, startDTS)
    info.endDTS = Math.max(info.endDTS, endDTS)
  }
  clearElementaryStreamInfo() {
    const { elementaryStreams } = this
    elementaryStreams[ElementaryStreamTypes.AUDIO] = null
    elementaryStreams[ElementaryStreamTypes.VIDEO] = null
    elementaryStreams[ElementaryStreamTypes.AUDIOVIDEO] = null
  }
}
var Part = class extends BaseSegment {
  constructor(partAttrs, frag, baseurl, index, previous) {
    super(baseurl)
    this.fragOffset = 0
    this.duration = 0
    this.gap = false
    this.independent = false
    this.stats = new LoadStats()
    this.duration = partAttrs.decimalFloatingPoint('DURATION')
    this.gap = partAttrs.bool('GAP')
    this.independent = partAttrs.bool('INDEPENDENT')
    this.relurl = partAttrs.enumeratedString('URI')
    this.fragment = frag
    this.index = index
    const byteRange = partAttrs.enumeratedString('BYTERANGE')
    if (byteRange) {
      this.setByteRange(byteRange, previous)
    }
    if (previous) {
      this.fragOffset = previous.fragOffset + previous.duration
    }
  }
  get start() {
    return this.fragment.start + this.fragOffset
  }
  get end() {
    return this.start + this.duration
  }
  get loaded() {
    const { elementaryStreams } = this
    return !!(
      elementaryStreams.audio ||
      elementaryStreams.video ||
      elementaryStreams.audiovideo
    )
  }
}

// src/utils/mp4-tools.ts
var UINT32_MAX = Math.pow(2, 32) - 1
var push = [].push
function bin2str(data) {
  return String.fromCharCode.apply(null, data)
}
function readUint16(buffer, offset) {
  if ('data' in buffer) {
    offset += buffer.start
    buffer = buffer.data
  }
  const val = (buffer[offset] << 8) | buffer[offset + 1]
  return val < 0 ? 65536 + val : val
}
function readUint32(buffer, offset) {
  if ('data' in buffer) {
    offset += buffer.start
    buffer = buffer.data
  }
  const val =
    (buffer[offset] << 24) |
    (buffer[offset + 1] << 16) |
    (buffer[offset + 2] << 8) |
    buffer[offset + 3]
  return val < 0 ? 4294967296 + val : val
}
function writeUint32(buffer, offset, value) {
  if ('data' in buffer) {
    offset += buffer.start
    buffer = buffer.data
  }
  buffer[offset] = value >> 24
  buffer[offset + 1] = (value >> 16) & 255
  buffer[offset + 2] = (value >> 8) & 255
  buffer[offset + 3] = value & 255
}
function findBox(input, path) {
  const results = []
  if (!path.length) {
    return results
  }
  let data
  let start
  let end
  if ('data' in input) {
    data = input.data
    start = input.start
    end = input.end
  } else {
    data = input
    start = 0
    end = data.byteLength
  }
  for (let i = start; i < end; ) {
    const size = readUint32(data, i)
    const type = bin2str(data.subarray(i + 4, i + 8))
    const endbox = size > 1 ? i + size : end
    if (type === path[0]) {
      if (path.length === 1) {
        results.push({ data, start: i + 8, end: endbox })
      } else {
        const subresults = findBox(
          { data, start: i + 8, end: endbox },
          path.slice(1)
        )
        if (subresults.length) {
          push.apply(results, subresults)
        }
      }
    }
    i = endbox
  }
  return results
}
function parseSegmentIndex(initSegment) {
  const moovBox = findBox(initSegment, ['moov'])
  const moov = moovBox[0]
  const moovEndOffset = moov ? moov.end : null
  const sidxBox = findBox(initSegment, ['sidx'])
  if (!sidxBox || !sidxBox[0]) {
    return null
  }
  const references = []
  const sidx = sidxBox[0]
  const version = sidx.data[0]
  let index = version === 0 ? 8 : 16
  const timescale = readUint32(sidx, index)
  index += 4
  const earliestPresentationTime = 0
  const firstOffset = 0
  if (version === 0) {
    index += 8
  } else {
    index += 16
  }
  index += 2
  let startByte = sidx.end + firstOffset
  const referencesCount = readUint16(sidx, index)
  index += 2
  for (let i = 0; i < referencesCount; i++) {
    let referenceIndex = index
    const referenceInfo = readUint32(sidx, referenceIndex)
    referenceIndex += 4
    const referenceSize = referenceInfo & 2147483647
    const referenceType = (referenceInfo & 2147483648) >>> 31
    if (referenceType === 1) {
      console.warn('SIDX has hierarchical references (not supported)')
      return null
    }
    const subsegmentDuration = readUint32(sidx, referenceIndex)
    referenceIndex += 4
    references.push({
      referenceSize,
      subsegmentDuration,
      info: {
        duration: subsegmentDuration / timescale,
        start: startByte,
        end: startByte + referenceSize - 1
      }
    })
    startByte += referenceSize
    referenceIndex += 4
    index = referenceIndex
  }
  return {
    earliestPresentationTime,
    timescale,
    version,
    referencesCount,
    references,
    moovEndOffset
  }
}
function parseInitSegment(initSegment) {
  const result = []
  const traks = findBox(initSegment, ['moov', 'trak'])
  for (let i = 0; i < traks.length; i++) {
    const trak = traks[i]
    const tkhd = findBox(trak, ['tkhd'])[0]
    if (tkhd) {
      let version = tkhd.data[tkhd.start]
      let index = version === 0 ? 12 : 20
      const trackId = readUint32(tkhd, index)
      const mdhd = findBox(trak, ['mdia', 'mdhd'])[0]
      if (mdhd) {
        version = mdhd.data[mdhd.start]
        index = version === 0 ? 12 : 20
        const timescale = readUint32(mdhd, index)
        const hdlr = findBox(trak, ['mdia', 'hdlr'])[0]
        if (hdlr) {
          const hdlrType = bin2str(
            hdlr.data.subarray(hdlr.start + 8, hdlr.start + 12)
          )
          const type = {
            soun: ElementaryStreamTypes.AUDIO,
            vide: ElementaryStreamTypes.VIDEO
          }[hdlrType]
          if (type) {
            const stsd = findBox(trak, ['mdia', 'minf', 'stbl', 'stsd'])[0]
            let codec
            if (stsd) {
              codec = bin2str(
                stsd.data.subarray(stsd.start + 12, stsd.start + 16)
              )
            }
            result[trackId] = { timescale, type }
            result[type] = { timescale, id: trackId, codec }
          }
        }
      }
    }
  }
  const trex = findBox(initSegment, ['moov', 'mvex', 'trex'])
  trex.forEach(trex2 => {
    const trackId = readUint32(trex2, 4)
    const track = result[trackId]
    if (track) {
      track.default = {
        duration: readUint32(trex2, 12),
        flags: readUint32(trex2, 20)
      }
    }
  })
  return result
}
function getStartDTS(initData, fmp4) {
  return (
    findBox(fmp4, ['moof', 'traf']).reduce((result, traf) => {
      const tfdt = findBox(traf, ['tfdt'])[0]
      const version = tfdt.data[tfdt.start]
      const start = findBox(traf, ['tfhd']).reduce((result2, tfhd) => {
        const id = readUint32(tfhd, 4)
        const track = initData[id]
        if (track) {
          let baseTime = readUint32(tfdt, 4)
          if (version === 1) {
            baseTime *= Math.pow(2, 32)
            baseTime += readUint32(tfdt, 8)
          }
          const scale = track.timescale || 9e4
          const startTime = baseTime / scale
          if (
            isFinite(startTime) &&
            (result2 === null || startTime < result2)
          ) {
            return startTime
          }
        }
        return result2
      }, null)
      if (
        start !== null &&
        isFinite(start) &&
        (result === null || start < result)
      ) {
        return start
      }
      return result
    }, null) || 0
  )
}
function getDuration(data, initData) {
  let rawDuration = 0
  let videoDuration = 0
  let audioDuration = 0
  const trafs = findBox(data, ['moof', 'traf'])
  for (let i = 0; i < trafs.length; i++) {
    const traf = trafs[i]
    const tfhd = findBox(traf, ['tfhd'])[0]
    const id = readUint32(tfhd, 4)
    const track = initData[id]
    if (!track) {
      continue
    }
    const trackDefault = track.default
    const tfhdFlags = readUint32(tfhd, 0) | trackDefault?.flags
    let sampleDuration = trackDefault?.duration
    if (tfhdFlags & 8) {
      if (tfhdFlags & 2) {
        sampleDuration = readUint32(tfhd, 12)
      } else {
        sampleDuration = readUint32(tfhd, 8)
      }
    }
    const timescale = track.timescale || 9e4
    const truns = findBox(traf, ['trun'])
    for (let j = 0; j < truns.length; j++) {
      if (sampleDuration) {
        const sampleCount = readUint32(truns[j], 4)
        rawDuration = sampleDuration * sampleCount
      } else {
        rawDuration = computeRawDurationFromSamples(truns[j])
      }
      if (track.type === ElementaryStreamTypes.VIDEO) {
        videoDuration += rawDuration / timescale
      } else if (track.type === ElementaryStreamTypes.AUDIO) {
        audioDuration += rawDuration / timescale
      }
    }
  }
  if (videoDuration === 0 && audioDuration === 0) {
    const sidx = parseSegmentIndex(data)
    if (sidx?.references) {
      return sidx.references.reduce(
        (dur, ref) => dur + ref.info.duration || 0,
        0
      )
    }
  }
  if (videoDuration) {
    return videoDuration
  }
  return audioDuration
}
function computeRawDurationFromSamples(trun) {
  const flags = readUint32(trun, 0)
  let offset = 8
  if (flags & 1) {
    offset += 4
  }
  if (flags & 4) {
    offset += 4
  }
  let duration = 0
  const sampleCount = readUint32(trun, 4)
  for (let i = 0; i < sampleCount; i++) {
    if (flags & 256) {
      const sampleDuration = readUint32(trun, offset)
      duration += sampleDuration
      offset += 4
    }
    if (flags & 512) {
      offset += 4
    }
    if (flags & 1024) {
      offset += 4
    }
    if (flags & 2048) {
      offset += 4
    }
  }
  return duration
}
function offsetStartDTS(initData, fmp4, timeOffset) {
  findBox(fmp4, ['moof', 'traf']).forEach(function (traf) {
    findBox(traf, ['tfhd']).forEach(function (tfhd) {
      const id = readUint32(tfhd, 4)
      const track = initData[id]
      if (!track) {
        return
      }
      const timescale = track.timescale || 9e4
      findBox(traf, ['tfdt']).forEach(function (tfdt) {
        const version = tfdt.data[tfdt.start]
        let baseMediaDecodeTime = readUint32(tfdt, 4)
        if (version === 0) {
          writeUint32(tfdt, 4, baseMediaDecodeTime - timeOffset * timescale)
        } else {
          baseMediaDecodeTime *= Math.pow(2, 32)
          baseMediaDecodeTime += readUint32(tfdt, 8)
          baseMediaDecodeTime -= timeOffset * timescale
          baseMediaDecodeTime = Math.max(baseMediaDecodeTime, 0)
          const upper = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1))
          const lower = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1))
          writeUint32(tfdt, 4, upper)
          writeUint32(tfdt, 8, lower)
        }
      })
    })
  })
}
function segmentValidRange(data) {
  const segmentedRange = {
    valid: null,
    remainder: null
  }
  const moofs = findBox(data, ['moof'])
  if (!moofs) {
    return segmentedRange
  } else if (moofs.length < 2) {
    segmentedRange.remainder = data
    return segmentedRange
  }
  const last = moofs[moofs.length - 1]
  segmentedRange.valid = sliceUint8(data, 0, last.start - 8)
  segmentedRange.remainder = sliceUint8(data, last.start - 8)
  return segmentedRange
}
function appendUint8Array(data1, data2) {
  const temp = new Uint8Array(data1.length + data2.length)
  temp.set(data1)
  temp.set(data2, data1.length)
  return temp
}

// src/loader/m3u8-parser.ts
var URLToolkit = __toModule(require_url_toolkit())

// src/loader/level-details.ts
var DEFAULT_TARGET_DURATION = 10
var LevelDetails = class {
  constructor(baseUrl) {
    this.PTSKnown = false
    this.alignedSliding = false
    this.endCC = 0
    this.endSN = 0
    this.partList = null
    this.initSegment = null
    this.live = true
    this.ageHeader = 0
    this.updated = true
    this.advanced = true
    this.misses = 0
    this.needSidxRanges = false
    this.startCC = 0
    this.startSN = 0
    this.startTimeOffset = null
    this.targetduration = 0
    this.totalduration = 0
    this.type = null
    this.m3u8 = ''
    this.version = null
    this.canBlockReload = false
    this.canSkipUntil = 0
    this.canSkipDateRanges = false
    this.skippedSegments = 0
    this.partHoldBack = 0
    this.holdBack = 0
    this.partTarget = 0
    this.tuneInGoal = 0
    this.driftStartTime = 0
    this.driftEndTime = 0
    this.driftStart = 0
    this.driftEnd = 0
    this.fragments = []
    this.url = baseUrl
  }
  reloaded(previous) {
    if (!previous) {
      this.advanced = true
      this.updated = true
      return
    }
    const partSnDiff = this.lastPartSn - previous.lastPartSn
    const partIndexDiff = this.lastPartIndex - previous.lastPartIndex
    this.updated =
      this.endSN !== previous.endSN || !!partIndexDiff || !!partSnDiff
    this.advanced =
      this.endSN > previous.endSN ||
      partSnDiff > 0 ||
      (partSnDiff === 0 && partIndexDiff > 0)
    if (this.updated || this.advanced) {
      this.misses = Math.floor(previous.misses * 0.6)
    } else {
      this.misses = previous.misses + 1
    }
    this.availabilityDelay = previous.availabilityDelay
  }
  get hasProgramDateTime() {
    if (this.fragments.length) {
      return Number.isFinite(
        this.fragments[this.fragments.length - 1].programDateTime
      )
    }
    return false
  }
  get levelTargetDuration() {
    return (
      this.averagetargetduration ||
      this.targetduration ||
      DEFAULT_TARGET_DURATION
    )
  }
  get drift() {
    const runTime = this.driftEndTime - this.driftStartTime
    if (runTime > 0) {
      const runDuration = this.driftEnd - this.driftStart
      return (runDuration * 1e3) / runTime
    }
    return 1
  }
  get edge() {
    return this.partEnd || this.fragmentEnd
  }
  get partEnd() {
    if (this.partList?.length) {
      return this.partList[this.partList.length - 1].end
    }
    return this.fragmentEnd
  }
  get fragmentEnd() {
    if (this.fragments?.length) {
      return this.fragments[this.fragments.length - 1].end
    }
    return 0
  }
  get age() {
    if (this.advancedDateTime) {
      return Math.max(Date.now() - this.advancedDateTime, 0) / 1e3
    }
    return 0
  }
  get lastPartIndex() {
    if (this.partList?.length) {
      return this.partList[this.partList.length - 1].index
    }
    return -1
  }
  get lastPartSn() {
    if (this.partList?.length) {
      return this.partList[this.partList.length - 1].fragment.sn
    }
    return this.endSN
  }
}

// src/utils/attr-list.ts
var DECIMAL_RESOLUTION_REGEX = /^(\d+)x(\d+)$/
var ATTR_LIST_REGEX = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g
var AttrList = class {
  constructor(attrs) {
    if (typeof attrs === 'string') {
      attrs = AttrList.parseAttrList(attrs)
    }
    for (const attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        this[attr] = attrs[attr]
      }
    }
  }
  decimalInteger(attrName) {
    const intValue = parseInt(this[attrName], 10)
    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity
    }
    return intValue
  }
  hexadecimalInteger(attrName) {
    if (this[attrName]) {
      let stringValue = (this[attrName] || '0x').slice(2)
      stringValue = (stringValue.length & 1 ? '0' : '') + stringValue
      const value = new Uint8Array(stringValue.length / 2)
      for (let i = 0; i < stringValue.length / 2; i++) {
        value[i] = parseInt(stringValue.slice(i * 2, i * 2 + 2), 16)
      }
      return value
    } else {
      return null
    }
  }
  hexadecimalIntegerAsNumber(attrName) {
    const intValue = parseInt(this[attrName], 16)
    if (intValue > Number.MAX_SAFE_INTEGER) {
      return Infinity
    }
    return intValue
  }
  decimalFloatingPoint(attrName) {
    return parseFloat(this[attrName])
  }
  optionalFloat(attrName, defaultValue) {
    const value = this[attrName]
    return value ? parseFloat(value) : defaultValue
  }
  enumeratedString(attrName) {
    return this[attrName]
  }
  bool(attrName) {
    return this[attrName] === 'YES'
  }
  decimalResolution(attrName) {
    const res = DECIMAL_RESOLUTION_REGEX.exec(this[attrName])
    if (res === null) {
      return void 0
    }
    return {
      width: parseInt(res[1], 10),
      height: parseInt(res[2], 10)
    }
  }
  static parseAttrList(input) {
    let match
    const attrs = {}
    const quote = '"'
    ATTR_LIST_REGEX.lastIndex = 0
    while ((match = ATTR_LIST_REGEX.exec(input)) !== null) {
      let value = match[2]
      if (
        value.indexOf(quote) === 0 &&
        value.lastIndexOf(quote) === value.length - 1
      ) {
        value = value.slice(1, -1)
      }
      attrs[match[1]] = value
    }
    return attrs
  }
}

// src/utils/codecs.ts
var sampleEntryCodesISO = {
  audio: {
    a3ds: true,
    'ac-3': true,
    'ac-4': true,
    alac: true,
    alaw: true,
    dra1: true,
    'dts+': true,
    'dts-': true,
    dtsc: true,
    dtse: true,
    dtsh: true,
    'ec-3': true,
    enca: true,
    g719: true,
    g726: true,
    m4ae: true,
    mha1: true,
    mha2: true,
    mhm1: true,
    mhm2: true,
    mlpa: true,
    mp4a: true,
    'raw ': true,
    Opus: true,
    samr: true,
    sawb: true,
    sawp: true,
    sevc: true,
    sqcp: true,
    ssmv: true,
    twos: true,
    ulaw: true
  },
  video: {
    avc1: true,
    avc2: true,
    avc3: true,
    avc4: true,
    avcp: true,
    av01: true,
    drac: true,
    dvav: true,
    dvhe: true,
    encv: true,
    hev1: true,
    hvc1: true,
    mjp2: true,
    mp4v: true,
    mvc1: true,
    mvc2: true,
    mvc3: true,
    mvc4: true,
    resv: true,
    rv60: true,
    s263: true,
    svc1: true,
    svc2: true,
    'vc-1': true,
    vp08: true,
    vp09: true
  },
  text: {
    stpp: true,
    wvtt: true
  }
}
function isCodecType(codec, type) {
  const typeCodes = sampleEntryCodesISO[type]
  return !!typeCodes && typeCodes[codec.slice(0, 4)] === true
}
function isCodecSupportedInMp4(codec, type) {
  return MediaSource.isTypeSupported(`${type || 'video'}/mp4;codecs="${codec}"`)
}

// src/loader/m3u8-parser.ts
var MASTER_PLAYLIST_REGEX = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-SESSION-DATA:([^\r\n]*)[\r\n]+/g
var MASTER_PLAYLIST_MEDIA_REGEX = /#EXT-X-MEDIA:(.*)/g
var LEVEL_PLAYLIST_REGEX_FAST = new RegExp(
  [
    /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
    /(?!#) *(\S[\S ]*)/.source,
    /#EXT-X-BYTERANGE:*(.+)/.source,
    /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
    /#.*/.source
  ].join('|'),
  'g'
)
var LEVEL_PLAYLIST_REGEX_SLOW = new RegExp(
  [
    /#(EXTM3U)/.source,
    /#EXT-X-(PLAYLIST-TYPE):(.+)/.source,
    /#EXT-X-(MEDIA-SEQUENCE): *(\d+)/.source,
    /#EXT-X-(SKIP):(.+)/.source,
    /#EXT-X-(TARGETDURATION): *(\d+)/.source,
    /#EXT-X-(KEY):(.+)/.source,
    /#EXT-X-(START):(.+)/.source,
    /#EXT-X-(ENDLIST)/.source,
    /#EXT-X-(DISCONTINUITY-SEQ)UENCE: *(\d+)/.source,
    /#EXT-X-(DIS)CONTINUITY/.source,
    /#EXT-X-(VERSION):(\d+)/.source,
    /#EXT-X-(MAP):(.+)/.source,
    /#EXT-X-(SERVER-CONTROL):(.+)/.source,
    /#EXT-X-(PART-INF):(.+)/.source,
    /#EXT-X-(GAP)/.source,
    /#EXT-X-(BITRATE):\s*(\d+)/.source,
    /#EXT-X-(PART):(.+)/.source,
    /#EXT-X-(PRELOAD-HINT):(.+)/.source,
    /#EXT-X-(RENDITION-REPORT):(.+)/.source,
    /(#)([^:]*):(.*)/.source,
    /(#)(.*)(?:.*)\r?\n?/.source
  ].join('|')
)
var MP4_REGEX_SUFFIX = /\.(mp4|m4s|m4v|m4a)$/i
function isMP4Url(url) {
  return MP4_REGEX_SUFFIX.test(URLToolkit.parseURL(url)?.path ?? '')
}
var M3U8Parser = class {
  static findGroup(groups, mediaGroupId) {
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]
      if (group.id === mediaGroupId) {
        return group
      }
    }
  }
  static convertAVC1ToAVCOTI(codec) {
    const avcdata = codec.split('.')
    if (avcdata.length > 2) {
      let result = avcdata.shift() + '.'
      result += parseInt(avcdata.shift()).toString(16)
      result += ('000' + parseInt(avcdata.shift()).toString(16)).substr(-4)
      return result
    }
    return codec
  }
  static resolve(url, baseUrl) {
    return URLToolkit.buildAbsoluteURL(baseUrl, url, { alwaysNormalize: true })
  }
  static parseMasterPlaylist(string, baseurl) {
    const levels = []
    const sessionData = {}
    let hasSessionData = false
    MASTER_PLAYLIST_REGEX.lastIndex = 0
    let result
    while ((result = MASTER_PLAYLIST_REGEX.exec(string)) != null) {
      if (result[1]) {
        const attrs = new AttrList(result[1])
        const level = {
          attrs,
          bitrate:
            attrs.decimalInteger('AVERAGE-BANDWIDTH') ||
            attrs.decimalInteger('BANDWIDTH'),
          name: attrs.NAME,
          url: M3U8Parser.resolve(result[2], baseurl)
        }
        const resolution = attrs.decimalResolution('RESOLUTION')
        if (resolution) {
          level.width = resolution.width
          level.height = resolution.height
        }
        setCodecs(
          (attrs.CODECS || '').split(/[ ,]+/).filter(c => c),
          level
        )
        if (level.videoCodec && level.videoCodec.indexOf('avc1') !== -1) {
          level.videoCodec = M3U8Parser.convertAVC1ToAVCOTI(level.videoCodec)
        }
        levels.push(level)
      } else if (result[3]) {
        const sessionAttrs = new AttrList(result[3])
        if (sessionAttrs['DATA-ID']) {
          hasSessionData = true
          sessionData[sessionAttrs['DATA-ID']] = sessionAttrs
        }
      }
    }
    return {
      levels,
      sessionData: hasSessionData ? sessionData : null
    }
  }
  static parseMasterPlaylistMedia(string, baseurl, type, groups = []) {
    let result
    const medias = []
    let id = 0
    MASTER_PLAYLIST_MEDIA_REGEX.lastIndex = 0
    while ((result = MASTER_PLAYLIST_MEDIA_REGEX.exec(string)) !== null) {
      const attrs = new AttrList(result[1])
      if (attrs.TYPE === type) {
        const media = {
          attrs,
          bitrate: 0,
          id: id++,
          groupId: attrs['GROUP-ID'],
          instreamId: attrs['INSTREAM-ID'],
          name: attrs.NAME || attrs.LANGUAGE || '',
          type,
          default: attrs.bool('DEFAULT'),
          autoselect: attrs.bool('AUTOSELECT'),
          forced: attrs.bool('FORCED'),
          lang: attrs.LANGUAGE,
          url: attrs.URI ? M3U8Parser.resolve(attrs.URI, baseurl) : ''
        }
        if (groups.length) {
          const groupCodec =
            M3U8Parser.findGroup(groups, media.groupId) || groups[0]
          assignCodec(media, groupCodec, 'audioCodec')
          assignCodec(media, groupCodec, 'textCodec')
        }
        medias.push(media)
      }
    }
    return medias
  }
  static parseLevelPlaylist(string, baseurl, id, type, levelUrlId) {
    const level = new LevelDetails(baseurl)
    const fragments = level.fragments
    let currentSN = 0
    let currentPart = 0
    let totalduration = 0
    let discontinuityCounter = 0
    let prevFrag = null
    let frag = new Fragment(type, baseurl)
    let result
    let i
    let levelkey
    let firstPdtIndex = -1
    LEVEL_PLAYLIST_REGEX_FAST.lastIndex = 0
    level.m3u8 = string
    while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
      const duration = result[1]
      if (duration) {
        frag.duration = parseFloat(duration)
        const title = (' ' + result[2]).slice(1)
        frag.title = title || null
        frag.tagList.push(title ? ['INF', duration, title] : ['INF', duration])
      } else if (result[3]) {
        if (Number.isFinite(frag.duration)) {
          frag.start = totalduration
          if (levelkey) {
            frag.levelkey = levelkey
          }
          frag.sn = currentSN
          frag.level = id
          frag.cc = discontinuityCounter
          frag.urlId = levelUrlId
          fragments.push(frag)
          frag.relurl = (' ' + result[3]).slice(1)
          assignProgramDateTime(frag, prevFrag)
          prevFrag = frag
          totalduration += frag.duration
          currentSN++
          currentPart = 0
          frag = new Fragment(type, baseurl)
          frag.start = totalduration
          frag.sn = currentSN
          frag.cc = discontinuityCounter
          frag.level = id
        }
      } else if (result[4]) {
        const data = (' ' + result[4]).slice(1)
        if (prevFrag) {
          frag.setByteRange(data, prevFrag)
        } else {
          frag.setByteRange(data)
        }
      } else if (result[5]) {
        frag.rawProgramDateTime = (' ' + result[5]).slice(1)
        frag.tagList.push(['PROGRAM-DATE-TIME', frag.rawProgramDateTime])
        if (firstPdtIndex === -1) {
          firstPdtIndex = fragments.length
        }
      } else {
        result = result[0].match(LEVEL_PLAYLIST_REGEX_SLOW)
        if (!result) {
          logger.warn('No matches on slow regex match for level playlist!')
          continue
        }
        for (i = 1; i < result.length; i++) {
          if (typeof result[i] !== 'undefined') {
            break
          }
        }
        const tag = (' ' + result[i]).slice(1)
        const value1 = (' ' + result[i + 1]).slice(1)
        const value2 = result[i + 2] ? (' ' + result[i + 2]).slice(1) : ''
        switch (tag) {
          case 'PLAYLIST-TYPE':
            level.type = value1.toUpperCase()
            break
          case 'MEDIA-SEQUENCE':
            currentSN = level.startSN = parseInt(value1)
            break
          case 'SKIP': {
            const skipAttrs = new AttrList(value1)
            const skippedSegments = skipAttrs.decimalInteger('SKIPPED-SEGMENTS')
            if (Number.isFinite(skippedSegments)) {
              level.skippedSegments = skippedSegments
              for (let i2 = skippedSegments; i2--; ) {
                fragments.unshift(null)
              }
              currentSN += skippedSegments
            }
            const recentlyRemovedDateranges = skipAttrs.enumeratedString(
              'RECENTLY-REMOVED-DATERANGES'
            )
            if (recentlyRemovedDateranges) {
              level.recentlyRemovedDateranges = recentlyRemovedDateranges.split(
                '	'
              )
            }
            break
          }
          case 'TARGETDURATION':
            level.targetduration = parseFloat(value1)
            break
          case 'VERSION':
            level.version = parseInt(value1)
            break
          case 'EXTM3U':
            break
          case 'ENDLIST':
            level.live = false
            break
          case '#':
            if (value1 || value2) {
              frag.tagList.push(value2 ? [value1, value2] : [value1])
            }
            break
          case 'DIS':
            discontinuityCounter++
          case 'GAP':
            frag.tagList.push([tag])
            break
          case 'BITRATE':
            frag.tagList.push([tag, value1])
            break
          case 'DISCONTINUITY-SEQ':
            discontinuityCounter = parseInt(value1)
            break
          case 'KEY': {
            const keyAttrs = new AttrList(value1)
            const decryptmethod = keyAttrs.enumeratedString('METHOD')
            const decrypturi = keyAttrs.URI
            const decryptiv = keyAttrs.hexadecimalInteger('IV')
            const decryptkeyformatversions = keyAttrs.enumeratedString(
              'KEYFORMATVERSIONS'
            )
            const decryptkeyid = keyAttrs.enumeratedString('KEYID')
            const decryptkeyformat =
              keyAttrs.enumeratedString('KEYFORMAT') ?? 'identity'
            const unsupportedKnownKeyformatsInManifest = [
              'com.apple.streamingkeydelivery',
              'com.microsoft.playready',
              'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed',
              'com.widevine'
            ]
            if (
              unsupportedKnownKeyformatsInManifest.indexOf(decryptkeyformat) >
              -1
            ) {
              logger.warn(
                `Keyformat ${decryptkeyformat} is not supported from the manifest`
              )
              continue
            } else if (decryptkeyformat !== 'identity') {
              continue
            }
            if (decryptmethod) {
              levelkey = LevelKey.fromURL(baseurl, decrypturi)
              if (
                decrypturi &&
                ['AES-128', 'SAMPLE-AES', 'SAMPLE-AES-CENC'].indexOf(
                  decryptmethod
                ) >= 0
              ) {
                levelkey.method = decryptmethod
                levelkey.keyFormat = decryptkeyformat
                if (decryptkeyid) {
                  levelkey.keyID = decryptkeyid
                }
                if (decryptkeyformatversions) {
                  levelkey.keyFormatVersions = decryptkeyformatversions
                }
                levelkey.iv = decryptiv
              }
            }
            break
          }
          case 'START': {
            const startAttrs = new AttrList(value1)
            const startTimeOffset = startAttrs.decimalFloatingPoint(
              'TIME-OFFSET'
            )
            if (Number.isFinite(startTimeOffset)) {
              level.startTimeOffset = startTimeOffset
            }
            break
          }
          case 'MAP': {
            const mapAttrs = new AttrList(value1)
            frag.relurl = mapAttrs.URI
            if (mapAttrs.BYTERANGE) {
              frag.setByteRange(mapAttrs.BYTERANGE)
            }
            frag.level = id
            frag.sn = 'initSegment'
            if (levelkey) {
              frag.levelkey = levelkey
            }
            level.initSegment = frag
            frag = new Fragment(type, baseurl)
            frag.rawProgramDateTime = level.initSegment.rawProgramDateTime
            break
          }
          case 'SERVER-CONTROL': {
            const serverControlAttrs = new AttrList(value1)
            level.canBlockReload = serverControlAttrs.bool('CAN-BLOCK-RELOAD')
            level.canSkipUntil = serverControlAttrs.optionalFloat(
              'CAN-SKIP-UNTIL',
              0
            )
            level.canSkipDateRanges =
              level.canSkipUntil > 0 &&
              serverControlAttrs.bool('CAN-SKIP-DATERANGES')
            level.partHoldBack = serverControlAttrs.optionalFloat(
              'PART-HOLD-BACK',
              0
            )
            level.holdBack = serverControlAttrs.optionalFloat('HOLD-BACK', 0)
            break
          }
          case 'PART-INF': {
            const partInfAttrs = new AttrList(value1)
            level.partTarget = partInfAttrs.decimalFloatingPoint('PART-TARGET')
            break
          }
          case 'PART': {
            let partList = level.partList
            if (!partList) {
              partList = level.partList = []
            }
            const previousFragmentPart =
              currentPart > 0 ? partList[partList.length - 1] : void 0
            const index = currentPart++
            const part = new Part(
              new AttrList(value1),
              frag,
              baseurl,
              index,
              previousFragmentPart
            )
            partList.push(part)
            frag.duration += part.duration
            break
          }
          case 'PRELOAD-HINT': {
            const preloadHintAttrs = new AttrList(value1)
            level.preloadHint = preloadHintAttrs
            break
          }
          case 'RENDITION-REPORT': {
            const renditionReportAttrs = new AttrList(value1)
            level.renditionReports = level.renditionReports || []
            level.renditionReports.push(renditionReportAttrs)
            break
          }
          default:
            logger.warn(`line parsed but not handled: ${result}`)
            break
        }
      }
    }
    if (prevFrag && !prevFrag.relurl) {
      fragments.pop()
      totalduration -= prevFrag.duration
      if (level.partList) {
        level.fragmentHint = prevFrag
      }
    } else if (level.partList) {
      assignProgramDateTime(frag, prevFrag)
      frag.cc = discontinuityCounter
      level.fragmentHint = frag
    }
    const fragmentLength = fragments.length
    const firstFragment = fragments[0]
    const lastFragment = fragments[fragmentLength - 1]
    totalduration += level.skippedSegments * level.targetduration
    if (totalduration > 0 && fragmentLength && lastFragment) {
      level.averagetargetduration = totalduration / fragmentLength
      const lastSn = lastFragment.sn
      level.endSN = lastSn !== 'initSegment' ? lastSn : 0
      if (firstFragment) {
        level.startCC = firstFragment.cc
        if (!level.initSegment) {
          if (
            level.fragments.every(
              frag2 => frag2.relurl && isMP4Url(frag2.relurl)
            )
          ) {
            logger.warn(
              'MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX'
            )
            frag = new Fragment(type, baseurl)
            frag.relurl = lastFragment.relurl
            frag.level = id
            frag.sn = 'initSegment'
            level.initSegment = frag
            level.needSidxRanges = true
          }
        }
      }
    } else {
      level.endSN = 0
      level.startCC = 0
    }
    if (level.fragmentHint) {
      totalduration += level.fragmentHint.duration
    }
    level.totalduration = totalduration
    level.endCC = discontinuityCounter
    if (firstPdtIndex > 0) {
      backfillProgramDateTimes(fragments, firstPdtIndex)
    }
    return level
  }
}
var m3u8_parser_default = M3U8Parser
function setCodecs(codecs, level) {
  ;['video', 'audio', 'text'].forEach(type => {
    const filtered = codecs.filter(codec => isCodecType(codec, type))
    if (filtered.length) {
      const preferred = filtered.filter(codec => {
        return (
          codec.lastIndexOf('avc1', 0) === 0 ||
          codec.lastIndexOf('mp4a', 0) === 0
        )
      })
      level[`${type}Codec`] = preferred.length > 0 ? preferred[0] : filtered[0]
      codecs = codecs.filter(codec => filtered.indexOf(codec) === -1)
    }
  })
  level.unknownCodecs = codecs
}
function assignCodec(media, groupItem, codecProperty) {
  const codecValue = groupItem[codecProperty]
  if (codecValue) {
    media[codecProperty] = codecValue
  }
}
function backfillProgramDateTimes(fragments, firstPdtIndex) {
  let fragPrev = fragments[firstPdtIndex]
  for (let i = firstPdtIndex; i--; ) {
    const frag = fragments[i]
    if (!frag) {
      return
    }
    frag.programDateTime = fragPrev.programDateTime - frag.duration * 1e3
    fragPrev = frag
  }
}
function assignProgramDateTime(frag, prevFrag) {
  if (frag.rawProgramDateTime) {
    frag.programDateTime = Date.parse(frag.rawProgramDateTime)
  } else if (prevFrag?.programDateTime) {
    frag.programDateTime = prevFrag.endProgramDateTime
  }
  if (!Number.isFinite(frag.programDateTime)) {
    frag.programDateTime = null
    frag.rawProgramDateTime = null
  }
}

// src/types/loader.ts
var PlaylistContextType
;(function (PlaylistContextType2) {
  PlaylistContextType2['MANIFEST'] = 'manifest'
  PlaylistContextType2['LEVEL'] = 'level'
  PlaylistContextType2['AUDIO_TRACK'] = 'audioTrack'
  PlaylistContextType2['SUBTITLE_TRACK'] = 'subtitleTrack'
})(PlaylistContextType || (PlaylistContextType = {}))
var PlaylistLevelType
;(function (PlaylistLevelType2) {
  PlaylistLevelType2['MAIN'] = 'main'
  PlaylistLevelType2['AUDIO'] = 'audio'
  PlaylistLevelType2['SUBTITLE'] = 'subtitle'
})(PlaylistLevelType || (PlaylistLevelType = {}))

// src/loader/playlist-loader.ts
function mapContextToLevelType(context) {
  const { type } = context
  switch (type) {
    case PlaylistContextType.AUDIO_TRACK:
      return PlaylistLevelType.AUDIO
    case PlaylistContextType.SUBTITLE_TRACK:
      return PlaylistLevelType.SUBTITLE
    default:
      return PlaylistLevelType.MAIN
  }
}
function getResponseUrl(response, context) {
  let url = response.url
  if (url === void 0 || url.indexOf('data:') === 0) {
    url = context.url
  }
  return url
}
var PlaylistLoader = class {
  constructor(hls) {
    this.loaders = Object.create(null)
    this.hls = hls
    this.registerListeners()
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.on(Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this)
    hls.on(Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
  }
  unregisterListeners() {
    const { hls } = this
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.off(Events.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this)
    hls.off(Events.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this)
  }
  createInternalLoader(context) {
    const config = this.hls.config
    const PLoader = config.pLoader
    const Loader = config.loader
    const InternalLoader = PLoader || Loader
    const loader = new InternalLoader(config)
    context.loader = loader
    this.loaders[context.type] = loader
    return loader
  }
  getInternalLoader(context) {
    return this.loaders[context.type]
  }
  resetInternalLoader(contextType) {
    if (this.loaders[contextType]) {
      delete this.loaders[contextType]
    }
  }
  destroyInternalLoaders() {
    for (const contextType in this.loaders) {
      const loader = this.loaders[contextType]
      if (loader) {
        loader.destroy()
      }
      this.resetInternalLoader(contextType)
    }
  }
  destroy() {
    this.unregisterListeners()
    this.destroyInternalLoaders()
  }
  onManifestLoading(event, data) {
    const { url } = data
    this.load({
      id: null,
      groupId: null,
      level: 0,
      responseType: 'text',
      type: PlaylistContextType.MANIFEST,
      url,
      deliveryDirectives: null
    })
  }
  onLevelLoading(event, data) {
    const { id, level, url, deliveryDirectives } = data
    this.load({
      id,
      groupId: null,
      level,
      responseType: 'text',
      type: PlaylistContextType.LEVEL,
      url,
      deliveryDirectives
    })
  }
  onAudioTrackLoading(event, data) {
    const { id, groupId, url, deliveryDirectives } = data
    this.load({
      id,
      groupId,
      level: null,
      responseType: 'text',
      type: PlaylistContextType.AUDIO_TRACK,
      url,
      deliveryDirectives
    })
  }
  onSubtitleTrackLoading(event, data) {
    const { id, groupId, url, deliveryDirectives } = data
    this.load({
      id,
      groupId,
      level: null,
      responseType: 'text',
      type: PlaylistContextType.SUBTITLE_TRACK,
      url,
      deliveryDirectives
    })
  }
  load(context) {
    const config = this.hls.config
    let loader = this.getInternalLoader(context)
    if (loader) {
      const loaderContext = loader.context
      if (loaderContext && loaderContext.url === context.url) {
        logger.trace('[playlist-loader]: playlist request ongoing')
        return
      }
      logger.log(
        `[playlist-loader]: aborting previous loader for type: ${context.type}`
      )
      loader.abort()
    }
    let maxRetry
    let timeout
    let retryDelay
    let maxRetryDelay
    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        maxRetry = config.manifestLoadingMaxRetry
        timeout = config.manifestLoadingTimeOut
        retryDelay = config.manifestLoadingRetryDelay
        maxRetryDelay = config.manifestLoadingMaxRetryTimeout
        break
      case PlaylistContextType.LEVEL:
      case PlaylistContextType.AUDIO_TRACK:
      case PlaylistContextType.SUBTITLE_TRACK:
        maxRetry = 0
        timeout = config.levelLoadingTimeOut
        break
      default:
        maxRetry = config.levelLoadingMaxRetry
        timeout = config.levelLoadingTimeOut
        retryDelay = config.levelLoadingRetryDelay
        maxRetryDelay = config.levelLoadingMaxRetryTimeout
        break
    }
    loader = this.createInternalLoader(context)
    if (context.deliveryDirectives?.part) {
      let levelDetails
      if (
        context.type === PlaylistContextType.LEVEL &&
        context.level !== null
      ) {
        levelDetails = this.hls.levels[context.level].details
      } else if (
        context.type === PlaylistContextType.AUDIO_TRACK &&
        context.id !== null
      ) {
        levelDetails = this.hls.audioTracks[context.id].details
      } else if (
        context.type === PlaylistContextType.SUBTITLE_TRACK &&
        context.id !== null
      ) {
        levelDetails = this.hls.subtitleTracks[context.id].details
      }
      if (levelDetails) {
        const partTarget = levelDetails.partTarget
        const targetDuration = levelDetails.targetduration
        if (partTarget && targetDuration) {
          timeout = Math.min(
            Math.max(partTarget * 3, targetDuration * 0.8) * 1e3,
            timeout
          )
        }
      }
    }
    const loaderConfig = {
      timeout,
      maxRetry,
      retryDelay,
      maxRetryDelay,
      highWaterMark: 0
    }
    const loaderCallbacks = {
      onSuccess: this.loadsuccess.bind(this),
      onError: this.loaderror.bind(this),
      onTimeout: this.loadtimeout.bind(this)
    }
    loader.load(context, loaderConfig, loaderCallbacks)
  }
  loadsuccess(response, stats, context, networkDetails = null) {
    if (context.isSidxRequest) {
      this.handleSidxRequest(response, context)
      this.handlePlaylistLoaded(response, stats, context, networkDetails)
      return
    }
    this.resetInternalLoader(context.type)
    const string = response.data
    if (string.indexOf('#EXTM3U') !== 0) {
      this.handleManifestParsingError(
        response,
        context,
        'no EXTM3U delimiter',
        networkDetails
      )
      return
    }
    stats.parsing.start = performance.now()
    if (
      string.indexOf('#EXTINF:') > 0 ||
      string.indexOf('#EXT-X-TARGETDURATION:') > 0
    ) {
      this.handleTrackOrLevelPlaylist(response, stats, context, networkDetails)
    } else {
      this.handleMasterPlaylist(response, stats, context, networkDetails)
    }
  }
  loaderror(response, context, networkDetails = null) {
    this.handleNetworkError(context, networkDetails, false, response)
  }
  loadtimeout(stats, context, networkDetails = null) {
    this.handleNetworkError(context, networkDetails, true)
  }
  handleMasterPlaylist(response, stats, context, networkDetails) {
    const hls = this.hls
    const string = response.data
    const url = getResponseUrl(response, context)
    const { levels, sessionData } = m3u8_parser_default.parseMasterPlaylist(
      string,
      url
    )
    if (!levels.length) {
      this.handleManifestParsingError(
        response,
        context,
        'no level found in manifest',
        networkDetails
      )
      return
    }
    const audioGroups = levels.map(level => ({
      id: level.attrs.AUDIO,
      audioCodec: level.audioCodec
    }))
    const subtitleGroups = levels.map(level => ({
      id: level.attrs.SUBTITLES,
      textCodec: level.textCodec
    }))
    const audioTracks = m3u8_parser_default.parseMasterPlaylistMedia(
      string,
      url,
      'AUDIO',
      audioGroups
    )
    const subtitles = m3u8_parser_default.parseMasterPlaylistMedia(
      string,
      url,
      'SUBTITLES',
      subtitleGroups
    )
    const captions = m3u8_parser_default.parseMasterPlaylistMedia(
      string,
      url,
      'CLOSED-CAPTIONS'
    )
    if (audioTracks.length) {
      const embeddedAudioFound = audioTracks.some(audioTrack => !audioTrack.url)
      if (
        !embeddedAudioFound &&
        levels[0].audioCodec &&
        !levels[0].attrs.AUDIO
      ) {
        logger.log(
          '[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one'
        )
        audioTracks.unshift({
          type: 'main',
          name: 'main',
          default: false,
          autoselect: false,
          forced: false,
          id: -1,
          attrs: new AttrList({}),
          bitrate: 0,
          url: ''
        })
      }
    }
    hls.trigger(Events.MANIFEST_LOADED, {
      levels,
      audioTracks,
      subtitles,
      captions,
      url,
      stats,
      networkDetails,
      sessionData
    })
  }
  handleTrackOrLevelPlaylist(response, stats, context, networkDetails) {
    const hls = this.hls
    const { id, level, type } = context
    const url = getResponseUrl(response, context)
    const levelUrlId = Number.isFinite(id) ? id : 0
    const levelId = Number.isFinite(level) ? level : levelUrlId
    const levelType = mapContextToLevelType(context)
    const levelDetails = m3u8_parser_default.parseLevelPlaylist(
      response.data,
      url,
      levelId,
      levelType,
      levelUrlId
    )
    if (!levelDetails.fragments.length) {
      hls.trigger(Events.ERROR, {
        type: ErrorTypes.NETWORK_ERROR,
        details: ErrorDetails.LEVEL_EMPTY_ERROR,
        fatal: false,
        url,
        reason: 'no fragments found in level',
        level: typeof context.level === 'number' ? context.level : void 0
      })
      return
    }
    if (type === PlaylistContextType.MANIFEST) {
      const singleLevel = {
        attrs: new AttrList({}),
        bitrate: 0,
        details: levelDetails,
        name: '',
        url
      }
      hls.trigger(Events.MANIFEST_LOADED, {
        levels: [singleLevel],
        audioTracks: [],
        url,
        stats,
        networkDetails,
        sessionData: null
      })
    }
    stats.parsing.end = performance.now()
    if (levelDetails.needSidxRanges) {
      const sidxUrl = levelDetails.initSegment.url
      this.load({
        url: sidxUrl,
        isSidxRequest: true,
        type,
        level,
        levelDetails,
        id,
        groupId: null,
        rangeStart: 0,
        rangeEnd: 2048,
        responseType: 'arraybuffer',
        deliveryDirectives: null
      })
      return
    }
    context.levelDetails = levelDetails
    this.handlePlaylistLoaded(response, stats, context, networkDetails)
  }
  handleSidxRequest(response, context) {
    const sidxInfo = parseSegmentIndex(new Uint8Array(response.data))
    if (!sidxInfo) {
      return
    }
    const sidxReferences = sidxInfo.references
    const levelDetails = context.levelDetails
    sidxReferences.forEach((segmentRef, index) => {
      const segRefInfo = segmentRef.info
      const frag = levelDetails.fragments[index]
      if (frag.byteRange.length === 0) {
        frag.setByteRange(
          String(1 + segRefInfo.end - segRefInfo.start) +
            '@' +
            String(segRefInfo.start)
        )
      }
    })
    levelDetails.initSegment.setByteRange(String(sidxInfo.moovEndOffset) + '@0')
  }
  handleManifestParsingError(response, context, reason, networkDetails) {
    this.hls.trigger(Events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.MANIFEST_PARSING_ERROR,
      fatal: context.type === PlaylistContextType.MANIFEST,
      url: response.url,
      reason,
      response,
      context,
      networkDetails
    })
  }
  handleNetworkError(context, networkDetails, timeout = false, response) {
    logger.warn(
      `[playlist-loader]: A network ${
        timeout ? 'timeout' : 'error'
      } occurred while loading ${context.type} level: ${context.level} id: ${
        context.id
      } group-id: "${context.groupId}"`
    )
    let details = ErrorDetails.UNKNOWN
    let fatal = false
    const loader = this.getInternalLoader(context)
    switch (context.type) {
      case PlaylistContextType.MANIFEST:
        details = timeout
          ? ErrorDetails.MANIFEST_LOAD_TIMEOUT
          : ErrorDetails.MANIFEST_LOAD_ERROR
        fatal = true
        break
      case PlaylistContextType.LEVEL:
        details = timeout
          ? ErrorDetails.LEVEL_LOAD_TIMEOUT
          : ErrorDetails.LEVEL_LOAD_ERROR
        fatal = false
        break
      case PlaylistContextType.AUDIO_TRACK:
        details = timeout
          ? ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT
          : ErrorDetails.AUDIO_TRACK_LOAD_ERROR
        fatal = false
        break
      case PlaylistContextType.SUBTITLE_TRACK:
        details = timeout
          ? ErrorDetails.SUBTITLE_TRACK_LOAD_TIMEOUT
          : ErrorDetails.SUBTITLE_LOAD_ERROR
        fatal = false
        break
    }
    if (loader) {
      this.resetInternalLoader(context.type)
    }
    const errorData = {
      type: ErrorTypes.NETWORK_ERROR,
      details,
      fatal,
      url: context.url,
      loader,
      context,
      networkDetails
    }
    if (response) {
      errorData.response = response
    }
    this.hls.trigger(Events.ERROR, errorData)
  }
  handlePlaylistLoaded(response, stats, context, networkDetails) {
    const {
      type,
      level,
      id,
      groupId,
      loader,
      levelDetails,
      deliveryDirectives
    } = context
    if (!levelDetails?.targetduration) {
      this.handleManifestParsingError(
        response,
        context,
        'invalid target duration',
        networkDetails
      )
      return
    }
    if (!loader) {
      return
    }
    if (levelDetails.live) {
      if (loader.getCacheAge) {
        levelDetails.ageHeader = loader.getCacheAge() || 0
      }
      if (!loader.getCacheAge || isNaN(levelDetails.ageHeader)) {
        levelDetails.ageHeader = 0
      }
    }
    switch (type) {
      case PlaylistContextType.MANIFEST:
      case PlaylistContextType.LEVEL:
        this.hls.trigger(Events.LEVEL_LOADED, {
          details: levelDetails,
          level: level || 0,
          id: id || 0,
          stats,
          networkDetails,
          deliveryDirectives
        })
        break
      case PlaylistContextType.AUDIO_TRACK:
        this.hls.trigger(Events.AUDIO_TRACK_LOADED, {
          details: levelDetails,
          id: id || 0,
          groupId: groupId || '',
          stats,
          networkDetails,
          deliveryDirectives
        })
        break
      case PlaylistContextType.SUBTITLE_TRACK:
        this.hls.trigger(Events.SUBTITLE_TRACK_LOADED, {
          details: levelDetails,
          id: id || 0,
          groupId: groupId || '',
          stats,
          networkDetails,
          deliveryDirectives
        })
        break
    }
  }
}
var playlist_loader_default = PlaylistLoader

// src/loader/key-loader.ts
var KeyLoader = class {
  constructor(hls) {
    this.loaders = {}
    this.decryptkey = null
    this.decrypturl = null
    this.hls = hls
    this._registerListeners()
  }
  _registerListeners() {
    this.hls.on(Events.KEY_LOADING, this.onKeyLoading, this)
  }
  _unregisterListeners() {
    this.hls.off(Events.KEY_LOADING, this.onKeyLoading)
  }
  destroy() {
    this._unregisterListeners()
    for (const loaderName in this.loaders) {
      const loader = this.loaders[loaderName]
      if (loader) {
        loader.destroy()
      }
    }
    this.loaders = {}
  }
  onKeyLoading(event, data) {
    const { frag } = data
    const type = frag.type
    const loader = this.loaders[type]
    if (!frag.decryptdata) {
      logger.warn('Missing decryption data on fragment in onKeyLoading')
      return
    }
    const uri = frag.decryptdata.uri
    if (uri !== this.decrypturl || this.decryptkey === null) {
      const config = this.hls.config
      if (loader) {
        logger.warn(`abort previous key loader for type:${type}`)
        loader.abort()
      }
      if (!uri) {
        logger.warn('key uri is falsy')
        return
      }
      const Loader = config.loader
      const fragLoader = (frag.loader = this.loaders[type] = new Loader(config))
      this.decrypturl = uri
      this.decryptkey = null
      const loaderContext = {
        url: uri,
        frag,
        responseType: 'arraybuffer'
      }
      const loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: config.fragLoadingRetryDelay,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: 0
      }
      const loaderCallbacks = {
        onSuccess: this.loadsuccess.bind(this),
        onError: this.loaderror.bind(this),
        onTimeout: this.loadtimeout.bind(this)
      }
      fragLoader.load(loaderContext, loaderConfig, loaderCallbacks)
    } else if (this.decryptkey) {
      frag.decryptdata.key = this.decryptkey
      this.hls.trigger(Events.KEY_LOADED, { frag })
    }
  }
  loadsuccess(response, stats, context) {
    const frag = context.frag
    if (!frag.decryptdata) {
      logger.error('after key load, decryptdata unset')
      return
    }
    this.decryptkey = frag.decryptdata.key = new Uint8Array(response.data)
    frag.loader = null
    delete this.loaders[frag.type]
    this.hls.trigger(Events.KEY_LOADED, { frag })
  }
  loaderror(response, context) {
    const frag = context.frag
    const loader = frag.loader
    if (loader) {
      loader.abort()
    }
    delete this.loaders[frag.type]
    this.hls.trigger(Events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.KEY_LOAD_ERROR,
      fatal: false,
      frag,
      response
    })
  }
  loadtimeout(stats, context) {
    const frag = context.frag
    const loader = frag.loader
    if (loader) {
      loader.abort()
    }
    delete this.loaders[frag.type]
    this.hls.trigger(Events.ERROR, {
      type: ErrorTypes.NETWORK_ERROR,
      details: ErrorDetails.KEY_LOAD_TIMEOUT,
      fatal: false,
      frag
    })
  }
}
var key_loader_default = KeyLoader

// src/utils/texttrack-utils.ts
function sendAddTrackEvent(track, videoEl) {
  let event
  try {
    event = new Event('addtrack')
  } catch (err) {
    event = document.createEvent('Event')
    event.initEvent('addtrack', false, false)
  }
  event.track = track
  videoEl.dispatchEvent(event)
}
function addCueToTrack(track, cue) {
  const mode = track.mode
  if (mode === 'disabled') {
    track.mode = 'hidden'
  }
  if (track.cues && !track.cues.getCueById(cue.id)) {
    try {
      track.addCue(cue)
      if (!track.cues.getCueById(cue.id)) {
        throw new Error(`addCue is failed for: ${cue}`)
      }
    } catch (err) {
      logger.debug(`[texttrack-utils]: ${err}`)
      const textTrackCue = new self.TextTrackCue(
        cue.startTime,
        cue.endTime,
        cue.text
      )
      textTrackCue.id = cue.id
      track.addCue(textTrackCue)
    }
  }
  if (mode === 'disabled') {
    track.mode = mode
  }
}
function clearCurrentCues(track) {
  const mode = track.mode
  if (mode === 'disabled') {
    track.mode = 'hidden'
  }
  if (!track.cues) {
    return
  }
  for (let i = track.cues.length; i--; ) {
    track.removeCue(track.cues[i])
  }
  if (mode === 'disabled') {
    track.mode = mode
  }
}
function removeCuesInRange(track, start, end) {
  const mode = track.mode
  if (mode === 'disabled') {
    track.mode = 'hidden'
  }
  if (!track.cues || !track.cues.length) {
    return
  }
  const cues = getCuesInRange(track.cues, start, end)
  for (let i = 0; i < cues.length; i++) {
    track.removeCue(cues[i])
  }
  if (mode === 'disabled') {
    track.mode = mode
  }
}
function getFirstCueIndexAfterTime(cues, time) {
  if (time < cues[0].startTime) {
    return 0
  }
  const len = cues.length - 1
  if (time > cues[len].endTime) {
    return -1
  }
  let left = 0
  let right = len
  while (left <= right) {
    const mid = Math.floor((right + left) / 2)
    if (time < cues[mid].startTime) {
      right = mid - 1
    } else if (time > cues[mid].startTime && left < len) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return cues[left].startTime - time < time - cues[right].startTime
    ? left
    : right
}
function getCuesInRange(cues, start, end) {
  const cuesFound = []
  const firstCueInRange = getFirstCueIndexAfterTime(cues, start)
  if (firstCueInRange > -1) {
    for (let i = firstCueInRange, len = cues.length; i < len; i++) {
      const cue = cues[i]
      if (cue.startTime >= start && cue.endTime <= end) {
        cuesFound.push(cue)
      } else if (cue.startTime > end) {
        return cuesFound
      }
    }
  }
  return cuesFound
}

// src/demux/id3.ts
var isHeader = (data, offset) => {
  if (offset + 10 <= data.length) {
    if (
      data[offset] === 73 &&
      data[offset + 1] === 68 &&
      data[offset + 2] === 51
    ) {
      if (data[offset + 3] < 255 && data[offset + 4] < 255) {
        if (
          data[offset + 6] < 128 &&
          data[offset + 7] < 128 &&
          data[offset + 8] < 128 &&
          data[offset + 9] < 128
        ) {
          return true
        }
      }
    }
  }
  return false
}
var isFooter = (data, offset) => {
  if (offset + 10 <= data.length) {
    if (
      data[offset] === 51 &&
      data[offset + 1] === 68 &&
      data[offset + 2] === 73
    ) {
      if (data[offset + 3] < 255 && data[offset + 4] < 255) {
        if (
          data[offset + 6] < 128 &&
          data[offset + 7] < 128 &&
          data[offset + 8] < 128 &&
          data[offset + 9] < 128
        ) {
          return true
        }
      }
    }
  }
  return false
}
var getID3Data = (data, offset) => {
  const front = offset
  let length = 0
  while (isHeader(data, offset)) {
    length += 10
    const size = readSize(data, offset + 6)
    length += size
    if (isFooter(data, offset + 10)) {
      length += 10
    }
    offset += length
  }
  if (length > 0) {
    return data.subarray(front, front + length)
  }
  return void 0
}
var readSize = (data, offset) => {
  let size = 0
  size = (data[offset] & 127) << 21
  size |= (data[offset + 1] & 127) << 14
  size |= (data[offset + 2] & 127) << 7
  size |= data[offset + 3] & 127
  return size
}
var canParse = (data, offset) => {
  return (
    isHeader(data, offset) &&
    readSize(data, offset + 6) + 10 <= data.length - offset
  )
}
var getTimeStamp = data => {
  const frames = getID3Frames(data)
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i]
    if (isTimeStampFrame(frame)) {
      return readTimeStamp(frame)
    }
  }
  return void 0
}
var isTimeStampFrame = frame => {
  return (
    frame &&
    frame.key === 'PRIV' &&
    frame.info === 'com.apple.streaming.transportStreamTimestamp'
  )
}
var getFrameData = data => {
  const type = String.fromCharCode(data[0], data[1], data[2], data[3])
  const size = readSize(data, 4)
  const offset = 10
  return { type, size, data: data.subarray(offset, offset + size) }
}
var getID3Frames = id3Data => {
  let offset = 0
  const frames = []
  while (isHeader(id3Data, offset)) {
    const size = readSize(id3Data, offset + 6)
    offset += 10
    const end = offset + size
    while (offset + 8 < end) {
      const frameData = getFrameData(id3Data.subarray(offset))
      const frame = decodeFrame(frameData)
      if (frame) {
        frames.push(frame)
      }
      offset += frameData.size + 10
    }
    if (isFooter(id3Data, offset)) {
      offset += 10
    }
  }
  return frames
}
var decodeFrame = frame => {
  if (frame.type === 'PRIV') {
    return decodePrivFrame(frame)
  } else if (frame.type[0] === 'W') {
    return decodeURLFrame(frame)
  }
  return decodeTextFrame(frame)
}
var decodePrivFrame = frame => {
  if (frame.size < 2) {
    return void 0
  }
  const owner = utf8ArrayToStr(frame.data, true)
  const privateData = new Uint8Array(frame.data.subarray(owner.length + 1))
  return { key: frame.type, info: owner, data: privateData.buffer }
}
var decodeTextFrame = frame => {
  if (frame.size < 2) {
    return void 0
  }
  if (frame.type === 'TXXX') {
    let index = 1
    const description = utf8ArrayToStr(frame.data.subarray(index), true)
    index += description.length + 1
    const value = utf8ArrayToStr(frame.data.subarray(index))
    return { key: frame.type, info: description, data: value }
  }
  const text = utf8ArrayToStr(frame.data.subarray(1))
  return { key: frame.type, data: text }
}
var decodeURLFrame = frame => {
  if (frame.type === 'WXXX') {
    if (frame.size < 2) {
      return void 0
    }
    let index = 1
    const description = utf8ArrayToStr(frame.data.subarray(index), true)
    index += description.length + 1
    const value = utf8ArrayToStr(frame.data.subarray(index))
    return { key: frame.type, info: description, data: value }
  }
  const url = utf8ArrayToStr(frame.data)
  return { key: frame.type, data: url }
}
var readTimeStamp = timeStampFrame => {
  if (timeStampFrame.data.byteLength === 8) {
    const data = new Uint8Array(timeStampFrame.data)
    const pts33Bit = data[3] & 1
    let timestamp = (data[4] << 23) + (data[5] << 15) + (data[6] << 7) + data[7]
    timestamp /= 45
    if (pts33Bit) {
      timestamp += 4772185884e-2
    }
    return Math.round(timestamp)
  }
  return void 0
}
var utf8ArrayToStr = (array, exitOnNull = false) => {
  const decoder2 = getTextDecoder()
  if (decoder2) {
    const decoded = decoder2.decode(array)
    if (exitOnNull) {
      const idx = decoded.indexOf('\0')
      return idx !== -1 ? decoded.substring(0, idx) : decoded
    }
    return decoded.replace(/\0/g, '')
  }
  const len = array.length
  let c
  let char2
  let char3
  let out = ''
  let i = 0
  while (i < len) {
    c = array[i++]
    if (c === 0 && exitOnNull) {
      return out
    } else if (c === 0 || c === 3) {
      continue
    }
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        char2 = array[i++]
        out += String.fromCharCode(((c & 31) << 6) | (char2 & 63))
        break
      case 14:
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(
          ((c & 15) << 12) | ((char2 & 63) << 6) | ((char3 & 63) << 0)
        )
        break
      default:
    }
  }
  return out
}
var decoder
function getTextDecoder() {
  if (!decoder && typeof self.TextDecoder !== 'undefined') {
    decoder = new self.TextDecoder('utf-8')
  }
  return decoder
}

// src/controller/id3-track-controller.ts
var MIN_CUE_DURATION = 0.25
var ID3TrackController = class {
  constructor(hls) {
    this.id3Track = null
    this.media = null
    this.hls = hls
    this._registerListeners()
  }
  destroy() {
    this._unregisterListeners()
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this)
    hls.on(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this)
    hls.off(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
  }
  onMediaAttached(event, data) {
    this.media = data.media
  }
  onMediaDetaching() {
    if (!this.id3Track) {
      return
    }
    clearCurrentCues(this.id3Track)
    this.id3Track = null
    this.media = null
  }
  getID3Track(textTracks) {
    if (!this.media) {
      return
    }
    for (let i = 0; i < textTracks.length; i++) {
      const textTrack = textTracks[i]
      if (textTrack.kind === 'metadata' && textTrack.label === 'id3') {
        sendAddTrackEvent(textTrack, this.media)
        return textTrack
      }
    }
    return this.media.addTextTrack('metadata', 'id3')
  }
  onFragParsingMetadata(event, data) {
    if (!this.media) {
      return
    }
    const fragment = data.frag
    const samples = data.samples
    if (!this.id3Track) {
      this.id3Track = this.getID3Track(this.media.textTracks)
      this.id3Track.mode = 'hidden'
    }
    const Cue = self.WebKitDataCue || self.VTTCue || self.TextTrackCue
    for (let i = 0; i < samples.length; i++) {
      const frames = getID3Frames(samples[i].data)
      if (frames) {
        const startTime = samples[i].pts
        let endTime = i < samples.length - 1 ? samples[i + 1].pts : fragment.end
        const timeDiff = endTime - startTime
        if (timeDiff <= 0) {
          endTime = startTime + MIN_CUE_DURATION
        }
        for (let j = 0; j < frames.length; j++) {
          const frame = frames[j]
          if (!isTimeStampFrame(frame)) {
            const cue = new Cue(startTime, endTime, '')
            cue.value = frame
            this.id3Track.addCue(cue)
          }
        }
      }
    }
  }
  onBufferFlushing(event, { startOffset, endOffset, type }) {
    if (!type || type === 'audio') {
      const { id3Track } = this
      if (id3Track) {
        removeCuesInRange(id3Track, startOffset, endOffset)
      }
    }
  }
}
var id3_track_controller_default = ID3TrackController

// src/controller/latency-controller.ts
var LatencyController = class {
  constructor(hls) {
    this.media = null
    this.levelDetails = null
    this.currentTime = 0
    this.stallCount = 0
    this._latency = null
    this.timeupdateHandler = () => this.timeupdate()
    this.hls = hls
    this.config = hls.config
    this.registerListeners()
  }
  get latency() {
    return this._latency || 0
  }
  get maxLatency() {
    const { config, levelDetails } = this
    if (config.liveMaxLatencyDuration !== void 0) {
      return config.liveMaxLatencyDuration
    }
    return levelDetails
      ? config.liveMaxLatencyDurationCount * levelDetails.targetduration
      : 0
  }
  get targetLatency() {
    const { levelDetails } = this
    if (levelDetails === null) {
      return null
    }
    const { holdBack, partHoldBack, targetduration } = levelDetails
    const {
      liveSyncDuration,
      liveSyncDurationCount,
      lowLatencyMode
    } = this.config
    const userConfig = this.hls.userConfig
    let targetLatency = lowLatencyMode ? partHoldBack || holdBack : holdBack
    if (
      userConfig.liveSyncDuration ||
      userConfig.liveSyncDurationCount ||
      targetLatency === 0
    ) {
      targetLatency =
        liveSyncDuration !== void 0
          ? liveSyncDuration
          : liveSyncDurationCount * targetduration
    }
    const maxLiveSyncOnStallIncrease = targetduration
    const liveSyncOnStallIncrease = 1
    return (
      targetLatency +
      Math.min(
        this.stallCount * liveSyncOnStallIncrease,
        maxLiveSyncOnStallIncrease
      )
    )
  }
  get liveSyncPosition() {
    const liveEdge = this.estimateLiveEdge()
    const targetLatency = this.targetLatency
    const levelDetails = this.levelDetails
    if (liveEdge === null || targetLatency === null || levelDetails === null) {
      return null
    }
    const edge = levelDetails.edge
    const syncPosition = liveEdge - targetLatency - this.edgeStalled
    const min = edge - levelDetails.totalduration
    const max =
      edge -
      ((this.config.lowLatencyMode && levelDetails.partTarget) ||
        levelDetails.targetduration)
    return Math.min(Math.max(min, syncPosition), max)
  }
  get drift() {
    const { levelDetails } = this
    if (levelDetails === null) {
      return 1
    }
    return levelDetails.drift
  }
  get edgeStalled() {
    const { levelDetails } = this
    if (levelDetails === null) {
      return 0
    }
    const maxLevelUpdateAge =
      ((this.config.lowLatencyMode && levelDetails.partTarget) ||
        levelDetails.targetduration) * 3
    return Math.max(levelDetails.age - maxLevelUpdateAge, 0)
  }
  get forwardBufferLength() {
    const { media, levelDetails } = this
    if (!media || !levelDetails) {
      return 0
    }
    const bufferedRanges = media.buffered.length
    return bufferedRanges
      ? media.buffered.end(bufferedRanges - 1)
      : levelDetails.edge - this.currentTime
  }
  destroy() {
    this.unregisterListeners()
    this.onMediaDetaching()
    this.levelDetails = null
    this.hls = this.timeupdateHandler = null
  }
  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    this.hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    this.hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    this.hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this)
    this.hls.on(Events.ERROR, this.onError, this)
  }
  unregisterListeners() {
    this.hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached)
    this.hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching)
    this.hls.off(Events.MANIFEST_LOADING, this.onManifestLoading)
    this.hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated)
    this.hls.off(Events.ERROR, this.onError)
  }
  onMediaAttached(event, data) {
    this.media = data.media
    this.media.addEventListener('timeupdate', this.timeupdateHandler)
  }
  onMediaDetaching() {
    if (this.media) {
      this.media.removeEventListener('timeupdate', this.timeupdateHandler)
      this.media = null
    }
  }
  onManifestLoading() {
    this.levelDetails = null
    this._latency = null
    this.stallCount = 0
  }
  onLevelUpdated(event, { details }) {
    this.levelDetails = details
    if (details.advanced) {
      this.timeupdate()
    }
    if (!details.live && this.media) {
      this.media.removeEventListener('timeupdate', this.timeupdateHandler)
    }
  }
  onError(event, data) {
    if (data.details !== ErrorDetails.BUFFER_STALLED_ERROR) {
      return
    }
    this.stallCount++
    logger.warn(
      '[playback-rate-controller]: Stall detected, adjusting target latency'
    )
  }
  timeupdate() {
    const { media, levelDetails } = this
    if (!media || !levelDetails) {
      return
    }
    this.currentTime = media.currentTime
    const latency = this.computeLatency()
    if (latency === null) {
      return
    }
    this._latency = latency
    const { lowLatencyMode, maxLiveSyncPlaybackRate } = this.config
    if (!lowLatencyMode || maxLiveSyncPlaybackRate === 1) {
      return
    }
    const targetLatency = this.targetLatency
    if (targetLatency === null) {
      return
    }
    const distanceFromTarget = latency - targetLatency
    const liveMinLatencyDuration = Math.min(
      this.maxLatency,
      targetLatency + levelDetails.targetduration
    )
    const inLiveRange = distanceFromTarget < liveMinLatencyDuration
    if (
      levelDetails.live &&
      inLiveRange &&
      distanceFromTarget > 0.05 &&
      this.forwardBufferLength > 1
    ) {
      const max = Math.min(2, Math.max(1, maxLiveSyncPlaybackRate))
      const rate =
        Math.round(
          (2 / (1 + Math.exp(-0.75 * distanceFromTarget - this.edgeStalled))) *
            20
        ) / 20
      media.playbackRate = Math.min(max, Math.max(1, rate))
    } else if (media.playbackRate !== 1 && media.playbackRate !== 0) {
      media.playbackRate = 1
    }
  }
  estimateLiveEdge() {
    const { levelDetails } = this
    if (levelDetails === null) {
      return null
    }
    return levelDetails.edge + levelDetails.age
  }
  computeLatency() {
    const liveEdge = this.estimateLiveEdge()
    if (liveEdge === null) {
      return null
    }
    return liveEdge - this.currentTime
  }
}
var latency_controller_default = LatencyController

// src/types/level.ts
var HlsSkip
;(function (HlsSkip2) {
  HlsSkip2['No'] = ''
  HlsSkip2['Yes'] = 'YES'
  HlsSkip2['v2'] = 'v2'
})(HlsSkip || (HlsSkip = {}))
function getSkipValue(details, msn) {
  const { canSkipUntil, canSkipDateRanges, endSN } = details
  const snChangeGoal = msn !== void 0 ? msn - endSN : 0
  if (canSkipUntil && snChangeGoal < canSkipUntil) {
    if (canSkipDateRanges) {
      return HlsSkip.v2
    }
    return HlsSkip.Yes
  }
  return HlsSkip.No
}
var HlsUrlParameters = class {
  constructor(msn, part, skip) {
    this.msn = msn
    this.part = part
    this.skip = skip
  }
  addDirectives(uri) {
    const url = new self.URL(uri)
    if (this.msn !== void 0) {
      url.searchParams.set('_HLS_msn', this.msn.toString())
    }
    if (this.part !== void 0) {
      url.searchParams.set('_HLS_part', this.part.toString())
    }
    if (this.skip) {
      url.searchParams.set('_HLS_skip', this.skip)
    }
    return url.toString()
  }
}
var Level = class {
  constructor(data) {
    this.fragmentError = 0
    this.loadError = 0
    this.realBitrate = 0
    this._urlId = 0
    this.url = [data.url]
    this.attrs = data.attrs
    this.bitrate = data.bitrate
    if (data.details) {
      this.details = data.details
    }
    this.id = data.id || 0
    this.name = data.name
    this.width = data.width || 0
    this.height = data.height || 0
    this.audioCodec = data.audioCodec
    this.videoCodec = data.videoCodec
    this.unknownCodecs = data.unknownCodecs
    this.codecSet = [data.videoCodec, data.audioCodec]
      .filter(c => c)
      .join(',')
      .replace(/\.[^.,]+/g, '')
  }
  get maxBitrate() {
    return Math.max(this.realBitrate, this.bitrate)
  }
  get uri() {
    return this.url[this._urlId] || ''
  }
  get urlId() {
    return this._urlId
  }
  set urlId(value) {
    const newValue = value % this.url.length
    if (this._urlId !== newValue) {
      this.details = void 0
      this._urlId = newValue
    }
  }
}

// src/controller/level-helper.ts
function addGroupId(level, type, id) {
  switch (type) {
    case 'audio':
      if (!level.audioGroupIds) {
        level.audioGroupIds = []
      }
      level.audioGroupIds.push(id)
      break
    case 'text':
      if (!level.textGroupIds) {
        level.textGroupIds = []
      }
      level.textGroupIds.push(id)
      break
  }
}
function assignTrackIdsByGroup(tracks) {
  const groups = {}
  tracks.forEach(track => {
    const groupId = track.groupId || ''
    track.id = groups[groupId] = groups[groupId] || 0
    groups[groupId]++
  })
}
function updateFromToPTS(fragFrom, fragTo) {
  const fragToPTS = fragTo.startPTS
  if (Number.isFinite(fragToPTS)) {
    let duration = 0
    let frag
    if (fragTo.sn > fragFrom.sn) {
      duration = fragToPTS - fragFrom.start
      frag = fragFrom
    } else {
      duration = fragFrom.start - fragToPTS
      frag = fragTo
    }
    if (frag.duration !== duration) {
      frag.duration = duration
    }
  } else if (fragTo.sn > fragFrom.sn) {
    const contiguous = fragFrom.cc === fragTo.cc
    if (contiguous && fragFrom.minEndPTS) {
      fragTo.start = fragFrom.start + (fragFrom.minEndPTS - fragFrom.start)
    } else {
      fragTo.start = fragFrom.start + fragFrom.duration
    }
  } else {
    fragTo.start = Math.max(fragFrom.start - fragTo.duration, 0)
  }
}
function updateFragPTSDTS(details, frag, startPTS, endPTS, startDTS, endDTS) {
  const parsedMediaDuration = endPTS - startPTS
  if (parsedMediaDuration <= 0) {
    logger.warn('Fragment should have a positive duration', frag)
    endPTS = startPTS + frag.duration
    endDTS = startDTS + frag.duration
  }
  let maxStartPTS = startPTS
  let minEndPTS = endPTS
  const fragStartPts = frag.startPTS
  const fragEndPts = frag.endPTS
  if (Number.isFinite(fragStartPts)) {
    const deltaPTS = Math.abs(fragStartPts - startPTS)
    if (!Number.isFinite(frag.deltaPTS)) {
      frag.deltaPTS = deltaPTS
    } else {
      frag.deltaPTS = Math.max(deltaPTS, frag.deltaPTS)
    }
    maxStartPTS = Math.max(startPTS, fragStartPts)
    startPTS = Math.min(startPTS, fragStartPts)
    startDTS = Math.min(startDTS, frag.startDTS)
    minEndPTS = Math.min(endPTS, fragEndPts)
    endPTS = Math.max(endPTS, fragEndPts)
    endDTS = Math.max(endDTS, frag.endDTS)
  }
  frag.duration = endPTS - startPTS
  const drift = startPTS - frag.start
  frag.appendedPTS = endPTS
  frag.start = frag.startPTS = startPTS
  frag.maxStartPTS = maxStartPTS
  frag.startDTS = startDTS
  frag.endPTS = endPTS
  frag.minEndPTS = minEndPTS
  frag.endDTS = endDTS
  const sn = frag.sn
  if (!details || sn < details.startSN || sn > details.endSN) {
    return 0
  }
  let i
  const fragIdx = sn - details.startSN
  const fragments = details.fragments
  fragments[fragIdx] = frag
  for (i = fragIdx; i > 0; i--) {
    updateFromToPTS(fragments[i], fragments[i - 1])
  }
  for (i = fragIdx; i < fragments.length - 1; i++) {
    updateFromToPTS(fragments[i], fragments[i + 1])
  }
  if (details.fragmentHint) {
    updateFromToPTS(fragments[fragments.length - 1], details.fragmentHint)
  }
  details.PTSKnown = details.alignedSliding = true
  return drift
}
function mergeDetails(oldDetails, newDetails) {
  if (newDetails.initSegment && oldDetails.initSegment) {
    newDetails.initSegment = oldDetails.initSegment
  }
  if (oldDetails.fragmentHint) {
    delete oldDetails.fragmentHint.endPTS
  }
  let ccOffset = 0
  let PTSFrag
  mapFragmentIntersection(oldDetails, newDetails, (oldFrag, newFrag) => {
    if (oldFrag.relurl) {
      ccOffset = oldFrag.cc - newFrag.cc
    }
    if (Number.isFinite(oldFrag.startPTS) && Number.isFinite(oldFrag.endPTS)) {
      newFrag.start = newFrag.startPTS = oldFrag.startPTS
      newFrag.startDTS = oldFrag.startDTS
      newFrag.appendedPTS = oldFrag.appendedPTS
      newFrag.maxStartPTS = oldFrag.maxStartPTS
      newFrag.endPTS = oldFrag.endPTS
      newFrag.endDTS = oldFrag.endDTS
      newFrag.minEndPTS = oldFrag.minEndPTS
      newFrag.duration = oldFrag.endPTS - oldFrag.startPTS
      if (newFrag.duration) {
        PTSFrag = newFrag
      }
      newDetails.PTSKnown = newDetails.alignedSliding = true
    }
    newFrag.elementaryStreams = oldFrag.elementaryStreams
    newFrag.loader = oldFrag.loader
    newFrag.stats = oldFrag.stats
    newFrag.urlId = oldFrag.urlId
  })
  if (newDetails.skippedSegments) {
    newDetails.deltaUpdateFailed = newDetails.fragments.some(frag => !frag)
    if (newDetails.deltaUpdateFailed) {
      logger.warn(
        '[level-helper] Previous playlist missing segments skipped in delta playlist'
      )
      for (let i = newDetails.skippedSegments; i--; ) {
        newDetails.fragments.shift()
      }
      newDetails.startSN = newDetails.fragments[0].sn
      newDetails.startCC = newDetails.fragments[0].cc
    }
  }
  const newFragments = newDetails.fragments
  if (ccOffset) {
    logger.warn('discontinuity sliding from playlist, take drift into account')
    for (let i = 0; i < newFragments.length; i++) {
      newFragments[i].cc += ccOffset
    }
  }
  if (newDetails.skippedSegments) {
    if (!newDetails.initSegment) {
      newDetails.initSegment = oldDetails.initSegment
    }
    newDetails.startCC = newDetails.fragments[0].cc
  }
  mapPartIntersection(
    oldDetails.partList,
    newDetails.partList,
    (oldPart, newPart) => {
      newPart.elementaryStreams = oldPart.elementaryStreams
      newPart.stats = oldPart.stats
    }
  )
  if (PTSFrag) {
    updateFragPTSDTS(
      newDetails,
      PTSFrag,
      PTSFrag.startPTS,
      PTSFrag.endPTS,
      PTSFrag.startDTS,
      PTSFrag.endDTS
    )
  } else {
    adjustSliding(oldDetails, newDetails)
  }
  if (newFragments.length) {
    newDetails.totalduration = newDetails.edge - newFragments[0].start
  }
  newDetails.driftStartTime = oldDetails.driftStartTime
  newDetails.driftStart = oldDetails.driftStart
  const advancedDateTime = newDetails.advancedDateTime
  if (newDetails.advanced && advancedDateTime) {
    const edge = newDetails.edge
    if (!newDetails.driftStart) {
      newDetails.driftStartTime = advancedDateTime
      newDetails.driftStart = edge
    }
    newDetails.driftEndTime = advancedDateTime
    newDetails.driftEnd = edge
  } else {
    newDetails.driftEndTime = oldDetails.driftEndTime
    newDetails.driftEnd = oldDetails.driftEnd
    newDetails.advancedDateTime = oldDetails.advancedDateTime
  }
}
function mapPartIntersection(oldParts, newParts, intersectionFn) {
  if (oldParts && newParts) {
    let delta = 0
    for (let i = 0, len = oldParts.length; i <= len; i++) {
      const oldPart = oldParts[i]
      const newPart = newParts[i + delta]
      if (
        oldPart &&
        newPart &&
        oldPart.index === newPart.index &&
        oldPart.fragment.sn === newPart.fragment.sn
      ) {
        intersectionFn(oldPart, newPart)
      } else {
        delta--
      }
    }
  }
}
function mapFragmentIntersection(oldDetails, newDetails, intersectionFn) {
  const skippedSegments = newDetails.skippedSegments
  const start =
    Math.max(oldDetails.startSN, newDetails.startSN) - newDetails.startSN
  const end =
    (oldDetails.fragmentHint ? 1 : 0) +
    (skippedSegments
      ? newDetails.endSN
      : Math.min(oldDetails.endSN, newDetails.endSN)) -
    newDetails.startSN
  const delta = newDetails.startSN - oldDetails.startSN
  const newFrags = newDetails.fragmentHint
    ? newDetails.fragments.concat(newDetails.fragmentHint)
    : newDetails.fragments
  const oldFrags = oldDetails.fragmentHint
    ? oldDetails.fragments.concat(oldDetails.fragmentHint)
    : oldDetails.fragments
  for (let i = start; i <= end; i++) {
    const oldFrag = oldFrags[delta + i]
    let newFrag = newFrags[i]
    if (skippedSegments && !newFrag && i < skippedSegments) {
      newFrag = newDetails.fragments[i] = oldFrag
    }
    if (oldFrag && newFrag) {
      intersectionFn(oldFrag, newFrag)
    }
  }
}
function adjustSliding(oldDetails, newDetails) {
  const delta =
    newDetails.startSN + newDetails.skippedSegments - oldDetails.startSN
  const oldFragments = oldDetails.fragments
  const newFragments = newDetails.fragments
  if (delta < 0 || delta >= oldFragments.length) {
    return
  }
  const playlistStartOffset = oldFragments[delta].start
  if (playlistStartOffset) {
    for (let i = newDetails.skippedSegments; i < newFragments.length; i++) {
      newFragments[i].start += playlistStartOffset
    }
    if (newDetails.fragmentHint) {
      newDetails.fragmentHint.start += playlistStartOffset
    }
  }
}
function computeReloadInterval(newDetails, stats) {
  const reloadInterval = 1e3 * newDetails.levelTargetDuration
  const reloadIntervalAfterMiss = reloadInterval / 2
  const timeSinceLastModified = newDetails.age
  const useLastModified =
    timeSinceLastModified > 0 && timeSinceLastModified < reloadInterval * 3
  const roundTrip = stats.loading.end - stats.loading.start
  let estimatedTimeUntilUpdate
  let availabilityDelay = newDetails.availabilityDelay
  if (newDetails.updated === false) {
    if (useLastModified) {
      const minRetry = 333 * newDetails.misses
      estimatedTimeUntilUpdate = Math.max(
        Math.min(reloadIntervalAfterMiss, roundTrip * 2),
        minRetry
      )
      newDetails.availabilityDelay =
        (newDetails.availabilityDelay || 0) + estimatedTimeUntilUpdate
    } else {
      estimatedTimeUntilUpdate = reloadIntervalAfterMiss
    }
  } else if (useLastModified) {
    availabilityDelay = Math.min(
      availabilityDelay || reloadInterval / 2,
      timeSinceLastModified
    )
    newDetails.availabilityDelay = availabilityDelay
    estimatedTimeUntilUpdate =
      availabilityDelay + reloadInterval - timeSinceLastModified
  } else {
    estimatedTimeUntilUpdate = reloadInterval - roundTrip
  }
  return Math.round(estimatedTimeUntilUpdate)
}
function getFragmentWithSN(level, sn) {
  if (!level || !level.details) {
    return null
  }
  const levelDetails = level.details
  let fragment = levelDetails.fragments[sn - levelDetails.startSN]
  if (fragment) {
    return fragment
  }
  fragment = levelDetails.fragmentHint
  if (fragment && fragment.sn === sn) {
    return fragment
  }
  return null
}
function getPartWith(level, sn, partIndex) {
  if (!level || !level.details) {
    return null
  }
  const partList = level.details.partList
  if (partList) {
    for (let i = partList.length; i--; ) {
      const part = partList[i]
      if (part.index === partIndex && part.fragment.sn === sn) {
        return part
      }
    }
  }
  return null
}

// src/controller/base-playlist-controller.ts
var BasePlaylistController = class {
  constructor(hls, logPrefix) {
    this.timer = -1
    this.canLoad = false
    this.retryCount = 0
    this.log = logger.log.bind(logger, `${logPrefix}:`)
    this.warn = logger.warn.bind(logger, `${logPrefix}:`)
    this.hls = hls
  }
  destroy() {
    this.clearTimer()
    this.hls = this.log = this.warn = null
  }
  onError(event, data) {
    if (data.fatal && data.type === ErrorTypes.NETWORK_ERROR) {
      this.clearTimer()
    }
  }
  clearTimer() {
    clearTimeout(this.timer)
    this.timer = -1
  }
  startLoad() {
    this.canLoad = true
    this.retryCount = 0
    this.loadPlaylist()
  }
  stopLoad() {
    this.canLoad = false
    this.clearTimer()
  }
  switchParams(playlistUri, previous) {
    const renditionReports = previous?.renditionReports
    if (renditionReports) {
      for (let i = 0; i < renditionReports.length; i++) {
        const attr = renditionReports[i]
        const uri = '' + attr.URI
        if (uri === playlistUri.substr(-uri.length)) {
          const msn = parseInt(attr['LAST-MSN'])
          let part = parseInt(attr['LAST-PART'])
          if (previous && this.hls.config.lowLatencyMode) {
            const currentGoal = Math.min(
              previous.age - previous.partTarget,
              previous.targetduration
            )
            if (part !== void 0 && currentGoal > previous.partTarget) {
              part += 1
            }
          }
          if (Number.isFinite(msn)) {
            return new HlsUrlParameters(
              msn,
              Number.isFinite(part) ? part : void 0,
              HlsSkip.No
            )
          }
        }
      }
    }
  }
  loadPlaylist(hlsUrlParameters) {}
  shouldLoadTrack(track) {
    return (
      this.canLoad &&
      track &&
      !!track.url &&
      (!track.details || track.details.live)
    )
  }
  playlistLoaded(index, data, previousDetails) {
    const { details, stats } = data
    const elapsed = stats.loading.end
      ? Math.max(0, self.performance.now() - stats.loading.end)
      : 0
    details.advancedDateTime = Date.now() - elapsed
    if (details.live || previousDetails?.live) {
      details.reloaded(previousDetails)
      if (previousDetails) {
        this.log(
          `live playlist ${index} ${
            details.advanced
              ? 'REFRESHED ' + details.lastPartSn + '-' + details.lastPartIndex
              : 'MISSED'
          }`
        )
      }
      if (previousDetails && details.fragments.length > 0) {
        mergeDetails(previousDetails, details)
      }
      if (!this.canLoad || !details.live) {
        return
      }
      let deliveryDirectives
      let msn = void 0
      let part = void 0
      if (details.canBlockReload && details.endSN && details.advanced) {
        const lowLatencyMode = this.hls.config.lowLatencyMode
        const lastPartSn = details.lastPartSn
        const endSn = details.endSN
        const lastPartIndex = details.lastPartIndex
        const hasParts = lastPartIndex !== -1
        const lastPart = lastPartSn === endSn
        const nextSnStartIndex = lowLatencyMode ? 0 : lastPartIndex
        if (hasParts) {
          msn = lastPart ? endSn + 1 : lastPartSn
          part = lastPart ? nextSnStartIndex : lastPartIndex + 1
        } else {
          msn = endSn + 1
        }
        const lastAdvanced = details.age
        const cdnAge = lastAdvanced + details.ageHeader
        let currentGoal = Math.min(
          cdnAge - details.partTarget,
          details.targetduration * 1.5
        )
        if (currentGoal > 0) {
          if (previousDetails && currentGoal > previousDetails.tuneInGoal) {
            this.warn(
              `CDN Tune-in goal increased from: ${previousDetails.tuneInGoal} to: ${currentGoal} with playlist age: ${details.age}`
            )
            currentGoal = 0
          } else {
            const segments = Math.floor(currentGoal / details.targetduration)
            msn += segments
            if (part !== void 0) {
              const parts = Math.round(
                (currentGoal % details.targetduration) / details.partTarget
              )
              part += parts
            }
            this.log(
              `CDN Tune-in age: ${
                details.ageHeader
              }s last advanced ${lastAdvanced.toFixed(
                2
              )}s goal: ${currentGoal} skip sn ${segments} to part ${part}`
            )
          }
          details.tuneInGoal = currentGoal
        }
        deliveryDirectives = this.getDeliveryDirectives(
          details,
          data.deliveryDirectives,
          msn,
          part
        )
        if (lowLatencyMode || !lastPart) {
          this.loadPlaylist(deliveryDirectives)
          return
        }
      } else {
        deliveryDirectives = this.getDeliveryDirectives(
          details,
          data.deliveryDirectives,
          msn,
          part
        )
      }
      let reloadInterval = computeReloadInterval(details, stats)
      if (msn !== void 0 && details.canBlockReload) {
        reloadInterval -= details.partTarget || 1
      }
      this.log(
        `reload live playlist ${index} in ${Math.round(reloadInterval)} ms`
      )
      this.timer = self.setTimeout(
        () => this.loadPlaylist(deliveryDirectives),
        reloadInterval
      )
    } else {
      this.clearTimer()
    }
  }
  getDeliveryDirectives(details, previousDeliveryDirectives, msn, part) {
    let skip = getSkipValue(details, msn)
    if (previousDeliveryDirectives?.skip && details.deltaUpdateFailed) {
      msn = previousDeliveryDirectives.msn
      part = previousDeliveryDirectives.part
      skip = HlsSkip.No
    }
    return new HlsUrlParameters(msn, part, skip)
  }
  retryLoadingOrFail(errorEvent) {
    const { config } = this.hls
    const retry = this.retryCount < config.levelLoadingMaxRetry
    if (retry) {
      this.retryCount++
      if (
        errorEvent.details.indexOf('LoadTimeOut') > -1 &&
        errorEvent.context?.deliveryDirectives
      ) {
        this.warn(
          `retry playlist loading #${this.retryCount} after "${errorEvent.details}"`
        )
        this.loadPlaylist()
      } else {
        const delay = Math.min(
          Math.pow(2, this.retryCount) * config.levelLoadingRetryDelay,
          config.levelLoadingMaxRetryTimeout
        )
        this.timer = self.setTimeout(() => this.loadPlaylist(), delay)
        this.warn(
          `retry playlist loading #${this.retryCount} in ${delay} ms after "${errorEvent.details}"`
        )
      }
    } else {
      this.warn(`cannot recover from error "${errorEvent.details}"`)
      this.clearTimer()
      errorEvent.fatal = true
    }
    return retry
  }
}
var base_playlist_controller_default = BasePlaylistController

// src/controller/level-controller.ts
var chromeOrFirefox = /chrome|firefox/.test(navigator.userAgent.toLowerCase())
var LevelController = class extends base_playlist_controller_default {
  constructor(hls) {
    super(hls, '[level-controller]')
    this._levels = []
    this._firstLevel = -1
    this.currentLevelIndex = -1
    this.manualLevelIndex = -1
    this._registerListeners()
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.MANIFEST_LOADED, this.onManifestLoaded, this)
    hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.on(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this)
    hls.on(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.on(Events.ERROR, this.onError, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.MANIFEST_LOADED, this.onManifestLoaded, this)
    hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.off(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this)
    hls.off(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.off(Events.ERROR, this.onError, this)
  }
  destroy() {
    this._unregisterListeners()
    this.manualLevelIndex = -1
    this._levels.length = 0
    super.destroy()
  }
  startLoad() {
    const levels = this._levels
    levels.forEach(level => {
      level.loadError = 0
    })
    super.startLoad()
  }
  onManifestLoaded(event, data) {
    let levels = []
    let audioTracks = []
    let subtitleTracks = []
    let bitrateStart
    const levelSet = {}
    let levelFromSet
    let resolutionFound = false
    let videoCodecFound = false
    let audioCodecFound = false
    data.levels.forEach(levelParsed => {
      const attributes = levelParsed.attrs
      resolutionFound =
        resolutionFound || !!(levelParsed.width && levelParsed.height)
      videoCodecFound = videoCodecFound || !!levelParsed.videoCodec
      audioCodecFound = audioCodecFound || !!levelParsed.audioCodec
      if (
        chromeOrFirefox &&
        levelParsed.audioCodec &&
        levelParsed.audioCodec.indexOf('mp4a.40.34') !== -1
      ) {
        levelParsed.audioCodec = void 0
      }
      levelFromSet = levelSet[levelParsed.bitrate]
      if (!levelFromSet) {
        levelFromSet = new Level(levelParsed)
        levelSet[levelParsed.bitrate] = levelFromSet
        levels.push(levelFromSet)
      } else {
        levelFromSet.url.push(levelParsed.url)
      }
      if (attributes) {
        if (attributes.AUDIO) {
          addGroupId(levelFromSet, 'audio', attributes.AUDIO)
        }
        if (attributes.SUBTITLES) {
          addGroupId(levelFromSet, 'text', attributes.SUBTITLES)
        }
      }
    })
    if ((resolutionFound || videoCodecFound) && audioCodecFound) {
      levels = levels.filter(
        ({ videoCodec, width, height }) => !!videoCodec || !!(width && height)
      )
    }
    levels = levels.filter(({ audioCodec, videoCodec }) => {
      return (
        (!audioCodec || isCodecSupportedInMp4(audioCodec, 'audio')) &&
        (!videoCodec || isCodecSupportedInMp4(videoCodec, 'video'))
      )
    })
    if (data.audioTracks) {
      audioTracks = data.audioTracks.filter(
        track =>
          !track.audioCodec || isCodecSupportedInMp4(track.audioCodec, 'audio')
      )
      assignTrackIdsByGroup(audioTracks)
    }
    if (data.subtitles) {
      subtitleTracks = data.subtitles
      assignTrackIdsByGroup(subtitleTracks)
    }
    if (levels.length > 0) {
      bitrateStart = levels[0].bitrate
      levels.sort((a, b) => a.bitrate - b.bitrate)
      this._levels = levels
      for (let i = 0; i < levels.length; i++) {
        if (levels[i].bitrate === bitrateStart) {
          this._firstLevel = i
          this.log(
            `manifest loaded, ${levels.length} level(s) found, first bitrate: ${bitrateStart}`
          )
          break
        }
      }
      const audioOnly = audioCodecFound && !videoCodecFound
      const edata = {
        levels,
        audioTracks,
        subtitleTracks,
        firstLevel: this._firstLevel,
        stats: data.stats,
        audio: audioCodecFound,
        video: videoCodecFound,
        altAudio: !audioOnly && audioTracks.some(t => !!t.url)
      }
      this.hls.trigger(Events.MANIFEST_PARSED, edata)
      if (this.hls.config.autoStartLoad || this.hls.forceStartLoad) {
        this.hls.startLoad(this.hls.config.startPosition)
      }
    } else {
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
        fatal: true,
        url: data.url,
        reason: 'no level with compatible codecs found in manifest'
      })
    }
  }
  get levels() {
    if (this._levels.length === 0) {
      return null
    }
    return this._levels
  }
  get level() {
    return this.currentLevelIndex
  }
  set level(newLevel) {
    const levels = this._levels
    if (levels.length === 0) {
      return
    }
    if (this.currentLevelIndex === newLevel && levels[newLevel]?.details) {
      return
    }
    if (newLevel < 0 || newLevel >= levels.length) {
      const fatal = newLevel < 0
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.OTHER_ERROR,
        details: ErrorDetails.LEVEL_SWITCH_ERROR,
        level: newLevel,
        fatal,
        reason: 'invalid level idx'
      })
      if (fatal) {
        return
      }
      newLevel = Math.min(newLevel, levels.length - 1)
    }
    this.clearTimer()
    const lastLevelIndex = this.currentLevelIndex
    const lastLevel = levels[lastLevelIndex]
    const level = levels[newLevel]
    this.log(`switching to level ${newLevel} from ${lastLevelIndex}`)
    this.currentLevelIndex = newLevel
    const levelSwitchingData = Object.assign({}, level, {
      level: newLevel,
      maxBitrate: level.maxBitrate,
      uri: level.uri,
      urlId: level.urlId
    })
    delete levelSwitchingData._urlId
    this.hls.trigger(Events.LEVEL_SWITCHING, levelSwitchingData)
    const levelDetails = level.details
    if (!levelDetails || levelDetails.live) {
      const hlsUrlParameters = this.switchParams(level.uri, lastLevel?.details)
      this.loadPlaylist(hlsUrlParameters)
    }
  }
  get manualLevel() {
    return this.manualLevelIndex
  }
  set manualLevel(newLevel) {
    this.manualLevelIndex = newLevel
    if (this._startLevel === void 0) {
      this._startLevel = newLevel
    }
    if (newLevel !== -1) {
      this.level = newLevel
    }
  }
  get firstLevel() {
    return this._firstLevel
  }
  set firstLevel(newLevel) {
    this._firstLevel = newLevel
  }
  get startLevel() {
    if (this._startLevel === void 0) {
      const configStartLevel = this.hls.config.startLevel
      if (configStartLevel !== void 0) {
        return configStartLevel
      } else {
        return this._firstLevel
      }
    } else {
      return this._startLevel
    }
  }
  set startLevel(newLevel) {
    this._startLevel = newLevel
  }
  onError(event, data) {
    super.onError(event, data)
    if (data.fatal) {
      return
    }
    const context = data.context
    const level = this._levels[this.currentLevelIndex]
    if (
      context &&
      ((context.type === PlaylistContextType.AUDIO_TRACK &&
        level.audioGroupIds &&
        context.groupId === level.audioGroupIds[level.urlId]) ||
        (context.type === PlaylistContextType.SUBTITLE_TRACK &&
          level.textGroupIds &&
          context.groupId === level.textGroupIds[level.urlId]))
    ) {
      this.redundantFailover(this.currentLevelIndex)
      return
    }
    let levelError = false
    let levelSwitch = true
    let levelIndex
    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
      case ErrorDetails.KEY_LOAD_ERROR:
      case ErrorDetails.KEY_LOAD_TIMEOUT:
        if (data.frag) {
          const level2 = this._levels[data.frag.level]
          if (level2) {
            level2.fragmentError++
            if (level2.fragmentError > this.hls.config.fragLoadingMaxRetry) {
              levelIndex = data.frag.level
            }
          } else {
            levelIndex = data.frag.level
          }
        }
        break
      case ErrorDetails.LEVEL_LOAD_ERROR:
      case ErrorDetails.LEVEL_LOAD_TIMEOUT:
        if (context) {
          if (context.deliveryDirectives) {
            levelSwitch = false
          }
          levelIndex = context.level
        }
        levelError = true
        break
      case ErrorDetails.REMUX_ALLOC_ERROR:
        levelIndex = data.level
        levelError = true
        break
    }
    if (levelIndex !== void 0) {
      this.recoverLevel(data, levelIndex, levelError, levelSwitch)
    }
  }
  recoverLevel(errorEvent, levelIndex, levelError, levelSwitch) {
    const { details: errorDetails } = errorEvent
    const level = this._levels[levelIndex]
    level.loadError++
    if (levelError) {
      const retrying = this.retryLoadingOrFail(errorEvent)
      if (retrying) {
        errorEvent.levelRetry = true
      } else {
        this.currentLevelIndex = -1
        return
      }
    }
    if (levelSwitch) {
      const redundantLevels = level.url.length
      if (redundantLevels > 1 && level.loadError < redundantLevels) {
        errorEvent.levelRetry = true
        this.redundantFailover(levelIndex)
      } else if (this.manualLevelIndex === -1) {
        const nextLevel =
          levelIndex === 0 ? this._levels.length - 1 : levelIndex - 1
        if (
          this.currentLevelIndex !== nextLevel &&
          this._levels[nextLevel].loadError === 0
        ) {
          this.warn(`${errorDetails}: switch to ${nextLevel}`)
          errorEvent.levelRetry = true
          this.hls.nextAutoLevel = nextLevel
        }
      }
    }
  }
  redundantFailover(levelIndex) {
    const level = this._levels[levelIndex]
    const redundantLevels = level.url.length
    if (redundantLevels > 1) {
      const newUrlId = (level.urlId + 1) % redundantLevels
      this.warn(`Switching to redundant URL-id ${newUrlId}`)
      this._levels.forEach(level2 => {
        level2.urlId = newUrlId
      })
      this.level = levelIndex
    }
  }
  onFragLoaded(event, { frag }) {
    if (frag !== void 0 && frag.type === PlaylistLevelType.MAIN) {
      const level = this._levels[frag.level]
      if (level !== void 0) {
        level.fragmentError = 0
        level.loadError = 0
      }
    }
  }
  onLevelLoaded(event, data) {
    const { level, details } = data
    const curLevel = this._levels[level]
    if (!curLevel) {
      this.warn(`Invalid level index ${level}`)
      if (data.deliveryDirectives?.skip) {
        details.deltaUpdateFailed = true
      }
      return
    }
    if (level === this.currentLevelIndex) {
      if (curLevel.fragmentError === 0) {
        curLevel.loadError = 0
        this.retryCount = 0
      }
      this.playlistLoaded(level, data, curLevel.details)
    } else if (data.deliveryDirectives?.skip) {
      details.deltaUpdateFailed = true
    }
  }
  onAudioTrackSwitched(event, data) {
    const currentLevel = this.hls.levels[this.currentLevelIndex]
    if (!currentLevel) {
      return
    }
    if (currentLevel.audioGroupIds) {
      let urlId = -1
      const audioGroupId = this.hls.audioTracks[data.id].groupId
      for (let i = 0; i < currentLevel.audioGroupIds.length; i++) {
        if (currentLevel.audioGroupIds[i] === audioGroupId) {
          urlId = i
          break
        }
      }
      if (urlId !== currentLevel.urlId) {
        currentLevel.urlId = urlId
        this.startLoad()
      }
    }
  }
  loadPlaylist(hlsUrlParameters) {
    const level = this.currentLevelIndex
    const currentLevel = this._levels[level]
    if (this.canLoad && currentLevel && currentLevel.url.length > 0) {
      const id = currentLevel.urlId
      let url = currentLevel.url[id]
      if (hlsUrlParameters) {
        try {
          url = hlsUrlParameters.addDirectives(url)
        } catch (error) {
          this.warn(
            `Could not construct new URL with HLS Delivery Directives: ${error}`
          )
        }
      }
      this.log(
        `Attempt loading level index ${level}${
          hlsUrlParameters
            ? ' at sn ' +
              hlsUrlParameters.msn +
              ' part ' +
              hlsUrlParameters.part
            : ''
        } with URL-id ${id} ${url}`
      )
      this.clearTimer()
      this.hls.trigger(Events.LEVEL_LOADING, {
        url,
        level,
        id,
        deliveryDirectives: hlsUrlParameters || null
      })
    }
  }
  get nextLoadLevel() {
    if (this.manualLevelIndex !== -1) {
      return this.manualLevelIndex
    } else {
      return this.hls.nextAutoLevel
    }
  }
  set nextLoadLevel(nextLevel) {
    this.level = nextLevel
    if (this.manualLevelIndex === -1) {
      this.hls.nextAutoLevel = nextLevel
    }
  }
  removeLevel(levelIndex, urlId) {
    const filterLevelAndGroupByIdIndex = (url, id) => id !== urlId
    const levels = this._levels
      .filter((level, index) => {
        if (index !== levelIndex) {
          return true
        }
        if (level.url.length > 1 && urlId !== void 0) {
          level.url = level.url.filter(filterLevelAndGroupByIdIndex)
          if (level.audioGroupIds) {
            level.audioGroupIds = level.audioGroupIds.filter(
              filterLevelAndGroupByIdIndex
            )
          }
          if (level.textGroupIds) {
            level.textGroupIds = level.textGroupIds.filter(
              filterLevelAndGroupByIdIndex
            )
          }
          level.urlId = 0
          return true
        }
        return false
      })
      .map((level, index) => {
        const { details } = level
        if (details?.fragments) {
          details.fragments.forEach(fragment => {
            fragment.level = index
          })
        }
        return level
      })
    this._levels = levels
    this.hls.trigger(Events.LEVELS_UPDATED, { levels })
  }
}
var level_controller_default = LevelController

// src/controller/fragment-tracker.ts
var FragmentState
;(function (FragmentState2) {
  FragmentState2['NOT_LOADED'] = 'NOT_LOADED'
  FragmentState2['BACKTRACKED'] = 'BACKTRACKED'
  FragmentState2['APPENDING'] = 'APPENDING'
  FragmentState2['PARTIAL'] = 'PARTIAL'
  FragmentState2['OK'] = 'OK'
})(FragmentState || (FragmentState = {}))
var FragmentTracker = class {
  constructor(hls) {
    this.activeFragment = null
    this.activeParts = null
    this.fragments = Object.create(null)
    this.timeRanges = Object.create(null)
    this.bufferPadding = 0.2
    this.hls = hls
    this._registerListeners()
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.BUFFER_APPENDED, this.onBufferAppended, this)
    hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this)
    hls.on(Events.FRAG_LOADED, this.onFragLoaded, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.BUFFER_APPENDED, this.onBufferAppended, this)
    hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this)
    hls.off(Events.FRAG_LOADED, this.onFragLoaded, this)
  }
  destroy() {
    this._unregisterListeners()
    this.fragments = this.timeRanges = null
  }
  getAppendedFrag(position, levelType) {
    if (levelType === PlaylistLevelType.MAIN) {
      const { activeFragment, activeParts } = this
      if (!activeFragment) {
        return null
      }
      if (activeParts) {
        for (let i = activeParts.length; i--; ) {
          const activePart = activeParts[i]
          const appendedPTS = activePart
            ? activePart.end
            : activeFragment.appendedPTS
          if (
            activePart.start <= position &&
            appendedPTS !== void 0 &&
            position <= appendedPTS
          ) {
            if (i > 9) {
              this.activeParts = activeParts.slice(i - 9)
            }
            return activePart
          }
        }
      } else if (
        activeFragment.start <= position &&
        activeFragment.appendedPTS !== void 0 &&
        position <= activeFragment.appendedPTS
      ) {
        return activeFragment
      }
    }
    return this.getBufferedFrag(position, levelType)
  }
  getBufferedFrag(position, levelType) {
    const { fragments } = this
    const keys = Object.keys(fragments)
    for (let i = keys.length; i--; ) {
      const fragmentEntity = fragments[keys[i]]
      if (fragmentEntity?.body.type === levelType && fragmentEntity.buffered) {
        const frag = fragmentEntity.body
        if (frag.start <= position && position <= frag.end) {
          return frag
        }
      }
    }
    return null
  }
  detectEvictedFragments(elementaryStream, timeRange, playlistType) {
    Object.keys(this.fragments).forEach(key => {
      const fragmentEntity = this.fragments[key]
      if (!fragmentEntity) {
        return
      }
      if (!fragmentEntity.buffered) {
        if (fragmentEntity.body.type === playlistType) {
          this.removeFragment(fragmentEntity.body)
        }
        return
      }
      const esData = fragmentEntity.range[elementaryStream]
      if (!esData) {
        return
      }
      esData.time.some(time => {
        const isNotBuffered = !this.isTimeBuffered(
          time.startPTS,
          time.endPTS,
          timeRange
        )
        if (isNotBuffered) {
          this.removeFragment(fragmentEntity.body)
        }
        return isNotBuffered
      })
    })
  }
  detectPartialFragments(data) {
    const timeRanges = this.timeRanges
    const { frag, part } = data
    if (!timeRanges || frag.sn === 'initSegment') {
      return
    }
    const fragKey = getFragmentKey(frag)
    const fragmentEntity = this.fragments[fragKey]
    if (!fragmentEntity) {
      return
    }
    Object.keys(timeRanges).forEach(elementaryStream => {
      const streamInfo = frag.elementaryStreams[elementaryStream]
      if (!streamInfo) {
        return
      }
      const timeRange = timeRanges[elementaryStream]
      const partial = part !== null || streamInfo.partial === true
      fragmentEntity.range[elementaryStream] = this.getBufferedTimes(
        frag,
        part,
        partial,
        timeRange
      )
    })
    fragmentEntity.backtrack = fragmentEntity.loaded = null
    if (Object.keys(fragmentEntity.range).length) {
      fragmentEntity.buffered = true
    } else {
      this.removeFragment(fragmentEntity.body)
    }
  }
  getBufferedTimes(fragment, part, partial, timeRange) {
    const buffered = {
      time: [],
      partial
    }
    const startPTS = part ? part.start : fragment.start
    const endPTS = part ? part.end : fragment.end
    const minEndPTS = fragment.minEndPTS || endPTS
    const maxStartPTS = fragment.maxStartPTS || startPTS
    for (let i = 0; i < timeRange.length; i++) {
      const startTime = timeRange.start(i) - this.bufferPadding
      const endTime = timeRange.end(i) + this.bufferPadding
      if (maxStartPTS >= startTime && minEndPTS <= endTime) {
        buffered.time.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        })
        break
      } else if (startPTS < endTime && endPTS > startTime) {
        buffered.partial = true
        buffered.time.push({
          startPTS: Math.max(startPTS, timeRange.start(i)),
          endPTS: Math.min(endPTS, timeRange.end(i))
        })
      } else if (endPTS <= startTime) {
        break
      }
    }
    return buffered
  }
  getPartialFragment(time) {
    let bestFragment = null
    let timePadding
    let startTime
    let endTime
    let bestOverlap = 0
    const { bufferPadding, fragments } = this
    Object.keys(fragments).forEach(key => {
      const fragmentEntity = fragments[key]
      if (!fragmentEntity) {
        return
      }
      if (isPartial(fragmentEntity)) {
        startTime = fragmentEntity.body.start - bufferPadding
        endTime = fragmentEntity.body.end + bufferPadding
        if (time >= startTime && time <= endTime) {
          timePadding = Math.min(time - startTime, endTime - time)
          if (bestOverlap <= timePadding) {
            bestFragment = fragmentEntity.body
            bestOverlap = timePadding
          }
        }
      }
    })
    return bestFragment
  }
  getState(fragment) {
    const fragKey = getFragmentKey(fragment)
    const fragmentEntity = this.fragments[fragKey]
    if (fragmentEntity) {
      if (!fragmentEntity.buffered) {
        if (fragmentEntity.backtrack) {
          return FragmentState.BACKTRACKED
        }
        return FragmentState.APPENDING
      } else if (isPartial(fragmentEntity)) {
        return FragmentState.PARTIAL
      } else {
        return FragmentState.OK
      }
    }
    return FragmentState.NOT_LOADED
  }
  backtrack(frag, data) {
    const fragKey = getFragmentKey(frag)
    const fragmentEntity = this.fragments[fragKey]
    if (!fragmentEntity || fragmentEntity.backtrack) {
      return null
    }
    const backtrack = (fragmentEntity.backtrack = data
      ? data
      : fragmentEntity.loaded)
    fragmentEntity.loaded = null
    return backtrack
  }
  getBacktrackData(fragment) {
    const fragKey = getFragmentKey(fragment)
    const fragmentEntity = this.fragments[fragKey]
    if (fragmentEntity) {
      const { backtrack } = fragmentEntity
      if (backtrack?.payload?.byteLength) {
        return backtrack
      } else {
        this.removeFragment(fragment)
      }
    }
    return null
  }
  isTimeBuffered(startPTS, endPTS, timeRange) {
    let startTime
    let endTime
    for (let i = 0; i < timeRange.length; i++) {
      startTime = timeRange.start(i) - this.bufferPadding
      endTime = timeRange.end(i) + this.bufferPadding
      if (startPTS >= startTime && endPTS <= endTime) {
        return true
      }
      if (endPTS <= startTime) {
        return false
      }
    }
    return false
  }
  onFragLoaded(event, data) {
    const { frag, part } = data
    if (frag.sn === 'initSegment' || frag.bitrateTest || part) {
      return
    }
    const fragKey = getFragmentKey(frag)
    this.fragments[fragKey] = {
      body: frag,
      loaded: data,
      backtrack: null,
      buffered: false,
      range: Object.create(null)
    }
  }
  onBufferAppended(event, data) {
    const { frag, part, timeRanges } = data
    if (frag.type === PlaylistLevelType.MAIN) {
      this.activeFragment = frag
      if (part) {
        let activeParts = this.activeParts
        if (!activeParts) {
          this.activeParts = activeParts = []
        }
        activeParts.push(part)
      } else {
        this.activeParts = null
      }
    }
    this.timeRanges = timeRanges
    Object.keys(timeRanges).forEach(elementaryStream => {
      const timeRange = timeRanges[elementaryStream]
      this.detectEvictedFragments(elementaryStream, timeRange)
      if (!part) {
        for (let i = 0; i < timeRange.length; i++) {
          frag.appendedPTS = Math.max(timeRange.end(i), frag.appendedPTS || 0)
        }
      }
    })
  }
  onFragBuffered(event, data) {
    this.detectPartialFragments(data)
  }
  hasFragment(fragment) {
    const fragKey = getFragmentKey(fragment)
    return !!this.fragments[fragKey]
  }
  removeFragment(fragment) {
    const fragKey = getFragmentKey(fragment)
    fragment.stats.loaded = 0
    fragment.clearElementaryStreamInfo()
    delete this.fragments[fragKey]
  }
  removeAllFragments() {
    this.fragments = Object.create(null)
    this.activeFragment = null
    this.activeParts = null
  }
}
function isPartial(fragmentEntity) {
  return (
    fragmentEntity.buffered &&
    (fragmentEntity.range.video?.partial || fragmentEntity.range.audio?.partial)
  )
}
function getFragmentKey(fragment) {
  return `${fragment.type}_${fragment.level}_${fragment.urlId}_${fragment.sn}`
}

// src/task-loop.ts
var TaskLoop = class {
  constructor() {
    this._tickTimer = null
    this._tickInterval = null
    this._tickCallCount = 0
    this._boundTick = this.tick.bind(this)
  }
  destroy() {
    this.onHandlerDestroying()
    this.onHandlerDestroyed()
  }
  onHandlerDestroying() {
    this.clearNextTick()
    this.clearInterval()
  }
  onHandlerDestroyed() {}
  hasInterval() {
    return !!this._tickInterval
  }
  hasNextTick() {
    return !!this._tickTimer
  }
  setInterval(millis) {
    if (!this._tickInterval) {
      this._tickInterval = self.setInterval(this._boundTick, millis)
      return true
    }
    return false
  }
  clearInterval() {
    if (this._tickInterval) {
      self.clearInterval(this._tickInterval)
      this._tickInterval = null
      return true
    }
    return false
  }
  clearNextTick() {
    if (this._tickTimer) {
      self.clearTimeout(this._tickTimer)
      this._tickTimer = null
      return true
    }
    return false
  }
  tick() {
    this._tickCallCount++
    if (this._tickCallCount === 1) {
      this.doTick()
      if (this._tickCallCount > 1) {
        this.clearNextTick()
        this._tickTimer = self.setTimeout(this._boundTick, 0)
      }
      this._tickCallCount = 0
    }
  }
  doTick() {}
}
var task_loop_default = TaskLoop

// src/utils/buffer-helper.ts
var noopBuffered = {
  length: 0,
  start: () => 0,
  end: () => 0
}
var BufferHelper = class {
  static isBuffered(media, position) {
    try {
      if (media) {
        const buffered = BufferHelper.getBuffered(media)
        for (let i = 0; i < buffered.length; i++) {
          if (position >= buffered.start(i) && position <= buffered.end(i)) {
            return true
          }
        }
      }
    } catch (error) {}
    return false
  }
  static bufferInfo(media, pos, maxHoleDuration) {
    try {
      if (media) {
        const vbuffered = BufferHelper.getBuffered(media)
        const buffered = []
        let i
        for (i = 0; i < vbuffered.length; i++) {
          buffered.push({ start: vbuffered.start(i), end: vbuffered.end(i) })
        }
        return this.bufferedInfo(buffered, pos, maxHoleDuration)
      }
    } catch (error) {}
    return { len: 0, start: pos, end: pos, nextStart: void 0 }
  }
  static bufferedInfo(buffered, pos, maxHoleDuration) {
    buffered.sort(function (a, b) {
      const diff = a.start - b.start
      if (diff) {
        return diff
      } else {
        return b.end - a.end
      }
    })
    let buffered2 = []
    if (maxHoleDuration) {
      for (let i = 0; i < buffered.length; i++) {
        const buf2len = buffered2.length
        if (buf2len) {
          const buf2end = buffered2[buf2len - 1].end
          if (buffered[i].start - buf2end < maxHoleDuration) {
            if (buffered[i].end > buf2end) {
              buffered2[buf2len - 1].end = buffered[i].end
            }
          } else {
            buffered2.push(buffered[i])
          }
        } else {
          buffered2.push(buffered[i])
        }
      }
    } else {
      buffered2 = buffered
    }
    let bufferLen = 0
    let bufferStartNext
    let bufferStart = pos
    let bufferEnd = pos
    for (let i = 0; i < buffered2.length; i++) {
      const start = buffered2[i].start
      const end = buffered2[i].end
      if (pos + maxHoleDuration >= start && pos < end) {
        bufferStart = start
        bufferEnd = end
        bufferLen = bufferEnd - pos
      } else if (pos + maxHoleDuration < start) {
        bufferStartNext = start
        break
      }
    }
    return {
      len: bufferLen,
      start: bufferStart || 0,
      end: bufferEnd || 0,
      nextStart: bufferStartNext
    }
  }
  static getBuffered(media) {
    try {
      return media.buffered
    } catch (e) {
      logger.log('failed to get media.buffered', e)
      return noopBuffered
    }
  }
}

// src/types/transmuxer.ts
var ChunkMetadata = class {
  constructor(level, sn, id, size = 0, part = -1, partial = false) {
    this.transmuxing = getNewPerformanceTiming()
    this.buffering = {
      audio: getNewPerformanceTiming(),
      video: getNewPerformanceTiming(),
      audiovideo: getNewPerformanceTiming()
    }
    this.level = level
    this.sn = sn
    this.id = id
    this.size = size
    this.part = part
    this.partial = partial
  }
}
function getNewPerformanceTiming() {
  return { start: 0, executeStart: 0, executeEnd: 0, end: 0 }
}

// src/utils/discontinuities.ts
function findFirstFragWithCC(fragments, cc) {
  let firstFrag = null
  for (let i = 0, len = fragments.length; i < len; i++) {
    const currentFrag = fragments[i]
    if (currentFrag && currentFrag.cc === cc) {
      firstFrag = currentFrag
      break
    }
  }
  return firstFrag
}
function shouldAlignOnDiscontinuities(lastFrag, lastLevel, details) {
  if (lastLevel.details) {
    if (
      details.endCC > details.startCC ||
      (lastFrag && lastFrag.cc < details.startCC)
    ) {
      return true
    }
  }
  return false
}
function findDiscontinuousReferenceFrag(prevDetails, curDetails) {
  const prevFrags = prevDetails.fragments
  const curFrags = curDetails.fragments
  if (!curFrags.length || !prevFrags.length) {
    logger.log('No fragments to align')
    return
  }
  const prevStartFrag = findFirstFragWithCC(prevFrags, curFrags[0].cc)
  if (!prevStartFrag || (prevStartFrag && !prevStartFrag.startPTS)) {
    logger.log('No frag in previous level to align on')
    return
  }
  return prevStartFrag
}
function adjustFragmentStart(frag, sliding) {
  if (frag) {
    const start = frag.start + sliding
    frag.start = frag.startPTS = start
    frag.endPTS = start + frag.duration
  }
}
function adjustSlidingStart(sliding, details) {
  const fragments = details.fragments
  for (let i = 0, len = fragments.length; i < len; i++) {
    adjustFragmentStart(fragments[i], sliding)
  }
  if (details.fragmentHint) {
    adjustFragmentStart(details.fragmentHint, sliding)
  }
  details.alignedSliding = true
}
function alignStream(lastFrag, lastLevel, details) {
  if (!lastLevel) {
    return
  }
  alignDiscontinuities(lastFrag, details, lastLevel)
  if (!details.alignedSliding && lastLevel.details) {
    alignPDT(details, lastLevel.details)
  }
  if (
    !details.alignedSliding &&
    lastLevel.details &&
    !details.skippedSegments
  ) {
    adjustSliding(lastLevel.details, details)
  }
}
function alignDiscontinuities(lastFrag, details, lastLevel) {
  if (shouldAlignOnDiscontinuities(lastFrag, lastLevel, details)) {
    const referenceFrag = findDiscontinuousReferenceFrag(
      lastLevel.details,
      details
    )
    if (referenceFrag && Number.isFinite(referenceFrag.start)) {
      logger.log(
        `Adjusting PTS using last level due to CC increase within current level ${details.url}`
      )
      adjustSlidingStart(referenceFrag.start, details)
    }
  }
}
function alignPDT(details, lastDetails) {
  if (
    !lastDetails.fragments.length ||
    !details.hasProgramDateTime ||
    !lastDetails.hasProgramDateTime
  ) {
    return
  }
  const lastPDT = lastDetails.fragments[0].programDateTime
  const newPDT = details.fragments[0].programDateTime
  const sliding = (newPDT - lastPDT) / 1e3 + lastDetails.fragments[0].start
  if (sliding && Number.isFinite(sliding)) {
    logger.log(
      `Adjusting PTS using programDateTime delta ${
        newPDT - lastPDT
      }ms, sliding:${sliding.toFixed(3)} ${details.url} `
    )
    adjustSlidingStart(sliding, details)
  }
}

// src/utils/binary-search.ts
var BinarySearch = {
  search: function (list, comparisonFn) {
    let minIndex = 0
    let maxIndex = list.length - 1
    let currentIndex = null
    let currentElement = null
    while (minIndex <= maxIndex) {
      currentIndex = ((minIndex + maxIndex) / 2) | 0
      currentElement = list[currentIndex]
      const comparisonResult = comparisonFn(currentElement)
      if (comparisonResult > 0) {
        minIndex = currentIndex + 1
      } else if (comparisonResult < 0) {
        maxIndex = currentIndex - 1
      } else {
        return currentElement
      }
    }
    return null
  }
}
var binary_search_default = BinarySearch

// src/controller/fragment-finders.ts
function findFragmentByPDT(fragments, PDTValue, maxFragLookUpTolerance) {
  if (
    PDTValue === null ||
    !Array.isArray(fragments) ||
    !fragments.length ||
    !Number.isFinite(PDTValue)
  ) {
    return null
  }
  const startPDT = fragments[0].programDateTime
  if (PDTValue < (startPDT || 0)) {
    return null
  }
  const endPDT = fragments[fragments.length - 1].endProgramDateTime
  if (PDTValue >= (endPDT || 0)) {
    return null
  }
  maxFragLookUpTolerance = maxFragLookUpTolerance || 0
  for (let seg = 0; seg < fragments.length; ++seg) {
    const frag = fragments[seg]
    if (pdtWithinToleranceTest(PDTValue, maxFragLookUpTolerance, frag)) {
      return frag
    }
  }
  return null
}
function findFragmentByPTS(
  fragPrevious,
  fragments,
  bufferEnd = 0,
  maxFragLookUpTolerance = 0
) {
  let fragNext = null
  if (fragPrevious) {
    fragNext = fragments[fragPrevious.sn - fragments[0].sn + 1]
  } else if (bufferEnd === 0 && fragments[0].start === 0) {
    fragNext = fragments[0]
  }
  if (
    fragNext &&
    fragmentWithinToleranceTest(bufferEnd, maxFragLookUpTolerance, fragNext) ===
      0
  ) {
    return fragNext
  }
  const foundFragment = binary_search_default.search(
    fragments,
    fragmentWithinToleranceTest.bind(null, bufferEnd, maxFragLookUpTolerance)
  )
  if (foundFragment) {
    return foundFragment
  }
  return fragNext
}
function fragmentWithinToleranceTest(
  bufferEnd = 0,
  maxFragLookUpTolerance = 0,
  candidate
) {
  const candidateLookupTolerance = Math.min(
    maxFragLookUpTolerance,
    candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0)
  )
  if (
    candidate.start + candidate.duration - candidateLookupTolerance <=
    bufferEnd
  ) {
    return 1
  } else if (
    candidate.start - candidateLookupTolerance > bufferEnd &&
    candidate.start
  ) {
    return -1
  }
  return 0
}
function pdtWithinToleranceTest(
  pdtBufferEnd,
  maxFragLookUpTolerance,
  candidate
) {
  const candidateLookupTolerance =
    Math.min(
      maxFragLookUpTolerance,
      candidate.duration + (candidate.deltaPTS ? candidate.deltaPTS : 0)
    ) * 1e3
  const endProgramDateTime = candidate.endProgramDateTime || 0
  return endProgramDateTime - candidateLookupTolerance > pdtBufferEnd
}
function findFragWithCC(fragments, cc) {
  return binary_search_default.search(fragments, candidate => {
    if (candidate.cc < cc) {
      return 1
    } else if (candidate.cc > cc) {
      return -1
    } else {
      return 0
    }
  })
}

// src/loader/fragment-loader.ts
var MIN_CHUNK_SIZE = Math.pow(2, 17)
var FragmentLoader = class {
  constructor(config) {
    this.loader = null
    this.partLoadTimeout = -1
    this.config = config
  }
  destroy() {
    if (this.loader) {
      this.loader.destroy()
      this.loader = null
    }
  }
  abort() {
    if (this.loader) {
      this.loader.abort()
    }
  }
  load(frag, onProgress) {
    const url = frag.url
    if (!url) {
      return Promise.reject(
        new LoadError(
          {
            type: ErrorTypes.NETWORK_ERROR,
            details: ErrorDetails.FRAG_LOAD_ERROR,
            fatal: false,
            frag,
            networkDetails: null
          },
          `Fragment does not have a ${url ? 'part list' : 'url'}`
        )
      )
    }
    this.abort()
    const config = this.config
    const FragmentILoader = config.fLoader
    const DefaultILoader = config.loader
    return new Promise((resolve, reject) => {
      if (this.loader) {
        this.loader.destroy()
      }
      const loader = (this.loader = frag.loader = FragmentILoader
        ? new FragmentILoader(config)
        : new DefaultILoader(config))
      const loaderContext = createLoaderContext(frag)
      const loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: MIN_CHUNK_SIZE
      }
      frag.stats = loader.stats
      loader.load(loaderContext, loaderConfig, {
        onSuccess: (response, stats, context, networkDetails) => {
          this.resetLoader(frag, loader)
          resolve({
            frag,
            part: null,
            payload: response.data,
            networkDetails
          })
        },
        onError: (response, context, networkDetails) => {
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_ERROR,
              fatal: false,
              frag,
              response,
              networkDetails
            })
          )
        },
        onAbort: (stats, context, networkDetails) => {
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.INTERNAL_ABORTED,
              fatal: false,
              frag,
              networkDetails
            })
          )
        },
        onTimeout: (response, context, networkDetails) => {
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_TIMEOUT,
              fatal: false,
              frag,
              networkDetails
            })
          )
        },
        onProgress: (stats, context, data, networkDetails) => {
          if (onProgress) {
            onProgress({
              frag,
              part: null,
              payload: data,
              networkDetails
            })
          }
        }
      })
    })
  }
  loadPart(frag, part, onProgress) {
    this.abort()
    const config = this.config
    const FragmentILoader = config.fLoader
    const DefaultILoader = config.loader
    return new Promise((resolve, reject) => {
      if (this.loader) {
        this.loader.destroy()
      }
      const loader = (this.loader = frag.loader = FragmentILoader
        ? new FragmentILoader(config)
        : new DefaultILoader(config))
      const loaderContext = createLoaderContext(frag, part)
      const loaderConfig = {
        timeout: config.fragLoadingTimeOut,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: config.fragLoadingMaxRetryTimeout,
        highWaterMark: MIN_CHUNK_SIZE
      }
      part.stats = loader.stats
      loader.load(loaderContext, loaderConfig, {
        onSuccess: (response, stats, context, networkDetails) => {
          this.resetLoader(frag, loader)
          this.updateStatsFromPart(frag, part)
          const partLoadedData = {
            frag,
            part,
            payload: response.data,
            networkDetails
          }
          onProgress(partLoadedData)
          resolve(partLoadedData)
        },
        onError: (response, context, networkDetails) => {
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_ERROR,
              fatal: false,
              frag,
              part,
              response,
              networkDetails
            })
          )
        },
        onAbort: (stats, context, networkDetails) => {
          frag.stats.aborted = part.stats.aborted
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.INTERNAL_ABORTED,
              fatal: false,
              frag,
              part,
              networkDetails
            })
          )
        },
        onTimeout: (response, context, networkDetails) => {
          this.resetLoader(frag, loader)
          reject(
            new LoadError({
              type: ErrorTypes.NETWORK_ERROR,
              details: ErrorDetails.FRAG_LOAD_TIMEOUT,
              fatal: false,
              frag,
              part,
              networkDetails
            })
          )
        }
      })
    })
  }
  updateStatsFromPart(frag, part) {
    const fragStats = frag.stats
    const partStats = part.stats
    const partTotal = partStats.total
    fragStats.loaded += partStats.loaded
    if (partTotal) {
      const estTotalParts = Math.round(frag.duration / part.duration)
      const estLoadedParts = Math.min(
        Math.round(fragStats.loaded / partTotal),
        estTotalParts
      )
      const estRemainingParts = estTotalParts - estLoadedParts
      const estRemainingBytes =
        estRemainingParts * Math.round(fragStats.loaded / estLoadedParts)
      fragStats.total = fragStats.loaded + estRemainingBytes
    } else {
      fragStats.total = Math.max(fragStats.loaded, fragStats.total)
    }
    const fragLoading = fragStats.loading
    const partLoading = partStats.loading
    if (fragLoading.start) {
      fragLoading.first += partLoading.first - partLoading.start
    } else {
      fragLoading.start = partLoading.start
      fragLoading.first = partLoading.first
    }
    fragLoading.end = partLoading.end
  }
  resetLoader(frag, loader) {
    frag.loader = null
    if (this.loader === loader) {
      self.clearTimeout(this.partLoadTimeout)
      this.loader = null
    }
    loader.destroy()
  }
}
var fragment_loader_default = FragmentLoader
function createLoaderContext(frag, part = null) {
  const segment = part || frag
  const loaderContext = {
    frag,
    part,
    responseType: 'arraybuffer',
    url: segment.url,
    rangeStart: 0,
    rangeEnd: 0
  }
  const start = segment.byteRangeStartOffset
  const end = segment.byteRangeEndOffset
  if (Number.isFinite(start) && Number.isFinite(end)) {
    loaderContext.rangeStart = start
    loaderContext.rangeEnd = end
  }
  return loaderContext
}
var LoadError = class extends Error {
  constructor(data, ...params) {
    super(...params)
    this.data = data
  }
}

// src/crypt/aes-crypto.ts
var AESCrypto = class {
  constructor(subtle, iv) {
    this.subtle = subtle
    this.aesIV = iv
  }
  decrypt(data, key) {
    return this.subtle.decrypt({ name: 'AES-CBC', iv: this.aesIV }, key, data)
  }
}
var aes_crypto_default = AESCrypto

// src/crypt/fast-aes-key.ts
var FastAESKey = class {
  constructor(subtle, key) {
    this.subtle = subtle
    this.key = key
  }
  expandKey() {
    return this.subtle.importKey('raw', this.key, { name: 'AES-CBC' }, false, [
      'encrypt',
      'decrypt'
    ])
  }
}
var fast_aes_key_default = FastAESKey

// src/crypt/aes-decryptor.ts
function removePadding(array) {
  const outputBytes = array.byteLength
  const paddingBytes =
    outputBytes && new DataView(array.buffer).getUint8(outputBytes - 1)
  if (paddingBytes) {
    return sliceUint8(array, 0, outputBytes - paddingBytes)
  }
  return array
}
var AESDecryptor = class {
  constructor() {
    this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
    this.subMix = [
      new Uint32Array(256),
      new Uint32Array(256),
      new Uint32Array(256),
      new Uint32Array(256)
    ]
    this.invSubMix = [
      new Uint32Array(256),
      new Uint32Array(256),
      new Uint32Array(256),
      new Uint32Array(256)
    ]
    this.sBox = new Uint32Array(256)
    this.invSBox = new Uint32Array(256)
    this.key = new Uint32Array(0)
    this.ksRows = 0
    this.keySize = 0
    this.initTable()
  }
  uint8ArrayToUint32Array_(arrayBuffer) {
    const view = new DataView(arrayBuffer)
    const newArray = new Uint32Array(4)
    for (let i = 0; i < 4; i++) {
      newArray[i] = view.getUint32(i * 4)
    }
    return newArray
  }
  initTable() {
    const sBox = this.sBox
    const invSBox = this.invSBox
    const subMix = this.subMix
    const subMix0 = subMix[0]
    const subMix1 = subMix[1]
    const subMix2 = subMix[2]
    const subMix3 = subMix[3]
    const invSubMix = this.invSubMix
    const invSubMix0 = invSubMix[0]
    const invSubMix1 = invSubMix[1]
    const invSubMix2 = invSubMix[2]
    const invSubMix3 = invSubMix[3]
    const d = new Uint32Array(256)
    let x = 0
    let xi = 0
    let i = 0
    for (i = 0; i < 256; i++) {
      if (i < 128) {
        d[i] = i << 1
      } else {
        d[i] = (i << 1) ^ 283
      }
    }
    for (i = 0; i < 256; i++) {
      let sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4)
      sx = (sx >>> 8) ^ (sx & 255) ^ 99
      sBox[x] = sx
      invSBox[sx] = x
      const x2 = d[x]
      const x4 = d[x2]
      const x8 = d[x4]
      let t = (d[sx] * 257) ^ (sx * 16843008)
      subMix0[x] = (t << 24) | (t >>> 8)
      subMix1[x] = (t << 16) | (t >>> 16)
      subMix2[x] = (t << 8) | (t >>> 24)
      subMix3[x] = t
      t = (x8 * 16843009) ^ (x4 * 65537) ^ (x2 * 257) ^ (x * 16843008)
      invSubMix0[sx] = (t << 24) | (t >>> 8)
      invSubMix1[sx] = (t << 16) | (t >>> 16)
      invSubMix2[sx] = (t << 8) | (t >>> 24)
      invSubMix3[sx] = t
      if (!x) {
        x = xi = 1
      } else {
        x = x2 ^ d[d[d[x8 ^ x2]]]
        xi ^= d[d[xi]]
      }
    }
  }
  expandKey(keyBuffer) {
    const key = this.uint8ArrayToUint32Array_(keyBuffer)
    let sameKey = true
    let offset = 0
    while (offset < key.length && sameKey) {
      sameKey = key[offset] === this.key[offset]
      offset++
    }
    if (sameKey) {
      return
    }
    this.key = key
    const keySize = (this.keySize = key.length)
    if (keySize !== 4 && keySize !== 6 && keySize !== 8) {
      throw new Error('Invalid aes key size=' + keySize)
    }
    const ksRows = (this.ksRows = (keySize + 6 + 1) * 4)
    let ksRow
    let invKsRow
    const keySchedule = (this.keySchedule = new Uint32Array(ksRows))
    const invKeySchedule = (this.invKeySchedule = new Uint32Array(ksRows))
    const sbox = this.sBox
    const rcon = this.rcon
    const invSubMix = this.invSubMix
    const invSubMix0 = invSubMix[0]
    const invSubMix1 = invSubMix[1]
    const invSubMix2 = invSubMix[2]
    const invSubMix3 = invSubMix[3]
    let prev
    let t
    for (ksRow = 0; ksRow < ksRows; ksRow++) {
      if (ksRow < keySize) {
        prev = keySchedule[ksRow] = key[ksRow]
        continue
      }
      t = prev
      if (ksRow % keySize === 0) {
        t = (t << 8) | (t >>> 24)
        t =
          (sbox[t >>> 24] << 24) |
          (sbox[(t >>> 16) & 255] << 16) |
          (sbox[(t >>> 8) & 255] << 8) |
          sbox[t & 255]
        t ^= rcon[(ksRow / keySize) | 0] << 24
      } else if (keySize > 6 && ksRow % keySize === 4) {
        t =
          (sbox[t >>> 24] << 24) |
          (sbox[(t >>> 16) & 255] << 16) |
          (sbox[(t >>> 8) & 255] << 8) |
          sbox[t & 255]
      }
      keySchedule[ksRow] = prev = (keySchedule[ksRow - keySize] ^ t) >>> 0
    }
    for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
      ksRow = ksRows - invKsRow
      if (invKsRow & 3) {
        t = keySchedule[ksRow]
      } else {
        t = keySchedule[ksRow - 4]
      }
      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t
      } else {
        invKeySchedule[invKsRow] =
          invSubMix0[sbox[t >>> 24]] ^
          invSubMix1[sbox[(t >>> 16) & 255]] ^
          invSubMix2[sbox[(t >>> 8) & 255]] ^
          invSubMix3[sbox[t & 255]]
      }
      invKeySchedule[invKsRow] = invKeySchedule[invKsRow] >>> 0
    }
  }
  networkToHostOrderSwap(word) {
    return (
      (word << 24) |
      ((word & 65280) << 8) |
      ((word & 16711680) >> 8) |
      (word >>> 24)
    )
  }
  decrypt(inputArrayBuffer, offset, aesIV) {
    const nRounds = this.keySize + 6
    const invKeySchedule = this.invKeySchedule
    const invSBOX = this.invSBox
    const invSubMix = this.invSubMix
    const invSubMix0 = invSubMix[0]
    const invSubMix1 = invSubMix[1]
    const invSubMix2 = invSubMix[2]
    const invSubMix3 = invSubMix[3]
    const initVector = this.uint8ArrayToUint32Array_(aesIV)
    let initVector0 = initVector[0]
    let initVector1 = initVector[1]
    let initVector2 = initVector[2]
    let initVector3 = initVector[3]
    const inputInt32 = new Int32Array(inputArrayBuffer)
    const outputInt32 = new Int32Array(inputInt32.length)
    let t0, t1, t2, t3
    let s0, s1, s2, s3
    let inputWords0, inputWords1, inputWords2, inputWords3
    let ksRow, i
    const swapWord = this.networkToHostOrderSwap
    while (offset < inputInt32.length) {
      inputWords0 = swapWord(inputInt32[offset])
      inputWords1 = swapWord(inputInt32[offset + 1])
      inputWords2 = swapWord(inputInt32[offset + 2])
      inputWords3 = swapWord(inputInt32[offset + 3])
      s0 = inputWords0 ^ invKeySchedule[0]
      s1 = inputWords3 ^ invKeySchedule[1]
      s2 = inputWords2 ^ invKeySchedule[2]
      s3 = inputWords1 ^ invKeySchedule[3]
      ksRow = 4
      for (i = 1; i < nRounds; i++) {
        t0 =
          invSubMix0[s0 >>> 24] ^
          invSubMix1[(s1 >> 16) & 255] ^
          invSubMix2[(s2 >> 8) & 255] ^
          invSubMix3[s3 & 255] ^
          invKeySchedule[ksRow]
        t1 =
          invSubMix0[s1 >>> 24] ^
          invSubMix1[(s2 >> 16) & 255] ^
          invSubMix2[(s3 >> 8) & 255] ^
          invSubMix3[s0 & 255] ^
          invKeySchedule[ksRow + 1]
        t2 =
          invSubMix0[s2 >>> 24] ^
          invSubMix1[(s3 >> 16) & 255] ^
          invSubMix2[(s0 >> 8) & 255] ^
          invSubMix3[s1 & 255] ^
          invKeySchedule[ksRow + 2]
        t3 =
          invSubMix0[s3 >>> 24] ^
          invSubMix1[(s0 >> 16) & 255] ^
          invSubMix2[(s1 >> 8) & 255] ^
          invSubMix3[s2 & 255] ^
          invKeySchedule[ksRow + 3]
        s0 = t0
        s1 = t1
        s2 = t2
        s3 = t3
        ksRow = ksRow + 4
      }
      t0 =
        (invSBOX[s0 >>> 24] << 24) ^
        (invSBOX[(s1 >> 16) & 255] << 16) ^
        (invSBOX[(s2 >> 8) & 255] << 8) ^
        invSBOX[s3 & 255] ^
        invKeySchedule[ksRow]
      t1 =
        (invSBOX[s1 >>> 24] << 24) ^
        (invSBOX[(s2 >> 16) & 255] << 16) ^
        (invSBOX[(s3 >> 8) & 255] << 8) ^
        invSBOX[s0 & 255] ^
        invKeySchedule[ksRow + 1]
      t2 =
        (invSBOX[s2 >>> 24] << 24) ^
        (invSBOX[(s3 >> 16) & 255] << 16) ^
        (invSBOX[(s0 >> 8) & 255] << 8) ^
        invSBOX[s1 & 255] ^
        invKeySchedule[ksRow + 2]
      t3 =
        (invSBOX[s3 >>> 24] << 24) ^
        (invSBOX[(s0 >> 16) & 255] << 16) ^
        (invSBOX[(s1 >> 8) & 255] << 8) ^
        invSBOX[s2 & 255] ^
        invKeySchedule[ksRow + 3]
      outputInt32[offset] = swapWord(t0 ^ initVector0)
      outputInt32[offset + 1] = swapWord(t3 ^ initVector1)
      outputInt32[offset + 2] = swapWord(t2 ^ initVector2)
      outputInt32[offset + 3] = swapWord(t1 ^ initVector3)
      initVector0 = inputWords0
      initVector1 = inputWords1
      initVector2 = inputWords2
      initVector3 = inputWords3
      offset = offset + 4
    }
    return outputInt32.buffer
  }
}
var aes_decryptor_default = AESDecryptor

// src/crypt/decrypter.ts
var CHUNK_SIZE = 16
var Decrypter = class {
  constructor(observer, config, { removePKCS7Padding = true } = {}) {
    this.logEnabled = true
    this.subtle = null
    this.softwareDecrypter = null
    this.key = null
    this.fastAesKey = null
    this.remainderData = null
    this.currentIV = null
    this.currentResult = null
    this.observer = observer
    this.config = config
    this.removePKCS7Padding = removePKCS7Padding
    if (removePKCS7Padding) {
      try {
        const browserCrypto = self.crypto
        if (browserCrypto) {
          this.subtle = browserCrypto.subtle || browserCrypto.webkitSubtle
        }
      } catch (e) {}
    }
    if (this.subtle === null) {
      this.config.enableSoftwareAES = true
    }
  }
  destroy() {
    this.observer = null
  }
  isSync() {
    return this.config.enableSoftwareAES
  }
  flush() {
    const { currentResult } = this
    if (!currentResult) {
      this.reset()
      return
    }
    const data = new Uint8Array(currentResult)
    this.reset()
    if (this.removePKCS7Padding) {
      return removePadding(data)
    }
    return data
  }
  reset() {
    this.currentResult = null
    this.currentIV = null
    this.remainderData = null
    if (this.softwareDecrypter) {
      this.softwareDecrypter = null
    }
  }
  decrypt(data, key, iv, callback) {
    if (this.config.enableSoftwareAES) {
      this.softwareDecrypt(new Uint8Array(data), key, iv)
      const decryptResult = this.flush()
      if (decryptResult) {
        callback(decryptResult.buffer)
      }
    } else {
      this.webCryptoDecrypt(new Uint8Array(data), key, iv).then(callback)
    }
  }
  softwareDecrypt(data, key, iv) {
    const { currentIV, currentResult, remainderData } = this
    this.logOnce('JS AES decrypt')
    if (remainderData) {
      data = appendUint8Array(remainderData, data)
      this.remainderData = null
    }
    const currentChunk = this.getValidChunk(data)
    if (!currentChunk.length) {
      return null
    }
    if (currentIV) {
      iv = currentIV
    }
    let softwareDecrypter = this.softwareDecrypter
    if (!softwareDecrypter) {
      softwareDecrypter = this.softwareDecrypter = new aes_decryptor_default()
    }
    softwareDecrypter.expandKey(key)
    const result = currentResult
    this.currentResult = softwareDecrypter.decrypt(currentChunk.buffer, 0, iv)
    this.currentIV = sliceUint8(currentChunk, -16).buffer
    if (!result) {
      return null
    }
    return result
  }
  webCryptoDecrypt(data, key, iv) {
    const subtle = this.subtle
    if (this.key !== key || !this.fastAesKey) {
      this.key = key
      this.fastAesKey = new fast_aes_key_default(subtle, key)
    }
    return this.fastAesKey
      .expandKey()
      .then(aesKey => {
        if (!subtle) {
          return Promise.reject(new Error('web crypto not initialized'))
        }
        const crypto = new aes_crypto_default(subtle, iv)
        return crypto.decrypt(data.buffer, aesKey)
      })
      .catch(err => {
        return this.onWebCryptoError(err, data, key, iv)
      })
  }
  onWebCryptoError(err, data, key, iv) {
    logger.warn('[decrypter.ts]: WebCrypto Error, disable WebCrypto API:', err)
    this.config.enableSoftwareAES = true
    this.logEnabled = true
    return this.softwareDecrypt(data, key, iv)
  }
  getValidChunk(data) {
    let currentChunk = data
    const splitPoint = data.length - (data.length % CHUNK_SIZE)
    if (splitPoint !== data.length) {
      currentChunk = sliceUint8(data, 0, splitPoint)
      this.remainderData = sliceUint8(data, splitPoint)
    }
    return currentChunk
  }
  logOnce(msg) {
    if (!this.logEnabled) {
      return
    }
    logger.log(`[decrypter.ts]: ${msg}`)
    this.logEnabled = false
  }
}
var decrypter_default = Decrypter

// src/utils/time-ranges.ts
var TimeRanges = {
  toString: function (r) {
    let log = ''
    const len = r.length
    for (let i = 0; i < len; i++) {
      log += '[' + r.start(i).toFixed(3) + ',' + r.end(i).toFixed(3) + ']'
    }
    return log
  }
}
var time_ranges_default = TimeRanges

// src/controller/base-stream-controller.ts
var State = {
  STOPPED: 'STOPPED',
  IDLE: 'IDLE',
  KEY_LOADING: 'KEY_LOADING',
  FRAG_LOADING: 'FRAG_LOADING',
  FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
  WAITING_TRACK: 'WAITING_TRACK',
  PARSING: 'PARSING',
  PARSED: 'PARSED',
  BACKTRACKING: 'BACKTRACKING',
  ENDED: 'ENDED',
  ERROR: 'ERROR',
  WAITING_INIT_PTS: 'WAITING_INIT_PTS',
  WAITING_LEVEL: 'WAITING_LEVEL'
}
var BaseStreamController = class extends task_loop_default {
  constructor(hls, fragmentTracker, logPrefix) {
    super()
    this.fragPrevious = null
    this.fragCurrent = null
    this.transmuxer = null
    this._state = State.STOPPED
    this.bitrateTest = false
    this.lastCurrentTime = 0
    this.nextLoadPosition = 0
    this.startPosition = 0
    this.loadedmetadata = false
    this.fragLoadError = 0
    this.retryDate = 0
    this.levels = null
    this.levelLastLoaded = null
    this.startFragRequested = false
    this.initPTS = []
    this.onvseeking = null
    this.onvended = null
    this.logPrefix = ''
    this.logPrefix = logPrefix
    this.log = logger.log.bind(logger, `${logPrefix}:`)
    this.warn = logger.warn.bind(logger, `${logPrefix}:`)
    this.hls = hls
    this.fragmentLoader = new fragment_loader_default(hls.config)
    this.fragmentTracker = fragmentTracker
    this.config = hls.config
    this.decrypter = new decrypter_default(hls, hls.config)
    hls.on(Events.KEY_LOADED, this.onKeyLoaded, this)
  }
  doTick() {
    this.onTickEnd()
  }
  onTickEnd() {}
  startLoad(startPosition) {}
  stopLoad() {
    this.fragmentLoader.abort()
    const frag = this.fragCurrent
    if (frag) {
      this.fragmentTracker.removeFragment(frag)
    }
    this.resetTransmuxer()
    this.fragCurrent = null
    this.fragPrevious = null
    this.clearInterval()
    this.clearNextTick()
    this.state = State.STOPPED
  }
  _streamEnded(bufferInfo, levelDetails) {
    const { fragCurrent, fragmentTracker } = this
    if (
      !levelDetails.live &&
      fragCurrent &&
      fragCurrent.sn === levelDetails.endSN &&
      !bufferInfo.nextStart
    ) {
      const fragState = fragmentTracker.getState(fragCurrent)
      return (
        fragState === FragmentState.PARTIAL || fragState === FragmentState.OK
      )
    }
    return false
  }
  onMediaAttached(event, data) {
    const media = (this.media = this.mediaBuffer = data.media)
    this.onvseeking = this.onMediaSeeking.bind(this)
    this.onvended = this.onMediaEnded.bind(this)
    media.addEventListener('seeking', this.onvseeking)
    media.addEventListener('ended', this.onvended)
    const config = this.config
    if (this.levels && config.autoStartLoad && this.state === State.STOPPED) {
      this.startLoad(config.startPosition)
    }
  }
  onMediaDetaching() {
    const media = this.media
    if (media?.ended) {
      this.log('MSE detaching and video ended, reset startPosition')
      this.startPosition = this.lastCurrentTime = 0
    }
    if (media) {
      media.removeEventListener('seeking', this.onvseeking)
      media.removeEventListener('ended', this.onvended)
      this.onvseeking = this.onvended = null
    }
    this.media = this.mediaBuffer = null
    this.loadedmetadata = false
    this.fragmentTracker.removeAllFragments()
    this.stopLoad()
  }
  onMediaSeeking() {
    const { config, fragCurrent, media, mediaBuffer, state } = this
    const currentTime = media ? media.currentTime : 0
    const bufferInfo = BufferHelper.bufferInfo(
      mediaBuffer || media,
      currentTime,
      config.maxBufferHole
    )
    this.log(
      `media seeking to ${
        Number.isFinite(currentTime) ? currentTime.toFixed(3) : currentTime
      }, state: ${state}`
    )
    if (state === State.ENDED) {
      this.resetLoadingState()
    } else if (fragCurrent && !bufferInfo.len) {
      const tolerance = config.maxFragLookUpTolerance
      const fragStartOffset = fragCurrent.start - tolerance
      const fragEndOffset = fragCurrent.start + fragCurrent.duration + tolerance
      if (currentTime < fragStartOffset || currentTime > fragEndOffset) {
        if (fragCurrent.loader) {
          this.log(
            'seeking outside of buffer while fragment load in progress, cancel fragment load'
          )
          fragCurrent.loader.abort()
        }
        this.resetLoadingState()
      }
    }
    if (media) {
      this.lastCurrentTime = currentTime
    }
    if (!this.loadedmetadata && !bufferInfo.len) {
      this.nextLoadPosition = this.startPosition = currentTime
    }
    this.tick()
  }
  onMediaEnded() {
    this.startPosition = this.lastCurrentTime = 0
  }
  onKeyLoaded(event, data) {
    if (
      this.state !== State.KEY_LOADING ||
      data.frag !== this.fragCurrent ||
      !this.levels
    ) {
      return
    }
    this.state = State.IDLE
    const levelDetails = this.levels[data.frag.level].details
    if (levelDetails) {
      this.loadFragment(data.frag, levelDetails, data.frag.start)
    }
  }
  onHandlerDestroying() {
    this.stopLoad()
    super.onHandlerDestroying()
  }
  onHandlerDestroyed() {
    this.state = State.STOPPED
    this.hls.off(Events.KEY_LOADED, this.onKeyLoaded, this)
    if (this.fragmentLoader) {
      this.fragmentLoader.destroy()
    }
    if (this.decrypter) {
      this.decrypter.destroy()
    }
    this.hls = this.log = this.warn = this.decrypter = this.fragmentLoader = this.fragmentTracker = null
    super.onHandlerDestroyed()
  }
  loadKey(frag, details) {
    this.log(
      `Loading key for ${frag.sn} of [${details.startSN}-${details.endSN}], ${
        this.logPrefix === '[stream-controller]' ? 'level' : 'track'
      } ${frag.level}`
    )
    this.state = State.KEY_LOADING
    this.fragCurrent = frag
    this.hls.trigger(Events.KEY_LOADING, { frag })
  }
  loadFragment(frag, levelDetails, targetBufferTime) {
    this._loadFragForPlayback(frag, levelDetails, targetBufferTime)
  }
  _loadFragForPlayback(frag, levelDetails, targetBufferTime) {
    const progressCallback = data => {
      if (this.fragContextChanged(frag)) {
        this.warn(
          `Fragment ${frag.sn}${
            data.part ? ' p: ' + data.part.index : ''
          } of level ${frag.level} was dropped during download.`
        )
        this.fragmentTracker.removeFragment(frag)
        return
      }
      frag.stats.chunkCount++
      this._handleFragmentLoadProgress(data)
    }
    this._doFragLoad(frag, levelDetails, targetBufferTime, progressCallback)
      .then(data => {
        if (!data) {
          return
        }
        this.fragLoadError = 0
        const state = this.state
        if (this.fragContextChanged(frag)) {
          if (
            state === State.FRAG_LOADING ||
            state === State.BACKTRACKING ||
            (!this.fragCurrent && state === State.PARSING)
          ) {
            this.fragmentTracker.removeFragment(frag)
            this.state = State.IDLE
          }
          return
        }
        if ('payload' in data) {
          this.log(`Loaded fragment ${frag.sn} of level ${frag.level}`)
          this.hls.trigger(Events.FRAG_LOADED, data)
          if (this.state === State.BACKTRACKING) {
            this.fragmentTracker.backtrack(frag, data)
            this.resetFragmentLoading(frag)
            return
          }
        }
        this._handleFragmentLoadComplete(data)
      })
      .catch(reason => {
        this.warn(reason)
        this.resetFragmentLoading(frag)
      })
  }
  flushMainBuffer(startOffset, endOffset, type = null) {
    const flushScope = { startOffset, endOffset, type }
    this.fragLoadError = 0
    this.hls.trigger(Events.BUFFER_FLUSHING, flushScope)
  }
  _loadInitSegment(frag) {
    this._doFragLoad(frag)
      .then(data => {
        if (!data || this.fragContextChanged(frag) || !this.levels) {
          throw new Error('init load aborted')
        }
        return data
      })
      .then(data => {
        const { hls } = this
        const { payload } = data
        const decryptData = frag.decryptdata
        if (
          payload &&
          payload.byteLength > 0 &&
          decryptData &&
          decryptData.key &&
          decryptData.iv &&
          decryptData.method === 'AES-128'
        ) {
          const startTime = self.performance.now()
          return this.decrypter
            .webCryptoDecrypt(
              new Uint8Array(payload),
              decryptData.key.buffer,
              decryptData.iv.buffer
            )
            .then(decryptedData => {
              const endTime = self.performance.now()
              hls.trigger(Events.FRAG_DECRYPTED, {
                frag,
                payload: decryptedData,
                stats: {
                  tstart: startTime,
                  tdecrypt: endTime
                }
              })
              data.payload = decryptedData
              return data
            })
        }
        return data
      })
      .then(data => {
        const { fragCurrent, hls, levels } = this
        if (!levels) {
          throw new Error('init load aborted, missing levels')
        }
        const details = levels[frag.level].details
        console.assert(
          details,
          'Level details are defined when init segment is loaded'
        )
        const initSegment = details.initSegment
        console.assert(
          initSegment,
          'Fragment initSegment is defined when init segment is loaded'
        )
        const stats = frag.stats
        this.state = State.IDLE
        this.fragLoadError = 0
        initSegment.data = new Uint8Array(data.payload)
        stats.parsing.start = stats.buffering.start = self.performance.now()
        stats.parsing.end = stats.buffering.end = self.performance.now()
        if (data.frag === fragCurrent) {
          hls.trigger(Events.FRAG_BUFFERED, {
            stats,
            frag: fragCurrent,
            part: null,
            id: frag.type
          })
        }
        this.tick()
      })
      .catch(reason => {
        this.warn(reason)
        this.resetFragmentLoading(frag)
      })
  }
  fragContextChanged(frag) {
    const { fragCurrent } = this
    return (
      !frag ||
      !fragCurrent ||
      frag.level !== fragCurrent.level ||
      frag.sn !== fragCurrent.sn ||
      frag.urlId !== fragCurrent.urlId
    )
  }
  fragBufferedComplete(frag, part) {
    const media = this.mediaBuffer ? this.mediaBuffer : this.media
    this.log(
      `Buffered ${frag.type} sn: ${frag.sn}${
        part ? ' part: ' + part.index : ''
      } of ${this.logPrefix === '[stream-controller]' ? 'level' : 'track'} ${
        frag.level
      } ${time_ranges_default.toString(BufferHelper.getBuffered(media))}`
    )
    this.state = State.IDLE
    this.tick()
  }
  _handleFragmentLoadComplete(fragLoadedEndData) {
    const { transmuxer } = this
    if (!transmuxer) {
      return
    }
    const { frag, part, partsLoaded } = fragLoadedEndData
    const complete =
      !partsLoaded ||
      partsLoaded.length === 0 ||
      partsLoaded.some(fragLoaded => !fragLoaded)
    const chunkMeta = new ChunkMetadata(
      frag.level,
      frag.sn,
      frag.stats.chunkCount + 1,
      0,
      part ? part.index : -1,
      !complete
    )
    transmuxer.flush(chunkMeta)
  }
  _handleFragmentLoadProgress(frag) {}
  _doFragLoad(frag, details, targetBufferTime = null, progressCallback) {
    if (!this.levels) {
      throw new Error('frag load aborted, missing levels')
    }
    targetBufferTime = Math.max(frag.start, targetBufferTime || 0)
    if (this.config.lowLatencyMode && details) {
      const partList = details.partList
      if (partList && progressCallback) {
        if (targetBufferTime > frag.end && details.fragmentHint) {
          frag = details.fragmentHint
        }
        const partIndex = this.getNextPart(partList, frag, targetBufferTime)
        if (partIndex > -1) {
          const part = partList[partIndex]
          this.log(
            `Loading part sn: ${frag.sn} p: ${part.index} cc: ${
              frag.cc
            } of playlist [${details.startSN}-${
              details.endSN
            }] parts [0-${partIndex}-${partList.length - 1}] ${
              this.logPrefix === '[stream-controller]' ? 'level' : 'track'
            }: ${frag.level}, target: ${parseFloat(
              targetBufferTime.toFixed(3)
            )}`
          )
          this.nextLoadPosition = part.start + part.duration
          this.state = State.FRAG_LOADING
          this.hls.trigger(Events.FRAG_LOADING, {
            frag,
            part: partList[partIndex],
            targetBufferTime
          })
          return this.doFragPartsLoad(
            frag,
            partList,
            partIndex,
            progressCallback
          ).catch(error => this.handleFragLoadError(error))
        } else if (
          !frag.url ||
          this.loadedEndOfParts(partList, targetBufferTime)
        ) {
          return Promise.resolve(null)
        }
      }
    }
    this.log(
      `Loading fragment ${frag.sn} cc: ${frag.cc} ${
        details ? 'of [' + details.startSN + '-' + details.endSN + '] ' : ''
      }${this.logPrefix === '[stream-controller]' ? 'level' : 'track'}: ${
        frag.level
      }, target: ${parseFloat(targetBufferTime.toFixed(3))}`
    )
    if (Number.isFinite(frag.sn) && !this.bitrateTest) {
      this.nextLoadPosition = frag.start + frag.duration
    }
    this.state = State.FRAG_LOADING
    this.hls.trigger(Events.FRAG_LOADING, { frag, targetBufferTime })
    return this.fragmentLoader
      .load(frag, progressCallback)
      .catch(error => this.handleFragLoadError(error))
  }
  doFragPartsLoad(frag, partList, partIndex, progressCallback) {
    return new Promise((resolve, reject) => {
      const partsLoaded = []
      const loadPartIndex = index => {
        const part = partList[index]
        this.fragmentLoader
          .loadPart(frag, part, progressCallback)
          .then(partLoadedData => {
            partsLoaded[part.index] = partLoadedData
            const loadedPart = partLoadedData.part
            this.hls.trigger(Events.FRAG_LOADED, partLoadedData)
            const nextPart = partList[index + 1]
            if (nextPart && nextPart.fragment === frag) {
              loadPartIndex(index + 1)
            } else {
              return resolve({
                frag,
                part: loadedPart,
                partsLoaded
              })
            }
          })
          .catch(reject)
      }
      loadPartIndex(partIndex)
    })
  }
  handleFragLoadError({ data }) {
    if (data && data.details === ErrorDetails.INTERNAL_ABORTED) {
      this.handleFragLoadAborted(data.frag, data.part)
    } else {
      this.hls.trigger(Events.ERROR, data)
    }
    return null
  }
  _handleTransmuxerFlush(chunkMeta) {
    const context = this.getCurrentContext(chunkMeta)
    if (!context || this.state !== State.PARSING) {
      if (!this.fragCurrent) {
        this.state = State.IDLE
      }
      return
    }
    const { frag, part, level } = context
    const now2 = self.performance.now()
    frag.stats.parsing.end = now2
    if (part) {
      part.stats.parsing.end = now2
    }
    this.updateLevelTiming(frag, part, level, chunkMeta.partial)
  }
  getCurrentContext(chunkMeta) {
    const { levels } = this
    const { level: levelIndex, sn, part: partIndex } = chunkMeta
    if (!levels || !levels[levelIndex]) {
      this.warn(
        `Levels object was unset while buffering fragment ${sn} of level ${levelIndex}. The current chunk will not be buffered.`
      )
      return null
    }
    const level = levels[levelIndex]
    const part = partIndex > -1 ? getPartWith(level, sn, partIndex) : null
    const frag = part ? part.fragment : getFragmentWithSN(level, sn)
    if (!frag) {
      return null
    }
    return { frag, part, level }
  }
  bufferFragmentData(data, frag, part, chunkMeta) {
    if (!data || this.state !== State.PARSING) {
      return
    }
    const { data1, data2 } = data
    let buffer = data1
    if (data1 && data2) {
      buffer = appendUint8Array(data1, data2)
    }
    if (!buffer || !buffer.length) {
      return
    }
    const segment = {
      type: data.type,
      frag,
      part,
      chunkMeta,
      parent: frag.type,
      data: buffer
    }
    this.hls.trigger(Events.BUFFER_APPENDING, segment)
    if (data.dropped && data.independent && !part) {
      this.flushBufferGap(frag)
    }
  }
  flushBufferGap(frag) {
    const media = this.media
    if (!media) {
      return
    }
    if (!BufferHelper.isBuffered(media, media.currentTime)) {
      this.flushMainBuffer(0, frag.start)
      return
    }
    const currentTime = media.currentTime
    const bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0)
    const fragDuration = frag.duration
    const segmentFraction = Math.min(
      this.config.maxFragLookUpTolerance * 2,
      fragDuration * 0.25
    )
    const start = Math.max(
      Math.min(frag.start - segmentFraction, bufferInfo.end - segmentFraction),
      currentTime + segmentFraction
    )
    if (frag.start - start > segmentFraction) {
      this.flushMainBuffer(start, frag.start)
    }
  }
  reduceMaxBufferLength(threshold) {
    const config = this.config
    const minLength = threshold || config.maxBufferLength
    if (config.maxMaxBufferLength >= minLength) {
      config.maxMaxBufferLength /= 2
      this.warn(`Reduce max buffer length to ${config.maxMaxBufferLength}s`)
      return true
    }
    return false
  }
  getNextFragment(pos, levelDetails) {
    const fragments = levelDetails.fragments
    const fragLen = fragments.length
    if (!fragLen) {
      return null
    }
    const { config } = this
    const start = fragments[0].start
    let frag
    if (
      levelDetails.initSegment &&
      !levelDetails.initSegment.data &&
      !this.bitrateTest
    ) {
      frag = levelDetails.initSegment
    } else if (levelDetails.live) {
      const initialLiveManifestSize = config.initialLiveManifestSize
      if (fragLen < initialLiveManifestSize) {
        this.warn(
          `Not enough fragments to start playback (have: ${fragLen}, need: ${initialLiveManifestSize})`
        )
        return null
      }
      if (
        !levelDetails.PTSKnown &&
        !this.startFragRequested &&
        this.startPosition === -1
      ) {
        frag = this.getInitialLiveFragment(levelDetails, fragments)
        this.startPosition = frag
          ? this.hls.liveSyncPosition || frag.start
          : pos
      }
    } else if (pos <= start) {
      frag = fragments[0]
    }
    if (!frag) {
      const end = config.lowLatencyMode
        ? levelDetails.partEnd
        : levelDetails.fragmentEnd
      frag = this.getFragmentAtPosition(pos, end, levelDetails)
    }
    return frag
  }
  getNextPart(partList, frag, targetBufferTime) {
    let nextPart = -1
    let contiguous = false
    let independentAttrOmitted = true
    for (let i = 0, len = partList.length; i < len; i++) {
      const part = partList[i]
      independentAttrOmitted = independentAttrOmitted && !part.independent
      if (nextPart > -1 && targetBufferTime < part.start) {
        break
      }
      const loaded = part.loaded
      if (
        !loaded &&
        (contiguous || part.independent || independentAttrOmitted) &&
        part.fragment === frag
      ) {
        nextPart = i
      }
      contiguous = loaded
    }
    return nextPart
  }
  loadedEndOfParts(partList, targetBufferTime) {
    const lastPart = partList[partList.length - 1]
    return lastPart && targetBufferTime > lastPart.start && lastPart.loaded
  }
  getInitialLiveFragment(levelDetails, fragments) {
    const fragPrevious = this.fragPrevious
    let frag = null
    if (fragPrevious) {
      if (levelDetails.hasProgramDateTime) {
        this.log(
          `Live playlist, switching playlist, load frag with same PDT: ${fragPrevious.programDateTime}`
        )
        frag = findFragmentByPDT(
          fragments,
          fragPrevious.endProgramDateTime,
          this.config.maxFragLookUpTolerance
        )
      }
      if (!frag) {
        const targetSN = fragPrevious.sn + 1
        if (
          targetSN >= levelDetails.startSN &&
          targetSN <= levelDetails.endSN
        ) {
          const fragNext = fragments[targetSN - levelDetails.startSN]
          if (fragPrevious.cc === fragNext.cc) {
            frag = fragNext
            this.log(
              `Live playlist, switching playlist, load frag with next SN: ${frag.sn}`
            )
          }
        }
        if (!frag) {
          frag = findFragWithCC(fragments, fragPrevious.cc)
          if (frag) {
            this.log(
              `Live playlist, switching playlist, load frag with same CC: ${frag.sn}`
            )
          }
        }
      }
    } else {
      const liveStart = this.hls.liveSyncPosition
      if (liveStart !== null) {
        frag = this.getFragmentAtPosition(
          liveStart,
          this.bitrateTest ? levelDetails.fragmentEnd : levelDetails.edge,
          levelDetails
        )
      }
    }
    return frag
  }
  getFragmentAtPosition(bufferEnd, end, levelDetails) {
    const { config, fragPrevious } = this
    let { fragments, endSN } = levelDetails
    const { fragmentHint } = levelDetails
    const tolerance = config.maxFragLookUpTolerance
    const loadingParts = !!(
      config.lowLatencyMode &&
      levelDetails.partList &&
      fragmentHint
    )
    if (loadingParts && fragmentHint && !this.bitrateTest) {
      fragments = fragments.concat(fragmentHint)
      endSN = fragmentHint.sn
    }
    let frag
    if (bufferEnd < end) {
      const lookupTolerance = bufferEnd > end - tolerance ? 0 : tolerance
      frag = findFragmentByPTS(
        fragPrevious,
        fragments,
        bufferEnd,
        lookupTolerance
      )
    } else {
      frag = fragments[fragments.length - 1]
    }
    if (frag) {
      const curSNIdx = frag.sn - levelDetails.startSN
      const sameLevel = fragPrevious && frag.level === fragPrevious.level
      const nextFrag = fragments[curSNIdx + 1]
      const fragState = this.fragmentTracker.getState(frag)
      if (fragState === FragmentState.BACKTRACKED) {
        frag = null
        let i = curSNIdx
        while (
          fragments[i] &&
          this.fragmentTracker.getState(fragments[i]) ===
            FragmentState.BACKTRACKED
        ) {
          if (!fragPrevious) {
            frag = fragments[--i]
          } else {
            frag = fragments[i--]
          }
        }
        if (!frag) {
          frag = nextFrag
        }
      } else if (fragPrevious && frag.sn === fragPrevious.sn && !loadingParts) {
        if (sameLevel) {
          if (
            frag.sn < endSN &&
            this.fragmentTracker.getState(nextFrag) !== FragmentState.OK
          ) {
            this.log(`SN ${frag.sn} just loaded, load next one: ${nextFrag.sn}`)
            frag = nextFrag
          } else {
            frag = null
          }
        }
      }
    }
    return frag
  }
  synchronizeToLiveEdge(levelDetails) {
    const { config, media } = this
    if (!media) {
      return
    }
    const liveSyncPosition = this.hls.liveSyncPosition
    const currentTime = media.currentTime
    const start = levelDetails.fragments[0].start
    const end = levelDetails.edge
    const withinSlidingWindow =
      currentTime >= start - config.maxFragLookUpTolerance && currentTime <= end
    if (
      liveSyncPosition !== null &&
      media.duration > liveSyncPosition &&
      (currentTime < liveSyncPosition || !withinSlidingWindow)
    ) {
      const maxLatency =
        config.liveMaxLatencyDuration !== void 0
          ? config.liveMaxLatencyDuration
          : config.liveMaxLatencyDurationCount * levelDetails.targetduration
      if (
        (!withinSlidingWindow && media.readyState < 4) ||
        currentTime < end - maxLatency
      ) {
        if (!this.loadedmetadata) {
          this.nextLoadPosition = liveSyncPosition
        }
        if (media.readyState) {
          this.warn(
            `Playback: ${currentTime.toFixed(
              3
            )} is located too far from the end of live sliding playlist: ${end}, reset currentTime to : ${liveSyncPosition.toFixed(
              3
            )}`
          )
          media.currentTime = liveSyncPosition
        }
      }
    }
  }
  alignPlaylists(details, previousDetails) {
    const { levels, levelLastLoaded } = this
    const lastLevel = levelLastLoaded !== null ? levels[levelLastLoaded] : null
    let sliding = 0
    if (previousDetails && details.fragments.length > 0) {
      sliding = details.fragments[0].start
      if (details.alignedSliding && Number.isFinite(sliding)) {
        this.log(`Live playlist sliding:${sliding.toFixed(3)}`)
      } else if (!sliding) {
        this.warn(
          `[${this.constructor.name}] Live playlist - outdated PTS, unknown sliding`
        )
        alignStream(this.fragPrevious, lastLevel, details)
      }
    } else {
      this.log('Live playlist - first load, unknown sliding')
      alignStream(this.fragPrevious, lastLevel, details)
    }
    return sliding
  }
  waitForCdnTuneIn(details) {
    const advancePartLimit = 3
    return (
      details.live &&
      details.canBlockReload &&
      details.tuneInGoal >
        Math.max(details.partHoldBack, details.partTarget * advancePartLimit)
    )
  }
  setStartPosition(details, sliding) {
    let startPosition = this.startPosition
    if (this.startPosition === -1 || this.lastCurrentTime === -1) {
      let startTimeOffset = details.startTimeOffset
      if (Number.isFinite(startTimeOffset)) {
        if (startTimeOffset < 0) {
          this.log(
            `Negative start time offset ${startTimeOffset}, count from end of last fragment`
          )
          startTimeOffset = sliding + details.totalduration + startTimeOffset
        }
        this.log(
          `Start time offset found in playlist, adjust startPosition to ${startTimeOffset}`
        )
        this.startPosition = startPosition = startTimeOffset
      } else if (details.live) {
        startPosition = this.hls.liveSyncPosition || sliding
      } else {
        this.startPosition = startPosition = 0
      }
      this.lastCurrentTime = startPosition
    }
    this.nextLoadPosition = startPosition
  }
  getLoadPosition() {
    const { media } = this
    let pos = 0
    if (this.loadedmetadata) {
      pos = media.currentTime
    } else if (this.nextLoadPosition) {
      pos = this.nextLoadPosition
    }
    return pos
  }
  handleFragLoadAborted(frag, part) {
    if (this.transmuxer && frag.sn !== 'initSegment') {
      this.warn(
        `Fragment ${frag.sn}${part ? ' part' + part.index : ''} of level ${
          frag.level
        } was aborted`
      )
      this.resetFragmentLoading(frag)
    }
  }
  resetFragmentLoading(frag) {
    if (!this.fragCurrent || !this.fragContextChanged(frag)) {
      this.state = State.IDLE
    }
  }
  onFragmentOrKeyLoadError(filterType, data) {
    if (data.fatal) {
      return
    }
    const frag = data.frag
    if (!frag || frag.type !== filterType) {
      return
    }
    const fragCurrent = this.fragCurrent
    console.assert(
      fragCurrent &&
        frag.sn === fragCurrent.sn &&
        frag.level === fragCurrent.level &&
        frag.urlId === fragCurrent.urlId,
      'Frag load error must match current frag to retry'
    )
    const config = this.config
    if (this.fragLoadError + 1 <= config.fragLoadingMaxRetry) {
      if (this.resetLiveStartWhenNotLoaded(frag.level)) {
        return
      }
      const delay = Math.min(
        Math.pow(2, this.fragLoadError) * config.fragLoadingRetryDelay,
        config.fragLoadingMaxRetryTimeout
      )
      this.warn(
        `Fragment ${frag.sn} of ${filterType} ${frag.level} failed to load, retrying in ${delay}ms`
      )
      this.retryDate = self.performance.now() + delay
      this.fragLoadError++
      this.state = State.FRAG_LOADING_WAITING_RETRY
    } else if (data.levelRetry) {
      if (filterType === PlaylistLevelType.AUDIO) {
        this.fragCurrent = null
      }
      this.fragLoadError = 0
      this.state = State.IDLE
    } else {
      logger.error(`${data.details} reaches max retry, redispatch as fatal ...`)
      data.fatal = true
      this.hls.stopLoad()
      this.state = State.ERROR
    }
  }
  afterBufferFlushed(media, bufferType, playlistType) {
    if (!media) {
      return
    }
    const bufferedTimeRanges = BufferHelper.getBuffered(media)
    this.fragmentTracker.detectEvictedFragments(
      bufferType,
      bufferedTimeRanges,
      playlistType
    )
    if (this.state === State.ENDED) {
      this.resetLoadingState()
    }
  }
  resetLoadingState() {
    this.fragCurrent = null
    this.fragPrevious = null
    this.state = State.IDLE
  }
  resetLiveStartWhenNotLoaded(level) {
    if (!this.loadedmetadata) {
      this.startFragRequested = false
      const details = this.levels ? this.levels[level].details : null
      if (details?.live) {
        this.startPosition = -1
        this.setStartPosition(details, 0)
        this.resetLoadingState()
        return true
      }
      this.nextLoadPosition = this.startPosition
    }
    return false
  }
  updateLevelTiming(frag, part, level, partial) {
    const details = level.details
    console.assert(!!details, 'level.details must be defined')
    const parsed = Object.keys(frag.elementaryStreams).reduce(
      (result, type) => {
        const info = frag.elementaryStreams[type]
        if (info) {
          const parsedDuration = info.endPTS - info.startPTS
          if (parsedDuration <= 0) {
            this.warn(
              `Could not parse fragment ${frag.sn} ${type} duration reliably (${parsedDuration}) resetting transmuxer to fallback to playlist timing`
            )
            this.resetTransmuxer()
            return result || false
          }
          const drift = partial
            ? 0
            : updateFragPTSDTS(
                details,
                frag,
                info.startPTS,
                info.endPTS,
                info.startDTS,
                info.endDTS
              )
          this.hls.trigger(Events.LEVEL_PTS_UPDATED, {
            details,
            level,
            drift,
            type,
            frag,
            start: info.startPTS,
            end: info.endPTS
          })
          return true
        }
        return result
      },
      false
    )
    if (parsed) {
      this.state = State.PARSED
      this.hls.trigger(Events.FRAG_PARSED, { frag, part })
    } else {
      this.resetLoadingState()
    }
  }
  resetTransmuxer() {
    if (this.transmuxer) {
      this.transmuxer.destroy()
      this.transmuxer = null
    }
  }
  set state(nextState) {
    const previousState = this._state
    if (previousState !== nextState) {
      this._state = nextState
      this.log(`${previousState}->${nextState}`)
    }
  }
  get state() {
    return this._state
  }
}
var base_stream_controller_default = BaseStreamController

// src/utils/mediasource-helper.ts
function getMediaSource() {
  return self.MediaSource || self.WebKitMediaSource
}

// src/is-supported.ts
function getSourceBuffer() {
  return self.SourceBuffer || self.WebKitSourceBuffer
}
function isSupported() {
  const mediaSource = getMediaSource()
  if (!mediaSource) {
    return false
  }
  const sourceBuffer = getSourceBuffer()
  const isTypeSupported =
    mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
  const sourceBufferValidAPI =
    !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function')
  return !!isTypeSupported && !!sourceBufferValidAPI
}
function changeTypeSupported() {
  const sourceBuffer = getSourceBuffer()
  return typeof sourceBuffer?.prototype?.changeType === 'function'
}

// src/demux/dummy-demuxed-track.ts
function dummyTrack() {
  return {
    type: '',
    id: -1,
    pid: -1,
    inputTimeScale: 9e4,
    sequenceNumber: -1,
    samples: [],
    dropped: 0
  }
}

// src/demux/base-audio-demuxer.ts
var BaseAudioDemuxer = class {
  constructor() {
    this.frameIndex = 0
    this.cachedData = null
    this.initPTS = null
  }
  resetInitSegment(audioCodec, videoCodec, duration) {
    this._id3Track = {
      type: 'id3',
      id: 0,
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0
    }
  }
  resetTimeStamp() {}
  resetContiguity() {}
  canParse(data, offset) {
    return false
  }
  appendFrame(track, data, offset) {}
  demux(data, timeOffset) {
    if (this.cachedData) {
      data = appendUint8Array(this.cachedData, data)
      this.cachedData = null
    }
    let id3Data = getID3Data(data, 0)
    let offset = id3Data ? id3Data.length : 0
    let lastDataIndex
    let pts
    const track = this._audioTrack
    const id3Track = this._id3Track
    const timestamp = id3Data ? getTimeStamp(id3Data) : void 0
    const length = data.length
    if (this.frameIndex === 0 || this.initPTS === null) {
      this.initPTS = initPTSFn(timestamp, timeOffset)
    }
    if (id3Data && id3Data.length > 0) {
      id3Track.samples.push({
        pts: this.initPTS,
        dts: this.initPTS,
        data: id3Data
      })
    }
    pts = this.initPTS
    while (offset < length) {
      if (this.canParse(data, offset)) {
        const frame = this.appendFrame(track, data, offset)
        if (frame) {
          this.frameIndex++
          pts = frame.sample.pts
          offset += frame.length
          lastDataIndex = offset
        } else {
          offset = length
        }
      } else if (canParse(data, offset)) {
        id3Data = getID3Data(data, offset)
        id3Track.samples.push({ pts, dts: pts, data: id3Data })
        offset += id3Data.length
        lastDataIndex = offset
      } else {
        offset++
      }
      if (offset === length && lastDataIndex !== length) {
        const partialData = sliceUint8(data, lastDataIndex)
        if (this.cachedData) {
          this.cachedData = appendUint8Array(this.cachedData, partialData)
        } else {
          this.cachedData = partialData
        }
      }
    }
    return {
      audioTrack: track,
      avcTrack: dummyTrack(),
      id3Track,
      textTrack: dummyTrack()
    }
  }
  demuxSampleAes(data, keyData, timeOffset) {
    return Promise.reject(
      new Error(`[${this}] This demuxer does not support Sample-AES decryption`)
    )
  }
  flush(timeOffset) {
    const cachedData = this.cachedData
    if (cachedData) {
      this.cachedData = null
      this.demux(cachedData, 0)
    }
    this.frameIndex = 0
    return {
      audioTrack: this._audioTrack,
      avcTrack: dummyTrack(),
      id3Track: this._id3Track,
      textTrack: dummyTrack()
    }
  }
  destroy() {}
}
var initPTSFn = (timestamp, timeOffset) => {
  return Number.isFinite(timestamp) ? timestamp * 90 : timeOffset * 9e4
}
var base_audio_demuxer_default = BaseAudioDemuxer

// src/demux/adts.ts
function getAudioConfig(observer, data, offset, audioCodec) {
  let adtsObjectType
  let adtsExtensionSamplingIndex
  let adtsChanelConfig
  let config
  const userAgent = navigator.userAgent.toLowerCase()
  const manifestCodec = audioCodec
  const adtsSampleingRates = [
    96e3,
    88200,
    64e3,
    48e3,
    44100,
    32e3,
    24e3,
    22050,
    16e3,
    12e3,
    11025,
    8e3,
    7350
  ]
  adtsObjectType = ((data[offset + 2] & 192) >>> 6) + 1
  const adtsSamplingIndex = (data[offset + 2] & 60) >>> 2
  if (adtsSamplingIndex > adtsSampleingRates.length - 1) {
    observer.trigger(Events.ERROR, {
      type: ErrorTypes.MEDIA_ERROR,
      details: ErrorDetails.FRAG_PARSING_ERROR,
      fatal: true,
      reason: `invalid ADTS sampling index:${adtsSamplingIndex}`
    })
    return
  }
  adtsChanelConfig = (data[offset + 2] & 1) << 2
  adtsChanelConfig |= (data[offset + 3] & 192) >>> 6
  logger.log(
    `manifest codec:${audioCodec}, ADTS type:${adtsObjectType}, samplingIndex:${adtsSamplingIndex}`
  )
  if (/firefox/i.test(userAgent)) {
    if (adtsSamplingIndex >= 6) {
      adtsObjectType = 5
      config = new Array(4)
      adtsExtensionSamplingIndex = adtsSamplingIndex - 3
    } else {
      adtsObjectType = 2
      config = new Array(2)
      adtsExtensionSamplingIndex = adtsSamplingIndex
    }
  } else if (userAgent.indexOf('android') !== -1) {
    adtsObjectType = 2
    config = new Array(2)
    adtsExtensionSamplingIndex = adtsSamplingIndex
  } else {
    adtsObjectType = 5
    config = new Array(4)
    if (
      (audioCodec &&
        (audioCodec.indexOf('mp4a.40.29') !== -1 ||
          audioCodec.indexOf('mp4a.40.5') !== -1)) ||
      (!audioCodec && adtsSamplingIndex >= 6)
    ) {
      adtsExtensionSamplingIndex = adtsSamplingIndex - 3
    } else {
      if (
        (audioCodec &&
          audioCodec.indexOf('mp4a.40.2') !== -1 &&
          ((adtsSamplingIndex >= 6 && adtsChanelConfig === 1) ||
            /vivaldi/i.test(userAgent))) ||
        (!audioCodec && adtsChanelConfig === 1)
      ) {
        adtsObjectType = 2
        config = new Array(2)
      }
      adtsExtensionSamplingIndex = adtsSamplingIndex
    }
  }
  config[0] = adtsObjectType << 3
  config[0] |= (adtsSamplingIndex & 14) >> 1
  config[1] |= (adtsSamplingIndex & 1) << 7
  config[1] |= adtsChanelConfig << 3
  if (adtsObjectType === 5) {
    config[1] |= (adtsExtensionSamplingIndex & 14) >> 1
    config[2] = (adtsExtensionSamplingIndex & 1) << 7
    config[2] |= 2 << 2
    config[3] = 0
  }
  return {
    config,
    samplerate: adtsSampleingRates[adtsSamplingIndex],
    channelCount: adtsChanelConfig,
    codec: 'mp4a.40.' + adtsObjectType,
    manifestCodec
  }
}
function isHeaderPattern(data, offset) {
  return data[offset] === 255 && (data[offset + 1] & 246) === 240
}
function getHeaderLength(data, offset) {
  return data[offset + 1] & 1 ? 7 : 9
}
function getFullFrameLength(data, offset) {
  return (
    ((data[offset + 3] & 3) << 11) |
    (data[offset + 4] << 3) |
    ((data[offset + 5] & 224) >>> 5)
  )
}
function canGetFrameLength(data, offset) {
  return offset + 5 < data.length
}
function isHeader2(data, offset) {
  return offset + 1 < data.length && isHeaderPattern(data, offset)
}
function canParse2(data, offset) {
  return (
    canGetFrameLength(data, offset) &&
    isHeaderPattern(data, offset) &&
    getFullFrameLength(data, offset) <= data.length - offset
  )
}
function probe(data, offset) {
  if (isHeader2(data, offset)) {
    const headerLength = getHeaderLength(data, offset)
    if (offset + headerLength >= data.length) {
      return false
    }
    const frameLength = getFullFrameLength(data, offset)
    if (frameLength <= headerLength) {
      return false
    }
    const newOffset = offset + frameLength
    return newOffset === data.length || isHeader2(data, newOffset)
  }
  return false
}
function initTrackConfig(track, observer, data, offset, audioCodec) {
  if (!track.samplerate) {
    const config = getAudioConfig(observer, data, offset, audioCodec)
    if (!config) {
      return
    }
    track.config = config.config
    track.samplerate = config.samplerate
    track.channelCount = config.channelCount
    track.codec = config.codec
    track.manifestCodec = config.manifestCodec
    logger.log(
      `parsed codec:${track.codec}, rate:${config.samplerate}, channels:${config.channelCount}`
    )
  }
}
function getFrameDuration(samplerate) {
  return (1024 * 9e4) / samplerate
}
function parseFrameHeader(data, offset, pts, frameIndex, frameDuration) {
  const length = data.length
  const headerLength = getHeaderLength(data, offset)
  let frameLength = getFullFrameLength(data, offset)
  frameLength -= headerLength
  if (frameLength > 0 && offset + headerLength + frameLength <= length) {
    const stamp = pts + frameIndex * frameDuration
    return { headerLength, frameLength, stamp }
  }
}
function appendFrame(track, data, offset, pts, frameIndex) {
  const frameDuration = getFrameDuration(track.samplerate)
  const header = parseFrameHeader(data, offset, pts, frameIndex, frameDuration)
  if (header) {
    const stamp = header.stamp
    const headerLength = header.headerLength
    const frameLength = header.frameLength
    const aacSample = {
      unit: data.subarray(
        offset + headerLength,
        offset + headerLength + frameLength
      ),
      pts: stamp,
      dts: stamp
    }
    track.samples.push(aacSample)
    return { sample: aacSample, length: frameLength + headerLength }
  }
}

// src/demux/aacdemuxer.ts
var AACDemuxer = class extends base_audio_demuxer_default {
  constructor(observer, config) {
    super()
    this.observer = observer
    this.config = config
  }
  resetInitSegment(audioCodec, videoCodec, duration) {
    super.resetInitSegment(audioCodec, videoCodec, duration)
    this._audioTrack = {
      container: 'audio/adts',
      type: 'audio',
      id: 0,
      pid: -1,
      sequenceNumber: 0,
      isAAC: true,
      samples: [],
      manifestCodec: audioCodec,
      duration,
      inputTimeScale: 9e4,
      dropped: 0
    }
  }
  static probe(data) {
    if (!data) {
      return false
    }
    const id3Data = getID3Data(data, 0) || []
    let offset = id3Data.length
    for (let length = data.length; offset < length; offset++) {
      if (probe(data, offset)) {
        logger.log('ADTS sync word found !')
        return true
      }
    }
    return false
  }
  canParse(data, offset) {
    return canParse2(data, offset)
  }
  appendFrame(track, data, offset) {
    initTrackConfig(track, this.observer, data, offset, track.manifestCodec)
    return appendFrame(track, data, offset, this.initPTS, this.frameIndex)
  }
}
AACDemuxer.minProbeByteLength = 9
var aacdemuxer_default = AACDemuxer

// src/demux/mp4demuxer.ts
var MP4Demuxer = class {
  constructor(observer, config) {
    this.remainderData = null
    this.config = config
  }
  resetTimeStamp() {}
  resetInitSegment() {}
  resetContiguity() {}
  static probe(data) {
    return (
      findBox({ data, start: 0, end: Math.min(data.length, 16384) }, ['moof'])
        .length > 0
    )
  }
  demux(data) {
    let avcSamples = data
    const avcTrack = dummyTrack()
    if (this.config.progressive) {
      if (this.remainderData) {
        avcSamples = appendUint8Array(this.remainderData, data)
      }
      const segmentedData = segmentValidRange(avcSamples)
      this.remainderData = segmentedData.remainder
      avcTrack.samples = segmentedData.valid || new Uint8Array()
    } else {
      avcTrack.samples = avcSamples
    }
    return {
      audioTrack: dummyTrack(),
      avcTrack,
      id3Track: dummyTrack(),
      textTrack: dummyTrack()
    }
  }
  flush() {
    const avcTrack = dummyTrack()
    avcTrack.samples = this.remainderData || new Uint8Array()
    this.remainderData = null
    return {
      audioTrack: dummyTrack(),
      avcTrack,
      id3Track: dummyTrack(),
      textTrack: dummyTrack()
    }
  }
  demuxSampleAes(data, keyData, timeOffset) {
    return Promise.reject(
      new Error('The MP4 demuxer does not support SAMPLE-AES decryption')
    )
  }
  destroy() {}
}
MP4Demuxer.minProbeByteLength = 1024
var mp4demuxer_default = MP4Demuxer

// src/demux/mpegaudio.ts
var chromeVersion = null
var BitratesMap = [
  32,
  64,
  96,
  128,
  160,
  192,
  224,
  256,
  288,
  320,
  352,
  384,
  416,
  448,
  32,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  160,
  192,
  224,
  256,
  320,
  384,
  32,
  40,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  160,
  192,
  224,
  256,
  320,
  32,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  144,
  160,
  176,
  192,
  224,
  256,
  8,
  16,
  24,
  32,
  40,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  144,
  160
]
var SamplingRateMap = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3]
var SamplesCoefficients = [
  [0, 72, 144, 12],
  [0, 0, 0, 0],
  [0, 72, 144, 12],
  [0, 144, 144, 12]
]
var BytesInSlot = [0, 1, 1, 4]
function appendFrame2(track, data, offset, pts, frameIndex) {
  if (offset + 24 > data.length) {
    return
  }
  const header = parseHeader(data, offset)
  if (header && offset + header.frameLength <= data.length) {
    const frameDuration = (header.samplesPerFrame * 9e4) / header.sampleRate
    const stamp = pts + frameIndex * frameDuration
    const sample = {
      unit: data.subarray(offset, offset + header.frameLength),
      pts: stamp,
      dts: stamp
    }
    track.config = []
    track.channelCount = header.channelCount
    track.samplerate = header.sampleRate
    track.samples.push(sample)
    return { sample, length: header.frameLength }
  }
}
function parseHeader(data, offset) {
  const mpegVersion = (data[offset + 1] >> 3) & 3
  const mpegLayer = (data[offset + 1] >> 1) & 3
  const bitRateIndex = (data[offset + 2] >> 4) & 15
  const sampleRateIndex = (data[offset + 2] >> 2) & 3
  if (
    mpegVersion !== 1 &&
    bitRateIndex !== 0 &&
    bitRateIndex !== 15 &&
    sampleRateIndex !== 3
  ) {
    const paddingBit = (data[offset + 2] >> 1) & 1
    const channelMode = data[offset + 3] >> 6
    const columnInBitrates =
      mpegVersion === 3 ? 3 - mpegLayer : mpegLayer === 3 ? 3 : 4
    const bitRate = BitratesMap[columnInBitrates * 14 + bitRateIndex - 1] * 1e3
    const columnInSampleRates =
      mpegVersion === 3 ? 0 : mpegVersion === 2 ? 1 : 2
    const sampleRate =
      SamplingRateMap[columnInSampleRates * 3 + sampleRateIndex]
    const channelCount = channelMode === 3 ? 1 : 2
    const sampleCoefficient = SamplesCoefficients[mpegVersion][mpegLayer]
    const bytesInSlot = BytesInSlot[mpegLayer]
    const samplesPerFrame = sampleCoefficient * 8 * bytesInSlot
    const frameLength =
      Math.floor((sampleCoefficient * bitRate) / sampleRate + paddingBit) *
      bytesInSlot
    if (chromeVersion === null) {
      const userAgent = navigator.userAgent || ''
      const result = userAgent.match(/Chrome\/(\d+)/i)
      chromeVersion = result ? parseInt(result[1]) : 0
    }
    const needChromeFix = !!chromeVersion && chromeVersion <= 87
    if (
      needChromeFix &&
      mpegLayer === 2 &&
      bitRate >= 224e3 &&
      channelMode === 0
    ) {
      data[offset + 3] = data[offset + 3] | 128
    }
    return { sampleRate, channelCount, frameLength, samplesPerFrame }
  }
}
function isHeaderPattern2(data, offset) {
  return (
    data[offset] === 255 &&
    (data[offset + 1] & 224) === 224 &&
    (data[offset + 1] & 6) !== 0
  )
}
function isHeader3(data, offset) {
  return offset + 1 < data.length && isHeaderPattern2(data, offset)
}
function canParse3(data, offset) {
  const headerSize = 4
  return isHeaderPattern2(data, offset) && headerSize <= data.length - offset
}
function probe2(data, offset) {
  if (offset + 1 < data.length && isHeaderPattern2(data, offset)) {
    const headerLength = 4
    const header = parseHeader(data, offset)
    let frameLength = headerLength
    if (header?.frameLength) {
      frameLength = header.frameLength
    }
    const newOffset = offset + frameLength
    return newOffset === data.length || isHeader3(data, newOffset)
  }
  return false
}

// src/demux/exp-golomb.ts
var ExpGolomb = class {
  constructor(data) {
    this.data = data
    this.bytesAvailable = data.byteLength
    this.word = 0
    this.bitsAvailable = 0
  }
  loadWord() {
    const data = this.data
    const bytesAvailable = this.bytesAvailable
    const position = data.byteLength - bytesAvailable
    const workingBytes = new Uint8Array(4)
    const availableBytes = Math.min(4, bytesAvailable)
    if (availableBytes === 0) {
      throw new Error('no bytes available')
    }
    workingBytes.set(data.subarray(position, position + availableBytes))
    this.word = new DataView(workingBytes.buffer).getUint32(0)
    this.bitsAvailable = availableBytes * 8
    this.bytesAvailable -= availableBytes
  }
  skipBits(count) {
    let skipBytes
    if (this.bitsAvailable > count) {
      this.word <<= count
      this.bitsAvailable -= count
    } else {
      count -= this.bitsAvailable
      skipBytes = count >> 3
      count -= skipBytes >> 3
      this.bytesAvailable -= skipBytes
      this.loadWord()
      this.word <<= count
      this.bitsAvailable -= count
    }
  }
  readBits(size) {
    let bits = Math.min(this.bitsAvailable, size)
    const valu = this.word >>> (32 - bits)
    if (size > 32) {
      logger.error('Cannot read more than 32 bits at a time')
    }
    this.bitsAvailable -= bits
    if (this.bitsAvailable > 0) {
      this.word <<= bits
    } else if (this.bytesAvailable > 0) {
      this.loadWord()
    }
    bits = size - bits
    if (bits > 0 && this.bitsAvailable) {
      return (valu << bits) | this.readBits(bits)
    } else {
      return valu
    }
  }
  skipLZ() {
    let leadingZeroCount
    for (
      leadingZeroCount = 0;
      leadingZeroCount < this.bitsAvailable;
      ++leadingZeroCount
    ) {
      if ((this.word & (2147483648 >>> leadingZeroCount)) !== 0) {
        this.word <<= leadingZeroCount
        this.bitsAvailable -= leadingZeroCount
        return leadingZeroCount
      }
    }
    this.loadWord()
    return leadingZeroCount + this.skipLZ()
  }
  skipUEG() {
    this.skipBits(1 + this.skipLZ())
  }
  skipEG() {
    this.skipBits(1 + this.skipLZ())
  }
  readUEG() {
    const clz = this.skipLZ()
    return this.readBits(clz + 1) - 1
  }
  readEG() {
    const valu = this.readUEG()
    if (1 & valu) {
      return (1 + valu) >>> 1
    } else {
      return -1 * (valu >>> 1)
    }
  }
  readBoolean() {
    return this.readBits(1) === 1
  }
  readUByte() {
    return this.readBits(8)
  }
  readUShort() {
    return this.readBits(16)
  }
  readUInt() {
    return this.readBits(32)
  }
  skipScalingList(count) {
    let lastScale = 8
    let nextScale = 8
    let deltaScale
    for (let j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = this.readEG()
        nextScale = (lastScale + deltaScale + 256) % 256
      }
      lastScale = nextScale === 0 ? lastScale : nextScale
    }
  }
  readSPS() {
    let frameCropLeftOffset = 0
    let frameCropRightOffset = 0
    let frameCropTopOffset = 0
    let frameCropBottomOffset = 0
    let numRefFramesInPicOrderCntCycle
    let scalingListCount
    let i
    const readUByte = this.readUByte.bind(this)
    const readBits = this.readBits.bind(this)
    const readUEG = this.readUEG.bind(this)
    const readBoolean = this.readBoolean.bind(this)
    const skipBits = this.skipBits.bind(this)
    const skipEG = this.skipEG.bind(this)
    const skipUEG = this.skipUEG.bind(this)
    const skipScalingList = this.skipScalingList.bind(this)
    readUByte()
    const profileIdc = readUByte()
    readBits(5)
    skipBits(3)
    readUByte()
    skipUEG()
    if (
      profileIdc === 100 ||
      profileIdc === 110 ||
      profileIdc === 122 ||
      profileIdc === 244 ||
      profileIdc === 44 ||
      profileIdc === 83 ||
      profileIdc === 86 ||
      profileIdc === 118 ||
      profileIdc === 128
    ) {
      const chromaFormatIdc = readUEG()
      if (chromaFormatIdc === 3) {
        skipBits(1)
      }
      skipUEG()
      skipUEG()
      skipBits(1)
      if (readBoolean()) {
        scalingListCount = chromaFormatIdc !== 3 ? 8 : 12
        for (i = 0; i < scalingListCount; i++) {
          if (readBoolean()) {
            if (i < 6) {
              skipScalingList(16)
            } else {
              skipScalingList(64)
            }
          }
        }
      }
    }
    skipUEG()
    const picOrderCntType = readUEG()
    if (picOrderCntType === 0) {
      readUEG()
    } else if (picOrderCntType === 1) {
      skipBits(1)
      skipEG()
      skipEG()
      numRefFramesInPicOrderCntCycle = readUEG()
      for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        skipEG()
      }
    }
    skipUEG()
    skipBits(1)
    const picWidthInMbsMinus1 = readUEG()
    const picHeightInMapUnitsMinus1 = readUEG()
    const frameMbsOnlyFlag = readBits(1)
    if (frameMbsOnlyFlag === 0) {
      skipBits(1)
    }
    skipBits(1)
    if (readBoolean()) {
      frameCropLeftOffset = readUEG()
      frameCropRightOffset = readUEG()
      frameCropTopOffset = readUEG()
      frameCropBottomOffset = readUEG()
    }
    let pixelRatio = [1, 1]
    if (readBoolean()) {
      if (readBoolean()) {
        const aspectRatioIdc = readUByte()
        switch (aspectRatioIdc) {
          case 1:
            pixelRatio = [1, 1]
            break
          case 2:
            pixelRatio = [12, 11]
            break
          case 3:
            pixelRatio = [10, 11]
            break
          case 4:
            pixelRatio = [16, 11]
            break
          case 5:
            pixelRatio = [40, 33]
            break
          case 6:
            pixelRatio = [24, 11]
            break
          case 7:
            pixelRatio = [20, 11]
            break
          case 8:
            pixelRatio = [32, 11]
            break
          case 9:
            pixelRatio = [80, 33]
            break
          case 10:
            pixelRatio = [18, 11]
            break
          case 11:
            pixelRatio = [15, 11]
            break
          case 12:
            pixelRatio = [64, 33]
            break
          case 13:
            pixelRatio = [160, 99]
            break
          case 14:
            pixelRatio = [4, 3]
            break
          case 15:
            pixelRatio = [3, 2]
            break
          case 16:
            pixelRatio = [2, 1]
            break
          case 255: {
            pixelRatio = [
              (readUByte() << 8) | readUByte(),
              (readUByte() << 8) | readUByte()
            ]
            break
          }
        }
      }
    }
    return {
      width: Math.ceil(
        (picWidthInMbsMinus1 + 1) * 16 -
          frameCropLeftOffset * 2 -
          frameCropRightOffset * 2
      ),
      height:
        (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 -
        (frameMbsOnlyFlag ? 2 : 4) *
          (frameCropTopOffset + frameCropBottomOffset),
      pixelRatio
    }
  }
  readSliceType() {
    this.readUByte()
    this.readUEG()
    return this.readUEG()
  }
}
var exp_golomb_default = ExpGolomb

// src/demux/sample-aes.ts
var SampleAesDecrypter = class {
  constructor(observer, config, keyData) {
    this.keyData = keyData
    this.decrypter = new decrypter_default(observer, config, {
      removePKCS7Padding: false
    })
  }
  decryptBuffer(encryptedData, callback) {
    this.decrypter.decrypt(
      encryptedData,
      this.keyData.key.buffer,
      this.keyData.iv.buffer,
      callback
    )
  }
  decryptAacSample(samples, sampleIndex, callback, sync) {
    const curUnit = samples[sampleIndex].unit
    const encryptedData = curUnit.subarray(
      16,
      curUnit.length - (curUnit.length % 16)
    )
    const encryptedBuffer = encryptedData.buffer.slice(
      encryptedData.byteOffset,
      encryptedData.byteOffset + encryptedData.length
    )
    const localthis = this
    this.decryptBuffer(encryptedBuffer, decryptedBuffer => {
      const decryptedData = new Uint8Array(decryptedBuffer)
      curUnit.set(decryptedData, 16)
      if (!sync) {
        localthis.decryptAacSamples(samples, sampleIndex + 1, callback)
      }
    })
  }
  decryptAacSamples(samples, sampleIndex, callback) {
    for (; ; sampleIndex++) {
      if (sampleIndex >= samples.length) {
        callback()
        return
      }
      if (samples[sampleIndex].unit.length < 32) {
        continue
      }
      const sync = this.decrypter.isSync()
      this.decryptAacSample(samples, sampleIndex, callback, sync)
      if (!sync) {
        return
      }
    }
  }
  getAvcEncryptedData(decodedData) {
    const encryptedDataLen =
      Math.floor((decodedData.length - 48) / 160) * 16 + 16
    const encryptedData = new Int8Array(encryptedDataLen)
    let outputPos = 0
    for (
      let inputPos = 32;
      inputPos <= decodedData.length - 16;
      inputPos += 160, outputPos += 16
    ) {
      encryptedData.set(
        decodedData.subarray(inputPos, inputPos + 16),
        outputPos
      )
    }
    return encryptedData
  }
  getAvcDecryptedUnit(decodedData, decryptedData) {
    const uint8DecryptedData = new Uint8Array(decryptedData)
    let inputPos = 0
    for (
      let outputPos = 32;
      outputPos <= decodedData.length - 16;
      outputPos += 160, inputPos += 16
    ) {
      decodedData.set(
        uint8DecryptedData.subarray(inputPos, inputPos + 16),
        outputPos
      )
    }
    return decodedData
  }
  decryptAvcSample(samples, sampleIndex, unitIndex, callback, curUnit, sync) {
    const decodedData = discardEPB(curUnit.data)
    const encryptedData = this.getAvcEncryptedData(decodedData)
    const localthis = this
    this.decryptBuffer(encryptedData.buffer, function (decryptedBuffer) {
      curUnit.data = localthis.getAvcDecryptedUnit(decodedData, decryptedBuffer)
      if (!sync) {
        localthis.decryptAvcSamples(
          samples,
          sampleIndex,
          unitIndex + 1,
          callback
        )
      }
    })
  }
  decryptAvcSamples(samples, sampleIndex, unitIndex, callback) {
    if (samples instanceof Uint8Array) {
      throw new Error('Cannot decrypt samples of type Uint8Array')
    }
    for (; ; sampleIndex++, unitIndex = 0) {
      if (sampleIndex >= samples.length) {
        callback()
        return
      }
      const curUnits = samples[sampleIndex].units
      for (; ; unitIndex++) {
        if (unitIndex >= curUnits.length) {
          break
        }
        const curUnit = curUnits[unitIndex]
        if (
          curUnit.data.length <= 48 ||
          (curUnit.type !== 1 && curUnit.type !== 5)
        ) {
          continue
        }
        const sync = this.decrypter.isSync()
        this.decryptAvcSample(
          samples,
          sampleIndex,
          unitIndex,
          callback,
          curUnit,
          sync
        )
        if (!sync) {
          return
        }
      }
    }
  }
}
var sample_aes_default = SampleAesDecrypter

// src/demux/tsdemuxer.ts
var RemuxerTrackIdConfig = {
  video: 1,
  audio: 2,
  id3: 3,
  text: 4
}
var _TSDemuxer = class {
  constructor(observer, config, typeSupported) {
    this.sampleAes = null
    this.pmtParsed = false
    this._duration = 0
    this.aacLastPTS = null
    this._initPTS = null
    this._initDTS = null
    this._pmtId = -1
    this.aacOverFlow = null
    this.avcSample = null
    this.remainderData = null
    this.observer = observer
    this.config = config
    this.typeSupported = typeSupported
  }
  static probe(data) {
    const syncOffset = _TSDemuxer.syncOffset(data)
    if (syncOffset < 0) {
      return false
    } else {
      if (syncOffset) {
        logger.warn(
          `MPEG2-TS detected but first sync word found @ offset ${syncOffset}, junk ahead ?`
        )
      }
      return true
    }
  }
  static syncOffset(data) {
    const scanwindow = Math.min(1e3, data.length - 3 * 188)
    let i = 0
    while (i < scanwindow) {
      if (data[i] === 71 && data[i + 188] === 71 && data[i + 2 * 188] === 71) {
        return i
      } else {
        i++
      }
    }
    return -1
  }
  static createTrack(type, duration) {
    return {
      container: type === 'video' || type === 'audio' ? 'video/mp2t' : void 0,
      type,
      id: RemuxerTrackIdConfig[type],
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0,
      duration: type === 'audio' ? duration : void 0
    }
  }
  resetInitSegment(audioCodec, videoCodec, duration) {
    this.pmtParsed = false
    this._pmtId = -1
    this._avcTrack = _TSDemuxer.createTrack('video', duration)
    this._audioTrack = _TSDemuxer.createTrack('audio', duration)
    this._id3Track = _TSDemuxer.createTrack('id3', duration)
    this._txtTrack = _TSDemuxer.createTrack('text', duration)
    this._audioTrack.isAAC = true
    this.aacOverFlow = null
    this.aacLastPTS = null
    this.avcSample = null
    this.audioCodec = audioCodec
    this.videoCodec = videoCodec
    this._duration = duration
  }
  resetTimeStamp() {}
  resetContiguity() {
    const { _audioTrack, _avcTrack, _id3Track } = this
    if (_audioTrack) {
      _audioTrack.pesData = null
    }
    if (_avcTrack) {
      _avcTrack.pesData = null
    }
    if (_id3Track) {
      _id3Track.pesData = null
    }
    this.aacOverFlow = null
    this.aacLastPTS = null
  }
  demux(data, timeOffset, isSampleAes = false, flush = false) {
    if (!isSampleAes) {
      this.sampleAes = null
    }
    let pes
    const avcTrack = this._avcTrack
    const audioTrack = this._audioTrack
    const id3Track = this._id3Track
    let avcId = avcTrack.pid
    let avcData = avcTrack.pesData
    let audioId = audioTrack.pid
    let id3Id = id3Track.pid
    let audioData = audioTrack.pesData
    let id3Data = id3Track.pesData
    let unknownPIDs = false
    let pmtParsed = this.pmtParsed
    let pmtId = this._pmtId
    let len = data.length
    if (this.remainderData) {
      data = appendUint8Array(this.remainderData, data)
      len = data.length
      this.remainderData = null
    }
    if (len < 188 && !flush) {
      this.remainderData = data
      return {
        audioTrack,
        avcTrack,
        id3Track,
        textTrack: this._txtTrack
      }
    }
    const syncOffset = Math.max(0, _TSDemuxer.syncOffset(data))
    len -= (len + syncOffset) % 188
    if (len < data.byteLength && !flush) {
      this.remainderData = new Uint8Array(
        data.buffer,
        len,
        data.buffer.byteLength - len
      )
    }
    for (let start = syncOffset; start < len; start += 188) {
      if (data[start] === 71) {
        const stt = !!(data[start + 1] & 64)
        const pid = ((data[start + 1] & 31) << 8) + data[start + 2]
        const atf = (data[start + 3] & 48) >> 4
        let offset
        if (atf > 1) {
          offset = start + 5 + data[start + 4]
          if (offset === start + 188) {
            continue
          }
        } else {
          offset = start + 4
        }
        switch (pid) {
          case avcId:
            if (stt) {
              if (avcData && (pes = parsePES(avcData))) {
                this.parseAVCPES(pes, false)
              }
              avcData = { data: [], size: 0 }
            }
            if (avcData) {
              avcData.data.push(data.subarray(offset, start + 188))
              avcData.size += start + 188 - offset
            }
            break
          case audioId:
            if (stt) {
              if (audioData && (pes = parsePES(audioData))) {
                if (audioTrack.isAAC) {
                  this.parseAACPES(pes)
                } else {
                  this.parseMPEGPES(pes)
                }
              }
              audioData = { data: [], size: 0 }
            }
            if (audioData) {
              audioData.data.push(data.subarray(offset, start + 188))
              audioData.size += start + 188 - offset
            }
            break
          case id3Id:
            if (stt) {
              if (id3Data && (pes = parsePES(id3Data))) {
                this.parseID3PES(pes)
              }
              id3Data = { data: [], size: 0 }
            }
            if (id3Data) {
              id3Data.data.push(data.subarray(offset, start + 188))
              id3Data.size += start + 188 - offset
            }
            break
          case 0:
            if (stt) {
              offset += data[offset] + 1
            }
            pmtId = this._pmtId = parsePAT(data, offset)
            break
          case pmtId: {
            if (stt) {
              offset += data[offset] + 1
            }
            const parsedPIDs = parsePMT(
              data,
              offset,
              this.typeSupported.mpeg === true ||
                this.typeSupported.mp3 === true,
              isSampleAes
            )
            avcId = parsedPIDs.avc
            if (avcId > 0) {
              avcTrack.pid = avcId
            }
            audioId = parsedPIDs.audio
            if (audioId > 0) {
              audioTrack.pid = audioId
              audioTrack.isAAC = parsedPIDs.isAAC
            }
            id3Id = parsedPIDs.id3
            if (id3Id > 0) {
              id3Track.pid = id3Id
            }
            if (unknownPIDs && !pmtParsed) {
              logger.log('reparse from beginning')
              unknownPIDs = false
              start = syncOffset - 188
            }
            pmtParsed = this.pmtParsed = true
            break
          }
          case 17:
          case 8191:
            break
          default:
            unknownPIDs = true
            break
        }
      } else {
        this.observer.emit(Events.ERROR, Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.FRAG_PARSING_ERROR,
          fatal: false,
          reason: 'TS packet did not start with 0x47'
        })
      }
    }
    avcTrack.pesData = avcData
    audioTrack.pesData = audioData
    id3Track.pesData = id3Data
    const demuxResult = {
      audioTrack,
      avcTrack,
      id3Track,
      textTrack: this._txtTrack
    }
    if (flush) {
      this.extractRemainingSamples(demuxResult)
    }
    return demuxResult
  }
  flush() {
    const { remainderData } = this
    this.remainderData = null
    let result
    if (remainderData) {
      result = this.demux(remainderData, -1, false, true)
    } else {
      result = {
        audioTrack: this._audioTrack,
        avcTrack: this._avcTrack,
        textTrack: this._txtTrack,
        id3Track: this._id3Track
      }
    }
    this.extractRemainingSamples(result)
    if (this.sampleAes) {
      return this.decrypt(result, this.sampleAes)
    }
    return result
  }
  extractRemainingSamples(demuxResult) {
    const { audioTrack, avcTrack, id3Track } = demuxResult
    const avcData = avcTrack.pesData
    const audioData = audioTrack.pesData
    const id3Data = id3Track.pesData
    let pes
    if (avcData && (pes = parsePES(avcData))) {
      this.parseAVCPES(pes, true)
      avcTrack.pesData = null
    } else {
      avcTrack.pesData = avcData
    }
    if (audioData && (pes = parsePES(audioData))) {
      if (audioTrack.isAAC) {
        this.parseAACPES(pes)
      } else {
        this.parseMPEGPES(pes)
      }
      audioTrack.pesData = null
    } else {
      if (audioData?.size) {
        logger.log(
          'last AAC PES packet truncated,might overlap between fragments'
        )
      }
      audioTrack.pesData = audioData
    }
    if (id3Data && (pes = parsePES(id3Data))) {
      this.parseID3PES(pes)
      id3Track.pesData = null
    } else {
      id3Track.pesData = id3Data
    }
  }
  demuxSampleAes(data, keyData, timeOffset) {
    const demuxResult = this.demux(
      data,
      timeOffset,
      true,
      !this.config.progressive
    )
    const sampleAes = (this.sampleAes = new sample_aes_default(
      this.observer,
      this.config,
      keyData
    ))
    return this.decrypt(demuxResult, sampleAes)
  }
  decrypt(demuxResult, sampleAes) {
    return new Promise(resolve => {
      const { audioTrack, avcTrack } = demuxResult
      if (audioTrack.samples && audioTrack.isAAC) {
        sampleAes.decryptAacSamples(audioTrack.samples, 0, () => {
          if (avcTrack.samples) {
            sampleAes.decryptAvcSamples(avcTrack.samples, 0, 0, () => {
              resolve(demuxResult)
            })
          } else {
            resolve(demuxResult)
          }
        })
      } else if (avcTrack.samples) {
        sampleAes.decryptAvcSamples(avcTrack.samples, 0, 0, () => {
          resolve(demuxResult)
        })
      }
    })
  }
  destroy() {
    this._initPTS = this._initDTS = null
    this._duration = 0
  }
  parseAVCPES(pes, last) {
    const track = this._avcTrack
    const units = this.parseAVCNALu(pes.data)
    const debug = false
    let avcSample = this.avcSample
    let push2
    let spsfound = false
    pes.data = null
    if (avcSample && units.length && !track.audFound) {
      pushAccessUnit(avcSample, track)
      avcSample = this.avcSample = createAVCSample(false, pes.pts, pes.dts, '')
    }
    units.forEach(unit => {
      switch (unit.type) {
        case 1: {
          push2 = true
          if (!avcSample) {
            avcSample = this.avcSample = createAVCSample(
              true,
              pes.pts,
              pes.dts,
              ''
            )
          }
          if (debug) {
            avcSample.debug += 'NDR '
          }
          avcSample.frame = true
          const data = unit.data
          if (spsfound && data.length > 4) {
            const sliceType = new exp_golomb_default(data).readSliceType()
            if (
              sliceType === 2 ||
              sliceType === 4 ||
              sliceType === 7 ||
              sliceType === 9
            ) {
              avcSample.key = true
            }
          }
          break
        }
        case 5:
          push2 = true
          if (!avcSample) {
            avcSample = this.avcSample = createAVCSample(
              true,
              pes.pts,
              pes.dts,
              ''
            )
          }
          if (debug) {
            avcSample.debug += 'IDR '
          }
          avcSample.key = true
          avcSample.frame = true
          break
        case 6: {
          push2 = true
          if (debug && avcSample) {
            avcSample.debug += 'SEI '
          }
          const expGolombDecoder = new exp_golomb_default(discardEPB(unit.data))
          expGolombDecoder.readUByte()
          let payloadType = 0
          let payloadSize = 0
          let endOfCaptions = false
          let b = 0
          while (!endOfCaptions && expGolombDecoder.bytesAvailable > 1) {
            payloadType = 0
            do {
              b = expGolombDecoder.readUByte()
              payloadType += b
            } while (b === 255)
            payloadSize = 0
            do {
              b = expGolombDecoder.readUByte()
              payloadSize += b
            } while (b === 255)
            if (payloadType === 4 && expGolombDecoder.bytesAvailable !== 0) {
              endOfCaptions = true
              const countryCode = expGolombDecoder.readUByte()
              if (countryCode === 181) {
                const providerCode = expGolombDecoder.readUShort()
                if (providerCode === 49) {
                  const userStructure = expGolombDecoder.readUInt()
                  if (userStructure === 1195456820) {
                    const userDataType = expGolombDecoder.readUByte()
                    if (userDataType === 3) {
                      const firstByte = expGolombDecoder.readUByte()
                      const secondByte = expGolombDecoder.readUByte()
                      const totalCCs = 31 & firstByte
                      const byteArray = [firstByte, secondByte]
                      for (let i = 0; i < totalCCs; i++) {
                        byteArray.push(expGolombDecoder.readUByte())
                        byteArray.push(expGolombDecoder.readUByte())
                        byteArray.push(expGolombDecoder.readUByte())
                      }
                      insertSampleInOrder(this._txtTrack.samples, {
                        type: 3,
                        pts: pes.pts,
                        bytes: byteArray
                      })
                    }
                  }
                }
              }
            } else if (
              payloadType === 5 &&
              expGolombDecoder.bytesAvailable !== 0
            ) {
              endOfCaptions = true
              if (payloadSize > 16) {
                const uuidStrArray = []
                for (let i = 0; i < 16; i++) {
                  uuidStrArray.push(expGolombDecoder.readUByte().toString(16))
                  if (i === 3 || i === 5 || i === 7 || i === 9) {
                    uuidStrArray.push('-')
                  }
                }
                const length = payloadSize - 16
                const userDataPayloadBytes = new Uint8Array(length)
                for (let i = 0; i < length; i++) {
                  userDataPayloadBytes[i] = expGolombDecoder.readUByte()
                }
                insertSampleInOrder(this._txtTrack.samples, {
                  pts: pes.pts,
                  payloadType,
                  uuid: uuidStrArray.join(''),
                  userData: utf8ArrayToStr(userDataPayloadBytes),
                  userDataBytes: userDataPayloadBytes
                })
              }
            } else if (payloadSize < expGolombDecoder.bytesAvailable) {
              for (let i = 0; i < payloadSize; i++) {
                expGolombDecoder.readUByte()
              }
            }
          }
          break
        }
        case 7:
          push2 = true
          spsfound = true
          if (debug && avcSample) {
            avcSample.debug += 'SPS '
          }
          if (!track.sps) {
            const expGolombDecoder = new exp_golomb_default(unit.data)
            const config = expGolombDecoder.readSPS()
            track.width = config.width
            track.height = config.height
            track.pixelRatio = config.pixelRatio
            track.sps = [unit.data]
            track.duration = this._duration
            const codecarray = unit.data.subarray(1, 4)
            let codecstring = 'avc1.'
            for (let i = 0; i < 3; i++) {
              let h = codecarray[i].toString(16)
              if (h.length < 2) {
                h = '0' + h
              }
              codecstring += h
            }
            track.codec = codecstring
          }
          break
        case 8:
          push2 = true
          if (debug && avcSample) {
            avcSample.debug += 'PPS '
          }
          if (!track.pps) {
            track.pps = [unit.data]
          }
          break
        case 9:
          push2 = false
          track.audFound = true
          if (avcSample) {
            pushAccessUnit(avcSample, track)
          }
          avcSample = this.avcSample = createAVCSample(
            false,
            pes.pts,
            pes.dts,
            debug ? 'AUD ' : ''
          )
          break
        case 12:
          push2 = false
          break
        default:
          push2 = false
          if (avcSample) {
            avcSample.debug += 'unknown NAL ' + unit.type + ' '
          }
          break
      }
      if (avcSample && push2) {
        const units2 = avcSample.units
        units2.push(unit)
      }
    })
    if (last && avcSample) {
      pushAccessUnit(avcSample, track)
      this.avcSample = null
    }
  }
  getLastNalUnit() {
    let avcSample = this.avcSample
    let lastUnit
    if (!avcSample || avcSample.units.length === 0) {
      const samples = this._avcTrack.samples
      avcSample = samples[samples.length - 1]
    }
    if (avcSample?.units) {
      const units = avcSample.units
      lastUnit = units[units.length - 1]
    }
    return lastUnit
  }
  parseAVCNALu(array) {
    const len = array.byteLength
    const track = this._avcTrack
    let state = track.naluState || 0
    const lastState = state
    const units = []
    let i = 0
    let value
    let overflow
    let unitType
    let lastUnitStart = -1
    let lastUnitType = 0
    if (state === -1) {
      lastUnitStart = 0
      lastUnitType = array[0] & 31
      state = 0
      i = 1
    }
    while (i < len) {
      value = array[i++]
      if (!state) {
        state = value ? 0 : 1
        continue
      }
      if (state === 1) {
        state = value ? 0 : 2
        continue
      }
      if (!value) {
        state = 3
      } else if (value === 1) {
        if (lastUnitStart >= 0) {
          const unit = {
            data: array.subarray(lastUnitStart, i - state - 1),
            type: lastUnitType
          }
          units.push(unit)
        } else {
          const lastUnit = this.getLastNalUnit()
          if (lastUnit) {
            if (lastState && i <= 4 - lastState) {
              if (lastUnit.state) {
                lastUnit.data = lastUnit.data.subarray(
                  0,
                  lastUnit.data.byteLength - lastState
                )
              }
            }
            overflow = i - state - 1
            if (overflow > 0) {
              const tmp = new Uint8Array(lastUnit.data.byteLength + overflow)
              tmp.set(lastUnit.data, 0)
              tmp.set(array.subarray(0, overflow), lastUnit.data.byteLength)
              lastUnit.data = tmp
            }
          }
        }
        if (i < len) {
          unitType = array[i] & 31
          lastUnitStart = i
          lastUnitType = unitType
          state = 0
        } else {
          state = -1
        }
      } else {
        state = 0
      }
    }
    if (lastUnitStart >= 0 && state >= 0) {
      const unit = {
        data: array.subarray(lastUnitStart, len),
        type: lastUnitType,
        state
      }
      units.push(unit)
    }
    if (units.length === 0) {
      const lastUnit = this.getLastNalUnit()
      if (lastUnit) {
        const tmp = new Uint8Array(lastUnit.data.byteLength + array.byteLength)
        tmp.set(lastUnit.data, 0)
        tmp.set(array, lastUnit.data.byteLength)
        lastUnit.data = tmp
      }
    }
    track.naluState = state
    return units
  }
  parseAACPES(pes) {
    const startOffset = 0
    const track = this._audioTrack
    const aacLastPTS = this.aacLastPTS
    const aacOverFlow = this.aacOverFlow
    let data = pes.data
    if (aacOverFlow) {
      const tmp = new Uint8Array(aacOverFlow.byteLength + data.byteLength)
      tmp.set(aacOverFlow, 0)
      tmp.set(data, aacOverFlow.byteLength)
      data = tmp
    }
    let offset
    let len
    for (offset = startOffset, len = data.length; offset < len - 1; offset++) {
      if (isHeader2(data, offset)) {
        break
      }
    }
    if (offset) {
      let reason
      let fatal
      if (offset < len - 1) {
        reason = `AAC PES did not start with ADTS header,offset:${offset}`
        fatal = false
      } else {
        reason = 'no ADTS header found in AAC PES'
        fatal = true
      }
      logger.warn(`parsing error:${reason}`)
      this.observer.emit(Events.ERROR, Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.FRAG_PARSING_ERROR,
        fatal,
        reason
      })
      if (fatal) {
        return
      }
    }
    initTrackConfig(track, this.observer, data, offset, this.audioCodec)
    let frameIndex = 0
    const frameDuration = getFrameDuration(track.samplerate)
    let pts
    if (pes.pts !== void 0) {
      pts = pes.pts
    } else if (aacLastPTS !== null) {
      pts = aacLastPTS
    } else {
      logger.warn('[tsdemuxer]: AAC PES unknown PTS')
      return
    }
    if (aacOverFlow && aacLastPTS !== null) {
      const newPTS = aacLastPTS + frameDuration
      if (Math.abs(newPTS - pts) > 1) {
        logger.log(
          `[tsdemuxer]: AAC: align PTS for overlapping frames by ${Math.round(
            (newPTS - pts) / 90
          )}`
        )
        pts = newPTS
      }
    }
    let stamp = null
    while (offset < len) {
      if (isHeader2(data, offset)) {
        if (offset + 5 < len) {
          const frame = appendFrame(track, data, offset, pts, frameIndex)
          if (frame) {
            offset += frame.length
            stamp = frame.sample.pts
            frameIndex++
            continue
          }
        }
        break
      } else {
        offset++
      }
    }
    this.aacOverFlow = offset < len ? data.subarray(offset, len) : null
    this.aacLastPTS = stamp
  }
  parseMPEGPES(pes) {
    const data = pes.data
    const length = data.length
    let frameIndex = 0
    let offset = 0
    const pts = pes.pts
    if (pts === void 0) {
      logger.warn('[tsdemuxer]: MPEG PES unknown PTS')
      return
    }
    while (offset < length) {
      if (isHeader3(data, offset)) {
        const frame = appendFrame2(
          this._audioTrack,
          data,
          offset,
          pts,
          frameIndex
        )
        if (frame) {
          offset += frame.length
          frameIndex++
        } else {
          break
        }
      } else {
        offset++
      }
    }
  }
  parseID3PES(pes) {
    if (pes.pts === void 0) {
      logger.warn('[tsdemuxer]: ID3 PES unknown PTS')
      return
    }
    this._id3Track.samples.push(pes)
  }
}
var TSDemuxer = _TSDemuxer
TSDemuxer.minProbeByteLength = 188
function createAVCSample(key, pts, dts, debug) {
  return {
    key,
    frame: false,
    pts,
    dts,
    units: [],
    debug,
    length: 0
  }
}
function parsePAT(data, offset) {
  return ((data[offset + 10] & 31) << 8) | data[offset + 11]
}
function parsePMT(data, offset, mpegSupported, isSampleAes) {
  const result = { audio: -1, avc: -1, id3: -1, isAAC: true }
  const sectionLength = ((data[offset + 1] & 15) << 8) | data[offset + 2]
  const tableEnd = offset + 3 + sectionLength - 4
  const programInfoLength = ((data[offset + 10] & 15) << 8) | data[offset + 11]
  offset += 12 + programInfoLength
  while (offset < tableEnd) {
    const pid = ((data[offset + 1] & 31) << 8) | data[offset + 2]
    switch (data[offset]) {
      case 207:
        if (!isSampleAes) {
          logger.log(
            'ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream'
          )
          break
        }
      case 15:
        if (result.audio === -1) {
          result.audio = pid
        }
        break
      case 21:
        if (result.id3 === -1) {
          result.id3 = pid
        }
        break
      case 219:
        if (!isSampleAes) {
          logger.log(
            'H.264 with AES-128-CBC slice encryption found in unencrypted stream'
          )
          break
        }
      case 27:
        if (result.avc === -1) {
          result.avc = pid
        }
        break
      case 3:
      case 4:
        if (!mpegSupported) {
          logger.log('MPEG audio found, not supported in this browser')
        } else if (result.audio === -1) {
          result.audio = pid
          result.isAAC = false
        }
        break
      case 36:
        logger.warn('Unsupported HEVC stream type found')
        break
      default:
        break
    }
    offset += (((data[offset + 3] & 15) << 8) | data[offset + 4]) + 5
  }
  return result
}
function parsePES(stream) {
  let i = 0
  let frag
  let pesLen
  let pesHdrLen
  let pesPts
  let pesDts
  const data = stream.data
  if (!stream || stream.size === 0) {
    return null
  }
  while (data[0].length < 19 && data.length > 1) {
    const newData = new Uint8Array(data[0].length + data[1].length)
    newData.set(data[0])
    newData.set(data[1], data[0].length)
    data[0] = newData
    data.splice(1, 1)
  }
  frag = data[0]
  const pesPrefix = (frag[0] << 16) + (frag[1] << 8) + frag[2]
  if (pesPrefix === 1) {
    pesLen = (frag[4] << 8) + frag[5]
    if (pesLen && pesLen > stream.size - 6) {
      return null
    }
    const pesFlags = frag[7]
    if (pesFlags & 192) {
      pesPts =
        (frag[9] & 14) * 536870912 +
        (frag[10] & 255) * 4194304 +
        (frag[11] & 254) * 16384 +
        (frag[12] & 255) * 128 +
        (frag[13] & 254) / 2
      if (pesFlags & 64) {
        pesDts =
          (frag[14] & 14) * 536870912 +
          (frag[15] & 255) * 4194304 +
          (frag[16] & 254) * 16384 +
          (frag[17] & 255) * 128 +
          (frag[18] & 254) / 2
        if (pesPts - pesDts > 60 * 9e4) {
          logger.warn(
            `${Math.round(
              (pesPts - pesDts) / 9e4
            )}s delta between PTS and DTS, align them`
          )
          pesPts = pesDts
        }
      } else {
        pesDts = pesPts
      }
    }
    pesHdrLen = frag[8]
    let payloadStartOffset = pesHdrLen + 9
    if (stream.size <= payloadStartOffset) {
      return null
    }
    stream.size -= payloadStartOffset
    const pesData = new Uint8Array(stream.size)
    for (let j = 0, dataLen = data.length; j < dataLen; j++) {
      frag = data[j]
      let len = frag.byteLength
      if (payloadStartOffset) {
        if (payloadStartOffset > len) {
          payloadStartOffset -= len
          continue
        } else {
          frag = frag.subarray(payloadStartOffset)
          len -= payloadStartOffset
          payloadStartOffset = 0
        }
      }
      pesData.set(frag, i)
      i += len
    }
    if (pesLen) {
      pesLen -= pesHdrLen + 3
    }
    return { data: pesData, pts: pesPts, dts: pesDts, len: pesLen }
  }
  return null
}
function pushAccessUnit(avcSample, avcTrack) {
  if (avcSample.units.length && avcSample.frame) {
    if (avcSample.pts === void 0) {
      const samples = avcTrack.samples
      const nbSamples = samples.length
      if (nbSamples) {
        const lastSample = samples[nbSamples - 1]
        avcSample.pts = lastSample.pts
        avcSample.dts = lastSample.dts
      } else {
        avcTrack.dropped++
        return
      }
    }
    avcTrack.samples.push(avcSample)
  }
  if (avcSample.debug.length) {
    logger.log(avcSample.pts + '/' + avcSample.dts + ':' + avcSample.debug)
  }
}
function insertSampleInOrder(arr, data) {
  const len = arr.length
  if (len > 0) {
    if (data.pts >= arr[len - 1].pts) {
      arr.push(data)
    } else {
      for (let pos = len - 1; pos >= 0; pos--) {
        if (data.pts < arr[pos].pts) {
          arr.splice(pos, 0, data)
          break
        }
      }
    }
  } else {
    arr.push(data)
  }
}
function discardEPB(data) {
  const length = data.byteLength
  const EPBPositions = []
  let i = 1
  while (i < length - 2) {
    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 3) {
      EPBPositions.push(i + 2)
      i += 2
    } else {
      i++
    }
  }
  if (EPBPositions.length === 0) {
    return data
  }
  const newLength = length - EPBPositions.length
  const newData = new Uint8Array(newLength)
  let sourceIndex = 0
  for (i = 0; i < newLength; sourceIndex++, i++) {
    if (sourceIndex === EPBPositions[0]) {
      sourceIndex++
      EPBPositions.shift()
    }
    newData[i] = data[sourceIndex]
  }
  return newData
}
var tsdemuxer_default = TSDemuxer

// src/demux/mp3demuxer.ts
var MP3Demuxer = class extends base_audio_demuxer_default {
  resetInitSegment(audioCodec, videoCodec, duration) {
    super.resetInitSegment(audioCodec, videoCodec, duration)
    this._audioTrack = {
      container: 'audio/mpeg',
      type: 'audio',
      id: 0,
      pid: -1,
      sequenceNumber: 0,
      isAAC: false,
      samples: [],
      manifestCodec: audioCodec,
      duration,
      inputTimeScale: 9e4,
      dropped: 0
    }
  }
  static probe(data) {
    if (!data) {
      return false
    }
    const id3Data = getID3Data(data, 0) || []
    let offset = id3Data.length
    for (let length = data.length; offset < length; offset++) {
      if (probe2(data, offset)) {
        logger.log('MPEG Audio sync word found !')
        return true
      }
    }
    return false
  }
  canParse(data, offset) {
    return canParse3(data, offset)
  }
  appendFrame(track, data, offset) {
    if (this.initPTS === null) {
      return
    }
    return appendFrame2(track, data, offset, this.initPTS, this.frameIndex)
  }
}
MP3Demuxer.minProbeByteLength = 4
var mp3demuxer_default = MP3Demuxer

// src/remux/aac-helper.ts
var AAC = class {
  static getSilentFrame(codec, channelCount) {
    switch (codec) {
      case 'mp4a.40.2':
        if (channelCount === 1) {
          return new Uint8Array([0, 200, 0, 128, 35, 128])
        } else if (channelCount === 2) {
          return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128])
        } else if (channelCount === 3) {
          return new Uint8Array([
            0,
            200,
            0,
            128,
            32,
            132,
            1,
            38,
            64,
            8,
            100,
            0,
            142
          ])
        } else if (channelCount === 4) {
          return new Uint8Array([
            0,
            200,
            0,
            128,
            32,
            132,
            1,
            38,
            64,
            8,
            100,
            0,
            128,
            44,
            128,
            8,
            2,
            56
          ])
        } else if (channelCount === 5) {
          return new Uint8Array([
            0,
            200,
            0,
            128,
            32,
            132,
            1,
            38,
            64,
            8,
            100,
            0,
            130,
            48,
            4,
            153,
            0,
            33,
            144,
            2,
            56
          ])
        } else if (channelCount === 6) {
          return new Uint8Array([
            0,
            200,
            0,
            128,
            32,
            132,
            1,
            38,
            64,
            8,
            100,
            0,
            130,
            48,
            4,
            153,
            0,
            33,
            144,
            2,
            0,
            178,
            0,
            32,
            8,
            224
          ])
        }
        break
      default:
        if (channelCount === 1) {
          return new Uint8Array([
            1,
            64,
            34,
            128,
            163,
            78,
            230,
            128,
            186,
            8,
            0,
            0,
            0,
            28,
            6,
            241,
            193,
            10,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            94
          ])
        } else if (channelCount === 2) {
          return new Uint8Array([
            1,
            64,
            34,
            128,
            163,
            94,
            230,
            128,
            186,
            8,
            0,
            0,
            0,
            0,
            149,
            0,
            6,
            241,
            161,
            10,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            94
          ])
        } else if (channelCount === 3) {
          return new Uint8Array([
            1,
            64,
            34,
            128,
            163,
            94,
            230,
            128,
            186,
            8,
            0,
            0,
            0,
            0,
            149,
            0,
            6,
            241,
            161,
            10,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            90,
            94
          ])
        }
        break
    }
    return void 0
  }
}
var aac_helper_default = AAC

// src/remux/mp4-generator.ts
var UINT32_MAX2 = Math.pow(2, 32) - 1
var MP4 = class {
  static init() {
    MP4.types = {
      avc1: [],
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      '.mp3': [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    }
    let i
    for (i in MP4.types) {
      if (MP4.types.hasOwnProperty(i)) {
        MP4.types[i] = [
          i.charCodeAt(0),
          i.charCodeAt(1),
          i.charCodeAt(2),
          i.charCodeAt(3)
        ]
      }
    }
    const videoHdlr = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      118,
      105,
      100,
      101,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      86,
      105,
      100,
      101,
      111,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
    ])
    const audioHdlr = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      115,
      111,
      117,
      110,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      83,
      111,
      117,
      110,
      100,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
    ])
    MP4.HDLR_TYPES = {
      video: videoHdlr,
      audio: audioHdlr
    }
    const dref = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      12,
      117,
      114,
      108,
      32,
      0,
      0,
      0,
      1
    ])
    const stco = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
    MP4.STTS = MP4.STSC = MP4.STCO = stco
    MP4.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    MP4.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    MP4.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
    MP4.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1])
    const majorBrand = new Uint8Array([105, 115, 111, 109])
    const avc1Brand = new Uint8Array([97, 118, 99, 49])
    const minorVersion = new Uint8Array([0, 0, 0, 1])
    MP4.FTYP = MP4.box(
      MP4.types.ftyp,
      majorBrand,
      minorVersion,
      majorBrand,
      avc1Brand
    )
    MP4.DINF = MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, dref))
  }
  static box(type, ...payload) {
    let size = 8
    let i = payload.length
    const len = i
    while (i--) {
      size += payload[i].byteLength
    }
    const result = new Uint8Array(size)
    result[0] = (size >> 24) & 255
    result[1] = (size >> 16) & 255
    result[2] = (size >> 8) & 255
    result[3] = size & 255
    result.set(type, 4)
    for (i = 0, size = 8; i < len; i++) {
      result.set(payload[i], size)
      size += payload[i].byteLength
    }
    return result
  }
  static hdlr(type) {
    return MP4.box(MP4.types.hdlr, MP4.HDLR_TYPES[type])
  }
  static mdat(data) {
    return MP4.box(MP4.types.mdat, data)
  }
  static mdhd(timescale, duration) {
    duration *= timescale
    const upperWordDuration = Math.floor(duration / (UINT32_MAX2 + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX2 + 1))
    return MP4.box(
      MP4.types.mdhd,
      new Uint8Array([
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        (timescale >> 24) & 255,
        (timescale >> 16) & 255,
        (timescale >> 8) & 255,
        timescale & 255,
        upperWordDuration >> 24,
        (upperWordDuration >> 16) & 255,
        (upperWordDuration >> 8) & 255,
        upperWordDuration & 255,
        lowerWordDuration >> 24,
        (lowerWordDuration >> 16) & 255,
        (lowerWordDuration >> 8) & 255,
        lowerWordDuration & 255,
        85,
        196,
        0,
        0
      ])
    )
  }
  static mdia(track) {
    return MP4.box(
      MP4.types.mdia,
      MP4.mdhd(track.timescale, track.duration),
      MP4.hdlr(track.type),
      MP4.minf(track)
    )
  }
  static mfhd(sequenceNumber) {
    return MP4.box(
      MP4.types.mfhd,
      new Uint8Array([
        0,
        0,
        0,
        0,
        sequenceNumber >> 24,
        (sequenceNumber >> 16) & 255,
        (sequenceNumber >> 8) & 255,
        sequenceNumber & 255
      ])
    )
  }
  static minf(track) {
    if (track.type === 'audio') {
      return MP4.box(
        MP4.types.minf,
        MP4.box(MP4.types.smhd, MP4.SMHD),
        MP4.DINF,
        MP4.stbl(track)
      )
    } else {
      return MP4.box(
        MP4.types.minf,
        MP4.box(MP4.types.vmhd, MP4.VMHD),
        MP4.DINF,
        MP4.stbl(track)
      )
    }
  }
  static moof(sn, baseMediaDecodeTime, track) {
    return MP4.box(
      MP4.types.moof,
      MP4.mfhd(sn),
      MP4.traf(track, baseMediaDecodeTime)
    )
  }
  static moov(tracks) {
    let i = tracks.length
    const boxes = []
    while (i--) {
      boxes[i] = MP4.trak(tracks[i])
    }
    return MP4.box.apply(
      null,
      [MP4.types.moov, MP4.mvhd(tracks[0].timescale, tracks[0].duration)]
        .concat(boxes)
        .concat(MP4.mvex(tracks))
    )
  }
  static mvex(tracks) {
    let i = tracks.length
    const boxes = []
    while (i--) {
      boxes[i] = MP4.trex(tracks[i])
    }
    return MP4.box.apply(null, [MP4.types.mvex, ...boxes])
  }
  static mvhd(timescale, duration) {
    duration *= timescale
    const upperWordDuration = Math.floor(duration / (UINT32_MAX2 + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX2 + 1))
    const bytes = new Uint8Array([
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      (timescale >> 24) & 255,
      (timescale >> 16) & 255,
      (timescale >> 8) & 255,
      timescale & 255,
      upperWordDuration >> 24,
      (upperWordDuration >> 16) & 255,
      (upperWordDuration >> 8) & 255,
      upperWordDuration & 255,
      lowerWordDuration >> 24,
      (lowerWordDuration >> 16) & 255,
      (lowerWordDuration >> 8) & 255,
      lowerWordDuration & 255,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      255,
      255,
      255,
      255
    ])
    return MP4.box(MP4.types.mvhd, bytes)
  }
  static sdtp(track) {
    const samples = track.samples || []
    const bytes = new Uint8Array(4 + samples.length)
    let i
    let flags
    for (i = 0; i < samples.length; i++) {
      flags = samples[i].flags
      bytes[i + 4] =
        (flags.dependsOn << 4) | (flags.isDependedOn << 2) | flags.hasRedundancy
    }
    return MP4.box(MP4.types.sdtp, bytes)
  }
  static stbl(track) {
    return MP4.box(
      MP4.types.stbl,
      MP4.stsd(track),
      MP4.box(MP4.types.stts, MP4.STTS),
      MP4.box(MP4.types.stsc, MP4.STSC),
      MP4.box(MP4.types.stsz, MP4.STSZ),
      MP4.box(MP4.types.stco, MP4.STCO)
    )
  }
  static avc1(track) {
    let sps = []
    let pps = []
    let i
    let data
    let len
    for (i = 0; i < track.sps.length; i++) {
      data = track.sps[i]
      len = data.byteLength
      sps.push((len >>> 8) & 255)
      sps.push(len & 255)
      sps = sps.concat(Array.prototype.slice.call(data))
    }
    for (i = 0; i < track.pps.length; i++) {
      data = track.pps[i]
      len = data.byteLength
      pps.push((len >>> 8) & 255)
      pps.push(len & 255)
      pps = pps.concat(Array.prototype.slice.call(data))
    }
    const avcc = MP4.box(
      MP4.types.avcC,
      new Uint8Array(
        [1, sps[3], sps[4], sps[5], 252 | 3, 224 | track.sps.length]
          .concat(sps)
          .concat([track.pps.length])
          .concat(pps)
      )
    )
    const width = track.width
    const height = track.height
    const hSpacing = track.pixelRatio[0]
    const vSpacing = track.pixelRatio[1]
    return MP4.box(
      MP4.types.avc1,
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        (width >> 8) & 255,
        width & 255,
        (height >> 8) & 255,
        height & 255,
        0,
        72,
        0,
        0,
        0,
        72,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        18,
        100,
        97,
        105,
        108,
        121,
        109,
        111,
        116,
        105,
        111,
        110,
        47,
        104,
        108,
        115,
        46,
        106,
        115,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        24,
        17,
        17
      ]),
      avcc,
      MP4.box(
        MP4.types.btrt,
        new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])
      ),
      MP4.box(
        MP4.types.pasp,
        new Uint8Array([
          hSpacing >> 24,
          (hSpacing >> 16) & 255,
          (hSpacing >> 8) & 255,
          hSpacing & 255,
          vSpacing >> 24,
          (vSpacing >> 16) & 255,
          (vSpacing >> 8) & 255,
          vSpacing & 255
        ])
      )
    )
  }
  static esds(track) {
    const configlen = track.config.length
    return new Uint8Array(
      [
        0,
        0,
        0,
        0,
        3,
        23 + configlen,
        0,
        1,
        0,
        4,
        15 + configlen,
        64,
        21,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5
      ]
        .concat([configlen])
        .concat(track.config)
        .concat([6, 1, 2])
    )
  }
  static mp4a(track) {
    const samplerate = track.samplerate
    return MP4.box(
      MP4.types.mp4a,
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        track.channelCount,
        0,
        16,
        0,
        0,
        0,
        0,
        (samplerate >> 8) & 255,
        samplerate & 255,
        0,
        0
      ]),
      MP4.box(MP4.types.esds, MP4.esds(track))
    )
  }
  static mp3(track) {
    const samplerate = track.samplerate
    return MP4.box(
      MP4.types['.mp3'],
      new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        track.channelCount,
        0,
        16,
        0,
        0,
        0,
        0,
        (samplerate >> 8) & 255,
        samplerate & 255,
        0,
        0
      ])
    )
  }
  static stsd(track) {
    if (track.type === 'audio') {
      if (!track.isAAC && track.codec === 'mp3') {
        return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp3(track))
      }
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.mp4a(track))
    } else {
      return MP4.box(MP4.types.stsd, MP4.STSD, MP4.avc1(track))
    }
  }
  static tkhd(track) {
    const id = track.id
    const duration = track.duration * track.timescale
    const width = track.width
    const height = track.height
    const upperWordDuration = Math.floor(duration / (UINT32_MAX2 + 1))
    const lowerWordDuration = Math.floor(duration % (UINT32_MAX2 + 1))
    return MP4.box(
      MP4.types.tkhd,
      new Uint8Array([
        1,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        (id >> 24) & 255,
        (id >> 16) & 255,
        (id >> 8) & 255,
        id & 255,
        0,
        0,
        0,
        0,
        upperWordDuration >> 24,
        (upperWordDuration >> 16) & 255,
        (upperWordDuration >> 8) & 255,
        upperWordDuration & 255,
        lowerWordDuration >> 24,
        (lowerWordDuration >> 16) & 255,
        (lowerWordDuration >> 8) & 255,
        lowerWordDuration & 255,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        64,
        0,
        0,
        0,
        (width >> 8) & 255,
        width & 255,
        0,
        0,
        (height >> 8) & 255,
        height & 255,
        0,
        0
      ])
    )
  }
  static traf(track, baseMediaDecodeTime) {
    const sampleDependencyTable = MP4.sdtp(track)
    const id = track.id
    const upperWordBaseMediaDecodeTime = Math.floor(
      baseMediaDecodeTime / (UINT32_MAX2 + 1)
    )
    const lowerWordBaseMediaDecodeTime = Math.floor(
      baseMediaDecodeTime % (UINT32_MAX2 + 1)
    )
    return MP4.box(
      MP4.types.traf,
      MP4.box(
        MP4.types.tfhd,
        new Uint8Array([
          0,
          0,
          0,
          0,
          id >> 24,
          (id >> 16) & 255,
          (id >> 8) & 255,
          id & 255
        ])
      ),
      MP4.box(
        MP4.types.tfdt,
        new Uint8Array([
          1,
          0,
          0,
          0,
          upperWordBaseMediaDecodeTime >> 24,
          (upperWordBaseMediaDecodeTime >> 16) & 255,
          (upperWordBaseMediaDecodeTime >> 8) & 255,
          upperWordBaseMediaDecodeTime & 255,
          lowerWordBaseMediaDecodeTime >> 24,
          (lowerWordBaseMediaDecodeTime >> 16) & 255,
          (lowerWordBaseMediaDecodeTime >> 8) & 255,
          lowerWordBaseMediaDecodeTime & 255
        ])
      ),
      MP4.trun(track, sampleDependencyTable.length + 16 + 20 + 8 + 16 + 8 + 8),
      sampleDependencyTable
    )
  }
  static trak(track) {
    track.duration = track.duration || 4294967295
    return MP4.box(MP4.types.trak, MP4.tkhd(track), MP4.mdia(track))
  }
  static trex(track) {
    const id = track.id
    return MP4.box(
      MP4.types.trex,
      new Uint8Array([
        0,
        0,
        0,
        0,
        id >> 24,
        (id >> 16) & 255,
        (id >> 8) & 255,
        id & 255,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1
      ])
    )
  }
  static trun(track, offset) {
    const samples = track.samples || []
    const len = samples.length
    const arraylen = 12 + 16 * len
    const array = new Uint8Array(arraylen)
    let i
    let sample
    let duration
    let size
    let flags
    let cts
    offset += 8 + arraylen
    array.set(
      [
        0,
        0,
        15,
        1,
        (len >>> 24) & 255,
        (len >>> 16) & 255,
        (len >>> 8) & 255,
        len & 255,
        (offset >>> 24) & 255,
        (offset >>> 16) & 255,
        (offset >>> 8) & 255,
        offset & 255
      ],
      0
    )
    for (i = 0; i < len; i++) {
      sample = samples[i]
      duration = sample.duration
      size = sample.size
      flags = sample.flags
      cts = sample.cts
      array.set(
        [
          (duration >>> 24) & 255,
          (duration >>> 16) & 255,
          (duration >>> 8) & 255,
          duration & 255,
          (size >>> 24) & 255,
          (size >>> 16) & 255,
          (size >>> 8) & 255,
          size & 255,
          (flags.isLeading << 2) | flags.dependsOn,
          (flags.isDependedOn << 6) |
            (flags.hasRedundancy << 4) |
            (flags.paddingValue << 1) |
            flags.isNonSync,
          flags.degradPrio & (240 << 8),
          flags.degradPrio & 15,
          (cts >>> 24) & 255,
          (cts >>> 16) & 255,
          (cts >>> 8) & 255,
          cts & 255
        ],
        12 + 16 * i
      )
    }
    return MP4.box(MP4.types.trun, array)
  }
  static initSegment(tracks) {
    if (!MP4.types) {
      MP4.init()
    }
    const movie = MP4.moov(tracks)
    const result = new Uint8Array(MP4.FTYP.byteLength + movie.byteLength)
    result.set(MP4.FTYP)
    result.set(movie, MP4.FTYP.byteLength)
    return result
  }
}
var mp4_generator_default = MP4

// src/utils/timescale-conversion.ts
var MPEG_TS_CLOCK_FREQ_HZ = 9e4
function toTimescaleFromBase(value, destScale, srcBase = 1, round = false) {
  const result = value * destScale * srcBase
  return round ? Math.round(result) : result
}
function toTimescaleFromScale(value, destScale, srcScale = 1, round = false) {
  return toTimescaleFromBase(value, destScale, 1 / srcScale, round)
}
function toMsFromMpegTsClock(value, round = false) {
  return toTimescaleFromBase(value, 1e3, 1 / MPEG_TS_CLOCK_FREQ_HZ, round)
}
function toMpegTsClockFromTimescale(value, srcScale = 1) {
  return toTimescaleFromBase(value, MPEG_TS_CLOCK_FREQ_HZ, 1 / srcScale)
}

// src/remux/mp4-remuxer.ts
var MAX_SILENT_FRAME_DURATION = 10 * 1e3
var AAC_SAMPLES_PER_FRAME = 1024
var MPEG_AUDIO_SAMPLE_PER_FRAME = 1152
var chromeVersion2 = null
var safariWebkitVersion = null
var requiresPositiveDts = false
var MP4Remuxer = class {
  constructor(observer, config, typeSupported, vendor = '') {
    this.ISGenerated = false
    this.nextAvcDts = null
    this.nextAudioPts = null
    this.isAudioContiguous = false
    this.isVideoContiguous = false
    this.observer = observer
    this.config = config
    this.typeSupported = typeSupported
    this.ISGenerated = false
    if (chromeVersion2 === null) {
      const userAgent = navigator.userAgent || ''
      const result = userAgent.match(/Chrome\/(\d+)/i)
      chromeVersion2 = result ? parseInt(result[1]) : 0
    }
    if (safariWebkitVersion === null) {
      const result = navigator.userAgent.match(/Safari\/(\d+)/i)
      safariWebkitVersion = result ? parseInt(result[1]) : 0
    }
    requiresPositiveDts =
      (!!chromeVersion2 && chromeVersion2 < 75) ||
      (!!safariWebkitVersion && safariWebkitVersion < 600)
  }
  destroy() {}
  resetTimeStamp(defaultTimeStamp) {
    logger.log('[mp4-remuxer]: initPTS & initDTS reset')
    this._initPTS = this._initDTS = defaultTimeStamp
  }
  resetNextTimestamp() {
    logger.log('[mp4-remuxer]: reset next timestamp')
    this.isVideoContiguous = false
    this.isAudioContiguous = false
  }
  resetInitSegment() {
    logger.log('[mp4-remuxer]: ISGenerated flag reset')
    this.ISGenerated = false
  }
  getVideoStartPts(videoSamples) {
    let rolloverDetected = false
    const startPTS = videoSamples.reduce((minPTS, sample) => {
      const delta = sample.pts - minPTS
      if (delta < -4294967296) {
        rolloverDetected = true
        return normalizePts(minPTS, sample.pts)
      } else if (delta > 0) {
        return minPTS
      } else {
        return sample.pts
      }
    }, videoSamples[0].pts)
    if (rolloverDetected) {
      logger.debug('PTS rollover detected')
    }
    return startPTS
  }
  remux(
    audioTrack,
    videoTrack,
    id3Track,
    textTrack,
    timeOffset,
    accurateTimeOffset,
    flush
  ) {
    let video
    let audio
    let initSegment
    let text
    let id3
    let independent
    let audioTimeOffset = timeOffset
    let videoTimeOffset = timeOffset
    const hasAudio = audioTrack.pid > -1
    const hasVideo = videoTrack.pid > -1
    const enoughAudioSamples = audioTrack.samples.length > 0
    const enoughVideoSamples = videoTrack.samples.length > 1
    const canRemuxAvc =
      ((!hasAudio || enoughAudioSamples) &&
        (!hasVideo || enoughVideoSamples)) ||
      this.ISGenerated ||
      flush
    if (canRemuxAvc) {
      if (!this.ISGenerated) {
        initSegment = this.generateIS(audioTrack, videoTrack, timeOffset)
      }
      const isVideoContiguous = this.isVideoContiguous
      if (
        enoughVideoSamples &&
        !isVideoContiguous &&
        this.config.forceKeyFrameOnDiscontinuity
      ) {
        const length = videoTrack.samples.length
        const firstKeyFrameIndex = findKeyframeIndex(videoTrack.samples)
        independent = true
        if (firstKeyFrameIndex > 0) {
          logger.warn(
            `[mp4-remuxer]: Dropped ${firstKeyFrameIndex} out of ${length} video samples due to a missing keyframe`
          )
          const startPTS = this.getVideoStartPts(videoTrack.samples)
          videoTrack.samples = videoTrack.samples.slice(firstKeyFrameIndex)
          videoTrack.dropped += firstKeyFrameIndex
          videoTimeOffset +=
            (videoTrack.samples[0].pts - startPTS) /
            (videoTrack.timescale || 9e4)
        } else if (firstKeyFrameIndex === -1) {
          logger.warn(
            `[mp4-remuxer]: No keyframe found out of ${length} video samples`
          )
          independent = false
        }
      }
      if (this.ISGenerated) {
        if (enoughAudioSamples && enoughVideoSamples) {
          const startPTS = this.getVideoStartPts(videoTrack.samples)
          const tsDelta =
            normalizePts(audioTrack.samples[0].pts, startPTS) - startPTS
          const audiovideoTimestampDelta = tsDelta / videoTrack.inputTimeScale
          audioTimeOffset += Math.max(0, audiovideoTimestampDelta)
          videoTimeOffset += Math.max(0, -audiovideoTimestampDelta)
        }
        if (enoughAudioSamples) {
          if (!audioTrack.samplerate) {
            logger.warn(
              '[mp4-remuxer]: regenerate InitSegment as audio detected'
            )
            initSegment = this.generateIS(audioTrack, videoTrack, timeOffset)
            delete initSegment.video
          }
          audio = this.remuxAudio(
            audioTrack,
            audioTimeOffset,
            this.isAudioContiguous,
            accurateTimeOffset,
            enoughVideoSamples ? videoTimeOffset : void 0
          )
          if (enoughVideoSamples) {
            const audioTrackLength = audio ? audio.endPTS - audio.startPTS : 0
            if (!videoTrack.inputTimeScale) {
              logger.warn(
                '[mp4-remuxer]: regenerate InitSegment as video detected'
              )
              initSegment = this.generateIS(audioTrack, videoTrack, timeOffset)
            }
            video = this.remuxVideo(
              videoTrack,
              videoTimeOffset,
              isVideoContiguous,
              audioTrackLength
            )
          }
        } else if (enoughVideoSamples) {
          video = this.remuxVideo(
            videoTrack,
            videoTimeOffset,
            isVideoContiguous,
            0
          )
        }
        if (video && independent !== void 0) {
          video.independent = independent
        }
      }
    }
    if (this.ISGenerated) {
      if (id3Track.samples.length) {
        id3 = this.remuxID3(id3Track, timeOffset)
      }
      if (textTrack.samples.length) {
        text = this.remuxText(textTrack, timeOffset)
      }
    }
    return {
      audio,
      video,
      initSegment,
      independent,
      text,
      id3
    }
  }
  generateIS(audioTrack, videoTrack, timeOffset) {
    const audioSamples = audioTrack.samples
    const videoSamples = videoTrack.samples
    const typeSupported = this.typeSupported
    const tracks = {}
    const computePTSDTS = !Number.isFinite(this._initPTS)
    let container = 'audio/mp4'
    let initPTS
    let initDTS
    let timescale
    if (computePTSDTS) {
      initPTS = initDTS = Infinity
    }
    if (audioTrack.config && audioSamples.length) {
      audioTrack.timescale = audioTrack.samplerate
      if (!audioTrack.isAAC) {
        if (typeSupported.mpeg) {
          container = 'audio/mpeg'
          audioTrack.codec = ''
        } else if (typeSupported.mp3) {
          audioTrack.codec = 'mp3'
        }
      }
      tracks.audio = {
        id: 'audio',
        container,
        codec: audioTrack.codec,
        initSegment:
          !audioTrack.isAAC && typeSupported.mpeg
            ? new Uint8Array(0)
            : mp4_generator_default.initSegment([audioTrack]),
        metadata: {
          channelCount: audioTrack.channelCount
        }
      }
      if (computePTSDTS) {
        timescale = audioTrack.inputTimeScale
        initPTS = initDTS =
          audioSamples[0].pts - Math.round(timescale * timeOffset)
      }
    }
    if (videoTrack.sps && videoTrack.pps && videoSamples.length) {
      videoTrack.timescale = videoTrack.inputTimeScale
      tracks.video = {
        id: 'main',
        container: 'video/mp4',
        codec: videoTrack.codec,
        initSegment: mp4_generator_default.initSegment([videoTrack]),
        metadata: {
          width: videoTrack.width,
          height: videoTrack.height
        }
      }
      if (computePTSDTS) {
        timescale = videoTrack.inputTimeScale
        const startPTS = this.getVideoStartPts(videoSamples)
        const startOffset = Math.round(timescale * timeOffset)
        initDTS = Math.min(
          initDTS,
          normalizePts(videoSamples[0].dts, startPTS) - startOffset
        )
        initPTS = Math.min(initPTS, startPTS - startOffset)
      }
    }
    if (Object.keys(tracks).length) {
      this.ISGenerated = true
      if (computePTSDTS) {
        this._initPTS = initPTS
        this._initDTS = initDTS
      }
      return {
        tracks,
        initPTS,
        timescale
      }
    }
  }
  remuxVideo(track, timeOffset, contiguous, audioTrackLength) {
    const timeScale = track.inputTimeScale
    const inputSamples = track.samples
    const outputSamples = []
    const nbSamples = inputSamples.length
    const initPTS = this._initPTS
    let nextAvcDts = this.nextAvcDts
    let offset = 8
    let mp4SampleDuration
    let firstDTS
    let lastDTS
    let minPTS = Number.POSITIVE_INFINITY
    let maxPTS = Number.NEGATIVE_INFINITY
    let ptsDtsShift = 0
    let sortSamples = false
    if (!contiguous || nextAvcDts === null) {
      const pts = timeOffset * timeScale
      const cts =
        inputSamples[0].pts -
        normalizePts(inputSamples[0].dts, inputSamples[0].pts)
      nextAvcDts = pts - cts
    }
    for (let i = 0; i < nbSamples; i++) {
      const sample = inputSamples[i]
      sample.pts = normalizePts(sample.pts - initPTS, nextAvcDts)
      sample.dts = normalizePts(sample.dts - initPTS, nextAvcDts)
      if (sample.dts > sample.pts) {
        const PTS_DTS_SHIFT_TOLERANCE_90KHZ = 9e4 * 0.2
        ptsDtsShift = Math.max(
          Math.min(ptsDtsShift, sample.pts - sample.dts),
          -1 * PTS_DTS_SHIFT_TOLERANCE_90KHZ
        )
      }
      if (sample.dts < inputSamples[i > 0 ? i - 1 : i].dts) {
        sortSamples = true
      }
    }
    if (sortSamples) {
      inputSamples.sort(function (a, b) {
        const deltadts = a.dts - b.dts
        const deltapts = a.pts - b.pts
        return deltadts || deltapts
      })
    }
    firstDTS = inputSamples[0].dts
    lastDTS = inputSamples[inputSamples.length - 1].dts
    const averageSampleDuration = Math.round(
      (lastDTS - firstDTS) / (nbSamples - 1)
    )
    if (ptsDtsShift < 0) {
      if (ptsDtsShift < averageSampleDuration * -2) {
        logger.warn(
          `PTS < DTS detected in video samples, offsetting DTS from PTS by ${toMsFromMpegTsClock(
            -averageSampleDuration,
            true
          )} ms`
        )
        let lastDts = ptsDtsShift
        for (let i = 0; i < nbSamples; i++) {
          inputSamples[i].dts = lastDts = Math.max(
            lastDts,
            inputSamples[i].pts - averageSampleDuration
          )
          inputSamples[i].pts = Math.max(lastDts, inputSamples[i].pts)
        }
      } else {
        logger.warn(
          `PTS < DTS detected in video samples, shifting DTS by ${toMsFromMpegTsClock(
            ptsDtsShift,
            true
          )} ms to overcome this issue`
        )
        for (let i = 0; i < nbSamples; i++) {
          inputSamples[i].dts = inputSamples[i].dts + ptsDtsShift
        }
      }
      firstDTS = inputSamples[0].dts
    }
    if (contiguous) {
      const delta = firstDTS - nextAvcDts
      const foundHole = delta > averageSampleDuration
      const foundOverlap = delta < -1
      if (foundHole || foundOverlap) {
        if (foundHole) {
          logger.warn(
            `AVC: ${toMsFromMpegTsClock(
              delta,
              true
            )} ms (${delta}dts) hole between fragments detected, filling it`
          )
        } else {
          logger.warn(
            `AVC: ${toMsFromMpegTsClock(
              -delta,
              true
            )} ms (${delta}dts) overlapping between fragments detected`
          )
        }
        firstDTS = nextAvcDts
        const firstPTS = inputSamples[0].pts - delta
        inputSamples[0].dts = firstDTS
        inputSamples[0].pts = firstPTS
        logger.log(
          `Video: First PTS/DTS adjusted: ${toMsFromMpegTsClock(
            firstPTS,
            true
          )}/${toMsFromMpegTsClock(
            firstDTS,
            true
          )}, delta: ${toMsFromMpegTsClock(delta, true)} ms`
        )
      }
    }
    if (requiresPositiveDts) {
      firstDTS = Math.max(0, firstDTS)
    }
    let nbNalu = 0
    let naluLen = 0
    for (let i = 0; i < nbSamples; i++) {
      const sample = inputSamples[i]
      const units = sample.units
      const nbUnits = units.length
      let sampleLen = 0
      for (let j = 0; j < nbUnits; j++) {
        sampleLen += units[j].data.length
      }
      naluLen += sampleLen
      nbNalu += nbUnits
      sample.length = sampleLen
      sample.dts = Math.max(sample.dts, firstDTS)
      sample.pts = Math.max(sample.pts, sample.dts, 0)
      minPTS = Math.min(sample.pts, minPTS)
      maxPTS = Math.max(sample.pts, maxPTS)
    }
    lastDTS = inputSamples[nbSamples - 1].dts
    const mdatSize = naluLen + 4 * nbNalu + 8
    let mdat
    try {
      mdat = new Uint8Array(mdatSize)
    } catch (err) {
      this.observer.emit(Events.ERROR, Events.ERROR, {
        type: ErrorTypes.MUX_ERROR,
        details: ErrorDetails.REMUX_ALLOC_ERROR,
        fatal: false,
        bytes: mdatSize,
        reason: `fail allocating video mdat ${mdatSize}`
      })
      return
    }
    const view = new DataView(mdat.buffer)
    view.setUint32(0, mdatSize)
    mdat.set(mp4_generator_default.types.mdat, 4)
    for (let i = 0; i < nbSamples; i++) {
      const avcSample = inputSamples[i]
      const avcSampleUnits = avcSample.units
      let mp4SampleLength = 0
      for (let j = 0, nbUnits = avcSampleUnits.length; j < nbUnits; j++) {
        const unit = avcSampleUnits[j]
        const unitData = unit.data
        const unitDataLen = unit.data.byteLength
        view.setUint32(offset, unitDataLen)
        offset += 4
        mdat.set(unitData, offset)
        offset += unitDataLen
        mp4SampleLength += 4 + unitDataLen
      }
      if (i < nbSamples - 1) {
        mp4SampleDuration = inputSamples[i + 1].dts - avcSample.dts
      } else {
        const config = this.config
        const lastFrameDuration =
          avcSample.dts - inputSamples[i > 0 ? i - 1 : i].dts
        if (config.stretchShortVideoTrack && this.nextAudioPts !== null) {
          const gapTolerance = Math.floor(config.maxBufferHole * timeScale)
          const deltaToFrameEnd =
            (audioTrackLength
              ? minPTS + audioTrackLength * timeScale
              : this.nextAudioPts) - avcSample.pts
          if (deltaToFrameEnd > gapTolerance) {
            mp4SampleDuration = deltaToFrameEnd - lastFrameDuration
            if (mp4SampleDuration < 0) {
              mp4SampleDuration = lastFrameDuration
            }
            logger.log(
              `[mp4-remuxer]: It is approximately ${
                deltaToFrameEnd / 90
              } ms to the next segment; using duration ${
                mp4SampleDuration / 90
              } ms for the last video frame.`
            )
          } else {
            mp4SampleDuration = lastFrameDuration
          }
        } else {
          mp4SampleDuration = lastFrameDuration
        }
      }
      const compositionTimeOffset = Math.round(avcSample.pts - avcSample.dts)
      outputSamples.push(
        new Mp4Sample(
          avcSample.key,
          mp4SampleDuration,
          mp4SampleLength,
          compositionTimeOffset
        )
      )
    }
    if (outputSamples.length && chromeVersion2 && chromeVersion2 < 70) {
      const flags = outputSamples[0].flags
      flags.dependsOn = 2
      flags.isNonSync = 0
    }
    console.assert(
      mp4SampleDuration !== void 0,
      'mp4SampleDuration must be computed'
    )
    this.nextAvcDts = nextAvcDts = lastDTS + mp4SampleDuration
    this.isVideoContiguous = true
    const moof = mp4_generator_default.moof(
      track.sequenceNumber++,
      firstDTS,
      Object.assign({}, track, {
        samples: outputSamples
      })
    )
    const type = 'video'
    const data = {
      data1: moof,
      data2: mdat,
      startPTS: minPTS / timeScale,
      endPTS: (maxPTS + mp4SampleDuration) / timeScale,
      startDTS: firstDTS / timeScale,
      endDTS: nextAvcDts / timeScale,
      type,
      hasAudio: false,
      hasVideo: true,
      nb: outputSamples.length,
      dropped: track.dropped
    }
    track.samples = []
    track.dropped = 0
    console.assert(mdat.length, 'MDAT length must not be zero')
    return data
  }
  remuxAudio(
    track,
    timeOffset,
    contiguous,
    accurateTimeOffset,
    videoTimeOffset
  ) {
    const inputTimeScale = track.inputTimeScale
    const mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale
    const scaleFactor = inputTimeScale / mp4timeScale
    const mp4SampleDuration = track.isAAC
      ? AAC_SAMPLES_PER_FRAME
      : MPEG_AUDIO_SAMPLE_PER_FRAME
    const inputSampleDuration = mp4SampleDuration * scaleFactor
    const initPTS = this._initPTS
    const rawMPEG = !track.isAAC && this.typeSupported.mpeg
    const outputSamples = []
    let inputSamples = track.samples
    let offset = rawMPEG ? 0 : 8
    let fillFrame
    let nextAudioPts = this.nextAudioPts || -1
    const timeOffsetMpegTS = timeOffset * inputTimeScale
    this.isAudioContiguous = contiguous =
      contiguous ||
      (inputSamples.length &&
        nextAudioPts > 0 &&
        ((accurateTimeOffset &&
          Math.abs(timeOffsetMpegTS - nextAudioPts) < 9e3) ||
          Math.abs(
            normalizePts(inputSamples[0].pts - initPTS, timeOffsetMpegTS) -
              nextAudioPts
          ) <
            20 * inputSampleDuration))
    inputSamples.forEach(function (sample) {
      sample.pts = sample.dts = normalizePts(
        sample.pts - initPTS,
        timeOffsetMpegTS
      )
    })
    if (!contiguous || nextAudioPts < 0) {
      inputSamples = inputSamples.filter(sample => sample.pts >= 0)
      if (!inputSamples.length) {
        return
      }
      if (videoTimeOffset === 0) {
        nextAudioPts = 0
      } else if (accurateTimeOffset) {
        nextAudioPts = Math.max(0, timeOffsetMpegTS)
      } else {
        nextAudioPts = inputSamples[0].pts
      }
    }
    if (track.isAAC) {
      const maxAudioFramesDrift = this.config.maxAudioFramesDrift
      for (let i = 0, nextPts = nextAudioPts; i < inputSamples.length; ) {
        const sample = inputSamples[i]
        const pts = sample.pts
        const delta = pts - nextPts
        const duration = Math.abs((1e3 * delta) / inputTimeScale)
        if (
          delta <= -maxAudioFramesDrift * inputSampleDuration &&
          videoTimeOffset !== void 0
        ) {
          if (contiguous || i > 0) {
            logger.warn(
              `[mp4-remuxer]: Dropping 1 audio frame @ ${(
                nextPts / inputTimeScale
              ).toFixed(3)}s due to ${Math.round(duration)} ms overlap.`
            )
            inputSamples.splice(i, 1)
          } else {
            logger.warn(
              `Audio frame @ ${(pts / inputTimeScale).toFixed(
                3
              )}s overlaps nextAudioPts by ${Math.round(
                (1e3 * delta) / inputTimeScale
              )} ms.`
            )
            nextPts = pts + inputSampleDuration
            i++
          }
        } else if (
          delta >= maxAudioFramesDrift * inputSampleDuration &&
          duration < MAX_SILENT_FRAME_DURATION &&
          videoTimeOffset !== void 0
        ) {
          const missing = Math.floor(delta / inputSampleDuration)
          nextPts = pts - missing * inputSampleDuration
          logger.warn(
            `[mp4-remuxer]: Injecting ${missing} audio frame @ ${(
              nextPts / inputTimeScale
            ).toFixed(3)}s due to ${Math.round(
              (1e3 * delta) / inputTimeScale
            )} ms gap.`
          )
          for (let j = 0; j < missing; j++) {
            const newStamp = Math.max(nextPts, 0)
            fillFrame = aac_helper_default.getSilentFrame(
              track.manifestCodec || track.codec,
              track.channelCount
            )
            if (!fillFrame) {
              logger.log(
                '[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead.'
              )
              fillFrame = sample.unit.subarray()
            }
            inputSamples.splice(i, 0, {
              unit: fillFrame,
              pts: newStamp,
              dts: newStamp
            })
            nextPts += inputSampleDuration
            i++
          }
          sample.pts = sample.dts = nextPts
          nextPts += inputSampleDuration
          i++
        } else {
          sample.pts = sample.dts = nextPts
          nextPts += inputSampleDuration
          i++
        }
      }
    }
    let firstPTS = null
    let lastPTS = null
    let mdat
    let mdatSize = 0
    let sampleLength = inputSamples.length
    while (sampleLength--) {
      mdatSize += inputSamples[sampleLength].unit.byteLength
    }
    for (let j = 0, nbSamples2 = inputSamples.length; j < nbSamples2; j++) {
      const audioSample = inputSamples[j]
      const unit = audioSample.unit
      let pts = audioSample.pts
      if (lastPTS !== null) {
        const prevSample = outputSamples[j - 1]
        prevSample.duration = Math.round((pts - lastPTS) / scaleFactor)
      } else {
        const delta = Math.round((1e3 * (pts - nextAudioPts)) / inputTimeScale)
        let numMissingFrames = 0
        if (contiguous && track.isAAC) {
          if (delta > 0 && delta < MAX_SILENT_FRAME_DURATION) {
            numMissingFrames = Math.round(
              (pts - nextAudioPts) / inputSampleDuration
            )
            logger.log(
              `[mp4-remuxer]: ${delta} ms hole between AAC samples detected,filling it`
            )
            if (numMissingFrames > 0) {
              fillFrame = aac_helper_default.getSilentFrame(
                track.manifestCodec || track.codec,
                track.channelCount
              )
              if (!fillFrame) {
                fillFrame = unit.subarray()
              }
              mdatSize += numMissingFrames * fillFrame.length
            }
          } else if (delta < -12) {
            logger.log(
              `[mp4-remuxer]: drop overlapping AAC sample, expected/parsed/delta:${(
                nextAudioPts / inputTimeScale
              ).toFixed(3)}s/${(pts / inputTimeScale).toFixed(3)}s/${-delta}ms`
            )
            mdatSize -= unit.byteLength
            continue
          }
          pts = nextAudioPts
        }
        firstPTS = pts
        if (mdatSize > 0) {
          mdatSize += offset
          try {
            mdat = new Uint8Array(mdatSize)
          } catch (err) {
            this.observer.emit(Events.ERROR, Events.ERROR, {
              type: ErrorTypes.MUX_ERROR,
              details: ErrorDetails.REMUX_ALLOC_ERROR,
              fatal: false,
              bytes: mdatSize,
              reason: `fail allocating audio mdat ${mdatSize}`
            })
            return
          }
          if (!rawMPEG) {
            const view = new DataView(mdat.buffer)
            view.setUint32(0, mdatSize)
            mdat.set(mp4_generator_default.types.mdat, 4)
          }
        } else {
          return
        }
        for (let i = 0; i < numMissingFrames; i++) {
          fillFrame = aac_helper_default.getSilentFrame(
            track.manifestCodec || track.codec,
            track.channelCount
          )
          if (!fillFrame) {
            logger.log(
              '[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating the current frame instead'
            )
            fillFrame = unit.subarray()
          }
          mdat.set(fillFrame, offset)
          offset += fillFrame.byteLength
          outputSamples.push(
            new Mp4Sample(true, AAC_SAMPLES_PER_FRAME, fillFrame.byteLength, 0)
          )
        }
      }
      mdat.set(unit, offset)
      const unitLen = unit.byteLength
      offset += unitLen
      outputSamples.push(new Mp4Sample(true, mp4SampleDuration, unitLen, 0))
      lastPTS = pts
    }
    const nbSamples = outputSamples.length
    if (!nbSamples) {
      return
    }
    const lastSample = outputSamples[outputSamples.length - 1]
    this.nextAudioPts = nextAudioPts =
      lastPTS + scaleFactor * lastSample.duration
    const moof = rawMPEG
      ? new Uint8Array(0)
      : mp4_generator_default.moof(
          track.sequenceNumber++,
          firstPTS / scaleFactor,
          Object.assign({}, track, { samples: outputSamples })
        )
    track.samples = []
    const start = firstPTS / inputTimeScale
    const end = nextAudioPts / inputTimeScale
    const type = 'audio'
    const audioData = {
      data1: moof,
      data2: mdat,
      startPTS: start,
      endPTS: end,
      startDTS: start,
      endDTS: end,
      type,
      hasAudio: true,
      hasVideo: false,
      nb: nbSamples
    }
    this.isAudioContiguous = true
    console.assert(mdat.length, 'MDAT length must not be zero')
    return audioData
  }
  remuxEmptyAudio(track, timeOffset, contiguous, videoData) {
    const inputTimeScale = track.inputTimeScale
    const mp4timeScale = track.samplerate ? track.samplerate : inputTimeScale
    const scaleFactor = inputTimeScale / mp4timeScale
    const nextAudioPts = this.nextAudioPts
    const startDTS =
      (nextAudioPts !== null
        ? nextAudioPts
        : videoData.startDTS * inputTimeScale) + this._initDTS
    const endDTS = videoData.endDTS * inputTimeScale + this._initDTS
    const frameDuration = scaleFactor * AAC_SAMPLES_PER_FRAME
    const nbSamples = Math.ceil((endDTS - startDTS) / frameDuration)
    const silentFrame = aac_helper_default.getSilentFrame(
      track.manifestCodec || track.codec,
      track.channelCount
    )
    logger.warn('[mp4-remuxer]: remux empty Audio')
    if (!silentFrame) {
      logger.trace(
        '[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec'
      )
      return
    }
    const samples = []
    for (let i = 0; i < nbSamples; i++) {
      const stamp = startDTS + i * frameDuration
      samples.push({ unit: silentFrame, pts: stamp, dts: stamp })
    }
    track.samples = samples
    return this.remuxAudio(track, timeOffset, contiguous, false)
  }
  remuxID3(track, timeOffset) {
    const length = track.samples.length
    if (!length) {
      return
    }
    const inputTimeScale = track.inputTimeScale
    const initPTS = this._initPTS
    const initDTS = this._initDTS
    for (let index = 0; index < length; index++) {
      const sample = track.samples[index]
      sample.pts =
        normalizePts(sample.pts - initPTS, timeOffset * inputTimeScale) /
        inputTimeScale
      sample.dts =
        normalizePts(sample.dts - initDTS, timeOffset * inputTimeScale) /
        inputTimeScale
    }
    const samples = track.samples
    track.samples = []
    return {
      samples
    }
  }
  remuxText(track, timeOffset) {
    const length = track.samples.length
    if (!length) {
      return
    }
    const inputTimeScale = track.inputTimeScale
    const initPTS = this._initPTS
    for (let index = 0; index < length; index++) {
      const sample = track.samples[index]
      sample.pts =
        normalizePts(sample.pts - initPTS, timeOffset * inputTimeScale) /
        inputTimeScale
    }
    track.samples.sort((a, b) => a.pts - b.pts)
    const samples = track.samples
    track.samples = []
    return {
      samples
    }
  }
}
var mp4_remuxer_default = MP4Remuxer
function normalizePts(value, reference) {
  let offset
  if (reference === null) {
    return value
  }
  if (reference < value) {
    offset = -8589934592
  } else {
    offset = 8589934592
  }
  while (Math.abs(value - reference) > 4294967296) {
    value += offset
  }
  return value
}
function findKeyframeIndex(samples) {
  for (let i = 0; i < samples.length; i++) {
    if (samples[i].key) {
      return i
    }
  }
  return -1
}
var Mp4Sample = class {
  constructor(isKeyframe, duration, size, cts) {
    this.duration = duration
    this.size = size
    this.cts = cts
    this.flags = new Mp4SampleFlags(isKeyframe)
  }
}
var Mp4SampleFlags = class {
  constructor(isKeyframe) {
    this.isLeading = 0
    this.isDependedOn = 0
    this.hasRedundancy = 0
    this.degradPrio = 0
    this.dependsOn = 1
    this.isNonSync = 1
    this.dependsOn = isKeyframe ? 2 : 1
    this.isNonSync = isKeyframe ? 0 : 1
  }
}

// src/remux/passthrough-remuxer.ts
var PassThroughRemuxer = class {
  constructor() {
    this.emitInitSegment = false
    this.lastEndDTS = null
  }
  destroy() {}
  resetTimeStamp(defaultInitPTS) {
    this.initPTS = defaultInitPTS
    this.lastEndDTS = null
  }
  resetNextTimestamp() {
    this.lastEndDTS = null
  }
  resetInitSegment(initSegment, audioCodec, videoCodec) {
    this.audioCodec = audioCodec
    this.videoCodec = videoCodec
    this.generateInitSegment(initSegment)
    this.emitInitSegment = true
  }
  generateInitSegment(initSegment) {
    let { audioCodec, videoCodec } = this
    if (!initSegment || !initSegment.byteLength) {
      this.initTracks = void 0
      this.initData = void 0
      return
    }
    const initData = (this.initData = parseInitSegment(initSegment))
    if (!audioCodec) {
      audioCodec = getParsedTrackCodec(
        initData.audio,
        ElementaryStreamTypes.AUDIO
      )
    }
    if (!videoCodec) {
      videoCodec = getParsedTrackCodec(
        initData.video,
        ElementaryStreamTypes.VIDEO
      )
    }
    const tracks = {}
    if (initData.audio && initData.video) {
      tracks.audiovideo = {
        container: 'video/mp4',
        codec: audioCodec + ',' + videoCodec,
        initSegment,
        id: 'main'
      }
    } else if (initData.audio) {
      tracks.audio = {
        container: 'audio/mp4',
        codec: audioCodec,
        initSegment,
        id: 'audio'
      }
    } else if (initData.video) {
      tracks.video = {
        container: 'video/mp4',
        codec: videoCodec,
        initSegment,
        id: 'main'
      }
    } else {
      logger.warn(
        '[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes.'
      )
    }
    this.initTracks = tracks
  }
  remux(audioTrack, videoTrack, id3Track, textTrack, timeOffset) {
    let { initPTS, lastEndDTS } = this
    const result = {
      audio: void 0,
      video: void 0,
      text: textTrack,
      id3: id3Track,
      initSegment: void 0
    }
    if (!Number.isFinite(lastEndDTS)) {
      lastEndDTS = this.lastEndDTS = timeOffset || 0
    }
    const data = videoTrack.samples
    if (!data || !data.length) {
      return result
    }
    const initSegment = {
      initPTS: void 0,
      timescale: 1
    }
    let initData = this.initData
    if (!initData || !initData.length) {
      this.generateInitSegment(data)
      initData = this.initData
    }
    if (!initData || !initData.length) {
      logger.warn('[passthrough-remuxer.ts]: Failed to generate initSegment.')
      return result
    }
    if (this.emitInitSegment) {
      initSegment.tracks = this.initTracks
      this.emitInitSegment = false
    }
    if (!Number.isFinite(initPTS)) {
      this.initPTS = initSegment.initPTS = initPTS = computeInitPTS(
        initData,
        data,
        lastEndDTS
      )
    }
    const duration = getDuration(data, initData)
    const startDTS = lastEndDTS
    const endDTS = duration + startDTS
    offsetStartDTS(initData, data, initPTS)
    if (duration > 0) {
      this.lastEndDTS = endDTS
    } else {
      logger.warn('Duration parsed from mp4 should be greater than zero')
      this.resetNextTimestamp()
    }
    const hasAudio = !!initData.audio
    const hasVideo = !!initData.video
    let type = ''
    if (hasAudio) {
      type += 'audio'
    }
    if (hasVideo) {
      type += 'video'
    }
    const track = {
      data1: data,
      startPTS: startDTS,
      startDTS,
      endPTS: endDTS,
      endDTS,
      type,
      hasAudio,
      hasVideo,
      nb: 1,
      dropped: 0
    }
    result.audio = track.type === 'audio' ? track : void 0
    result.video = track.type !== 'audio' ? track : void 0
    result.text = textTrack
    result.id3 = id3Track
    result.initSegment = initSegment
    return result
  }
}
var computeInitPTS = (initData, data, timeOffset) =>
  getStartDTS(initData, data) - timeOffset
function getParsedTrackCodec(track, type) {
  const parsedCodec = track?.codec
  if (parsedCodec && parsedCodec.length > 4) {
    return parsedCodec
  }
  if (parsedCodec === 'hvc1') {
    return 'hvc1.1.c.L120.90'
  }
  if (parsedCodec === 'av01') {
    return 'av01.0.04M.08'
  }
  if (parsedCodec === 'avc1' || type === ElementaryStreamTypes.VIDEO) {
    return 'avc1.42e01e'
  }
  return 'mp4a.40.5'
}
var passthrough_remuxer_default = PassThroughRemuxer

// src/demux/chunk-cache.ts
var ChunkCache = class {
  constructor() {
    this.chunks = []
    this.dataLength = 0
  }
  push(chunk) {
    this.chunks.push(chunk)
    this.dataLength += chunk.length
  }
  flush() {
    const { chunks, dataLength } = this
    let result
    if (!chunks.length) {
      return new Uint8Array(0)
    } else if (chunks.length === 1) {
      result = chunks[0]
    } else {
      result = concatUint8Arrays(chunks, dataLength)
    }
    this.reset()
    return result
  }
  reset() {
    this.chunks.length = 0
    this.dataLength = 0
  }
}
var chunk_cache_default = ChunkCache
function concatUint8Arrays(chunks, dataLength) {
  const result = new Uint8Array(dataLength)
  let offset = 0
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    result.set(chunk, offset)
    offset += chunk.length
  }
  return result
}

// src/demux/transmuxer.ts
var now
try {
  now = self.performance.now.bind(self.performance)
} catch (err) {
  logger.debug('Unable to use Performance API on this environment')
  now = self.Date.now
}
var muxConfig = [
  { demux: tsdemuxer_default, remux: mp4_remuxer_default },
  { demux: mp4demuxer_default, remux: passthrough_remuxer_default },
  { demux: aacdemuxer_default, remux: mp4_remuxer_default },
  { demux: mp3demuxer_default, remux: mp4_remuxer_default }
]
var minProbeByteLength = 1024
muxConfig.forEach(({ demux }) => {
  minProbeByteLength = Math.max(minProbeByteLength, demux.minProbeByteLength)
})
var Transmuxer = class {
  constructor(observer, typeSupported, config, vendor) {
    this.decryptionPromise = null
    this.cache = new chunk_cache_default()
    this.observer = observer
    this.typeSupported = typeSupported
    this.config = config
    this.vendor = vendor
  }
  configure(transmuxConfig) {
    this.transmuxConfig = transmuxConfig
    if (this.decrypter) {
      this.decrypter.reset()
    }
  }
  push(data, decryptdata, chunkMeta, state) {
    const stats = chunkMeta.transmuxing
    stats.executeStart = now()
    let uintData = new Uint8Array(data)
    const { cache, config, currentTransmuxState, transmuxConfig } = this
    if (state) {
      this.currentTransmuxState = state
    }
    const keyData = getEncryptionType(uintData, decryptdata)
    if (keyData && keyData.method === 'AES-128') {
      const decrypter = this.getDecrypter()
      if (config.enableSoftwareAES) {
        const decryptedData = decrypter.softwareDecrypt(
          uintData,
          keyData.key.buffer,
          keyData.iv.buffer
        )
        if (!decryptedData) {
          stats.executeEnd = now()
          return emptyResult(chunkMeta)
        }
        uintData = new Uint8Array(decryptedData)
      } else {
        this.decryptionPromise = decrypter
          .webCryptoDecrypt(uintData, keyData.key.buffer, keyData.iv.buffer)
          .then(decryptedData => {
            const result2 = this.push(decryptedData, null, chunkMeta)
            this.decryptionPromise = null
            return result2
          })
        return this.decryptionPromise
      }
    }
    const {
      contiguous,
      discontinuity,
      trackSwitch,
      accurateTimeOffset,
      timeOffset
    } = state || currentTransmuxState
    const {
      audioCodec,
      videoCodec,
      defaultInitPts,
      duration,
      initSegmentData
    } = transmuxConfig
    if (discontinuity || trackSwitch) {
      this.resetInitSegment(initSegmentData, audioCodec, videoCodec, duration)
    }
    if (discontinuity) {
      this.resetInitialTimestamp(defaultInitPts)
    }
    if (!contiguous) {
      this.resetContiguity()
    }
    if (this.needsProbing(uintData, discontinuity, trackSwitch)) {
      if (cache.dataLength) {
        const cachedData = cache.flush()
        uintData = appendUint8Array(cachedData, uintData)
      }
      this.configureTransmuxer(uintData, transmuxConfig)
    }
    const result = this.transmux(
      uintData,
      keyData,
      timeOffset,
      accurateTimeOffset,
      chunkMeta
    )
    const currentState = this.currentTransmuxState
    currentState.contiguous = true
    currentState.discontinuity = false
    currentState.trackSwitch = false
    stats.executeEnd = now()
    return result
  }
  flush(chunkMeta) {
    const stats = chunkMeta.transmuxing
    stats.executeStart = now()
    const { decrypter, cache, currentTransmuxState, decryptionPromise } = this
    if (decryptionPromise) {
      return decryptionPromise.then(() => {
        return this.flush(chunkMeta)
      })
    }
    const transmuxResults = []
    const { timeOffset } = currentTransmuxState
    if (decrypter) {
      const decryptedData = decrypter.flush()
      if (decryptedData) {
        transmuxResults.push(this.push(decryptedData, null, chunkMeta))
      }
    }
    const bytesSeen = cache.dataLength
    cache.reset()
    const { demuxer, remuxer } = this
    if (!demuxer || !remuxer) {
      if (bytesSeen >= minProbeByteLength) {
        this.observer.emit(Events.ERROR, Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.FRAG_PARSING_ERROR,
          fatal: true,
          reason: 'no demux matching with content found'
        })
      }
      stats.executeEnd = now()
      return [emptyResult(chunkMeta)]
    }
    const demuxResultOrPromise = demuxer.flush(timeOffset)
    if (isPromise(demuxResultOrPromise)) {
      return demuxResultOrPromise.then(demuxResult => {
        this.flushRemux(transmuxResults, demuxResult, chunkMeta)
        return transmuxResults
      })
    }
    this.flushRemux(transmuxResults, demuxResultOrPromise, chunkMeta)
    return transmuxResults
  }
  flushRemux(transmuxResults, demuxResult, chunkMeta) {
    const { audioTrack, avcTrack, id3Track, textTrack } = demuxResult
    const { accurateTimeOffset, timeOffset } = this.currentTransmuxState
    logger.log(
      `[transmuxer.ts]: Flushed fragment ${chunkMeta.sn}${
        chunkMeta.part > -1 ? ' p: ' + chunkMeta.part : ''
      } of level ${chunkMeta.level}`
    )
    const remuxResult = this.remuxer.remux(
      audioTrack,
      avcTrack,
      id3Track,
      textTrack,
      timeOffset,
      accurateTimeOffset,
      true
    )
    transmuxResults.push({
      remuxResult,
      chunkMeta
    })
    chunkMeta.transmuxing.executeEnd = now()
  }
  resetInitialTimestamp(defaultInitPts) {
    const { demuxer, remuxer } = this
    if (!demuxer || !remuxer) {
      return
    }
    demuxer.resetTimeStamp(defaultInitPts)
    remuxer.resetTimeStamp(defaultInitPts)
  }
  resetContiguity() {
    const { demuxer, remuxer } = this
    if (!demuxer || !remuxer) {
      return
    }
    demuxer.resetContiguity()
    remuxer.resetNextTimestamp()
  }
  resetInitSegment(initSegmentData, audioCodec, videoCodec, duration) {
    const { demuxer, remuxer } = this
    if (!demuxer || !remuxer) {
      return
    }
    demuxer.resetInitSegment(audioCodec, videoCodec, duration)
    remuxer.resetInitSegment(initSegmentData, audioCodec, videoCodec)
  }
  destroy() {
    if (this.demuxer) {
      this.demuxer.destroy()
      this.demuxer = void 0
    }
    if (this.remuxer) {
      this.remuxer.destroy()
      this.remuxer = void 0
    }
  }
  transmux(data, keyData, timeOffset, accurateTimeOffset, chunkMeta) {
    let result
    if (keyData && keyData.method === 'SAMPLE-AES') {
      result = this.transmuxSampleAes(
        data,
        keyData,
        timeOffset,
        accurateTimeOffset,
        chunkMeta
      )
    } else {
      result = this.transmuxUnencrypted(
        data,
        timeOffset,
        accurateTimeOffset,
        chunkMeta
      )
    }
    return result
  }
  transmuxUnencrypted(data, timeOffset, accurateTimeOffset, chunkMeta) {
    const { audioTrack, avcTrack, id3Track, textTrack } = this.demuxer.demux(
      data,
      timeOffset,
      false,
      !this.config.progressive
    )
    const remuxResult = this.remuxer.remux(
      audioTrack,
      avcTrack,
      id3Track,
      textTrack,
      timeOffset,
      accurateTimeOffset,
      false
    )
    return {
      remuxResult,
      chunkMeta
    }
  }
  transmuxSampleAes(
    data,
    decryptData,
    timeOffset,
    accurateTimeOffset,
    chunkMeta
  ) {
    return this.demuxer
      .demuxSampleAes(data, decryptData, timeOffset)
      .then(demuxResult => {
        const remuxResult = this.remuxer.remux(
          demuxResult.audioTrack,
          demuxResult.avcTrack,
          demuxResult.id3Track,
          demuxResult.textTrack,
          timeOffset,
          accurateTimeOffset,
          false
        )
        return {
          remuxResult,
          chunkMeta
        }
      })
  }
  configureTransmuxer(data, transmuxConfig) {
    const { config, observer, typeSupported, vendor } = this
    const {
      audioCodec,
      defaultInitPts,
      duration,
      initSegmentData,
      videoCodec
    } = transmuxConfig
    let mux
    for (let i = 0, len = muxConfig.length; i < len; i++) {
      if (muxConfig[i].demux.probe(data)) {
        mux = muxConfig[i]
        break
      }
    }
    if (!mux) {
      logger.warn(
        'Failed to find demuxer by probing frag, treating as mp4 passthrough'
      )
      mux = { demux: mp4demuxer_default, remux: passthrough_remuxer_default }
    }
    const demuxer = this.demuxer
    const remuxer = this.remuxer
    const Remuxer = mux.remux
    const Demuxer = mux.demux
    if (!remuxer || !(remuxer instanceof Remuxer)) {
      this.remuxer = new Remuxer(observer, config, typeSupported, vendor)
    }
    if (!demuxer || !(demuxer instanceof Demuxer)) {
      this.demuxer = new Demuxer(observer, config, typeSupported)
      this.probe = Demuxer.probe
    }
    this.resetInitSegment(initSegmentData, audioCodec, videoCodec, duration)
    this.resetInitialTimestamp(defaultInitPts)
  }
  needsProbing(data, discontinuity, trackSwitch) {
    return !this.demuxer || !this.remuxer || discontinuity || trackSwitch
  }
  getDecrypter() {
    let decrypter = this.decrypter
    if (!decrypter) {
      decrypter = this.decrypter = new decrypter_default(
        this.observer,
        this.config
      )
    }
    return decrypter
  }
}
var transmuxer_default = Transmuxer
function getEncryptionType(data, decryptData) {
  let encryptionType = null
  if (
    data.byteLength > 0 &&
    decryptData != null &&
    decryptData.key != null &&
    decryptData.iv !== null &&
    decryptData.method != null
  ) {
    encryptionType = decryptData
  }
  return encryptionType
}
var emptyResult = chunkMeta => ({
  remuxResult: {},
  chunkMeta
})
function isPromise(p) {
  return 'then' in p && p.then instanceof Function
}
var TransmuxConfig = class {
  constructor(
    audioCodec,
    videoCodec,
    initSegmentData,
    duration,
    defaultInitPts
  ) {
    this.audioCodec = audioCodec
    this.videoCodec = videoCodec
    this.initSegmentData = initSegmentData
    this.duration = duration
    this.defaultInitPts = defaultInitPts
  }
}
var TransmuxState = class {
  constructor(
    discontinuity,
    contiguous,
    accurateTimeOffset,
    trackSwitch,
    timeOffset
  ) {
    this.discontinuity = discontinuity
    this.contiguous = contiguous
    this.accurateTimeOffset = accurateTimeOffset
    this.trackSwitch = trackSwitch
    this.timeOffset = timeOffset
  }
}

// src/demux/transmuxer-interface.ts
var import_eventemitter3 = __toModule(require_eventemitter3())
var MediaSource2 = getMediaSource() || { isTypeSupported: () => false }
var TransmuxerInterface = class {
  constructor(hls, id, onTransmuxComplete, onFlush) {
    this.frag = null
    this.part = null
    this.transmuxer = null
    this.hls = hls
    this.id = id
    this.onTransmuxComplete = onTransmuxComplete
    this.onFlush = onFlush
    const config = hls.config
    const forwardMessage = (ev, data) => {
      data = data || {}
      data.frag = this.frag
      data.id = this.id
      hls.trigger(ev, data)
    }
    this.observer = new import_eventemitter3.EventEmitter()
    this.observer.on(Events.FRAG_DECRYPTED, forwardMessage)
    this.observer.on(Events.ERROR, forwardMessage)
    const typeSupported = {
      mp4: MediaSource2.isTypeSupported('video/mp4'),
      mpeg: MediaSource2.isTypeSupported('audio/mpeg'),
      mp3: MediaSource2.isTypeSupported('audio/mp4; codecs="mp3"')
    }
    const vendor = navigator.vendor
    this.transmuxer = new transmuxer_default(
      this.observer,
      typeSupported,
      config,
      vendor
    )
  }
  destroy() {
    const w = this.worker
    if (w) {
      w.removeEventListener('message', this.onwmsg)
      w.terminate()
      this.worker = null
    } else {
      const transmuxer = this.transmuxer
      if (transmuxer) {
        transmuxer.destroy()
        this.transmuxer = null
      }
    }
    const observer = this.observer
    if (observer) {
      observer.removeAllListeners()
    }
    this.observer = null
  }
  push(
    data,
    initSegmentData,
    audioCodec,
    videoCodec,
    frag,
    part,
    duration,
    accurateTimeOffset,
    chunkMeta,
    defaultInitPTS
  ) {
    chunkMeta.transmuxing.start = self.performance.now()
    const { transmuxer, worker } = this
    const timeOffset = part ? part.start : frag.start
    const decryptdata = frag.decryptdata
    const lastFrag = this.frag
    const discontinuity = !(lastFrag && frag.cc === lastFrag.cc)
    const trackSwitch = !(lastFrag && chunkMeta.level === lastFrag.level)
    const snDiff = lastFrag ? chunkMeta.sn - lastFrag.sn : -1
    const partDiff = this.part ? chunkMeta.part - this.part.index : 1
    const contiguous =
      !trackSwitch && (snDiff === 1 || (snDiff === 0 && partDiff === 1))
    const now2 = self.performance.now()
    if (trackSwitch || snDiff || frag.stats.parsing.start === 0) {
      frag.stats.parsing.start = now2
    }
    if (part && (partDiff || !contiguous)) {
      part.stats.parsing.start = now2
    }
    const state = new TransmuxState(
      discontinuity,
      contiguous,
      accurateTimeOffset,
      trackSwitch,
      timeOffset
    )
    if (!contiguous || discontinuity) {
      logger.log(`[transmuxer-interface, ${frag.type}]: Starting new transmux session for sn: ${chunkMeta.sn} p: ${chunkMeta.part} level: ${chunkMeta.level} id: ${chunkMeta.id}
        discontinuity: ${discontinuity}
        trackSwitch: ${trackSwitch}
        contiguous: ${contiguous}
        accurateTimeOffset: ${accurateTimeOffset}
        timeOffset: ${timeOffset}`)
      const config = new TransmuxConfig(
        audioCodec,
        videoCodec,
        initSegmentData,
        duration,
        defaultInitPTS
      )
      this.configureTransmuxer(config)
    }
    this.frag = frag
    this.part = part
    if (worker) {
      worker.postMessage(
        {
          cmd: 'demux',
          data,
          decryptdata,
          chunkMeta,
          state
        },
        data instanceof ArrayBuffer ? [data] : []
      )
    } else if (transmuxer) {
      const transmuxResult = transmuxer.push(
        data,
        decryptdata,
        chunkMeta,
        state
      )
      if (isPromise(transmuxResult)) {
        transmuxResult.then(data2 => {
          this.handleTransmuxComplete(data2)
        })
      } else {
        this.handleTransmuxComplete(transmuxResult)
      }
    }
  }
  flush(chunkMeta) {
    chunkMeta.transmuxing.start = self.performance.now()
    const { transmuxer, worker } = this
    if (worker) {
      worker.postMessage({
        cmd: 'flush',
        chunkMeta
      })
    } else if (transmuxer) {
      const transmuxResult = transmuxer.flush(chunkMeta)
      if (isPromise(transmuxResult)) {
        transmuxResult.then(data => {
          this.handleFlushResult(data, chunkMeta)
        })
      } else {
        this.handleFlushResult(transmuxResult, chunkMeta)
      }
    }
  }
  handleFlushResult(results, chunkMeta) {
    results.forEach(result => {
      this.handleTransmuxComplete(result)
    })
    this.onFlush(chunkMeta)
  }
  onWorkerMessage(ev) {
    const data = ev.data
    const hls = this.hls
    switch (data.event) {
      case 'init': {
        self.URL.revokeObjectURL(this.worker.objectURL)
        break
      }
      case 'transmuxComplete': {
        this.handleTransmuxComplete(data.data)
        break
      }
      case 'flush': {
        this.onFlush(data.data)
        break
      }
      default: {
        data.data = data.data || {}
        data.data.frag = this.frag
        data.data.id = this.id
        hls.trigger(data.event, data.data)
        break
      }
    }
  }
  configureTransmuxer(config) {
    const { worker, transmuxer } = this
    if (worker) {
      worker.postMessage({
        cmd: 'configure',
        config
      })
    } else if (transmuxer) {
      transmuxer.configure(config)
    }
  }
  handleTransmuxComplete(result) {
    result.chunkMeta.transmuxing.end = self.performance.now()
    this.onTransmuxComplete(result)
  }
}
var transmuxer_interface_default = TransmuxerInterface

// src/controller/gap-controller.ts
var STALL_MINIMUM_DURATION_MS = 250
var MAX_START_GAP_JUMP = 2
var SKIP_BUFFER_HOLE_STEP_SECONDS = 0.1
var SKIP_BUFFER_RANGE_START = 0.05
var GapController = class {
  constructor(config, media, fragmentTracker, hls) {
    this.nudgeRetry = 0
    this.stallReported = false
    this.stalled = null
    this.moved = false
    this.seeking = false
    this.config = config
    this.media = media
    this.fragmentTracker = fragmentTracker
    this.hls = hls
  }
  destroy() {
    this.hls = this.fragmentTracker = this.media = null
  }
  poll(lastCurrentTime) {
    const { config, media, stalled } = this
    const { currentTime, seeking } = media
    const seeked = this.seeking && !seeking
    const beginSeek = !this.seeking && seeking
    this.seeking = seeking
    if (currentTime !== lastCurrentTime) {
      this.moved = true
      if (stalled !== null) {
        if (this.stallReported) {
          const stalledDuration2 = self.performance.now() - stalled
          logger.warn(
            `playback not stuck anymore @${currentTime}, after ${Math.round(
              stalledDuration2
            )}ms`
          )
          this.stallReported = false
        }
        this.stalled = null
        this.nudgeRetry = 0
      }
      return
    }
    if (beginSeek || seeked) {
      this.stalled = null
    }
    if (
      media.paused ||
      media.ended ||
      media.playbackRate === 0 ||
      !BufferHelper.getBuffered(media).length
    ) {
      return
    }
    const bufferInfo = BufferHelper.bufferInfo(media, currentTime, 0)
    const isBuffered = bufferInfo.len > 0
    const nextStart = bufferInfo.nextStart || 0
    if (!isBuffered && !nextStart) {
      return
    }
    if (seeking) {
      const hasEnoughBuffer = bufferInfo.len > MAX_START_GAP_JUMP
      const noBufferGap =
        !nextStart ||
        (nextStart - currentTime > MAX_START_GAP_JUMP &&
          !this.fragmentTracker.getPartialFragment(currentTime))
      if (hasEnoughBuffer || noBufferGap) {
        return
      }
      this.moved = false
    }
    if (!this.moved && this.stalled !== null) {
      const startJump = Math.max(nextStart, bufferInfo.start || 0) - currentTime
      const level = this.hls.levels
        ? this.hls.levels[this.hls.currentLevel]
        : null
      const isLive = level?.details?.live
      const maxStartGapJump = isLive
        ? level.details.targetduration * 2
        : MAX_START_GAP_JUMP
      if (startJump > 0 && startJump <= maxStartGapJump) {
        this._trySkipBufferHole(null)
        return
      }
    }
    const tnow = self.performance.now()
    if (stalled === null) {
      this.stalled = tnow
      return
    }
    const stalledDuration = tnow - stalled
    if (!seeking && stalledDuration >= STALL_MINIMUM_DURATION_MS) {
      this._reportStall(bufferInfo.len)
    }
    const bufferedWithHoles = BufferHelper.bufferInfo(
      media,
      currentTime,
      config.maxBufferHole
    )
    this._tryFixBufferStall(bufferedWithHoles, stalledDuration)
  }
  _tryFixBufferStall(bufferInfo, stalledDurationMs) {
    const { config, fragmentTracker, media } = this
    const currentTime = media.currentTime
    const partial = fragmentTracker.getPartialFragment(currentTime)
    if (partial) {
      const targetTime = this._trySkipBufferHole(partial)
      if (targetTime) {
        return
      }
    }
    if (
      bufferInfo.len > config.maxBufferHole &&
      stalledDurationMs > config.highBufferWatchdogPeriod * 1e3
    ) {
      logger.warn('Trying to nudge playhead over buffer-hole')
      this.stalled = null
      this._tryNudgeBuffer()
    }
  }
  _reportStall(bufferLen) {
    const { hls, media, stallReported } = this
    if (!stallReported) {
      this.stallReported = true
      logger.warn(
        `Playback stalling at @${media.currentTime} due to low buffer (buffer=${bufferLen})`
      )
      hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_STALLED_ERROR,
        fatal: false,
        buffer: bufferLen
      })
    }
  }
  _trySkipBufferHole(partial) {
    const { config, hls, media } = this
    const currentTime = media.currentTime
    let lastEndTime = 0
    const buffered = BufferHelper.getBuffered(media)
    for (let i = 0; i < buffered.length; i++) {
      const startTime = buffered.start(i)
      if (
        currentTime + config.maxBufferHole >= lastEndTime &&
        currentTime < startTime
      ) {
        const targetTime = Math.max(
          startTime + SKIP_BUFFER_RANGE_START,
          media.currentTime + SKIP_BUFFER_HOLE_STEP_SECONDS
        )
        logger.warn(
          `skipping hole, adjusting currentTime from ${currentTime} to ${targetTime}`
        )
        this.moved = true
        this.stalled = null
        media.currentTime = targetTime
        if (partial) {
          hls.trigger(Events.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.BUFFER_SEEK_OVER_HOLE,
            fatal: false,
            reason: `fragment loaded with buffer holes, seeking from ${currentTime} to ${targetTime}`,
            frag: partial
          })
        }
        return targetTime
      }
      lastEndTime = buffered.end(i)
    }
    return 0
  }
  _tryNudgeBuffer() {
    const { config, hls, media } = this
    const currentTime = media.currentTime
    const nudgeRetry = (this.nudgeRetry || 0) + 1
    this.nudgeRetry = nudgeRetry
    if (nudgeRetry < config.nudgeMaxRetry) {
      const targetTime = currentTime + nudgeRetry * config.nudgeOffset
      logger.warn(`Nudging 'currentTime' from ${currentTime} to ${targetTime}`)
      media.currentTime = targetTime
      hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_NUDGE_ON_STALL,
        fatal: false
      })
    } else {
      logger.error(
        `Playhead still not moving while enough data buffered @${currentTime} after ${config.nudgeMaxRetry} nudges`
      )
      hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.BUFFER_STALLED_ERROR,
        fatal: true
      })
    }
  }
}
var gap_controller_default = GapController

// src/controller/stream-controller.ts
var TICK_INTERVAL = 100
var StreamController = class extends base_stream_controller_default {
  constructor(hls, fragmentTracker) {
    super(hls, fragmentTracker, '[stream-controller]')
    this.audioCodecSwap = false
    this.gapController = null
    this.level = -1
    this._forceStartLoad = false
    this.altAudio = false
    this.audioOnly = false
    this.fragPlaying = null
    this.onvplaying = null
    this.onvseeked = null
    this.fragLastKbps = 0
    this.stalled = false
    this.audioCodecSwitch = false
    this.videoBuffer = null
    this._registerListeners()
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.on(
      Events.FRAG_LOAD_EMERGENCY_ABORTED,
      this.onFragLoadEmergencyAborted,
      this
    )
    hls.on(Events.ERROR, this.onError, this)
    hls.on(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this)
    hls.on(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this)
    hls.on(Events.BUFFER_CREATED, this.onBufferCreated, this)
    hls.on(Events.BUFFER_FLUSHED, this.onBufferFlushed, this)
    hls.on(Events.LEVELS_UPDATED, this.onLevelsUpdated, this)
    hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.off(
      Events.FRAG_LOAD_EMERGENCY_ABORTED,
      this.onFragLoadEmergencyAborted,
      this
    )
    hls.off(Events.ERROR, this.onError, this)
    hls.off(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this)
    hls.off(Events.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this)
    hls.off(Events.BUFFER_CREATED, this.onBufferCreated, this)
    hls.off(Events.BUFFER_FLUSHED, this.onBufferFlushed, this)
    hls.off(Events.LEVELS_UPDATED, this.onLevelsUpdated, this)
    hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this)
  }
  onHandlerDestroying() {
    this._unregisterListeners()
    this.onMediaDetaching()
  }
  startLoad(startPosition) {
    if (this.levels) {
      const { lastCurrentTime, hls } = this
      this.stopLoad()
      this.setInterval(TICK_INTERVAL)
      this.level = -1
      this.fragLoadError = 0
      if (!this.startFragRequested) {
        let startLevel = hls.startLevel
        if (startLevel === -1) {
          if (hls.config.testBandwidth) {
            startLevel = 0
            this.bitrateTest = true
          } else {
            startLevel = hls.nextAutoLevel
          }
        }
        this.level = hls.nextLoadLevel = startLevel
        this.loadedmetadata = false
      }
      if (lastCurrentTime > 0 && startPosition === -1) {
        this.log(
          `Override startPosition with lastCurrentTime @${lastCurrentTime.toFixed(
            3
          )}`
        )
        startPosition = lastCurrentTime
      }
      this.state = State.IDLE
      this.nextLoadPosition = this.startPosition = this.lastCurrentTime = startPosition
      this.tick()
    } else {
      this._forceStartLoad = true
      this.state = State.STOPPED
    }
  }
  stopLoad() {
    this._forceStartLoad = false
    super.stopLoad()
  }
  doTick() {
    switch (this.state) {
      case State.IDLE:
        this.doTickIdle()
        break
      case State.WAITING_LEVEL: {
        const { levels, level } = this
        const details = levels?.[level]?.details
        if (details && (!details.live || this.levelLastLoaded === this.level)) {
          if (this.waitForCdnTuneIn(details)) {
            break
          }
          this.state = State.IDLE
          break
        }
        break
      }
      case State.FRAG_LOADING_WAITING_RETRY:
        {
          const now2 = self.performance.now()
          const retryDate = this.retryDate
          if (!retryDate || now2 >= retryDate || this.media?.seeking) {
            this.log('retryDate reached, switch back to IDLE state')
            this.state = State.IDLE
          }
        }
        break
      default:
        break
    }
    this.onTickEnd()
  }
  onTickEnd() {
    super.onTickEnd()
    this.checkBuffer()
    this.checkFragmentChanged()
  }
  doTickIdle() {
    const { hls, levelLastLoaded, levels, media } = this
    const { config, nextLoadLevel: level } = hls
    if (
      levelLastLoaded === null ||
      (!media && (this.startFragRequested || !config.startFragPrefetch))
    ) {
      return
    }
    if (this.altAudio && this.audioOnly) {
      return
    }
    if (!levels || !levels[level]) {
      return
    }
    const levelInfo = levels[level]
    this.level = hls.nextLoadLevel = level
    const levelDetails = levelInfo.details
    if (
      !levelDetails ||
      this.state === State.WAITING_LEVEL ||
      (levelDetails.live && this.levelLastLoaded !== level)
    ) {
      this.state = State.WAITING_LEVEL
      return
    }
    const pos = this.getLoadPosition()
    if (!Number.isFinite(pos)) {
      return
    }
    let frag = levelDetails.initSegment
    let targetBufferTime = 0
    if (!frag || frag.data || this.bitrateTest) {
      const levelBitrate = levelInfo.maxBitrate
      let maxBufLen
      if (levelBitrate) {
        maxBufLen = Math.max(
          (8 * config.maxBufferSize) / levelBitrate,
          config.maxBufferLength
        )
      } else {
        maxBufLen = config.maxBufferLength
      }
      maxBufLen = Math.min(maxBufLen, config.maxMaxBufferLength)
      const maxBufferHole =
        pos < config.maxBufferHole
          ? Math.max(MAX_START_GAP_JUMP, config.maxBufferHole)
          : config.maxBufferHole
      const bufferInfo = BufferHelper.bufferInfo(
        this.mediaBuffer ? this.mediaBuffer : media,
        pos,
        maxBufferHole
      )
      const bufferLen = bufferInfo.len
      if (bufferLen >= maxBufLen) {
        return
      }
      if (this._streamEnded(bufferInfo, levelDetails)) {
        const data = {}
        if (this.altAudio) {
          data.type = 'video'
        }
        this.hls.trigger(Events.BUFFER_EOS, data)
        this.state = State.ENDED
        return
      }
      targetBufferTime = bufferInfo.end
      frag = this.getNextFragment(targetBufferTime, levelDetails)
      if (
        frag &&
        this.fragmentTracker.getState(frag) === FragmentState.OK &&
        this.nextLoadPosition > targetBufferTime
      ) {
        frag = this.getNextFragment(this.nextLoadPosition, levelDetails)
      }
      if (!frag) {
        return
      }
    }
    if (frag.decryptdata?.keyFormat === 'identity' && !frag.decryptdata?.key) {
      this.loadKey(frag, levelDetails)
    } else {
      this.loadFragment(frag, levelDetails, targetBufferTime)
    }
  }
  loadFragment(frag, levelDetails, targetBufferTime) {
    let fragState = this.fragmentTracker.getState(frag)
    this.fragCurrent = frag
    if (fragState === FragmentState.BACKTRACKED) {
      const data = this.fragmentTracker.getBacktrackData(frag)
      if (data) {
        this._handleFragmentLoadProgress(data)
        this._handleFragmentLoadComplete(data)
        return
      } else {
        fragState = FragmentState.NOT_LOADED
      }
    }
    if (
      fragState === FragmentState.NOT_LOADED ||
      fragState === FragmentState.PARTIAL
    ) {
      if (frag.sn === 'initSegment') {
        this._loadInitSegment(frag)
      } else if (this.bitrateTest) {
        frag.bitrateTest = true
        this.log(
          `Fragment ${frag.sn} of level ${frag.level} is being downloaded to test bitrate and will not be buffered`
        )
        this._loadBitrateTestFrag(frag)
      } else {
        this.startFragRequested = true
        super.loadFragment(frag, levelDetails, targetBufferTime)
      }
    } else if (fragState === FragmentState.APPENDING) {
      if (this.reduceMaxBufferLength(frag.duration)) {
        this.fragmentTracker.removeFragment(frag)
      }
    } else if (this.media?.buffered.length === 0) {
      this.fragmentTracker.removeAllFragments()
    }
  }
  getAppendedFrag(position) {
    const fragOrPart = this.fragmentTracker.getAppendedFrag(
      position,
      PlaylistLevelType.MAIN
    )
    if (fragOrPart && 'fragment' in fragOrPart) {
      return fragOrPart.fragment
    }
    return fragOrPart
  }
  getBufferedFrag(position) {
    return this.fragmentTracker.getBufferedFrag(
      position,
      PlaylistLevelType.MAIN
    )
  }
  followingBufferedFrag(frag) {
    if (frag) {
      return this.getBufferedFrag(frag.end + 0.5)
    }
    return null
  }
  immediateLevelSwitch() {
    this.abortCurrentFrag()
    this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
  }
  nextLevelSwitch() {
    const { levels, media } = this
    if (media?.readyState) {
      let fetchdelay
      const fragPlayingCurrent = this.getAppendedFrag(media.currentTime)
      if (fragPlayingCurrent && fragPlayingCurrent.start > 1) {
        this.flushMainBuffer(0, fragPlayingCurrent.start - 1)
      }
      if (!media.paused && levels) {
        const nextLevelId = this.hls.nextLoadLevel
        const nextLevel = levels[nextLevelId]
        const fragLastKbps = this.fragLastKbps
        if (fragLastKbps && this.fragCurrent) {
          fetchdelay =
            (this.fragCurrent.duration * nextLevel.maxBitrate) /
              (1e3 * fragLastKbps) +
            1
        } else {
          fetchdelay = 0
        }
      } else {
        fetchdelay = 0
      }
      const bufferedFrag = this.getBufferedFrag(media.currentTime + fetchdelay)
      if (bufferedFrag) {
        const nextBufferedFrag = this.followingBufferedFrag(bufferedFrag)
        if (nextBufferedFrag) {
          this.abortCurrentFrag()
          const maxStart = nextBufferedFrag.maxStartPTS
            ? nextBufferedFrag.maxStartPTS
            : nextBufferedFrag.start
          const fragDuration = nextBufferedFrag.duration
          const startPts = Math.max(
            bufferedFrag.end,
            maxStart +
              Math.min(
                Math.max(
                  fragDuration - this.config.maxFragLookUpTolerance,
                  fragDuration * 0.5
                ),
                fragDuration * 0.75
              )
          )
          this.flushMainBuffer(startPts, Number.POSITIVE_INFINITY)
        }
      }
    }
  }
  abortCurrentFrag() {
    const fragCurrent = this.fragCurrent
    this.fragCurrent = null
    if (fragCurrent?.loader) {
      fragCurrent.loader.abort()
    }
    if (this.state === State.KEY_LOADING) {
      this.state = State.IDLE
    }
    this.nextLoadPosition = this.getLoadPosition()
  }
  flushMainBuffer(startOffset, endOffset) {
    super.flushMainBuffer(
      startOffset,
      endOffset,
      this.altAudio ? 'video' : null
    )
  }
  onMediaAttached(event, data) {
    super.onMediaAttached(event, data)
    const media = data.media
    this.onvplaying = this.onMediaPlaying.bind(this)
    this.onvseeked = this.onMediaSeeked.bind(this)
    media.addEventListener('playing', this.onvplaying)
    media.addEventListener('seeked', this.onvseeked)
    this.gapController = new gap_controller_default(
      this.config,
      media,
      this.fragmentTracker,
      this.hls
    )
  }
  onMediaDetaching() {
    const { media } = this
    if (media) {
      media.removeEventListener('playing', this.onvplaying)
      media.removeEventListener('seeked', this.onvseeked)
      this.onvplaying = this.onvseeked = null
      this.videoBuffer = null
    }
    this.fragPlaying = null
    if (this.gapController) {
      this.gapController.destroy()
      this.gapController = null
    }
    super.onMediaDetaching()
  }
  onMediaPlaying() {
    this.tick()
  }
  onMediaSeeked() {
    const media = this.media
    const currentTime = media ? media.currentTime : null
    if (Number.isFinite(currentTime)) {
      this.log(`Media seeked to ${currentTime.toFixed(3)}`)
    }
    this.tick()
  }
  onManifestLoading() {
    this.log('Trigger BUFFER_RESET')
    this.hls.trigger(Events.BUFFER_RESET, void 0)
    this.fragmentTracker.removeAllFragments()
    this.stalled = false
    this.startPosition = this.lastCurrentTime = 0
    this.fragPlaying = null
  }
  onManifestParsed(event, data) {
    let aac = false
    let heaac = false
    let codec
    data.levels.forEach(level => {
      codec = level.audioCodec
      if (codec) {
        if (codec.indexOf('mp4a.40.2') !== -1) {
          aac = true
        }
        if (codec.indexOf('mp4a.40.5') !== -1) {
          heaac = true
        }
      }
    })
    this.audioCodecSwitch = aac && heaac && !changeTypeSupported()
    if (this.audioCodecSwitch) {
      this.log(
        'Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC'
      )
    }
    this.levels = data.levels
    this.startFragRequested = false
  }
  onLevelLoading(event, data) {
    const { levels } = this
    if (!levels || this.state !== State.IDLE) {
      return
    }
    const level = levels[data.level]
    if (
      !level.details ||
      (level.details.live && this.levelLastLoaded !== data.level) ||
      this.waitForCdnTuneIn(level.details)
    ) {
      this.state = State.WAITING_LEVEL
    }
  }
  onLevelLoaded(event, data) {
    const { levels } = this
    const newLevelId = data.level
    const newDetails = data.details
    const duration = newDetails.totalduration
    if (!levels) {
      this.warn(`Levels were reset while loading level ${newLevelId}`)
      return
    }
    this.log(
      `Level ${newLevelId} loaded [${newDetails.startSN},${newDetails.endSN}], cc [${newDetails.startCC}, ${newDetails.endCC}] duration:${duration}`
    )
    const fragCurrent = this.fragCurrent
    if (
      fragCurrent &&
      (this.state === State.FRAG_LOADING ||
        this.state === State.FRAG_LOADING_WAITING_RETRY)
    ) {
      if (fragCurrent.level !== data.level && fragCurrent.loader) {
        this.state = State.IDLE
        fragCurrent.loader.abort()
      }
    }
    const curLevel = levels[newLevelId]
    let sliding = 0
    if (newDetails.live || curLevel.details?.live) {
      if (!newDetails.fragments[0]) {
        newDetails.deltaUpdateFailed = true
      }
      if (newDetails.deltaUpdateFailed) {
        return
      }
      sliding = this.alignPlaylists(newDetails, curLevel.details)
    }
    curLevel.details = newDetails
    this.levelLastLoaded = newLevelId
    this.hls.trigger(Events.LEVEL_UPDATED, {
      details: newDetails,
      level: newLevelId
    })
    if (this.state === State.WAITING_LEVEL) {
      if (this.waitForCdnTuneIn(newDetails)) {
        return
      }
      this.state = State.IDLE
    }
    if (!this.startFragRequested) {
      this.setStartPosition(newDetails, sliding)
    } else if (newDetails.live) {
      this.synchronizeToLiveEdge(newDetails)
    }
    this.tick()
  }
  _handleFragmentLoadProgress(data) {
    const { frag, part, payload } = data
    const { levels } = this
    if (!levels) {
      this.warn(
        `Levels were reset while fragment load was in progress. Fragment ${frag.sn} of level ${frag.level} will not be buffered`
      )
      return
    }
    const currentLevel = levels[frag.level]
    const details = currentLevel.details
    if (!details) {
      this.warn(
        `Dropping fragment ${frag.sn} of level ${frag.level} after level details were reset`
      )
      return
    }
    const videoCodec = currentLevel.videoCodec
    const accurateTimeOffset = details.PTSKnown || !details.live
    const initSegmentData = details.initSegment?.data
    const audioCodec = this._getAudioCodec(currentLevel)
    const transmuxer = (this.transmuxer =
      this.transmuxer ||
      new transmuxer_interface_default(
        this.hls,
        PlaylistLevelType.MAIN,
        this._handleTransmuxComplete.bind(this),
        this._handleTransmuxerFlush.bind(this)
      ))
    const partIndex = part ? part.index : -1
    const partial = partIndex !== -1
    const chunkMeta = new ChunkMetadata(
      frag.level,
      frag.sn,
      frag.stats.chunkCount,
      payload.byteLength,
      partIndex,
      partial
    )
    const initPTS = this.initPTS[frag.cc]
    transmuxer.push(
      payload,
      initSegmentData,
      audioCodec,
      videoCodec,
      frag,
      part,
      details.totalduration,
      accurateTimeOffset,
      chunkMeta,
      initPTS
    )
  }
  onAudioTrackSwitching(event, data) {
    const fromAltAudio = this.altAudio
    const altAudio = !!data.url
    const trackId = data.id
    if (!altAudio) {
      if (this.mediaBuffer !== this.media) {
        this.log(
          'Switching on main audio, use media.buffered to schedule main fragment loading'
        )
        this.mediaBuffer = this.media
        const fragCurrent = this.fragCurrent
        if (fragCurrent?.loader) {
          this.log('Switching to main audio track, cancel main fragment load')
          fragCurrent.loader.abort()
        }
        this.resetTransmuxer()
        this.resetLoadingState()
      } else if (this.audioOnly) {
        this.resetTransmuxer()
      }
      const hls = this.hls
      if (fromAltAudio) {
        hls.trigger(Events.BUFFER_FLUSHING, {
          startOffset: 0,
          endOffset: Number.POSITIVE_INFINITY,
          type: 'audio'
        })
      }
      hls.trigger(Events.AUDIO_TRACK_SWITCHED, {
        id: trackId
      })
    }
  }
  onAudioTrackSwitched(event, data) {
    const trackId = data.id
    const altAudio = !!this.hls.audioTracks[trackId].url
    if (altAudio) {
      const videoBuffer = this.videoBuffer
      if (videoBuffer && this.mediaBuffer !== videoBuffer) {
        this.log(
          'Switching on alternate audio, use video.buffered to schedule main fragment loading'
        )
        this.mediaBuffer = videoBuffer
      }
    }
    this.altAudio = altAudio
    this.tick()
  }
  onBufferCreated(event, data) {
    const tracks = data.tracks
    let mediaTrack
    let name
    let alternate = false
    for (const type in tracks) {
      const track = tracks[type]
      if (track.id === 'main') {
        name = type
        mediaTrack = track
        if (type === 'video') {
          const videoTrack = tracks[type]
          if (videoTrack) {
            this.videoBuffer = videoTrack.buffer
          }
        }
      } else {
        alternate = true
      }
    }
    if (alternate && mediaTrack) {
      this.log(
        `Alternate track found, use ${name}.buffered to schedule main fragment loading`
      )
      this.mediaBuffer = mediaTrack.buffer
    } else {
      this.mediaBuffer = this.media
    }
  }
  onFragBuffered(event, data) {
    const { frag, part } = data
    if (frag && frag.type !== PlaylistLevelType.MAIN) {
      return
    }
    if (this.fragContextChanged(frag)) {
      this.warn(
        `Fragment ${frag.sn}${part ? ' p: ' + part.index : ''} of level ${
          frag.level
        } finished buffering, but was aborted. state: ${this.state}`
      )
      if (this.state === State.PARSED) {
        this.state = State.IDLE
      }
      return
    }
    const stats = part ? part.stats : frag.stats
    this.fragLastKbps = Math.round(
      (8 * stats.total) / (stats.buffering.end - stats.loading.first)
    )
    if (frag.sn !== 'initSegment') {
      this.fragPrevious = frag
    }
    this.fragBufferedComplete(frag, part)
  }
  onError(event, data) {
    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
      case ErrorDetails.KEY_LOAD_ERROR:
      case ErrorDetails.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(PlaylistLevelType.MAIN, data)
        break
      case ErrorDetails.LEVEL_LOAD_ERROR:
      case ErrorDetails.LEVEL_LOAD_TIMEOUT:
        if (this.state !== State.ERROR) {
          if (data.fatal) {
            this.warn(`${data.details}`)
            this.state = State.ERROR
          } else {
            if (!data.levelRetry && this.state === State.WAITING_LEVEL) {
              this.state = State.IDLE
            }
          }
        }
        break
      case ErrorDetails.BUFFER_FULL_ERROR:
        if (
          data.parent === 'main' &&
          (this.state === State.PARSING || this.state === State.PARSED)
        ) {
          const mediaBuffered =
            !!this.media &&
            BufferHelper.isBuffered(this.media, this.media.currentTime) &&
            BufferHelper.isBuffered(this.media, this.media.currentTime + 0.5)
          if (mediaBuffered) {
            this.reduceMaxBufferLength()
            this.state = State.IDLE
          } else {
            this.warn(
              'buffer full error also media.currentTime is not buffered, flush everything'
            )
            this.immediateLevelSwitch()
          }
        }
        break
      default:
        break
    }
  }
  checkBuffer() {
    const { media, gapController } = this
    if (!media || !gapController || !media.readyState) {
      return
    }
    const buffered = BufferHelper.getBuffered(media)
    if (!this.loadedmetadata && buffered.length) {
      this.loadedmetadata = true
      this.seekToStartPos()
    } else {
      gapController.poll(this.lastCurrentTime)
    }
    this.lastCurrentTime = media.currentTime
  }
  onFragLoadEmergencyAborted() {
    this.state = State.IDLE
    if (!this.loadedmetadata) {
      this.startFragRequested = false
      this.nextLoadPosition = this.startPosition
    }
    this.tick()
  }
  onBufferFlushed(event, { type }) {
    if (
      type !== ElementaryStreamTypes.AUDIO ||
      (this.audioOnly && !this.altAudio)
    ) {
      const media =
        (type === ElementaryStreamTypes.VIDEO
          ? this.videoBuffer
          : this.mediaBuffer) || this.media
      this.afterBufferFlushed(media, type, PlaylistLevelType.MAIN)
    }
  }
  onLevelsUpdated(event, data) {
    this.levels = data.levels
  }
  swapAudioCodec() {
    this.audioCodecSwap = !this.audioCodecSwap
  }
  seekToStartPos() {
    const { media } = this
    const currentTime = media.currentTime
    let startPosition = this.startPosition
    if (startPosition >= 0 && currentTime < startPosition) {
      if (media.seeking) {
        logger.log(
          `could not seek to ${startPosition}, already seeking at ${currentTime}`
        )
        return
      }
      const buffered = BufferHelper.getBuffered(media)
      const bufferStart = buffered.length ? buffered.start(0) : 0
      const delta = bufferStart - startPosition
      if (delta > 0 && delta < this.config.maxBufferHole) {
        logger.log(`adjusting start position by ${delta} to match buffer start`)
        startPosition += delta
        this.startPosition = startPosition
      }
      this.log(
        `seek to target start position ${startPosition} from current time ${currentTime}`
      )
      media.currentTime = startPosition
    }
  }
  _getAudioCodec(currentLevel) {
    let audioCodec = this.config.defaultAudioCodec || currentLevel.audioCodec
    if (this.audioCodecSwap && audioCodec) {
      this.log('Swapping audio codec')
      if (audioCodec.indexOf('mp4a.40.5') !== -1) {
        audioCodec = 'mp4a.40.2'
      } else {
        audioCodec = 'mp4a.40.5'
      }
    }
    return audioCodec
  }
  _loadBitrateTestFrag(frag) {
    this._doFragLoad(frag).then(data => {
      const { hls } = this
      if (!data || hls.nextLoadLevel || this.fragContextChanged(frag)) {
        return
      }
      this.fragLoadError = 0
      this.state = State.IDLE
      this.startFragRequested = false
      this.bitrateTest = false
      const stats = frag.stats
      stats.parsing.start = stats.parsing.end = stats.buffering.start = stats.buffering.end = self.performance.now()
      hls.trigger(Events.FRAG_LOADED, data)
    })
  }
  _handleTransmuxComplete(transmuxResult) {
    const id = 'main'
    const { hls } = this
    const { remuxResult, chunkMeta } = transmuxResult
    const context = this.getCurrentContext(chunkMeta)
    if (!context) {
      this.warn(
        `The loading context changed while buffering fragment ${chunkMeta.sn} of level ${chunkMeta.level}. This chunk will not be buffered.`
      )
      this.resetLiveStartWhenNotLoaded(chunkMeta.level)
      return
    }
    const { frag, part, level } = context
    const { video, text, id3, initSegment } = remuxResult
    const audio = this.altAudio ? void 0 : remuxResult.audio
    if (this.fragContextChanged(frag)) {
      return
    }
    this.state = State.PARSING
    if (initSegment) {
      if (initSegment.tracks) {
        this._bufferInitSegment(level, initSegment.tracks, frag, chunkMeta)
        hls.trigger(Events.FRAG_PARSING_INIT_SEGMENT, {
          frag,
          id,
          tracks: initSegment.tracks
        })
      }
      const initPTS = initSegment.initPTS
      const timescale = initSegment.timescale
      if (Number.isFinite(initPTS)) {
        this.initPTS[frag.cc] = initPTS
        hls.trigger(Events.INIT_PTS_FOUND, { frag, id, initPTS, timescale })
      }
    }
    if (video && remuxResult.independent !== false) {
      if (level.details) {
        const { startPTS, endPTS, startDTS, endDTS } = video
        if (part) {
          part.elementaryStreams[video.type] = {
            startPTS,
            endPTS,
            startDTS,
            endDTS
          }
        } else if (video.dropped && video.independent) {
          const pos = this.getLoadPosition() + this.config.maxBufferHole
          if (pos < startPTS) {
            this.backtrack(frag)
            return
          }
          frag.setElementaryStreamInfo(
            video.type,
            frag.start,
            endPTS,
            frag.start,
            endDTS,
            true
          )
        }
        frag.setElementaryStreamInfo(
          video.type,
          startPTS,
          endPTS,
          startDTS,
          endDTS
        )
        this.bufferFragmentData(video, frag, part, chunkMeta)
      }
    } else if (remuxResult.independent === false) {
      this.backtrack(frag)
      return
    }
    if (audio) {
      const { startPTS, endPTS, startDTS, endDTS } = audio
      if (part) {
        part.elementaryStreams[ElementaryStreamTypes.AUDIO] = {
          startPTS,
          endPTS,
          startDTS,
          endDTS
        }
      }
      frag.setElementaryStreamInfo(
        ElementaryStreamTypes.AUDIO,
        startPTS,
        endPTS,
        startDTS,
        endDTS
      )
      this.bufferFragmentData(audio, frag, part, chunkMeta)
    }
    if (id3?.samples?.length) {
      const emittedID3 = {
        frag,
        id,
        samples: id3.samples
      }
      hls.trigger(Events.FRAG_PARSING_METADATA, emittedID3)
    }
    if (text) {
      const emittedText = {
        frag,
        id,
        samples: text.samples
      }
      hls.trigger(Events.FRAG_PARSING_USERDATA, emittedText)
    }
  }
  _bufferInitSegment(currentLevel, tracks, frag, chunkMeta) {
    if (this.state !== State.PARSING) {
      return
    }
    this.audioOnly = !!tracks.audio && !tracks.video
    if (this.altAudio && !this.audioOnly) {
      delete tracks.audio
    }
    const { audio, video, audiovideo } = tracks
    if (audio) {
      let audioCodec = currentLevel.audioCodec
      const ua = navigator.userAgent.toLowerCase()
      if (this.audioCodecSwitch) {
        if (audioCodec) {
          if (audioCodec.indexOf('mp4a.40.5') !== -1) {
            audioCodec = 'mp4a.40.2'
          } else {
            audioCodec = 'mp4a.40.5'
          }
        }
        if (audio.metadata.channelCount !== 1 && ua.indexOf('firefox') === -1) {
          audioCodec = 'mp4a.40.5'
        }
      }
      if (ua.indexOf('android') !== -1 && audio.container !== 'audio/mpeg') {
        audioCodec = 'mp4a.40.2'
        this.log(`Android: force audio codec to ${audioCodec}`)
      }
      if (currentLevel.audioCodec && currentLevel.audioCodec !== audioCodec) {
        this.log(
          `Swapping manifest audio codec "${currentLevel.audioCodec}" for "${audioCodec}"`
        )
      }
      audio.levelCodec = audioCodec
      audio.id = 'main'
      this.log(
        `Init audio buffer, container:${
          audio.container
        }, codecs[selected/level/parsed]=[${audioCodec || ''}/${
          currentLevel.audioCodec || ''
        }/${audio.codec}]`
      )
    }
    if (video) {
      video.levelCodec = currentLevel.videoCodec
      video.id = 'main'
      this.log(
        `Init video buffer, container:${
          video.container
        }, codecs[level/parsed]=[${currentLevel.videoCodec || ''}/${
          video.codec
        }]`
      )
    }
    if (audiovideo) {
      this.log(
        `Init audiovideo buffer, container:${
          audiovideo.container
        }, codecs[level/parsed]=[${currentLevel.attrs.CODECS || ''}/${
          audiovideo.codec
        }]`
      )
    }
    this.hls.trigger(Events.BUFFER_CODECS, tracks)
    Object.keys(tracks).forEach(trackName => {
      const track = tracks[trackName]
      const initSegment = track.initSegment
      if (initSegment?.byteLength) {
        this.hls.trigger(Events.BUFFER_APPENDING, {
          type: trackName,
          data: initSegment,
          frag,
          part: null,
          chunkMeta,
          parent: frag.type
        })
      }
    })
    this.tick()
  }
  backtrack(frag) {
    this.resetTransmuxer()
    this.flushBufferGap(frag)
    const data = this.fragmentTracker.backtrack(frag)
    this.fragPrevious = null
    this.nextLoadPosition = frag.start
    if (data) {
      this.resetFragmentLoading(frag)
    } else {
      this.state = State.BACKTRACKING
    }
  }
  checkFragmentChanged() {
    const video = this.media
    let fragPlayingCurrent = null
    if (video && video.readyState > 1 && video.seeking === false) {
      const currentTime = video.currentTime
      if (BufferHelper.isBuffered(video, currentTime)) {
        fragPlayingCurrent = this.getAppendedFrag(currentTime)
      } else if (BufferHelper.isBuffered(video, currentTime + 0.1)) {
        fragPlayingCurrent = this.getAppendedFrag(currentTime + 0.1)
      }
      if (fragPlayingCurrent) {
        const fragPlaying = this.fragPlaying
        const fragCurrentLevel = fragPlayingCurrent.level
        if (
          !fragPlaying ||
          fragPlayingCurrent.sn !== fragPlaying.sn ||
          fragPlaying.level !== fragCurrentLevel ||
          fragPlayingCurrent.urlId !== fragPlaying.urlId
        ) {
          this.hls.trigger(Events.FRAG_CHANGED, { frag: fragPlayingCurrent })
          if (!fragPlaying || fragPlaying.level !== fragCurrentLevel) {
            this.hls.trigger(Events.LEVEL_SWITCHED, {
              level: fragCurrentLevel
            })
          }
          this.fragPlaying = fragPlayingCurrent
        }
      }
    }
  }
  get nextLevel() {
    const frag = this.nextBufferedFrag
    if (frag) {
      return frag.level
    } else {
      return -1
    }
  }
  get currentLevel() {
    const media = this.media
    if (media) {
      const fragPlayingCurrent = this.getAppendedFrag(media.currentTime)
      if (fragPlayingCurrent) {
        return fragPlayingCurrent.level
      }
    }
    return -1
  }
  get nextBufferedFrag() {
    const media = this.media
    if (media) {
      const fragPlayingCurrent = this.getAppendedFrag(media.currentTime)
      return this.followingBufferedFrag(fragPlayingCurrent)
    } else {
      return null
    }
  }
  get forceStartLoad() {
    return this._forceStartLoad
  }
}
var stream_controller_default = StreamController

// src/utils/ewma.ts
var EWMA = class {
  constructor(halfLife, estimate = 0, weight = 0) {
    this.halfLife = halfLife
    this.alpha_ = halfLife ? Math.exp(Math.log(0.5) / halfLife) : 0
    this.estimate_ = estimate
    this.totalWeight_ = weight
  }
  sample(weight, value) {
    const adjAlpha = Math.pow(this.alpha_, weight)
    this.estimate_ = value * (1 - adjAlpha) + adjAlpha * this.estimate_
    this.totalWeight_ += weight
  }
  getTotalWeight() {
    return this.totalWeight_
  }
  getEstimate() {
    if (this.alpha_) {
      const zeroFactor = 1 - Math.pow(this.alpha_, this.totalWeight_)
      if (zeroFactor) {
        return this.estimate_ / zeroFactor
      }
    }
    return this.estimate_
  }
}
var ewma_default = EWMA

// src/utils/ewma-bandwidth-estimator.ts
var EwmaBandWidthEstimator = class {
  constructor(slow, fast, defaultEstimate) {
    this.defaultEstimate_ = defaultEstimate
    this.minWeight_ = 1e-3
    this.minDelayMs_ = 50
    this.slow_ = new ewma_default(slow)
    this.fast_ = new ewma_default(fast)
  }
  update(slow, fast) {
    const { slow_, fast_ } = this
    if (this.slow_.halfLife !== slow) {
      this.slow_ = new ewma_default(
        slow,
        slow_.getEstimate(),
        slow_.getTotalWeight()
      )
    }
    if (this.fast_.halfLife !== fast) {
      this.fast_ = new ewma_default(
        fast,
        fast_.getEstimate(),
        fast_.getTotalWeight()
      )
    }
  }
  sample(durationMs, numBytes) {
    durationMs = Math.max(durationMs, this.minDelayMs_)
    const numBits = 8 * numBytes
    const durationS = durationMs / 1e3
    const bandwidthInBps = numBits / durationS
    this.fast_.sample(durationS, bandwidthInBps)
    this.slow_.sample(durationS, bandwidthInBps)
  }
  canEstimate() {
    const fast = this.fast_
    return fast && fast.getTotalWeight() >= this.minWeight_
  }
  getEstimate() {
    if (this.canEstimate()) {
      return Math.min(this.fast_.getEstimate(), this.slow_.getEstimate())
    } else {
      return this.defaultEstimate_
    }
  }
  destroy() {}
}
var ewma_bandwidth_estimator_default = EwmaBandWidthEstimator

// src/controller/abr-controller.ts
var AbrController = class {
  constructor(hls) {
    this.lastLoadedFragLevel = 0
    this._nextAutoLevel = -1
    this.onCheck = this._abandonRulesCheck.bind(this)
    this.fragCurrent = null
    this.partCurrent = null
    this.bitrateTestDelay = 0
    this.hls = hls
    const config = hls.config
    this.bwEstimator = new ewma_bandwidth_estimator_default(
      config.abrEwmaSlowVoD,
      config.abrEwmaFastVoD,
      config.abrEwmaDefaultEstimate
    )
    this.registerListeners()
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.FRAG_LOADING, this.onFragLoading, this)
    hls.on(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this)
    hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.on(Events.ERROR, this.onError, this)
  }
  unregisterListeners() {
    const { hls } = this
    hls.off(Events.FRAG_LOADING, this.onFragLoading, this)
    hls.off(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this)
    hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.off(Events.ERROR, this.onError, this)
  }
  destroy() {
    this.unregisterListeners()
    this.clearTimer()
    this.hls = this.onCheck = null
    this.fragCurrent = this.partCurrent = null
  }
  onFragLoading(event, data) {
    const frag = data.frag
    if (frag.type === PlaylistLevelType.MAIN) {
      if (!this.timer) {
        this.fragCurrent = frag
        this.partCurrent = data.part ?? null
        this.timer = self.setInterval(this.onCheck, 100)
      }
    }
  }
  onLevelLoaded(event, data) {
    const config = this.hls.config
    if (data.details.live) {
      this.bwEstimator.update(config.abrEwmaSlowLive, config.abrEwmaFastLive)
    } else {
      this.bwEstimator.update(config.abrEwmaSlowVoD, config.abrEwmaFastVoD)
    }
  }
  _abandonRulesCheck() {
    const { fragCurrent: frag, partCurrent: part, hls } = this
    const { autoLevelEnabled, config, media } = hls
    if (!frag || !media) {
      return
    }
    const stats = part ? part.stats : frag.stats
    const duration = part ? part.duration : frag.duration
    if (stats.aborted) {
      logger.warn('frag loader destroy or aborted, disarm abandonRules')
      this.clearTimer()
      this._nextAutoLevel = -1
      return
    }
    if (
      !autoLevelEnabled ||
      media.paused ||
      !media.playbackRate ||
      !media.readyState
    ) {
      return
    }
    const requestDelay = performance.now() - stats.loading.start
    const playbackRate = Math.abs(media.playbackRate)
    if (requestDelay <= (500 * duration) / playbackRate) {
      return
    }
    const { levels, minAutoLevel } = hls
    const level = levels[frag.level]
    const expectedLen =
      stats.total ||
      Math.max(stats.loaded, Math.round((duration * level.maxBitrate) / 8))
    const loadRate = Math.max(
      1,
      stats.bwEstimate
        ? stats.bwEstimate / 8
        : (stats.loaded * 1e3) / requestDelay
    )
    const fragLoadedDelay = (expectedLen - stats.loaded) / loadRate
    const pos = media.currentTime
    const bufferStarvationDelay =
      (BufferHelper.bufferInfo(media, pos, config.maxBufferHole).end - pos) /
      playbackRate
    if (
      bufferStarvationDelay >= (2 * duration) / playbackRate ||
      fragLoadedDelay <= bufferStarvationDelay
    ) {
      return
    }
    let fragLevelNextLoadedDelay = Number.POSITIVE_INFINITY
    let nextLoadLevel
    for (
      nextLoadLevel = frag.level - 1;
      nextLoadLevel > minAutoLevel;
      nextLoadLevel--
    ) {
      const levelNextBitrate = levels[nextLoadLevel].maxBitrate
      fragLevelNextLoadedDelay =
        (duration * levelNextBitrate) / (8 * 0.8 * loadRate)
      if (fragLevelNextLoadedDelay < bufferStarvationDelay) {
        break
      }
    }
    if (fragLevelNextLoadedDelay >= fragLoadedDelay) {
      return
    }
    const bwEstimate = this.bwEstimator.getEstimate()
    logger.warn(`Fragment ${frag.sn}${
      part ? ' part ' + part.index : ''
    } of level ${
      frag.level
    } is loading too slowly and will cause an underbuffer; aborting and switching to level ${nextLoadLevel}
      Current BW estimate: ${
        Number.isFinite(bwEstimate) ? (bwEstimate / 1024).toFixed(3) : 'Unknown'
      } Kb/s
      Estimated load time for current fragment: ${fragLoadedDelay.toFixed(3)} s
      Estimated load time for the next fragment: ${fragLevelNextLoadedDelay.toFixed(
        3
      )} s
      Time to underbuffer: ${bufferStarvationDelay.toFixed(3)} s`)
    hls.nextLoadLevel = nextLoadLevel
    this.bwEstimator.sample(requestDelay, stats.loaded)
    this.clearTimer()
    if (frag.loader) {
      this.fragCurrent = this.partCurrent = null
      frag.loader.abort()
    }
    hls.trigger(Events.FRAG_LOAD_EMERGENCY_ABORTED, { frag, part, stats })
  }
  onFragLoaded(event, { frag, part }) {
    if (frag.type === PlaylistLevelType.MAIN && Number.isFinite(frag.sn)) {
      const stats = part ? part.stats : frag.stats
      const duration = part ? part.duration : frag.duration
      this.clearTimer()
      this.lastLoadedFragLevel = frag.level
      this._nextAutoLevel = -1
      if (this.hls.config.abrMaxWithRealBitrate) {
        const level = this.hls.levels[frag.level]
        const loadedBytes =
          (level.loaded ? level.loaded.bytes : 0) + stats.loaded
        const loadedDuration =
          (level.loaded ? level.loaded.duration : 0) + duration
        level.loaded = { bytes: loadedBytes, duration: loadedDuration }
        level.realBitrate = Math.round((8 * loadedBytes) / loadedDuration)
      }
      if (frag.bitrateTest) {
        const fragBufferedData = {
          stats,
          frag,
          part,
          id: frag.type
        }
        this.onFragBuffered(Events.FRAG_BUFFERED, fragBufferedData)
        frag.bitrateTest = false
      }
    }
  }
  onFragBuffered(event, data) {
    const { frag, part } = data
    const stats = part ? part.stats : frag.stats
    if (stats.aborted) {
      return
    }
    if (frag.type !== PlaylistLevelType.MAIN || frag.sn === 'initSegment') {
      return
    }
    const processingMs = stats.parsing.end - stats.loading.start
    this.bwEstimator.sample(processingMs, stats.loaded)
    stats.bwEstimate = this.bwEstimator.getEstimate()
    if (frag.bitrateTest) {
      this.bitrateTestDelay = processingMs / 1e3
    } else {
      this.bitrateTestDelay = 0
    }
  }
  onError(event, data) {
    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
        this.clearTimer()
        break
      default:
        break
    }
  }
  clearTimer() {
    self.clearInterval(this.timer)
    this.timer = void 0
  }
  get nextAutoLevel() {
    const forcedAutoLevel = this._nextAutoLevel
    const bwEstimator = this.bwEstimator
    if (
      forcedAutoLevel !== -1 &&
      (!bwEstimator || !bwEstimator.canEstimate())
    ) {
      return forcedAutoLevel
    }
    let nextABRAutoLevel = this.getNextABRAutoLevel()
    if (forcedAutoLevel !== -1) {
      nextABRAutoLevel = Math.min(forcedAutoLevel, nextABRAutoLevel)
    }
    return nextABRAutoLevel
  }
  getNextABRAutoLevel() {
    const { fragCurrent, partCurrent, hls } = this
    const { maxAutoLevel, config, minAutoLevel, media } = hls
    const currentFragDuration = partCurrent
      ? partCurrent.duration
      : fragCurrent
      ? fragCurrent.duration
      : 0
    const pos = media ? media.currentTime : 0
    const playbackRate =
      media && media.playbackRate !== 0 ? Math.abs(media.playbackRate) : 1
    const avgbw = this.bwEstimator
      ? this.bwEstimator.getEstimate()
      : config.abrEwmaDefaultEstimate
    const bufferStarvationDelay =
      (BufferHelper.bufferInfo(media, pos, config.maxBufferHole).end - pos) /
      playbackRate
    let bestLevel = this.findBestLevel(
      avgbw,
      minAutoLevel,
      maxAutoLevel,
      bufferStarvationDelay,
      config.abrBandWidthFactor,
      config.abrBandWidthUpFactor
    )
    if (bestLevel >= 0) {
      return bestLevel
    }
    logger.trace(
      `${
        bufferStarvationDelay ? 'rebuffering expected' : 'buffer is empty'
      }, finding optimal quality level`
    )
    let maxStarvationDelay = currentFragDuration
      ? Math.min(currentFragDuration, config.maxStarvationDelay)
      : config.maxStarvationDelay
    let bwFactor = config.abrBandWidthFactor
    let bwUpFactor = config.abrBandWidthUpFactor
    if (!bufferStarvationDelay) {
      const bitrateTestDelay = this.bitrateTestDelay
      if (bitrateTestDelay) {
        const maxLoadingDelay = currentFragDuration
          ? Math.min(currentFragDuration, config.maxLoadingDelay)
          : config.maxLoadingDelay
        maxStarvationDelay = maxLoadingDelay - bitrateTestDelay
        logger.trace(
          `bitrate test took ${Math.round(
            1e3 * bitrateTestDelay
          )}ms, set first fragment max fetchDuration to ${Math.round(
            1e3 * maxStarvationDelay
          )} ms`
        )
        bwFactor = bwUpFactor = 1
      }
    }
    bestLevel = this.findBestLevel(
      avgbw,
      minAutoLevel,
      maxAutoLevel,
      bufferStarvationDelay + maxStarvationDelay,
      bwFactor,
      bwUpFactor
    )
    return Math.max(bestLevel, 0)
  }
  findBestLevel(
    currentBw,
    minAutoLevel,
    maxAutoLevel,
    maxFetchDuration,
    bwFactor,
    bwUpFactor
  ) {
    const { fragCurrent, partCurrent, lastLoadedFragLevel: currentLevel } = this
    const { levels } = this.hls
    const level = levels[currentLevel]
    const live = !!level?.details?.live
    const currentCodecSet = level?.codecSet
    const currentFragDuration = partCurrent
      ? partCurrent.duration
      : fragCurrent
      ? fragCurrent.duration
      : 0
    for (let i = maxAutoLevel; i >= minAutoLevel; i--) {
      const levelInfo = levels[i]
      if (
        !levelInfo ||
        (currentCodecSet && levelInfo.codecSet !== currentCodecSet)
      ) {
        continue
      }
      const levelDetails = levelInfo.details
      const avgDuration =
        (partCurrent
          ? levelDetails?.partTarget
          : levelDetails?.averagetargetduration) || currentFragDuration
      let adjustedbw
      if (i <= currentLevel) {
        adjustedbw = bwFactor * currentBw
      } else {
        adjustedbw = bwUpFactor * currentBw
      }
      const bitrate = levels[i].maxBitrate
      const fetchDuration = (bitrate * avgDuration) / adjustedbw
      logger.trace(
        `level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: ${i}/${Math.round(
          adjustedbw
        )}/${bitrate}/${avgDuration}/${maxFetchDuration}/${fetchDuration}`
      )
      if (
        adjustedbw > bitrate &&
        (!fetchDuration ||
          (live && !this.bitrateTestDelay) ||
          fetchDuration < maxFetchDuration)
      ) {
        return i
      }
    }
    return -1
  }
  set nextAutoLevel(nextLevel) {
    this._nextAutoLevel = nextLevel
  }
}
var abr_controller_default = AbrController

// src/controller/audio-stream-controller.ts
var TICK_INTERVAL2 = 100
var AudioStreamController = class extends base_stream_controller_default {
  constructor(hls, fragmentTracker) {
    super(hls, fragmentTracker, '[audio-stream-controller]')
    this.videoBuffer = null
    this.videoTrackCC = -1
    this.waitingVideoCC = -1
    this.audioSwitch = false
    this.trackId = -1
    this.waitingData = null
    this.mainDetails = null
    this._registerListeners()
  }
  onHandlerDestroying() {
    this._unregisterListeners()
    this.mainDetails = null
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.on(Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this)
    hls.on(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this)
    hls.on(Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this)
    hls.on(Events.ERROR, this.onError, this)
    hls.on(Events.BUFFER_RESET, this.onBufferReset, this)
    hls.on(Events.BUFFER_CREATED, this.onBufferCreated, this)
    hls.on(Events.BUFFER_FLUSHED, this.onBufferFlushed, this)
    hls.on(Events.INIT_PTS_FOUND, this.onInitPtsFound, this)
    hls.on(Events.FRAG_BUFFERED, this.onFragBuffered, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.LEVEL_LOADED, this.onLevelLoaded, this)
    hls.off(Events.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this)
    hls.off(Events.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this)
    hls.off(Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this)
    hls.off(Events.ERROR, this.onError, this)
    hls.off(Events.BUFFER_RESET, this.onBufferReset, this)
    hls.off(Events.BUFFER_CREATED, this.onBufferCreated, this)
    hls.off(Events.BUFFER_FLUSHED, this.onBufferFlushed, this)
    hls.off(Events.INIT_PTS_FOUND, this.onInitPtsFound, this)
    hls.off(Events.FRAG_BUFFERED, this.onFragBuffered, this)
  }
  onInitPtsFound(event, { frag, id, initPTS }) {
    if (id === 'main') {
      const cc = frag.cc
      this.initPTS[frag.cc] = initPTS
      this.log(`InitPTS for cc: ${cc} found from main: ${initPTS}`)
      this.videoTrackCC = cc
      if (this.state === State.WAITING_INIT_PTS) {
        this.tick()
      }
    }
  }
  startLoad(startPosition) {
    if (!this.levels) {
      this.startPosition = startPosition
      this.state = State.STOPPED
      return
    }
    const lastCurrentTime = this.lastCurrentTime
    this.stopLoad()
    this.setInterval(TICK_INTERVAL2)
    this.fragLoadError = 0
    if (lastCurrentTime > 0 && startPosition === -1) {
      this.log(
        `Override startPosition with lastCurrentTime @${lastCurrentTime.toFixed(
          3
        )}`
      )
      this.state = State.IDLE
    } else {
      this.loadedmetadata = false
      this.state = State.WAITING_TRACK
    }
    this.nextLoadPosition = this.startPosition = this.lastCurrentTime = startPosition
    this.tick()
  }
  doTick() {
    switch (this.state) {
      case State.IDLE:
        this.doTickIdle()
        break
      case State.WAITING_TRACK: {
        const { levels, trackId } = this
        const details = levels?.[trackId]?.details
        if (details) {
          if (this.waitForCdnTuneIn(details)) {
            break
          }
          this.state = State.WAITING_INIT_PTS
        }
        break
      }
      case State.FRAG_LOADING_WAITING_RETRY: {
        const now2 = performance.now()
        const retryDate = this.retryDate
        if (!retryDate || now2 >= retryDate || this.media?.seeking) {
          this.log('RetryDate reached, switch back to IDLE state')
          this.state = State.IDLE
        }
        break
      }
      case State.WAITING_INIT_PTS: {
        const waitingData = this.waitingData
        if (waitingData) {
          const { frag, part, cache, complete } = waitingData
          if (this.initPTS[frag.cc] !== void 0) {
            this.waitingData = null
            this.state = State.FRAG_LOADING
            const payload = cache.flush()
            const data = {
              frag,
              part,
              payload,
              networkDetails: null
            }
            this._handleFragmentLoadProgress(data)
            if (complete) {
              super._handleFragmentLoadComplete(data)
            }
          } else if (this.videoTrackCC !== this.waitingVideoCC) {
            logger.log(
              `Waiting fragment cc (${frag.cc}) cancelled because video is at cc ${this.videoTrackCC}`
            )
            this.clearWaitingFragment()
          } else {
            const bufferInfo = BufferHelper.bufferInfo(
              this.mediaBuffer,
              this.media.currentTime,
              this.config.maxBufferHole
            )
            const waitingFragmentAtPosition = fragmentWithinToleranceTest(
              bufferInfo.end,
              this.config.maxFragLookUpTolerance,
              frag
            )
            if (waitingFragmentAtPosition < 0) {
              logger.log(
                `Waiting fragment cc (${frag.cc}) @ ${frag.start} cancelled because another fragment at ${bufferInfo.end} is needed`
              )
              this.clearWaitingFragment()
            }
          }
        } else {
          this.state = State.IDLE
        }
      }
    }
    this.onTickEnd()
  }
  clearWaitingFragment() {
    const waitingData = this.waitingData
    if (waitingData) {
      this.fragmentTracker.removeFragment(waitingData.frag)
      this.waitingData = null
      this.waitingVideoCC = -1
      this.state = State.IDLE
    }
  }
  onTickEnd() {
    const { media } = this
    if (!media || !media.readyState) {
      return
    }
    const mediaBuffer = this.mediaBuffer ? this.mediaBuffer : media
    const buffered = mediaBuffer.buffered
    if (!this.loadedmetadata && buffered.length) {
      this.loadedmetadata = true
    }
    this.lastCurrentTime = media.currentTime
  }
  doTickIdle() {
    const { hls, levels, media, trackId } = this
    const config = hls.config
    if (!levels || !levels[trackId]) {
      return
    }
    if (!media && (this.startFragRequested || !config.startFragPrefetch)) {
      return
    }
    const pos = this.getLoadPosition()
    if (!Number.isFinite(pos)) {
      return
    }
    const levelInfo = levels[trackId]
    const trackDetails = levelInfo.details
    if (
      !trackDetails ||
      (trackDetails.live && this.levelLastLoaded !== trackId) ||
      this.waitForCdnTuneIn(trackDetails)
    ) {
      this.state = State.WAITING_TRACK
      return
    }
    let frag = trackDetails.initSegment
    let targetBufferTime = 0
    if (!frag || frag.data) {
      const mediaBuffer = this.mediaBuffer ? this.mediaBuffer : this.media
      const videoBuffer = this.videoBuffer ? this.videoBuffer : this.media
      const maxBufferHole =
        pos < config.maxBufferHole
          ? Math.max(MAX_START_GAP_JUMP, config.maxBufferHole)
          : config.maxBufferHole
      const bufferInfo = BufferHelper.bufferInfo(
        mediaBuffer,
        pos,
        maxBufferHole
      )
      const mainBufferInfo = BufferHelper.bufferInfo(
        videoBuffer,
        pos,
        maxBufferHole
      )
      const bufferLen = bufferInfo.len
      const maxConfigBuffer = Math.min(
        config.maxBufferLength,
        config.maxMaxBufferLength
      )
      const maxBufLen = Math.max(maxConfigBuffer, mainBufferInfo.len)
      const audioSwitch = this.audioSwitch
      if (bufferLen >= maxBufLen && !audioSwitch) {
        return
      }
      if (!audioSwitch && this._streamEnded(bufferInfo, trackDetails)) {
        hls.trigger(Events.BUFFER_EOS, { type: 'audio' })
        this.state = State.ENDED
        return
      }
      const fragments = trackDetails.fragments
      const start = fragments[0].start
      targetBufferTime = bufferInfo.end
      if (audioSwitch) {
        targetBufferTime = pos
        if (trackDetails.PTSKnown && pos < start) {
          if (bufferInfo.end > start || bufferInfo.nextStart) {
            this.log(
              'Alt audio track ahead of main track, seek to start of alt audio track'
            )
            media.currentTime = start + 0.05
          }
        }
      }
      frag = this.getNextFragment(targetBufferTime, trackDetails)
      if (!frag) {
        return
      }
    }
    if (frag.decryptdata?.keyFormat === 'identity' && !frag.decryptdata?.key) {
      this.loadKey(frag, trackDetails)
    } else {
      this.loadFragment(frag, trackDetails, targetBufferTime)
    }
  }
  onMediaDetaching() {
    this.videoBuffer = null
    super.onMediaDetaching()
  }
  onAudioTracksUpdated(event, { audioTracks }) {
    this.resetTransmuxer()
    this.levels = audioTracks.map(mediaPlaylist => new Level(mediaPlaylist))
  }
  onAudioTrackSwitching(event, data) {
    const altAudio = !!data.url
    this.trackId = data.id
    const { fragCurrent } = this
    if (fragCurrent?.loader) {
      fragCurrent.loader.abort()
    }
    this.fragCurrent = null
    this.clearWaitingFragment()
    if (!altAudio) {
      this.resetTransmuxer()
    } else {
      this.setInterval(TICK_INTERVAL2)
    }
    if (altAudio) {
      this.audioSwitch = true
      this.state = State.IDLE
    } else {
      this.state = State.STOPPED
    }
    this.tick()
  }
  onManifestLoading() {
    this.mainDetails = null
    this.fragmentTracker.removeAllFragments()
    this.startPosition = this.lastCurrentTime = 0
  }
  onLevelLoaded(event, data) {
    if (this.mainDetails === null) {
      const mainDetails = (this.mainDetails = data.details)
      const trackId = this.levelLastLoaded
      if (
        trackId !== null &&
        this.levels &&
        this.startPosition === -1 &&
        mainDetails.live
      ) {
        const track = this.levels[trackId]
        if (!track.details || !track.details.fragments[0]) {
          return
        }
        alignPDT(track.details, mainDetails)
        this.setStartPosition(track.details, track.details.fragments[0].start)
      }
    }
  }
  onAudioTrackLoaded(event, data) {
    const { levels } = this
    const { details: newDetails, id: trackId } = data
    if (!levels) {
      this.warn(`Audio tracks were reset while loading level ${trackId}`)
      return
    }
    this.log(
      `Track ${trackId} loaded [${newDetails.startSN},${newDetails.endSN}],duration:${newDetails.totalduration}`
    )
    const track = levels[trackId]
    let sliding = 0
    if (newDetails.live || track.details?.live) {
      if (!newDetails.fragments[0]) {
        newDetails.deltaUpdateFailed = true
      }
      if (newDetails.deltaUpdateFailed) {
        return
      }
      if (
        !track.details &&
        this.mainDetails?.hasProgramDateTime &&
        newDetails.hasProgramDateTime
      ) {
        alignPDT(newDetails, this.mainDetails)
        sliding = newDetails.fragments[0].start
      } else {
        sliding = this.alignPlaylists(newDetails, track.details)
      }
    }
    track.details = newDetails
    this.levelLastLoaded = trackId
    if (!this.startFragRequested && (this.mainDetails || !newDetails.live)) {
      this.setStartPosition(track.details, sliding)
    }
    if (
      this.state === State.WAITING_TRACK &&
      !this.waitForCdnTuneIn(newDetails)
    ) {
      this.state = State.IDLE
    }
    this.tick()
  }
  _handleFragmentLoadProgress(data) {
    const { frag, part, payload } = data
    const { config, trackId, levels } = this
    if (!levels) {
      this.warn(
        `Audio tracks were reset while fragment load was in progress. Fragment ${frag.sn} of level ${frag.level} will not be buffered`
      )
      return
    }
    const track = levels[trackId]
    console.assert(track, 'Audio track is defined on fragment load progress')
    const details = track.details
    console.assert(
      details,
      'Audio track details are defined on fragment load progress'
    )
    const audioCodec =
      config.defaultAudioCodec || track.audioCodec || 'mp4a.40.2'
    let transmuxer = this.transmuxer
    if (!transmuxer) {
      transmuxer = this.transmuxer = new transmuxer_interface_default(
        this.hls,
        PlaylistLevelType.AUDIO,
        this._handleTransmuxComplete.bind(this),
        this._handleTransmuxerFlush.bind(this)
      )
    }
    const initPTS = this.initPTS[frag.cc]
    const initSegmentData = details.initSegment?.data
    if (initPTS !== void 0) {
      const accurateTimeOffset = false
      const partIndex = part ? part.index : -1
      const partial = partIndex !== -1
      const chunkMeta = new ChunkMetadata(
        frag.level,
        frag.sn,
        frag.stats.chunkCount,
        payload.byteLength,
        partIndex,
        partial
      )
      transmuxer.push(
        payload,
        initSegmentData,
        audioCodec,
        '',
        frag,
        part,
        details.totalduration,
        accurateTimeOffset,
        chunkMeta,
        initPTS
      )
    } else {
      logger.log(
        `Unknown video PTS for cc ${frag.cc}, waiting for video PTS before demuxing audio frag ${frag.sn} of [${details.startSN} ,${details.endSN}],track ${trackId}`
      )
      const { cache } = (this.waitingData = this.waitingData || {
        frag,
        part,
        cache: new chunk_cache_default(),
        complete: false
      })
      cache.push(new Uint8Array(payload))
      this.waitingVideoCC = this.videoTrackCC
      this.state = State.WAITING_INIT_PTS
    }
  }
  _handleFragmentLoadComplete(fragLoadedData) {
    if (this.waitingData) {
      this.waitingData.complete = true
      return
    }
    super._handleFragmentLoadComplete(fragLoadedData)
  }
  onBufferReset() {
    this.mediaBuffer = this.videoBuffer = null
    this.loadedmetadata = false
  }
  onBufferCreated(event, data) {
    const audioTrack = data.tracks.audio
    if (audioTrack) {
      this.mediaBuffer = audioTrack.buffer
    }
    if (data.tracks.video) {
      this.videoBuffer = data.tracks.video.buffer
    }
  }
  onFragBuffered(event, data) {
    const { frag, part } = data
    if (frag.type !== PlaylistLevelType.AUDIO) {
      return
    }
    if (this.fragContextChanged(frag)) {
      this.warn(
        `Fragment ${frag.sn}${part ? ' p: ' + part.index : ''} of level ${
          frag.level
        } finished buffering, but was aborted. state: ${
          this.state
        }, audioSwitch: ${this.audioSwitch}`
      )
      return
    }
    if (frag.sn !== 'initSegment') {
      this.fragPrevious = frag
      if (this.audioSwitch) {
        this.audioSwitch = false
        this.hls.trigger(Events.AUDIO_TRACK_SWITCHED, { id: this.trackId })
      }
    }
    this.fragBufferedComplete(frag, part)
  }
  onError(event, data) {
    switch (data.details) {
      case ErrorDetails.FRAG_LOAD_ERROR:
      case ErrorDetails.FRAG_LOAD_TIMEOUT:
      case ErrorDetails.KEY_LOAD_ERROR:
      case ErrorDetails.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(PlaylistLevelType.AUDIO, data)
        break
      case ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
      case ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
        if (this.state !== State.ERROR && this.state !== State.STOPPED) {
          this.state = data.fatal ? State.ERROR : State.IDLE
          this.warn(
            `${data.details} while loading frag, switching to ${this.state} state`
          )
        }
        break
      case ErrorDetails.BUFFER_FULL_ERROR:
        if (
          data.parent === 'audio' &&
          (this.state === State.PARSING || this.state === State.PARSED)
        ) {
          const media = this.mediaBuffer
          const currentTime = this.media.currentTime
          const mediaBuffered =
            media &&
            BufferHelper.isBuffered(media, currentTime) &&
            BufferHelper.isBuffered(media, currentTime + 0.5)
          if (mediaBuffered) {
            this.reduceMaxBufferLength()
            this.state = State.IDLE
          } else {
            this.warn(
              'Buffer full error also media.currentTime is not buffered, flush audio buffer'
            )
            this.fragCurrent = null
            super.flushMainBuffer(0, Number.POSITIVE_INFINITY, 'audio')
          }
        }
        break
      default:
        break
    }
  }
  onBufferFlushed(event, { type }) {
    if (type === ElementaryStreamTypes.AUDIO) {
      const media = this.mediaBuffer ? this.mediaBuffer : this.media
      this.afterBufferFlushed(media, type, PlaylistLevelType.AUDIO)
    }
  }
  _handleTransmuxComplete(transmuxResult) {
    const id = 'audio'
    const { hls } = this
    const { remuxResult, chunkMeta } = transmuxResult
    const context = this.getCurrentContext(chunkMeta)
    if (!context) {
      this.warn(
        `The loading context changed while buffering fragment ${chunkMeta.sn} of level ${chunkMeta.level}. This chunk will not be buffered.`
      )
      this.resetLiveStartWhenNotLoaded(chunkMeta.level)
      return
    }
    const { frag, part } = context
    const { audio, text, id3, initSegment } = remuxResult
    if (this.fragContextChanged(frag)) {
      return
    }
    this.state = State.PARSING
    if (this.audioSwitch && audio) {
      this.completeAudioSwitch()
    }
    if (initSegment?.tracks) {
      this._bufferInitSegment(initSegment.tracks, frag, chunkMeta)
      hls.trigger(Events.FRAG_PARSING_INIT_SEGMENT, {
        frag,
        id,
        tracks: initSegment.tracks
      })
    }
    if (audio) {
      const { startPTS, endPTS, startDTS, endDTS } = audio
      if (part) {
        part.elementaryStreams[ElementaryStreamTypes.AUDIO] = {
          startPTS,
          endPTS,
          startDTS,
          endDTS
        }
      }
      frag.setElementaryStreamInfo(
        ElementaryStreamTypes.AUDIO,
        startPTS,
        endPTS,
        startDTS,
        endDTS
      )
      this.bufferFragmentData(audio, frag, part, chunkMeta)
    }
    if (id3?.samples?.length) {
      const emittedID3 = Object.assign(
        {
          frag,
          id
        },
        id3
      )
      hls.trigger(Events.FRAG_PARSING_METADATA, emittedID3)
    }
    if (text) {
      const emittedText = Object.assign(
        {
          frag,
          id
        },
        text
      )
      hls.trigger(Events.FRAG_PARSING_USERDATA, emittedText)
    }
  }
  _bufferInitSegment(tracks, frag, chunkMeta) {
    if (this.state !== State.PARSING) {
      return
    }
    if (tracks.video) {
      delete tracks.video
    }
    const track = tracks.audio
    if (!track) {
      return
    }
    track.levelCodec = track.codec
    track.id = 'audio'
    this.log(
      `Init audio buffer, container:${track.container}, codecs[parsed]=[${track.codec}]`
    )
    this.hls.trigger(Events.BUFFER_CODECS, tracks)
    const initSegment = track.initSegment
    if (initSegment?.byteLength) {
      const segment = {
        type: 'audio',
        frag,
        part: null,
        chunkMeta,
        parent: frag.type,
        data: initSegment
      }
      this.hls.trigger(Events.BUFFER_APPENDING, segment)
    }
    this.tick()
  }
  loadFragment(frag, trackDetails, targetBufferTime) {
    const fragState = this.fragmentTracker.getState(frag)
    this.fragCurrent = frag
    if (
      this.audioSwitch ||
      fragState === FragmentState.NOT_LOADED ||
      fragState === FragmentState.PARTIAL
    ) {
      if (frag.sn === 'initSegment') {
        this._loadInitSegment(frag)
      } else if (trackDetails.live && !Number.isFinite(this.initPTS[frag.cc])) {
        this.log(
          `Waiting for video PTS in continuity counter ${frag.cc} of live stream before loading audio fragment ${frag.sn} of level ${this.trackId}`
        )
        this.state = State.WAITING_INIT_PTS
      } else {
        this.startFragRequested = true
        super.loadFragment(frag, trackDetails, targetBufferTime)
      }
    }
  }
  completeAudioSwitch() {
    const { hls, media, trackId } = this
    if (media) {
      this.log('Switching audio track : flushing all audio')
      super.flushMainBuffer(0, Number.POSITIVE_INFINITY, 'audio')
    }
    this.audioSwitch = false
    hls.trigger(Events.AUDIO_TRACK_SWITCHED, { id: trackId })
  }
}
var audio_stream_controller_default = AudioStreamController

// src/controller/audio-track-controller.ts
var AudioTrackController = class extends base_playlist_controller_default {
  constructor(hls) {
    super(hls, '[audio-track-controller]')
    this.tracks = []
    this.groupId = null
    this.tracksInGroup = []
    this.trackId = -1
    this.trackName = ''
    this.selectDefaultTrack = true
    this.registerListeners()
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.on(Events.LEVEL_SWITCHING, this.onLevelSwitching, this)
    hls.on(Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this)
    hls.on(Events.ERROR, this.onError, this)
  }
  unregisterListeners() {
    const { hls } = this
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.off(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.off(Events.LEVEL_SWITCHING, this.onLevelSwitching, this)
    hls.off(Events.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this)
    hls.off(Events.ERROR, this.onError, this)
  }
  destroy() {
    this.unregisterListeners()
    this.tracks.length = 0
    this.tracksInGroup.length = 0
    super.destroy()
  }
  onManifestLoading() {
    this.tracks = []
    this.groupId = null
    this.tracksInGroup = []
    this.trackId = -1
    this.trackName = ''
    this.selectDefaultTrack = true
  }
  onManifestParsed(event, data) {
    this.tracks = data.audioTracks || []
  }
  onAudioTrackLoaded(event, data) {
    const { id, details } = data
    const currentTrack = this.tracksInGroup[id]
    if (!currentTrack) {
      this.warn(`Invalid audio track id ${id}`)
      return
    }
    const curDetails = currentTrack.details
    currentTrack.details = data.details
    this.log(`audioTrack ${id} loaded [${details.startSN}-${details.endSN}]`)
    if (id === this.trackId) {
      this.retryCount = 0
      this.playlistLoaded(id, data, curDetails)
    }
  }
  onLevelLoading(event, data) {
    this.switchLevel(data.level)
  }
  onLevelSwitching(event, data) {
    this.switchLevel(data.level)
  }
  switchLevel(levelIndex) {
    const levelInfo = this.hls.levels[levelIndex]
    if (!levelInfo?.audioGroupIds) {
      return
    }
    const audioGroupId = levelInfo.audioGroupIds[levelInfo.urlId]
    if (this.groupId !== audioGroupId) {
      this.groupId = audioGroupId
      const audioTracks = this.tracks.filter(
        track => !audioGroupId || track.groupId === audioGroupId
      )
      if (
        this.selectDefaultTrack &&
        !audioTracks.some(track => track.default)
      ) {
        this.selectDefaultTrack = false
      }
      this.tracksInGroup = audioTracks
      const audioTracksUpdated = { audioTracks }
      this.log(
        `Updating audio tracks, ${audioTracks.length} track(s) found in "${audioGroupId}" group-id`
      )
      this.hls.trigger(Events.AUDIO_TRACKS_UPDATED, audioTracksUpdated)
      this.selectInitialTrack()
    }
  }
  onError(event, data) {
    super.onError(event, data)
    if (data.fatal || !data.context) {
      return
    }
    if (
      data.context.type === PlaylistContextType.AUDIO_TRACK &&
      data.context.id === this.trackId &&
      data.context.groupId === this.groupId
    ) {
      this.retryLoadingOrFail(data)
    }
  }
  get audioTracks() {
    return this.tracksInGroup
  }
  get audioTrack() {
    return this.trackId
  }
  set audioTrack(newId) {
    this.selectDefaultTrack = false
    this.setAudioTrack(newId)
  }
  setAudioTrack(newId) {
    const tracks = this.tracksInGroup
    if (newId < 0 || newId >= tracks.length) {
      this.warn('Invalid id passed to audio-track controller')
      return
    }
    this.clearTimer()
    const lastTrack = tracks[this.trackId]
    this.log(`Now switching to audio-track index ${newId}`)
    const track = tracks[newId]
    const { id, groupId = '', name, type, url } = track
    this.trackId = newId
    this.trackName = name
    this.selectDefaultTrack = false
    this.hls.trigger(Events.AUDIO_TRACK_SWITCHING, {
      id,
      groupId,
      name,
      type,
      url
    })
    if (track.details && !track.details.live) {
      return
    }
    const hlsUrlParameters = this.switchParams(track.url, lastTrack?.details)
    this.loadPlaylist(hlsUrlParameters)
  }
  selectInitialTrack() {
    const audioTracks = this.tracksInGroup
    console.assert(
      audioTracks.length,
      'Initial audio track should be selected when tracks are known'
    )
    const currentAudioTrackName = this.trackName
    const trackId =
      this.findTrackId(currentAudioTrackName) || this.findTrackId()
    if (trackId !== -1) {
      this.setAudioTrack(trackId)
    } else {
      this.warn(`No track found for running audio group-ID: ${this.groupId}`)
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.MEDIA_ERROR,
        details: ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
        fatal: true
      })
    }
  }
  findTrackId(name) {
    const audioTracks = this.tracksInGroup
    for (let i = 0; i < audioTracks.length; i++) {
      const track = audioTracks[i]
      if (!this.selectDefaultTrack || track.default) {
        if (!name || name === track.name) {
          return track.id
        }
      }
    }
    return -1
  }
  loadPlaylist(hlsUrlParameters) {
    const audioTrack = this.tracksInGroup[this.trackId]
    if (this.shouldLoadTrack(audioTrack)) {
      const id = audioTrack.id
      const groupId = audioTrack.groupId
      let url = audioTrack.url
      if (hlsUrlParameters) {
        try {
          url = hlsUrlParameters.addDirectives(url)
        } catch (error) {
          this.warn(
            `Could not construct new URL with HLS Delivery Directives: ${error}`
          )
        }
      }
      this.log(`loading audio-track playlist for id: ${id}`)
      this.clearTimer()
      this.hls.trigger(Events.AUDIO_TRACK_LOADING, {
        url,
        id,
        groupId,
        deliveryDirectives: hlsUrlParameters || null
      })
    }
  }
}
var audio_track_controller_default = AudioTrackController

// src/controller/subtitle-stream-controller.ts
var TICK_INTERVAL3 = 500
var SubtitleStreamController = class extends base_stream_controller_default {
  constructor(hls, fragmentTracker) {
    super(hls, fragmentTracker, '[subtitle-stream-controller]')
    this.levels = []
    this.currentTrackId = -1
    this.config = hls.config
    this.fragCurrent = null
    this.fragPrevious = null
    this.media = null
    this.mediaBuffer = null
    this.state = State.STOPPED
    this.tracksBuffered = []
    this._registerListeners()
  }
  _registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.ERROR, this.onError, this)
    hls.on(Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this)
    hls.on(Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this)
    hls.on(Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this)
    hls.on(Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this)
  }
  _unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.ERROR, this.onError, this)
    hls.off(Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this)
    hls.off(Events.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this)
    hls.off(Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this)
    hls.off(Events.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this)
  }
  startLoad() {
    this.stopLoad()
    this.state = State.IDLE
    const currentTrack = this.levels[this.currentTrackId]
    if (currentTrack?.details) {
      this.setInterval(TICK_INTERVAL3)
      this.tick()
    }
  }
  onHandlerDestroyed() {
    this.state = State.STOPPED
    this._unregisterListeners()
    super.onHandlerDestroyed()
  }
  onSubtitleFragProcessed(event, data) {
    const { frag, success } = data
    this.fragPrevious = frag
    this.state = State.IDLE
    if (!success) {
      return
    }
    const buffered = this.tracksBuffered[this.currentTrackId]
    if (!buffered) {
      return
    }
    let timeRange
    const fragStart = frag.start
    for (let i = 0; i < buffered.length; i++) {
      if (fragStart >= buffered[i].start && fragStart <= buffered[i].end) {
        timeRange = buffered[i]
        break
      }
    }
    const fragEnd = frag.start + frag.duration
    if (timeRange) {
      timeRange.end = fragEnd
    } else {
      timeRange = {
        start: fragStart,
        end: fragEnd
      }
      buffered.push(timeRange)
    }
  }
  onMediaAttached(event, { media }) {
    this.media = media
    this.state = State.IDLE
  }
  onMediaDetaching() {
    if (!this.media) {
      return
    }
    this.fragmentTracker.removeAllFragments()
    this.fragPrevious = null
    this.currentTrackId = -1
    this.levels.forEach(level => {
      this.tracksBuffered[level.id] = []
    })
    this.media = null
    this.mediaBuffer = null
    this.state = State.STOPPED
  }
  onError(event, data) {
    const frag = data.frag
    if (!frag || frag.type !== PlaylistLevelType.SUBTITLE) {
      return
    }
    if (this.fragCurrent?.loader) {
      this.fragCurrent.loader.abort()
    }
    this.state = State.IDLE
  }
  onSubtitleTracksUpdated(event, { subtitleTracks }) {
    this.tracksBuffered = []
    this.levels = subtitleTracks.map(mediaPlaylist => new Level(mediaPlaylist))
    this.fragmentTracker.removeAllFragments()
    this.fragPrevious = null
    this.levels.forEach(level => {
      this.tracksBuffered[level.id] = []
    })
    this.mediaBuffer = null
  }
  onSubtitleTrackSwitch(event, data) {
    this.currentTrackId = data.id
    if (!this.levels.length || this.currentTrackId === -1) {
      this.clearInterval()
      return
    }
    const currentTrack = this.levels[this.currentTrackId]
    if (currentTrack?.details) {
      this.mediaBuffer = this.mediaBufferTimeRanges
      this.setInterval(TICK_INTERVAL3)
    } else {
      this.mediaBuffer = null
    }
  }
  onSubtitleTrackLoaded(event, data) {
    const { id, details } = data
    const { currentTrackId, levels } = this
    if (!levels.length || !details) {
      return
    }
    const currentTrack = levels[currentTrackId]
    if (id >= levels.length || id !== currentTrackId || !currentTrack) {
      return
    }
    this.mediaBuffer = this.mediaBufferTimeRanges
    if (details.live || currentTrack.details?.live) {
      if (details.deltaUpdateFailed) {
        return
      }
      this.alignPlaylists(details, currentTrack.details)
    }
    currentTrack.details = details
    this.levelLastLoaded = id
    this.setInterval(TICK_INTERVAL3)
  }
  _handleFragmentLoadComplete(fragLoadedData) {
    const { frag, payload } = fragLoadedData
    const decryptData = frag.decryptdata
    const hls = this.hls
    if (this.fragContextChanged(frag)) {
      return
    }
    if (
      payload &&
      payload.byteLength > 0 &&
      decryptData &&
      decryptData.key &&
      decryptData.iv &&
      decryptData.method === 'AES-128'
    ) {
      const startTime = performance.now()
      this.decrypter
        .webCryptoDecrypt(
          new Uint8Array(payload),
          decryptData.key.buffer,
          decryptData.iv.buffer
        )
        .then(decryptedData => {
          const endTime = performance.now()
          hls.trigger(Events.FRAG_DECRYPTED, {
            frag,
            payload: decryptedData,
            stats: {
              tstart: startTime,
              tdecrypt: endTime
            }
          })
        })
    }
  }
  doTick() {
    if (!this.media) {
      this.state = State.IDLE
      return
    }
    if (this.state === State.IDLE) {
      const { config, currentTrackId, fragmentTracker, media, levels } = this
      if (
        !levels.length ||
        !levels[currentTrackId] ||
        !levels[currentTrackId].details
      ) {
        return
      }
      const { maxBufferHole, maxFragLookUpTolerance } = config
      const maxConfigBuffer = Math.min(
        config.maxBufferLength,
        config.maxMaxBufferLength
      )
      const bufferedInfo = BufferHelper.bufferedInfo(
        this.mediaBufferTimeRanges,
        media.currentTime,
        maxBufferHole
      )
      const { end: targetBufferTime, len: bufferLen } = bufferedInfo
      if (bufferLen > maxConfigBuffer) {
        return
      }
      const trackDetails = levels[currentTrackId].details
      console.assert(
        trackDetails,
        'Subtitle track details are defined on idle subtitle stream controller tick'
      )
      const fragments = trackDetails.fragments
      const fragLen = fragments.length
      const end = fragments[fragLen - 1].start + fragments[fragLen - 1].duration
      let foundFrag
      const fragPrevious = this.fragPrevious
      if (targetBufferTime < end) {
        if (fragPrevious && trackDetails.hasProgramDateTime) {
          foundFrag = findFragmentByPDT(
            fragments,
            fragPrevious.endProgramDateTime,
            maxFragLookUpTolerance
          )
        }
        if (!foundFrag) {
          foundFrag = findFragmentByPTS(
            fragPrevious,
            fragments,
            targetBufferTime,
            maxFragLookUpTolerance
          )
        }
      } else {
        foundFrag = fragments[fragLen - 1]
      }
      if (foundFrag?.encrypted) {
        logger.log(`Loading key for ${foundFrag.sn}`)
        this.state = State.KEY_LOADING
        this.hls.trigger(Events.KEY_LOADING, { frag: foundFrag })
      } else if (
        foundFrag &&
        fragmentTracker.getState(foundFrag) === FragmentState.NOT_LOADED
      ) {
        this.loadFragment(foundFrag, trackDetails, targetBufferTime)
      }
    }
  }
  loadFragment(frag, levelDetails, targetBufferTime) {
    this.fragCurrent = frag
    super.loadFragment(frag, levelDetails, targetBufferTime)
  }
  stopLoad() {
    this.fragPrevious = null
    super.stopLoad()
  }
  get mediaBufferTimeRanges() {
    return this.tracksBuffered[this.currentTrackId] || []
  }
}

// src/controller/subtitle-track-controller.ts
var SubtitleTrackController = class extends base_playlist_controller_default {
  constructor(hls) {
    super(hls, '[subtitle-track-controller]')
    this.media = null
    this.tracks = []
    this.groupId = null
    this.tracksInGroup = []
    this.trackId = -1
    this.selectDefaultTrack = true
    this.queuedDefaultTrack = -1
    this.trackChangeListener = () => this.onTextTracksChanged()
    this.useTextTrackPolling = false
    this.subtitlePollingInterval = -1
    this.subtitleDisplay = true
    this.registerListeners()
  }
  destroy() {
    this.unregisterListeners()
    this.tracks.length = 0
    this.tracksInGroup.length = 0
    this.trackChangeListener = null
    super.destroy()
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.on(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.on(Events.LEVEL_SWITCHING, this.onLevelSwitching, this)
    hls.on(Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this)
    hls.on(Events.ERROR, this.onError, this)
  }
  unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.off(Events.LEVEL_LOADING, this.onLevelLoading, this)
    hls.off(Events.LEVEL_SWITCHING, this.onLevelSwitching, this)
    hls.off(Events.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this)
    hls.off(Events.ERROR, this.onError, this)
  }
  onMediaAttached(event, data) {
    this.media = data.media
    if (!this.media) {
      return
    }
    if (this.queuedDefaultTrack > -1) {
      this.subtitleTrack = this.queuedDefaultTrack
      this.queuedDefaultTrack = -1
    }
    this.useTextTrackPolling = !(
      this.media.textTracks && 'onchange' in this.media.textTracks
    )
    if (this.useTextTrackPolling) {
      self.clearInterval(this.subtitlePollingInterval)
      this.subtitlePollingInterval = self.setInterval(() => {
        this.trackChangeListener()
      }, 500)
    } else {
      this.media.textTracks.addEventListener('change', this.trackChangeListener)
    }
  }
  onMediaDetaching() {
    if (!this.media) {
      return
    }
    if (this.useTextTrackPolling) {
      self.clearInterval(this.subtitlePollingInterval)
    } else {
      this.media.textTracks.removeEventListener(
        'change',
        this.trackChangeListener
      )
    }
    if (this.trackId > -1) {
      this.queuedDefaultTrack = this.trackId
    }
    const textTracks = filterSubtitleTracks(this.media.textTracks)
    textTracks.forEach(track => {
      clearCurrentCues(track)
    })
    this.subtitleTrack = -1
    this.media = null
  }
  onManifestLoading() {
    this.tracks = []
    this.groupId = null
    this.tracksInGroup = []
    this.trackId = -1
    this.selectDefaultTrack = true
  }
  onManifestParsed(event, data) {
    this.tracks = data.subtitleTracks
  }
  onSubtitleTrackLoaded(event, data) {
    const { id, details } = data
    const { trackId } = this
    const currentTrack = this.tracksInGroup[trackId]
    if (!currentTrack) {
      this.warn(`Invalid subtitle track id ${id}`)
      return
    }
    const curDetails = currentTrack.details
    currentTrack.details = data.details
    this.log(
      `subtitle track ${id} loaded [${details.startSN}-${details.endSN}]`
    )
    if (id === this.trackId) {
      this.retryCount = 0
      this.playlistLoaded(id, data, curDetails)
    }
  }
  onLevelLoading(event, data) {
    this.switchLevel(data.level)
  }
  onLevelSwitching(event, data) {
    this.switchLevel(data.level)
  }
  switchLevel(levelIndex) {
    const levelInfo = this.hls.levels[levelIndex]
    if (!levelInfo?.textGroupIds) {
      return
    }
    const textGroupId = levelInfo.textGroupIds[levelInfo.urlId]
    if (this.groupId !== textGroupId) {
      const lastTrack = this.tracksInGroup
        ? this.tracksInGroup[this.trackId]
        : void 0
      const subtitleTracks = this.tracks.filter(
        track => !textGroupId || track.groupId === textGroupId
      )
      this.tracksInGroup = subtitleTracks
      const initialTrackId =
        this.findTrackId(lastTrack?.name) || this.findTrackId()
      this.groupId = textGroupId
      const subtitleTracksUpdated = {
        subtitleTracks
      }
      this.log(
        `Updating subtitle tracks, ${subtitleTracks.length} track(s) found in "${textGroupId}" group-id`
      )
      this.hls.trigger(Events.SUBTITLE_TRACKS_UPDATED, subtitleTracksUpdated)
      if (initialTrackId !== -1) {
        this.setSubtitleTrack(initialTrackId, lastTrack)
      }
    }
  }
  findTrackId(name) {
    const textTracks = this.tracksInGroup
    for (let i = 0; i < textTracks.length; i++) {
      const track = textTracks[i]
      if (!this.selectDefaultTrack || track.default) {
        if (!name || name === track.name) {
          return track.id
        }
      }
    }
    return -1
  }
  onError(event, data) {
    super.onError(event, data)
    if (data.fatal || !data.context) {
      return
    }
    if (
      data.context.type === PlaylistContextType.SUBTITLE_TRACK &&
      data.context.id === this.trackId &&
      data.context.groupId === this.groupId
    ) {
      this.retryLoadingOrFail(data)
    }
  }
  get subtitleTracks() {
    return this.tracksInGroup
  }
  get subtitleTrack() {
    return this.trackId
  }
  set subtitleTrack(newId) {
    this.selectDefaultTrack = false
    const lastTrack = this.tracksInGroup
      ? this.tracksInGroup[this.trackId]
      : void 0
    this.setSubtitleTrack(newId, lastTrack)
  }
  loadPlaylist(hlsUrlParameters) {
    const currentTrack = this.tracksInGroup[this.trackId]
    if (this.shouldLoadTrack(currentTrack)) {
      const id = currentTrack.id
      const groupId = currentTrack.groupId
      let url = currentTrack.url
      if (hlsUrlParameters) {
        try {
          url = hlsUrlParameters.addDirectives(url)
        } catch (error) {
          this.warn(
            `Could not construct new URL with HLS Delivery Directives: ${error}`
          )
        }
      }
      this.log(`Loading subtitle playlist for id ${id}`)
      this.hls.trigger(Events.SUBTITLE_TRACK_LOADING, {
        url,
        id,
        groupId,
        deliveryDirectives: hlsUrlParameters || null
      })
    }
  }
  toggleTrackModes(newId) {
    const { media, subtitleDisplay, trackId } = this
    if (!media) {
      return
    }
    const textTracks = filterSubtitleTracks(media.textTracks)
    const groupTracks = textTracks.filter(
      track => track.groupId === this.groupId
    )
    if (newId === -1) {
      ;[].slice.call(textTracks).forEach(track => {
        track.mode = 'disabled'
      })
    } else {
      const oldTrack = groupTracks[trackId]
      if (oldTrack) {
        oldTrack.mode = 'disabled'
      }
    }
    const nextTrack = groupTracks[newId]
    if (nextTrack) {
      nextTrack.mode = subtitleDisplay ? 'showing' : 'hidden'
    }
  }
  setSubtitleTrack(newId, lastTrack) {
    const tracks = this.tracksInGroup
    if (!this.media) {
      this.queuedDefaultTrack = newId
      return
    }
    if (this.trackId !== newId) {
      this.toggleTrackModes(newId)
    }
    if (
      (this.trackId === newId && (newId === -1 || tracks[newId]?.details)) ||
      newId < -1 ||
      newId >= tracks.length
    ) {
      return
    }
    this.clearTimer()
    const track = tracks[newId]
    this.log(`Switching to subtitle track ${newId}`)
    this.trackId = newId
    if (track) {
      const { id, groupId = '', name, type, url } = track
      this.hls.trigger(Events.SUBTITLE_TRACK_SWITCH, {
        id,
        groupId,
        name,
        type,
        url
      })
      const hlsUrlParameters = this.switchParams(track.url, lastTrack?.details)
      this.loadPlaylist(hlsUrlParameters)
    } else {
      this.hls.trigger(Events.SUBTITLE_TRACK_SWITCH, { id: newId })
    }
  }
  onTextTracksChanged() {
    if (!this.media || !this.hls.config.renderTextTracksNatively) {
      return
    }
    let trackId = -1
    const tracks = filterSubtitleTracks(this.media.textTracks)
    for (let id = 0; id < tracks.length; id++) {
      if (tracks[id].mode === 'hidden') {
        trackId = id
      } else if (tracks[id].mode === 'showing') {
        trackId = id
        break
      }
    }
    this.subtitleTrack = trackId
  }
}
function filterSubtitleTracks(textTrackList) {
  const tracks = []
  for (let i = 0; i < textTrackList.length; i++) {
    const track = textTrackList[i]
    if (track.kind === 'subtitles' && track.label) {
      tracks.push(textTrackList[i])
    }
  }
  return tracks
}
var subtitle_track_controller_default = SubtitleTrackController

// src/controller/buffer-operation-queue.ts
var BufferOperationQueue = class {
  constructor(sourceBufferReference) {
    this.queues = {
      video: [],
      audio: [],
      audiovideo: []
    }
    this.buffers = sourceBufferReference
  }
  append(operation, type) {
    const queue = this.queues[type]
    queue.push(operation)
    if (queue.length === 1 && this.buffers[type]) {
      this.executeNext(type)
    }
  }
  insertAbort(operation, type) {
    const queue = this.queues[type]
    queue.unshift(operation)
    this.executeNext(type)
  }
  appendBlocker(type) {
    let execute
    const promise = new Promise(resolve => {
      execute = resolve
    })
    const operation = {
      execute,
      onStart: () => {},
      onComplete: () => {},
      onError: () => {}
    }
    this.append(operation, type)
    return promise
  }
  executeNext(type) {
    const { buffers, queues } = this
    const sb = buffers[type]
    const queue = queues[type]
    if (queue.length) {
      const operation = queue[0]
      try {
        operation.execute()
      } catch (e) {
        logger.warn(
          '[buffer-operation-queue]: Unhandled exception executing the current operation'
        )
        operation.onError(e)
        if (!sb || !sb.updating) {
          queue.shift()
        }
      }
    }
  }
  shiftAndExecuteNext(type) {
    this.queues[type].shift()
    this.executeNext(type)
  }
  current(type) {
    return this.queues[type][0]
  }
}
var buffer_operation_queue_default = BufferOperationQueue

// src/controller/buffer-controller.ts
var MediaSource3 = getMediaSource()
var VIDEO_CODEC_PROFILE_REPACE = /([ha]vc.)(?:\.[^.,]+)+/
var BufferController = class {
  constructor(hls) {
    this.details = null
    this._objectUrl = null
    this.bufferCodecEventsExpected = 0
    this._bufferCodecEventsTotal = 0
    this.media = null
    this.mediaSource = null
    this.appendError = 0
    this.tracks = {}
    this.pendingTracks = {}
    this._onMediaSourceOpen = () => {
      const { hls, media, mediaSource } = this
      logger.log('[buffer-controller]: Media source opened')
      if (media) {
        this.updateMediaElementDuration()
        hls.trigger(Events.MEDIA_ATTACHED, { media })
      }
      if (mediaSource) {
        mediaSource.removeEventListener('sourceopen', this._onMediaSourceOpen)
      }
      this.checkPendingTracks()
    }
    this._onMediaSourceClose = () => {
      logger.log('[buffer-controller]: Media source closed')
    }
    this._onMediaSourceEnded = () => {
      logger.log('[buffer-controller]: Media source ended')
    }
    this.hls = hls
    this._initSourceBuffer()
    this.registerListeners()
  }
  hasSourceTypes() {
    return (
      this.getSourceBufferTypes().length > 0 ||
      Object.keys(this.pendingTracks).length > 0
    )
  }
  destroy() {
    this.unregisterListeners()
    this.details = null
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.on(Events.BUFFER_RESET, this.onBufferReset, this)
    hls.on(Events.BUFFER_APPENDING, this.onBufferAppending, this)
    hls.on(Events.BUFFER_CODECS, this.onBufferCodecs, this)
    hls.on(Events.BUFFER_EOS, this.onBufferEos, this)
    hls.on(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
    hls.on(Events.LEVEL_UPDATED, this.onLevelUpdated, this)
    hls.on(Events.FRAG_PARSED, this.onFragParsed, this)
    hls.on(Events.FRAG_CHANGED, this.onFragChanged, this)
  }
  unregisterListeners() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.off(Events.BUFFER_RESET, this.onBufferReset, this)
    hls.off(Events.BUFFER_APPENDING, this.onBufferAppending, this)
    hls.off(Events.BUFFER_CODECS, this.onBufferCodecs, this)
    hls.off(Events.BUFFER_EOS, this.onBufferEos, this)
    hls.off(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
    hls.off(Events.LEVEL_UPDATED, this.onLevelUpdated, this)
    hls.off(Events.FRAG_PARSED, this.onFragParsed, this)
    hls.off(Events.FRAG_CHANGED, this.onFragChanged, this)
  }
  _initSourceBuffer() {
    this.sourceBuffer = {}
    this.operationQueue = new buffer_operation_queue_default(this.sourceBuffer)
    this.listeners = {
      audio: [],
      video: [],
      audiovideo: []
    }
  }
  onManifestParsed(event, data) {
    let codecEvents = 2
    if ((data.audio && !data.video) || !data.altAudio) {
      codecEvents = 1
    }
    this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = codecEvents
    this.details = null
    logger.log(
      `${this.bufferCodecEventsExpected} bufferCodec event(s) expected`
    )
  }
  onMediaAttaching(event, data) {
    const media = (this.media = data.media)
    if (media && MediaSource3) {
      const ms = (this.mediaSource = new MediaSource3())
      ms.addEventListener('sourceopen', this._onMediaSourceOpen)
      ms.addEventListener('sourceended', this._onMediaSourceEnded)
      ms.addEventListener('sourceclose', this._onMediaSourceClose)
      media.src = self.URL.createObjectURL(ms)
      this._objectUrl = media.src
    }
  }
  onMediaDetaching() {
    const { media, mediaSource, _objectUrl } = this
    if (mediaSource) {
      logger.log('[buffer-controller]: media source detaching')
      if (mediaSource.readyState === 'open') {
        try {
          mediaSource.endOfStream()
        } catch (err) {
          logger.warn(
            `[buffer-controller]: onMediaDetaching: ${err.message} while calling endOfStream`
          )
        }
      }
      this.onBufferReset()
      mediaSource.removeEventListener('sourceopen', this._onMediaSourceOpen)
      mediaSource.removeEventListener('sourceended', this._onMediaSourceEnded)
      mediaSource.removeEventListener('sourceclose', this._onMediaSourceClose)
      if (media) {
        if (_objectUrl) {
          self.URL.revokeObjectURL(_objectUrl)
        }
        if (media.src === _objectUrl) {
          media.removeAttribute('src')
          media.load()
        } else {
          logger.warn(
            '[buffer-controller]: media.src was changed by a third party - skip cleanup'
          )
        }
      }
      this.mediaSource = null
      this.media = null
      this._objectUrl = null
      this.bufferCodecEventsExpected = this._bufferCodecEventsTotal
      this.pendingTracks = {}
      this.tracks = {}
    }
    this.hls.trigger(Events.MEDIA_DETACHED, void 0)
  }
  onBufferReset() {
    const sourceBuffer = this.sourceBuffer
    this.getSourceBufferTypes().forEach(type => {
      const sb = sourceBuffer[type]
      try {
        if (sb) {
          this.removeBufferListeners(type)
          if (this.mediaSource) {
            this.mediaSource.removeSourceBuffer(sb)
          }
          sourceBuffer[type] = void 0
        }
      } catch (err) {
        logger.warn(
          `[buffer-controller]: Failed to reset the ${type} buffer`,
          err
        )
      }
    })
    this._initSourceBuffer()
  }
  onBufferCodecs(event, data) {
    const sourceBufferCount = Object.keys(this.sourceBuffer).length
    Object.keys(data).forEach(trackName => {
      if (sourceBufferCount) {
        const track = this.tracks[trackName]
        if (track && typeof track.buffer.changeType === 'function') {
          const { codec, levelCodec, container } = data[trackName]
          const currentCodec = (track.levelCodec || track.codec).replace(
            VIDEO_CODEC_PROFILE_REPACE,
            '$1'
          )
          const nextCodec = (levelCodec || codec).replace(
            VIDEO_CODEC_PROFILE_REPACE,
            '$1'
          )
          if (currentCodec !== nextCodec) {
            const mimeType = `${container};codecs=${levelCodec || codec}`
            this.appendChangeType(trackName, mimeType)
          }
        }
      } else {
        this.pendingTracks[trackName] = data[trackName]
      }
    })
    if (sourceBufferCount) {
      return
    }
    this.bufferCodecEventsExpected = Math.max(
      this.bufferCodecEventsExpected - 1,
      0
    )
    if (this.mediaSource && this.mediaSource.readyState === 'open') {
      this.checkPendingTracks()
    }
  }
  appendChangeType(type, mimeType) {
    const { operationQueue } = this
    const operation = {
      execute: () => {
        const sb = this.sourceBuffer[type]
        if (sb) {
          logger.log(
            `[buffer-controller]: changing ${type} sourceBuffer type to ${mimeType}`
          )
          sb.changeType(mimeType)
        }
        operationQueue.shiftAndExecuteNext(type)
      },
      onStart: () => {},
      onComplete: () => {},
      onError: e => {
        logger.warn(
          `[buffer-controller]: Failed to change ${type} SourceBuffer type`,
          e
        )
      }
    }
    operationQueue.append(operation, type)
  }
  onBufferAppending(event, eventData) {
    const { hls, operationQueue, tracks } = this
    const { data, type, frag, part, chunkMeta } = eventData
    const chunkStats = chunkMeta.buffering[type]
    const bufferAppendingStart = self.performance.now()
    chunkStats.start = bufferAppendingStart
    const fragBuffering = frag.stats.buffering
    const partBuffering = part ? part.stats.buffering : null
    if (fragBuffering.start === 0) {
      fragBuffering.start = bufferAppendingStart
    }
    if (partBuffering && partBuffering.start === 0) {
      partBuffering.start = bufferAppendingStart
    }
    const audioTrack = tracks.audio
    const checkTimestampOffset =
      type === 'audio' &&
      chunkMeta.id === 1 &&
      audioTrack?.container === 'audio/mpeg'
    const operation = {
      execute: () => {
        chunkStats.executeStart = self.performance.now()
        if (checkTimestampOffset) {
          const sb = this.sourceBuffer[type]
          if (sb) {
            const delta = frag.start - sb.timestampOffset
            if (Math.abs(delta) >= 0.1) {
              logger.log(
                `[buffer-controller]: Updating audio SourceBuffer timestampOffset to ${frag.start} (delta: ${delta}) sn: ${frag.sn})`
              )
              sb.timestampOffset = frag.start
            }
          }
        }
        this.appendExecutor(data, type)
      },
      onStart: () => {},
      onComplete: () => {
        const end = self.performance.now()
        chunkStats.executeEnd = chunkStats.end = end
        if (fragBuffering.first === 0) {
          fragBuffering.first = end
        }
        if (partBuffering && partBuffering.first === 0) {
          partBuffering.first = end
        }
        const { sourceBuffer } = this
        const timeRanges = {}
        for (const type2 in sourceBuffer) {
          timeRanges[type2] = BufferHelper.getBuffered(sourceBuffer[type2])
        }
        this.appendError = 0
        this.hls.trigger(Events.BUFFER_APPENDED, {
          type,
          frag,
          part,
          chunkMeta,
          parent: frag.type,
          timeRanges
        })
      },
      onError: err => {
        logger.error(
          `[buffer-controller]: Error encountered while trying to append to the ${type} SourceBuffer`,
          err
        )
        const event2 = {
          type: ErrorTypes.MEDIA_ERROR,
          parent: frag.type,
          details: ErrorDetails.BUFFER_APPEND_ERROR,
          err,
          fatal: false
        }
        if (err.code === DOMException.QUOTA_EXCEEDED_ERR) {
          event2.details = ErrorDetails.BUFFER_FULL_ERROR
        } else {
          this.appendError++
          event2.details = ErrorDetails.BUFFER_APPEND_ERROR
          if (this.appendError > hls.config.appendErrorMaxRetry) {
            logger.error(
              `[buffer-controller]: Failed ${hls.config.appendErrorMaxRetry} times to append segment in sourceBuffer`
            )
            event2.fatal = true
          }
        }
        hls.trigger(Events.ERROR, event2)
      }
    }
    operationQueue.append(operation, type)
  }
  onBufferFlushing(event, data) {
    const { operationQueue } = this
    const flushOperation = type => ({
      execute: this.removeExecutor.bind(
        this,
        type,
        data.startOffset,
        data.endOffset
      ),
      onStart: () => {},
      onComplete: () => {
        this.hls.trigger(Events.BUFFER_FLUSHED, { type })
      },
      onError: e => {
        logger.warn(
          `[buffer-controller]: Failed to remove from ${type} SourceBuffer`,
          e
        )
      }
    })
    if (data.type) {
      operationQueue.append(flushOperation(data.type), data.type)
    } else {
      operationQueue.append(flushOperation('audio'), 'audio')
      operationQueue.append(flushOperation('video'), 'video')
    }
  }
  onFragParsed(event, data) {
    const { frag, part } = data
    const buffersAppendedTo = []
    const elementaryStreams = part
      ? part.elementaryStreams
      : frag.elementaryStreams
    if (elementaryStreams[ElementaryStreamTypes.AUDIOVIDEO]) {
      buffersAppendedTo.push('audiovideo')
    } else {
      if (elementaryStreams[ElementaryStreamTypes.AUDIO]) {
        buffersAppendedTo.push('audio')
      }
      if (elementaryStreams[ElementaryStreamTypes.VIDEO]) {
        buffersAppendedTo.push('video')
      }
    }
    const onUnblocked = () => {
      const now2 = self.performance.now()
      frag.stats.buffering.end = now2
      if (part) {
        part.stats.buffering.end = now2
      }
      const stats = part ? part.stats : frag.stats
      this.hls.trigger(Events.FRAG_BUFFERED, {
        frag,
        part,
        stats,
        id: frag.type
      })
    }
    if (buffersAppendedTo.length === 0) {
      logger.warn(
        `Fragments must have at least one ElementaryStreamType set. type: ${frag.type} level: ${frag.level} sn: ${frag.sn}`
      )
    }
    this.blockBuffers(onUnblocked, buffersAppendedTo)
  }
  onFragChanged(event, data) {
    this.flushBackBuffer()
  }
  onBufferEos(event, data) {
    const ended = this.getSourceBufferTypes().reduce((acc, type) => {
      const sb = this.sourceBuffer[type]
      if (!data.type || data.type === type) {
        if (sb && !sb.ended) {
          sb.ended = true
          logger.log(`[buffer-controller]: ${type} sourceBuffer now EOS`)
        }
      }
      return acc && !!(!sb || sb.ended)
    }, true)
    if (ended) {
      this.blockBuffers(() => {
        const { mediaSource } = this
        if (!mediaSource || mediaSource.readyState !== 'open') {
          return
        }
        mediaSource.endOfStream()
      })
    }
  }
  onLevelUpdated(event, { details }) {
    if (!details.fragments.length) {
      return
    }
    this.details = details
    if (this.getSourceBufferTypes().length) {
      this.blockBuffers(this.updateMediaElementDuration.bind(this))
    } else {
      this.updateMediaElementDuration()
    }
  }
  flushBackBuffer() {
    const { hls, details, media, sourceBuffer } = this
    if (!media || details === null) {
      return
    }
    const sourceBufferTypes = this.getSourceBufferTypes()
    if (!sourceBufferTypes.length) {
      return
    }
    const backBufferLength =
      details.live && hls.config.liveBackBufferLength !== null
        ? hls.config.liveBackBufferLength
        : hls.config.backBufferLength
    if (!Number.isFinite(backBufferLength) || backBufferLength < 0) {
      return
    }
    const currentTime = media.currentTime
    const targetDuration = details.levelTargetDuration
    const maxBackBufferLength = Math.max(backBufferLength, targetDuration)
    const targetBackBufferPosition =
      Math.floor(currentTime / targetDuration) * targetDuration -
      maxBackBufferLength
    sourceBufferTypes.forEach(type => {
      const sb = sourceBuffer[type]
      if (sb) {
        const buffered = BufferHelper.getBuffered(sb)
        if (
          buffered.length > 0 &&
          targetBackBufferPosition > buffered.start(0)
        ) {
          hls.trigger(Events.BACK_BUFFER_REACHED, {
            bufferEnd: targetBackBufferPosition
          })
          if (details.live) {
            hls.trigger(Events.LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: targetBackBufferPosition
            })
          }
          hls.trigger(Events.BUFFER_FLUSHING, {
            startOffset: 0,
            endOffset: targetBackBufferPosition,
            type
          })
        }
      }
    })
  }
  updateMediaElementDuration() {
    if (
      !this.details ||
      !this.media ||
      !this.mediaSource ||
      this.mediaSource.readyState !== 'open'
    ) {
      return
    }
    const { details, hls, media, mediaSource } = this
    const levelDuration = details.fragments[0].start + details.totalduration
    const mediaDuration = media.duration
    const msDuration = Number.isFinite(mediaSource.duration)
      ? mediaSource.duration
      : 0
    if (details.live && hls.config.liveDurationInfinity) {
      logger.log(
        '[buffer-controller]: Media Source duration is set to Infinity'
      )
      mediaSource.duration = Infinity
      this.updateSeekableRange(details)
    } else if (
      (levelDuration > msDuration && levelDuration > mediaDuration) ||
      !Number.isFinite(mediaDuration)
    ) {
      logger.log(
        `[buffer-controller]: Updating Media Source duration to ${levelDuration.toFixed(
          3
        )}`
      )
      mediaSource.duration = levelDuration
    }
  }
  updateSeekableRange(levelDetails) {
    const mediaSource = this.mediaSource
    const fragments = levelDetails.fragments
    const len = fragments.length
    if (len && levelDetails.live && mediaSource?.setLiveSeekableRange) {
      const start = Math.max(0, fragments[0].start)
      const end = Math.max(start, start + levelDetails.totalduration)
      mediaSource.setLiveSeekableRange(start, end)
    }
  }
  checkPendingTracks() {
    const { bufferCodecEventsExpected, operationQueue, pendingTracks } = this
    const pendingTracksCount = Object.keys(pendingTracks).length
    if (
      (pendingTracksCount && !bufferCodecEventsExpected) ||
      pendingTracksCount === 2
    ) {
      this.createSourceBuffers(pendingTracks)
      this.pendingTracks = {}
      const buffers = Object.keys(this.sourceBuffer)
      if (buffers.length === 0) {
        this.hls.trigger(Events.ERROR, {
          type: ErrorTypes.MEDIA_ERROR,
          details: ErrorDetails.BUFFER_INCOMPATIBLE_CODECS_ERROR,
          fatal: true,
          reason: 'could not create source buffer for media codec(s)'
        })
        return
      }
      buffers.forEach(type => {
        operationQueue.executeNext(type)
      })
    }
  }
  createSourceBuffers(tracks) {
    const { sourceBuffer, mediaSource } = this
    if (!mediaSource) {
      throw Error('createSourceBuffers called when mediaSource was null')
    }
    let tracksCreated = 0
    for (const trackName in tracks) {
      if (!sourceBuffer[trackName]) {
        const track = tracks[trackName]
        if (!track) {
          throw Error(
            `source buffer exists for track ${trackName}, however track does not`
          )
        }
        const codec = track.levelCodec || track.codec
        const mimeType = `${track.container};codecs=${codec}`
        logger.log(`[buffer-controller]: creating sourceBuffer(${mimeType})`)
        try {
          const sb = (sourceBuffer[trackName] = mediaSource.addSourceBuffer(
            mimeType
          ))
          const sbName = trackName
          this.addBufferListener(sbName, 'updatestart', this._onSBUpdateStart)
          this.addBufferListener(sbName, 'updateend', this._onSBUpdateEnd)
          this.addBufferListener(sbName, 'error', this._onSBUpdateError)
          this.tracks[trackName] = {
            buffer: sb,
            codec,
            container: track.container,
            levelCodec: track.levelCodec,
            id: track.id
          }
          tracksCreated++
        } catch (err) {
          logger.error(
            `[buffer-controller]: error while trying to add sourceBuffer: ${err.message}`
          )
          this.hls.trigger(Events.ERROR, {
            type: ErrorTypes.MEDIA_ERROR,
            details: ErrorDetails.BUFFER_ADD_CODEC_ERROR,
            fatal: false,
            error: err,
            mimeType
          })
        }
      }
    }
    if (tracksCreated) {
      this.hls.trigger(Events.BUFFER_CREATED, { tracks: this.tracks })
    }
  }
  _onSBUpdateStart(type) {
    const { operationQueue } = this
    const operation = operationQueue.current(type)
    operation.onStart()
  }
  _onSBUpdateEnd(type) {
    const { operationQueue } = this
    const operation = operationQueue.current(type)
    operation.onComplete()
    operationQueue.shiftAndExecuteNext(type)
  }
  _onSBUpdateError(type, event) {
    logger.error(`[buffer-controller]: ${type} SourceBuffer error`, event)
    this.hls.trigger(Events.ERROR, {
      type: ErrorTypes.MEDIA_ERROR,
      details: ErrorDetails.BUFFER_APPENDING_ERROR,
      fatal: false
    })
    const operation = this.operationQueue.current(type)
    if (operation) {
      operation.onError(event)
    }
  }
  removeExecutor(type, startOffset, endOffset) {
    const { media, mediaSource, operationQueue, sourceBuffer } = this
    const sb = sourceBuffer[type]
    if (!media || !mediaSource || !sb) {
      logger.warn(
        `[buffer-controller]: Attempting to remove from the ${type} SourceBuffer, but it does not exist`
      )
      operationQueue.shiftAndExecuteNext(type)
      return
    }
    const mediaDuration = Number.isFinite(media.duration)
      ? media.duration
      : Infinity
    const msDuration = Number.isFinite(mediaSource.duration)
      ? mediaSource.duration
      : Infinity
    const removeStart = Math.max(0, startOffset)
    const removeEnd = Math.min(endOffset, mediaDuration, msDuration)
    if (removeEnd > removeStart) {
      logger.log(
        `[buffer-controller]: Removing [${removeStart},${removeEnd}] from the ${type} SourceBuffer`
      )
      console.assert(!sb.updating, `${type} sourceBuffer must not be updating`)
      sb.remove(removeStart, removeEnd)
    } else {
      operationQueue.shiftAndExecuteNext(type)
    }
  }
  appendExecutor(data, type) {
    const { operationQueue, sourceBuffer } = this
    const sb = sourceBuffer[type]
    if (!sb) {
      logger.warn(
        `[buffer-controller]: Attempting to append to the ${type} SourceBuffer, but it does not exist`
      )
      operationQueue.shiftAndExecuteNext(type)
      return
    }
    sb.ended = false
    console.assert(!sb.updating, `${type} sourceBuffer must not be updating`)
    sb.appendBuffer(data)
  }
  blockBuffers(onUnblocked, buffers = this.getSourceBufferTypes()) {
    if (!buffers.length) {
      logger.log(
        '[buffer-controller]: Blocking operation requested, but no SourceBuffers exist'
      )
      Promise.resolve(onUnblocked)
      return
    }
    const { operationQueue } = this
    const blockingOperations = buffers.map(type =>
      operationQueue.appendBlocker(type)
    )
    Promise.all(blockingOperations).then(() => {
      onUnblocked()
      buffers.forEach(type => {
        const sb = this.sourceBuffer[type]
        if (!sb || !sb.updating) {
          operationQueue.shiftAndExecuteNext(type)
        }
      })
    })
  }
  getSourceBufferTypes() {
    return Object.keys(this.sourceBuffer)
  }
  addBufferListener(type, event, fn) {
    const buffer = this.sourceBuffer[type]
    if (!buffer) {
      return
    }
    const listener = fn.bind(this, type)
    this.listeners[type].push({ event, listener })
    buffer.addEventListener(event, listener)
  }
  removeBufferListeners(type) {
    const buffer = this.sourceBuffer[type]
    if (!buffer) {
      return
    }
    this.listeners[type].forEach(l => {
      buffer.removeEventListener(l.event, l.listener)
    })
  }
}
var buffer_controller_default = BufferController

// src/utils/cea-608-parser.ts
var specialCea608CharsCodes = {
  42: 225,
  92: 233,
  94: 237,
  95: 243,
  96: 250,
  123: 231,
  124: 247,
  125: 209,
  126: 241,
  127: 9608,
  128: 174,
  129: 176,
  130: 189,
  131: 191,
  132: 8482,
  133: 162,
  134: 163,
  135: 9834,
  136: 224,
  137: 32,
  138: 232,
  139: 226,
  140: 234,
  141: 238,
  142: 244,
  143: 251,
  144: 193,
  145: 201,
  146: 211,
  147: 218,
  148: 220,
  149: 252,
  150: 8216,
  151: 161,
  152: 42,
  153: 8217,
  154: 9473,
  155: 169,
  156: 8480,
  157: 8226,
  158: 8220,
  159: 8221,
  160: 192,
  161: 194,
  162: 199,
  163: 200,
  164: 202,
  165: 203,
  166: 235,
  167: 206,
  168: 207,
  169: 239,
  170: 212,
  171: 217,
  172: 249,
  173: 219,
  174: 171,
  175: 187,
  176: 195,
  177: 227,
  178: 205,
  179: 204,
  180: 236,
  181: 210,
  182: 242,
  183: 213,
  184: 245,
  185: 123,
  186: 125,
  187: 92,
  188: 94,
  189: 95,
  190: 124,
  191: 8764,
  192: 196,
  193: 228,
  194: 214,
  195: 246,
  196: 223,
  197: 165,
  198: 164,
  199: 9475,
  200: 197,
  201: 229,
  202: 216,
  203: 248,
  204: 9487,
  205: 9491,
  206: 9495,
  207: 9499
}
var getCharForByte = function (byte) {
  let charCode = byte
  if (specialCea608CharsCodes.hasOwnProperty(byte)) {
    charCode = specialCea608CharsCodes[byte]
  }
  return String.fromCharCode(charCode)
}
var NR_ROWS = 15
var NR_COLS = 100
var rowsLowCh1 = {
  17: 1,
  18: 3,
  21: 5,
  22: 7,
  23: 9,
  16: 11,
  19: 12,
  20: 14
}
var rowsHighCh1 = {
  17: 2,
  18: 4,
  21: 6,
  22: 8,
  23: 10,
  19: 13,
  20: 15
}
var rowsLowCh2 = {
  25: 1,
  26: 3,
  29: 5,
  30: 7,
  31: 9,
  24: 11,
  27: 12,
  28: 14
}
var rowsHighCh2 = {
  25: 2,
  26: 4,
  29: 6,
  30: 8,
  31: 10,
  27: 13,
  28: 15
}
var backgroundColors = [
  'white',
  'green',
  'blue',
  'cyan',
  'red',
  'yellow',
  'magenta',
  'black',
  'transparent'
]
var VerboseLevel
;(function (VerboseLevel2) {
  VerboseLevel2[(VerboseLevel2['ERROR'] = 0)] = 'ERROR'
  VerboseLevel2[(VerboseLevel2['TEXT'] = 1)] = 'TEXT'
  VerboseLevel2[(VerboseLevel2['WARNING'] = 2)] = 'WARNING'
  VerboseLevel2[(VerboseLevel2['INFO'] = 2)] = 'INFO'
  VerboseLevel2[(VerboseLevel2['DEBUG'] = 3)] = 'DEBUG'
  VerboseLevel2[(VerboseLevel2['DATA'] = 3)] = 'DATA'
})(VerboseLevel || (VerboseLevel = {}))
var CaptionsLogger = class {
  constructor() {
    this.time = null
    this.verboseLevel = 0
  }
  log(severity, msg) {
    if (this.verboseLevel >= severity) {
      logger.log(`${this.time} [${severity}] ${msg}`)
    }
  }
}
var numArrayToHexArray = function (numArray) {
  const hexArray = []
  for (let j = 0; j < numArray.length; j++) {
    hexArray.push(numArray[j].toString(16))
  }
  return hexArray
}
var PenState = class {
  constructor(foreground, underline, italics, background, flash) {
    this.foreground = foreground || 'white'
    this.underline = underline || false
    this.italics = italics || false
    this.background = background || 'black'
    this.flash = flash || false
  }
  reset() {
    this.foreground = 'white'
    this.underline = false
    this.italics = false
    this.background = 'black'
    this.flash = false
  }
  setStyles(styles) {
    const attribs = [
      'foreground',
      'underline',
      'italics',
      'background',
      'flash'
    ]
    for (let i = 0; i < attribs.length; i++) {
      const style = attribs[i]
      if (styles.hasOwnProperty(style)) {
        this[style] = styles[style]
      }
    }
  }
  isDefault() {
    return (
      this.foreground === 'white' &&
      !this.underline &&
      !this.italics &&
      this.background === 'black' &&
      !this.flash
    )
  }
  equals(other) {
    return (
      this.foreground === other.foreground &&
      this.underline === other.underline &&
      this.italics === other.italics &&
      this.background === other.background &&
      this.flash === other.flash
    )
  }
  copy(newPenState) {
    this.foreground = newPenState.foreground
    this.underline = newPenState.underline
    this.italics = newPenState.italics
    this.background = newPenState.background
    this.flash = newPenState.flash
  }
  toString() {
    return (
      'color=' +
      this.foreground +
      ', underline=' +
      this.underline +
      ', italics=' +
      this.italics +
      ', background=' +
      this.background +
      ', flash=' +
      this.flash
    )
  }
}
var StyledUnicodeChar = class {
  constructor(uchar, foreground, underline, italics, background, flash) {
    this.uchar = uchar || ' '
    this.penState = new PenState(
      foreground,
      underline,
      italics,
      background,
      flash
    )
  }
  reset() {
    this.uchar = ' '
    this.penState.reset()
  }
  setChar(uchar, newPenState) {
    this.uchar = uchar
    this.penState.copy(newPenState)
  }
  setPenState(newPenState) {
    this.penState.copy(newPenState)
  }
  equals(other) {
    return this.uchar === other.uchar && this.penState.equals(other.penState)
  }
  copy(newChar) {
    this.uchar = newChar.uchar
    this.penState.copy(newChar.penState)
  }
  isEmpty() {
    return this.uchar === ' ' && this.penState.isDefault()
  }
}
var Row = class {
  constructor(logger2) {
    this.chars = []
    for (let i = 0; i < NR_COLS; i++) {
      this.chars.push(new StyledUnicodeChar())
    }
    this.logger = logger2
    this.pos = 0
    this.currPenState = new PenState()
  }
  equals(other) {
    let equal = true
    for (let i = 0; i < NR_COLS; i++) {
      if (!this.chars[i].equals(other.chars[i])) {
        equal = false
        break
      }
    }
    return equal
  }
  copy(other) {
    for (let i = 0; i < NR_COLS; i++) {
      this.chars[i].copy(other.chars[i])
    }
  }
  isEmpty() {
    let empty = true
    for (let i = 0; i < NR_COLS; i++) {
      if (!this.chars[i].isEmpty()) {
        empty = false
        break
      }
    }
    return empty
  }
  setCursor(absPos) {
    if (this.pos !== absPos) {
      this.pos = absPos
    }
    if (this.pos < 0) {
      this.logger.log(3, 'Negative cursor position ' + this.pos)
      this.pos = 0
    } else if (this.pos > NR_COLS) {
      this.logger.log(3, 'Too large cursor position ' + this.pos)
      this.pos = NR_COLS
    }
  }
  moveCursor(relPos) {
    const newPos = this.pos + relPos
    if (relPos > 1) {
      for (let i = this.pos + 1; i < newPos + 1; i++) {
        this.chars[i].setPenState(this.currPenState)
      }
    }
    this.setCursor(newPos)
  }
  backSpace() {
    this.moveCursor(-1)
    this.chars[this.pos].setChar(' ', this.currPenState)
  }
  insertChar(byte) {
    if (byte >= 144) {
      this.backSpace()
    }
    const char = getCharForByte(byte)
    if (this.pos >= NR_COLS) {
      this.logger.log(
        0,
        'Cannot insert ' +
          byte.toString(16) +
          ' (' +
          char +
          ') at position ' +
          this.pos +
          '. Skipping it!'
      )
      return
    }
    this.chars[this.pos].setChar(char, this.currPenState)
    this.moveCursor(1)
  }
  clearFromPos(startPos) {
    let i
    for (i = startPos; i < NR_COLS; i++) {
      this.chars[i].reset()
    }
  }
  clear() {
    this.clearFromPos(0)
    this.pos = 0
    this.currPenState.reset()
  }
  clearToEndOfRow() {
    this.clearFromPos(this.pos)
  }
  getTextString() {
    const chars = []
    let empty = true
    for (let i = 0; i < NR_COLS; i++) {
      const char = this.chars[i].uchar
      if (char !== ' ') {
        empty = false
      }
      chars.push(char)
    }
    if (empty) {
      return ''
    } else {
      return chars.join('')
    }
  }
  setPenStyles(styles) {
    this.currPenState.setStyles(styles)
    const currChar = this.chars[this.pos]
    currChar.setPenState(this.currPenState)
  }
}
var CaptionScreen = class {
  constructor(logger2) {
    this.rows = []
    for (let i = 0; i < NR_ROWS; i++) {
      this.rows.push(new Row(logger2))
    }
    this.logger = logger2
    this.currRow = NR_ROWS - 1
    this.nrRollUpRows = null
    this.lastOutputScreen = null
    this.reset()
  }
  reset() {
    for (let i = 0; i < NR_ROWS; i++) {
      this.rows[i].clear()
    }
    this.currRow = NR_ROWS - 1
  }
  equals(other) {
    let equal = true
    for (let i = 0; i < NR_ROWS; i++) {
      if (!this.rows[i].equals(other.rows[i])) {
        equal = false
        break
      }
    }
    return equal
  }
  copy(other) {
    for (let i = 0; i < NR_ROWS; i++) {
      this.rows[i].copy(other.rows[i])
    }
  }
  isEmpty() {
    let empty = true
    for (let i = 0; i < NR_ROWS; i++) {
      if (!this.rows[i].isEmpty()) {
        empty = false
        break
      }
    }
    return empty
  }
  backSpace() {
    const row = this.rows[this.currRow]
    row.backSpace()
  }
  clearToEndOfRow() {
    const row = this.rows[this.currRow]
    row.clearToEndOfRow()
  }
  insertChar(char) {
    const row = this.rows[this.currRow]
    row.insertChar(char)
  }
  setPen(styles) {
    const row = this.rows[this.currRow]
    row.setPenStyles(styles)
  }
  moveCursor(relPos) {
    const row = this.rows[this.currRow]
    row.moveCursor(relPos)
  }
  setCursor(absPos) {
    this.logger.log(2, 'setCursor: ' + absPos)
    const row = this.rows[this.currRow]
    row.setCursor(absPos)
  }
  setPAC(pacData) {
    this.logger.log(2, 'pacData = ' + JSON.stringify(pacData))
    let newRow = pacData.row - 1
    if (this.nrRollUpRows && newRow < this.nrRollUpRows - 1) {
      newRow = this.nrRollUpRows - 1
    }
    if (this.nrRollUpRows && this.currRow !== newRow) {
      for (let i = 0; i < NR_ROWS; i++) {
        this.rows[i].clear()
      }
      const topRowIndex = this.currRow + 1 - this.nrRollUpRows
      const lastOutputScreen = this.lastOutputScreen
      if (lastOutputScreen) {
        const prevLineTime = lastOutputScreen.rows[topRowIndex].cueStartTime
        const time = this.logger.time
        if (prevLineTime && time !== null && prevLineTime < time) {
          for (let i = 0; i < this.nrRollUpRows; i++) {
            this.rows[newRow - this.nrRollUpRows + i + 1].copy(
              lastOutputScreen.rows[topRowIndex + i]
            )
          }
        }
      }
    }
    this.currRow = newRow
    const row = this.rows[this.currRow]
    if (pacData.indent !== null) {
      const indent = pacData.indent
      const prevPos = Math.max(indent - 1, 0)
      row.setCursor(pacData.indent)
      pacData.color = row.chars[prevPos].penState.foreground
    }
    const styles = {
      foreground: pacData.color,
      underline: pacData.underline,
      italics: pacData.italics,
      background: 'black',
      flash: false
    }
    this.setPen(styles)
  }
  setBkgData(bkgData) {
    this.logger.log(2, 'bkgData = ' + JSON.stringify(bkgData))
    this.backSpace()
    this.setPen(bkgData)
    this.insertChar(32)
  }
  setRollUpRows(nrRows) {
    this.nrRollUpRows = nrRows
  }
  rollUp() {
    if (this.nrRollUpRows === null) {
      this.logger.log(3, 'roll_up but nrRollUpRows not set yet')
      return
    }
    this.logger.log(1, this.getDisplayText())
    const topRowIndex = this.currRow + 1 - this.nrRollUpRows
    const topRow = this.rows.splice(topRowIndex, 1)[0]
    topRow.clear()
    this.rows.splice(this.currRow, 0, topRow)
    this.logger.log(2, 'Rolling up')
  }
  getDisplayText(asOneRow) {
    asOneRow = asOneRow || false
    const displayText = []
    let text = ''
    let rowNr = -1
    for (let i = 0; i < NR_ROWS; i++) {
      const rowText = this.rows[i].getTextString()
      if (rowText) {
        rowNr = i + 1
        if (asOneRow) {
          displayText.push('Row ' + rowNr + ": '" + rowText + "'")
        } else {
          displayText.push(rowText.trim())
        }
      }
    }
    if (displayText.length > 0) {
      if (asOneRow) {
        text = '[' + displayText.join(' | ') + ']'
      } else {
        text = displayText.join('\n')
      }
    }
    return text
  }
  getTextAndFormat() {
    return this.rows
  }
}
var Cea608Channel = class {
  constructor(channelNumber, outputFilter, logger2) {
    this.chNr = channelNumber
    this.outputFilter = outputFilter
    this.mode = null
    this.verbose = 0
    this.displayedMemory = new CaptionScreen(logger2)
    this.nonDisplayedMemory = new CaptionScreen(logger2)
    this.lastOutputScreen = new CaptionScreen(logger2)
    this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1]
    this.writeScreen = this.displayedMemory
    this.mode = null
    this.cueStartTime = null
    this.logger = logger2
  }
  reset() {
    this.mode = null
    this.displayedMemory.reset()
    this.nonDisplayedMemory.reset()
    this.lastOutputScreen.reset()
    this.outputFilter.reset()
    this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1]
    this.writeScreen = this.displayedMemory
    this.mode = null
    this.cueStartTime = null
  }
  getHandler() {
    return this.outputFilter
  }
  setHandler(newHandler) {
    this.outputFilter = newHandler
  }
  setPAC(pacData) {
    this.writeScreen.setPAC(pacData)
  }
  setBkgData(bkgData) {
    this.writeScreen.setBkgData(bkgData)
  }
  setMode(newMode) {
    if (newMode === this.mode) {
      return
    }
    this.mode = newMode
    this.logger.log(2, 'MODE=' + newMode)
    if (this.mode === 'MODE_POP-ON') {
      this.writeScreen = this.nonDisplayedMemory
    } else {
      this.writeScreen = this.displayedMemory
      this.writeScreen.reset()
    }
    if (this.mode !== 'MODE_ROLL-UP') {
      this.displayedMemory.nrRollUpRows = null
      this.nonDisplayedMemory.nrRollUpRows = null
    }
    this.mode = newMode
  }
  insertChars(chars) {
    for (let i = 0; i < chars.length; i++) {
      this.writeScreen.insertChar(chars[i])
    }
    const screen =
      this.writeScreen === this.displayedMemory ? 'DISP' : 'NON_DISP'
    this.logger.log(2, screen + ': ' + this.writeScreen.getDisplayText(true))
    if (this.mode === 'MODE_PAINT-ON' || this.mode === 'MODE_ROLL-UP') {
      this.logger.log(
        1,
        'DISPLAYED: ' + this.displayedMemory.getDisplayText(true)
      )
      this.outputDataUpdate()
    }
  }
  ccRCL() {
    this.logger.log(2, 'RCL - Resume Caption Loading')
    this.setMode('MODE_POP-ON')
  }
  ccBS() {
    this.logger.log(2, 'BS - BackSpace')
    if (this.mode === 'MODE_TEXT') {
      return
    }
    this.writeScreen.backSpace()
    if (this.writeScreen === this.displayedMemory) {
      this.outputDataUpdate()
    }
  }
  ccAOF() {}
  ccAON() {}
  ccDER() {
    this.logger.log(2, 'DER- Delete to End of Row')
    this.writeScreen.clearToEndOfRow()
    this.outputDataUpdate()
  }
  ccRU(nrRows) {
    this.logger.log(2, 'RU(' + nrRows + ') - Roll Up')
    this.writeScreen = this.displayedMemory
    this.setMode('MODE_ROLL-UP')
    this.writeScreen.setRollUpRows(nrRows)
  }
  ccFON() {
    this.logger.log(2, 'FON - Flash On')
    this.writeScreen.setPen({ flash: true })
  }
  ccRDC() {
    this.logger.log(2, 'RDC - Resume Direct Captioning')
    this.setMode('MODE_PAINT-ON')
  }
  ccTR() {
    this.logger.log(2, 'TR')
    this.setMode('MODE_TEXT')
  }
  ccRTD() {
    this.logger.log(2, 'RTD')
    this.setMode('MODE_TEXT')
  }
  ccEDM() {
    this.logger.log(2, 'EDM - Erase Displayed Memory')
    this.displayedMemory.reset()
    this.outputDataUpdate(true)
  }
  ccCR() {
    this.logger.log(2, 'CR - Carriage Return')
    this.writeScreen.rollUp()
    this.outputDataUpdate(true)
  }
  ccENM() {
    this.logger.log(2, 'ENM - Erase Non-displayed Memory')
    this.nonDisplayedMemory.reset()
  }
  ccEOC() {
    this.logger.log(2, 'EOC - End Of Caption')
    if (this.mode === 'MODE_POP-ON') {
      const tmp = this.displayedMemory
      this.displayedMemory = this.nonDisplayedMemory
      this.nonDisplayedMemory = tmp
      this.writeScreen = this.nonDisplayedMemory
      this.logger.log(1, 'DISP: ' + this.displayedMemory.getDisplayText())
    }
    this.outputDataUpdate(true)
  }
  ccTO(nrCols) {
    this.logger.log(2, 'TO(' + nrCols + ') - Tab Offset')
    this.writeScreen.moveCursor(nrCols)
  }
  ccMIDROW(secondByte) {
    const styles = { flash: false }
    styles.underline = secondByte % 2 === 1
    styles.italics = secondByte >= 46
    if (!styles.italics) {
      const colorIndex = Math.floor(secondByte / 2) - 16
      const colors = [
        'white',
        'green',
        'blue',
        'cyan',
        'red',
        'yellow',
        'magenta'
      ]
      styles.foreground = colors[colorIndex]
    } else {
      styles.foreground = 'white'
    }
    this.logger.log(2, 'MIDROW: ' + JSON.stringify(styles))
    this.writeScreen.setPen(styles)
  }
  outputDataUpdate(dispatch = false) {
    const time = this.logger.time
    if (time === null) {
      return
    }
    if (this.outputFilter) {
      if (this.cueStartTime === null && !this.displayedMemory.isEmpty()) {
        this.cueStartTime = time
      } else {
        if (!this.displayedMemory.equals(this.lastOutputScreen)) {
          this.outputFilter.newCue(
            this.cueStartTime,
            time,
            this.lastOutputScreen
          )
          if (dispatch && this.outputFilter.dispatchCue) {
            this.outputFilter.dispatchCue()
          }
          this.cueStartTime = this.displayedMemory.isEmpty() ? null : time
        }
      }
      this.lastOutputScreen.copy(this.displayedMemory)
    }
  }
  cueSplitAtTime(t) {
    if (this.outputFilter) {
      if (!this.displayedMemory.isEmpty()) {
        if (this.outputFilter.newCue) {
          this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory)
        }
        this.cueStartTime = t
      }
    }
  }
}
var Cea608Parser = class {
  constructor(field, out1, out2) {
    this.currentChannel = 0
    const logger2 = new CaptionsLogger()
    this.channels = [
      null,
      new Cea608Channel(field, out1, logger2),
      new Cea608Channel(field + 1, out2, logger2)
    ]
    this.cmdHistory = createCmdHistory()
    this.logger = logger2
  }
  getHandler(channel) {
    return this.channels[channel].getHandler()
  }
  setHandler(channel, newHandler) {
    this.channels[channel].setHandler(newHandler)
  }
  addData(time, byteList) {
    let cmdFound
    let a
    let b
    let charsFound = false
    this.logger.time = time
    for (let i = 0; i < byteList.length; i += 2) {
      a = byteList[i] & 127
      b = byteList[i + 1] & 127
      if (a === 0 && b === 0) {
        continue
      } else {
        this.logger.log(
          3,
          '[' +
            numArrayToHexArray([byteList[i], byteList[i + 1]]) +
            '] -> (' +
            numArrayToHexArray([a, b]) +
            ')'
        )
      }
      cmdFound = this.parseCmd(a, b)
      if (!cmdFound) {
        cmdFound = this.parseMidrow(a, b)
      }
      if (!cmdFound) {
        cmdFound = this.parsePAC(a, b)
      }
      if (!cmdFound) {
        cmdFound = this.parseBackgroundAttributes(a, b)
      }
      if (!cmdFound) {
        charsFound = this.parseChars(a, b)
        if (charsFound) {
          const currChNr = this.currentChannel
          if (currChNr && currChNr > 0) {
            const channel = this.channels[currChNr]
            channel.insertChars(charsFound)
          } else {
            this.logger.log(2, 'No channel found yet. TEXT-MODE?')
          }
        }
      }
      if (!cmdFound && !charsFound) {
        this.logger.log(
          2,
          "Couldn't parse cleaned data " +
            numArrayToHexArray([a, b]) +
            ' orig: ' +
            numArrayToHexArray([byteList[i], byteList[i + 1]])
        )
      }
    }
  }
  parseCmd(a, b) {
    const { cmdHistory } = this
    const cond1 =
      (a === 20 || a === 28 || a === 21 || a === 29) && b >= 32 && b <= 47
    const cond2 = (a === 23 || a === 31) && b >= 33 && b <= 35
    if (!(cond1 || cond2)) {
      return false
    }
    if (hasCmdRepeated(a, b, cmdHistory)) {
      setLastCmd(null, null, cmdHistory)
      this.logger.log(
        3,
        'Repeated command (' + numArrayToHexArray([a, b]) + ') is dropped'
      )
      return true
    }
    const chNr = a === 20 || a === 21 || a === 23 ? 1 : 2
    const channel = this.channels[chNr]
    if (a === 20 || a === 21 || a === 28 || a === 29) {
      if (b === 32) {
        channel.ccRCL()
      } else if (b === 33) {
        channel.ccBS()
      } else if (b === 34) {
        channel.ccAOF()
      } else if (b === 35) {
        channel.ccAON()
      } else if (b === 36) {
        channel.ccDER()
      } else if (b === 37) {
        channel.ccRU(2)
      } else if (b === 38) {
        channel.ccRU(3)
      } else if (b === 39) {
        channel.ccRU(4)
      } else if (b === 40) {
        channel.ccFON()
      } else if (b === 41) {
        channel.ccRDC()
      } else if (b === 42) {
        channel.ccTR()
      } else if (b === 43) {
        channel.ccRTD()
      } else if (b === 44) {
        channel.ccEDM()
      } else if (b === 45) {
        channel.ccCR()
      } else if (b === 46) {
        channel.ccENM()
      } else if (b === 47) {
        channel.ccEOC()
      }
    } else {
      channel.ccTO(b - 32)
    }
    setLastCmd(a, b, cmdHistory)
    this.currentChannel = chNr
    return true
  }
  parseMidrow(a, b) {
    let chNr = 0
    if ((a === 17 || a === 25) && b >= 32 && b <= 47) {
      if (a === 17) {
        chNr = 1
      } else {
        chNr = 2
      }
      if (chNr !== this.currentChannel) {
        this.logger.log(0, 'Mismatch channel in midrow parsing')
        return false
      }
      const channel = this.channels[chNr]
      if (!channel) {
        return false
      }
      channel.ccMIDROW(b)
      this.logger.log(3, 'MIDROW (' + numArrayToHexArray([a, b]) + ')')
      return true
    }
    return false
  }
  parsePAC(a, b) {
    let row
    const cmdHistory = this.cmdHistory
    const case1 =
      ((a >= 17 && a <= 23) || (a >= 25 && a <= 31)) && b >= 64 && b <= 127
    const case2 = (a === 16 || a === 24) && b >= 64 && b <= 95
    if (!(case1 || case2)) {
      return false
    }
    if (hasCmdRepeated(a, b, cmdHistory)) {
      setLastCmd(null, null, cmdHistory)
      return true
    }
    const chNr = a <= 23 ? 1 : 2
    if (b >= 64 && b <= 95) {
      row = chNr === 1 ? rowsLowCh1[a] : rowsLowCh2[a]
    } else {
      row = chNr === 1 ? rowsHighCh1[a] : rowsHighCh2[a]
    }
    const channel = this.channels[chNr]
    if (!channel) {
      return false
    }
    channel.setPAC(this.interpretPAC(row, b))
    setLastCmd(a, b, cmdHistory)
    this.currentChannel = chNr
    return true
  }
  interpretPAC(row, byte) {
    let pacIndex
    const pacData = {
      color: null,
      italics: false,
      indent: null,
      underline: false,
      row
    }
    if (byte > 95) {
      pacIndex = byte - 96
    } else {
      pacIndex = byte - 64
    }
    pacData.underline = (pacIndex & 1) === 1
    if (pacIndex <= 13) {
      pacData.color = [
        'white',
        'green',
        'blue',
        'cyan',
        'red',
        'yellow',
        'magenta',
        'white'
      ][Math.floor(pacIndex / 2)]
    } else if (pacIndex <= 15) {
      pacData.italics = true
      pacData.color = 'white'
    } else {
      pacData.indent = Math.floor((pacIndex - 16) / 2) * 4
    }
    return pacData
  }
  parseChars(a, b) {
    let channelNr
    let charCodes = null
    let charCode1 = null
    if (a >= 25) {
      channelNr = 2
      charCode1 = a - 8
    } else {
      channelNr = 1
      charCode1 = a
    }
    if (charCode1 >= 17 && charCode1 <= 19) {
      let oneCode
      if (charCode1 === 17) {
        oneCode = b + 80
      } else if (charCode1 === 18) {
        oneCode = b + 112
      } else {
        oneCode = b + 144
      }
      this.logger.log(
        2,
        "Special char '" + getCharForByte(oneCode) + "' in channel " + channelNr
      )
      charCodes = [oneCode]
    } else if (a >= 32 && a <= 127) {
      charCodes = b === 0 ? [a] : [a, b]
    }
    if (charCodes) {
      const hexCodes = numArrayToHexArray(charCodes)
      this.logger.log(3, 'Char codes =  ' + hexCodes.join(','))
      setLastCmd(a, b, this.cmdHistory)
    }
    return charCodes
  }
  parseBackgroundAttributes(a, b) {
    const case1 = (a === 16 || a === 24) && b >= 32 && b <= 47
    const case2 = (a === 23 || a === 31) && b >= 45 && b <= 47
    if (!(case1 || case2)) {
      return false
    }
    let index
    const bkgData = {}
    if (a === 16 || a === 24) {
      index = Math.floor((b - 32) / 2)
      bkgData.background = backgroundColors[index]
      if (b % 2 === 1) {
        bkgData.background = bkgData.background + '_semi'
      }
    } else if (b === 45) {
      bkgData.background = 'transparent'
    } else {
      bkgData.foreground = 'black'
      if (b === 47) {
        bkgData.underline = true
      }
    }
    const chNr = a <= 23 ? 1 : 2
    const channel = this.channels[chNr]
    channel.setBkgData(bkgData)
    setLastCmd(a, b, this.cmdHistory)
    return true
  }
  reset() {
    for (let i = 0; i < Object.keys(this.channels).length; i++) {
      const channel = this.channels[i]
      if (channel) {
        channel.reset()
      }
    }
    this.cmdHistory = createCmdHistory()
  }
  cueSplitAtTime(t) {
    for (let i = 0; i < this.channels.length; i++) {
      const channel = this.channels[i]
      if (channel) {
        channel.cueSplitAtTime(t)
      }
    }
  }
}
function setLastCmd(a, b, cmdHistory) {
  cmdHistory.a = a
  cmdHistory.b = b
}
function hasCmdRepeated(a, b, cmdHistory) {
  return cmdHistory.a === a && cmdHistory.b === b
}
function createCmdHistory() {
  return {
    a: null,
    b: null
  }
}
var cea_608_parser_default = Cea608Parser

// src/utils/output-filter.ts
var OutputFilter = class {
  constructor(timelineController, trackName) {
    this.cueRanges = []
    this.startTime = null
    this.endTime = null
    this.screen = null
    this.timelineController = timelineController
    this.trackName = trackName
  }
  dispatchCue() {
    if (this.startTime === null) {
      return
    }
    this.timelineController.addCues(
      this.trackName,
      this.startTime,
      this.endTime,
      this.screen,
      this.cueRanges
    )
    this.startTime = null
  }
  newCue(startTime, endTime, screen) {
    if (this.startTime === null || this.startTime > startTime) {
      this.startTime = startTime
    }
    this.endTime = endTime
    this.screen = screen
    this.timelineController.createCaptionsTrack(this.trackName)
  }
  reset() {
    this.cueRanges = []
  }
}
var output_filter_default = OutputFilter

// src/utils/vttcue.ts
var vttcue_default = (function () {
  if (typeof self !== 'undefined' && self.VTTCue) {
    return self.VTTCue
  }
  const AllowedDirections = ['', 'lr', 'rl']
  const AllowedAlignments = ['start', 'middle', 'end', 'left', 'right']
  function isAllowedValue(allowed, value) {
    if (typeof value !== 'string') {
      return false
    }
    if (!Array.isArray(allowed)) {
      return false
    }
    const lcValue = value.toLowerCase()
    if (~allowed.indexOf(lcValue)) {
      return lcValue
    }
    return false
  }
  function findDirectionSetting(value) {
    return isAllowedValue(AllowedDirections, value)
  }
  function findAlignSetting(value) {
    return isAllowedValue(AllowedAlignments, value)
  }
  function extend(obj, ...rest) {
    let i = 1
    for (; i < arguments.length; i++) {
      const cobj = arguments[i]
      for (const p in cobj) {
        obj[p] = cobj[p]
      }
    }
    return obj
  }
  function VTTCue(startTime, endTime, text) {
    const cue = this
    const baseObj = { enumerable: true }
    cue.hasBeenReset = false
    let _id = ''
    let _pauseOnExit = false
    let _startTime = startTime
    let _endTime = endTime
    let _text = text
    let _region = null
    let _vertical = ''
    let _snapToLines = true
    let _line = 'auto'
    let _lineAlign = 'start'
    let _position = 50
    let _positionAlign = 'middle'
    let _size = 50
    let _align = 'middle'
    Object.defineProperty(
      cue,
      'id',
      extend({}, baseObj, {
        get: function () {
          return _id
        },
        set: function (value) {
          _id = '' + value
        }
      })
    )
    Object.defineProperty(
      cue,
      'pauseOnExit',
      extend({}, baseObj, {
        get: function () {
          return _pauseOnExit
        },
        set: function (value) {
          _pauseOnExit = !!value
        }
      })
    )
    Object.defineProperty(
      cue,
      'startTime',
      extend({}, baseObj, {
        get: function () {
          return _startTime
        },
        set: function (value) {
          if (typeof value !== 'number') {
            throw new TypeError('Start time must be set to a number.')
          }
          _startTime = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'endTime',
      extend({}, baseObj, {
        get: function () {
          return _endTime
        },
        set: function (value) {
          if (typeof value !== 'number') {
            throw new TypeError('End time must be set to a number.')
          }
          _endTime = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'text',
      extend({}, baseObj, {
        get: function () {
          return _text
        },
        set: function (value) {
          _text = '' + value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'region',
      extend({}, baseObj, {
        get: function () {
          return _region
        },
        set: function (value) {
          _region = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'vertical',
      extend({}, baseObj, {
        get: function () {
          return _vertical
        },
        set: function (value) {
          const setting = findDirectionSetting(value)
          if (setting === false) {
            throw new SyntaxError('An invalid or illegal string was specified.')
          }
          _vertical = setting
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'snapToLines',
      extend({}, baseObj, {
        get: function () {
          return _snapToLines
        },
        set: function (value) {
          _snapToLines = !!value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'line',
      extend({}, baseObj, {
        get: function () {
          return _line
        },
        set: function (value) {
          if (typeof value !== 'number' && value !== 'auto') {
            throw new SyntaxError(
              'An invalid number or illegal string was specified.'
            )
          }
          _line = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'lineAlign',
      extend({}, baseObj, {
        get: function () {
          return _lineAlign
        },
        set: function (value) {
          const setting = findAlignSetting(value)
          if (!setting) {
            throw new SyntaxError('An invalid or illegal string was specified.')
          }
          _lineAlign = setting
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'position',
      extend({}, baseObj, {
        get: function () {
          return _position
        },
        set: function (value) {
          if (value < 0 || value > 100) {
            throw new Error('Position must be between 0 and 100.')
          }
          _position = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'positionAlign',
      extend({}, baseObj, {
        get: function () {
          return _positionAlign
        },
        set: function (value) {
          const setting = findAlignSetting(value)
          if (!setting) {
            throw new SyntaxError('An invalid or illegal string was specified.')
          }
          _positionAlign = setting
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'size',
      extend({}, baseObj, {
        get: function () {
          return _size
        },
        set: function (value) {
          if (value < 0 || value > 100) {
            throw new Error('Size must be between 0 and 100.')
          }
          _size = value
          this.hasBeenReset = true
        }
      })
    )
    Object.defineProperty(
      cue,
      'align',
      extend({}, baseObj, {
        get: function () {
          return _align
        },
        set: function (value) {
          const setting = findAlignSetting(value)
          if (!setting) {
            throw new SyntaxError('An invalid or illegal string was specified.')
          }
          _align = setting
          this.hasBeenReset = true
        }
      })
    )
    cue.displayState = void 0
  }
  VTTCue.prototype.getCueAsHTML = function () {
    const WebVTT = self.WebVTT
    return WebVTT.convertCueToDOMTree(self, this.text)
  }
  return VTTCue
})()

// src/utils/vttparser.ts
var StringDecoder = class {
  decode(data, options) {
    if (!data) {
      return ''
    }
    if (typeof data !== 'string') {
      throw new Error('Error - expected string data.')
    }
    return decodeURIComponent(encodeURIComponent(data))
  }
}
function parseTimeStamp(input) {
  function computeSeconds(h, m2, s, f) {
    return (h | 0) * 3600 + (m2 | 0) * 60 + (s | 0) + parseFloat(f || 0)
  }
  const m = input.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/)
  if (!m) {
    return null
  }
  if (parseFloat(m[2]) > 59) {
    return computeSeconds(m[2], m[3], 0, m[4])
  }
  return computeSeconds(m[1], m[2], m[3], m[4])
}
var Settings = class {
  constructor() {
    this.values = Object.create(null)
  }
  set(k, v) {
    if (!this.get(k) && v !== '') {
      this.values[k] = v
    }
  }
  get(k, dflt, defaultKey) {
    if (defaultKey) {
      return this.has(k) ? this.values[k] : dflt[defaultKey]
    }
    return this.has(k) ? this.values[k] : dflt
  }
  has(k) {
    return k in this.values
  }
  alt(k, v, a) {
    for (let n = 0; n < a.length; ++n) {
      if (v === a[n]) {
        this.set(k, v)
        break
      }
    }
  }
  integer(k, v) {
    if (/^-?\d+$/.test(v)) {
      this.set(k, parseInt(v, 10))
    }
  }
  percent(k, v) {
    if (/^([\d]{1,3})(\.[\d]*)?%$/.test(v)) {
      const percent = parseFloat(v)
      if (percent >= 0 && percent <= 100) {
        this.set(k, percent)
        return true
      }
    }
    return false
  }
}
function parseOptions(input, callback, keyValueDelim, groupDelim) {
  const groups = groupDelim ? input.split(groupDelim) : [input]
  for (const i in groups) {
    if (typeof groups[i] !== 'string') {
      continue
    }
    const kv = groups[i].split(keyValueDelim)
    if (kv.length !== 2) {
      continue
    }
    const k = kv[0]
    const v = kv[1]
    callback(k, v)
  }
}
var defaults = new vttcue_default(0, 0, '')
var center = defaults.align === 'middle' ? 'middle' : 'center'
function parseCue(input, cue, regionList) {
  const oInput = input
  function consumeTimeStamp() {
    const ts = parseTimeStamp(input)
    if (ts === null) {
      throw new Error('Malformed timestamp: ' + oInput)
    }
    input = input.replace(/^[^\sa-zA-Z-]+/, '')
    return ts
  }
  function consumeCueSettings(input2, cue2) {
    const settings = new Settings()
    parseOptions(
      input2,
      function (k, v) {
        let vals
        switch (k) {
          case 'region':
            for (let i = regionList.length - 1; i >= 0; i--) {
              if (regionList[i].id === v) {
                settings.set(k, regionList[i].region)
                break
              }
            }
            break
          case 'vertical':
            settings.alt(k, v, ['rl', 'lr'])
            break
          case 'line':
            vals = v.split(',')
            settings.integer(k, vals[0])
            if (settings.percent(k, vals[0])) {
              settings.set('snapToLines', false)
            }
            settings.alt(k, vals[0], ['auto'])
            if (vals.length === 2) {
              settings.alt('lineAlign', vals[1], ['start', center, 'end'])
            }
            break
          case 'position':
            vals = v.split(',')
            settings.percent(k, vals[0])
            if (vals.length === 2) {
              settings.alt('positionAlign', vals[1], [
                'start',
                center,
                'end',
                'line-left',
                'line-right',
                'auto'
              ])
            }
            break
          case 'size':
            settings.percent(k, v)
            break
          case 'align':
            settings.alt(k, v, ['start', center, 'end', 'left', 'right'])
            break
        }
      },
      /:/,
      /\s/
    )
    cue2.region = settings.get('region', null)
    cue2.vertical = settings.get('vertical', '')
    let line = settings.get('line', 'auto')
    if (line === 'auto' && defaults.line === -1) {
      line = -1
    }
    cue2.line = line
    cue2.lineAlign = settings.get('lineAlign', 'start')
    cue2.snapToLines = settings.get('snapToLines', true)
    cue2.size = settings.get('size', 100)
    cue2.align = settings.get('align', center)
    let position = settings.get('position', 'auto')
    if (position === 'auto' && defaults.position === 50) {
      position =
        cue2.align === 'start' || cue2.align === 'left'
          ? 0
          : cue2.align === 'end' || cue2.align === 'right'
          ? 100
          : 50
    }
    cue2.position = position
  }
  function skipWhitespace() {
    input = input.replace(/^\s+/, '')
  }
  skipWhitespace()
  cue.startTime = consumeTimeStamp()
  skipWhitespace()
  if (input.substr(0, 3) !== '-->') {
    throw new Error(
      "Malformed time stamp (time stamps must be separated by '-->'): " + oInput
    )
  }
  input = input.substr(3)
  skipWhitespace()
  cue.endTime = consumeTimeStamp()
  skipWhitespace()
  consumeCueSettings(input, cue)
}
function fixLineBreaks(input) {
  return input.replace(/<br(?: \/)?>/gi, '\n')
}
var VTTParser = class {
  constructor() {
    this.state = 'INITIAL'
    this.buffer = ''
    this.decoder = new StringDecoder()
    this.regionList = []
    this.cue = null
  }
  parse(data) {
    const _this = this
    if (data) {
      _this.buffer += _this.decoder.decode(data, { stream: true })
    }
    function collectNextLine() {
      let buffer = _this.buffer
      let pos = 0
      buffer = fixLineBreaks(buffer)
      while (
        pos < buffer.length &&
        buffer[pos] !== '\r' &&
        buffer[pos] !== '\n'
      ) {
        ++pos
      }
      const line = buffer.substr(0, pos)
      if (buffer[pos] === '\r') {
        ++pos
      }
      if (buffer[pos] === '\n') {
        ++pos
      }
      _this.buffer = buffer.substr(pos)
      return line
    }
    function parseHeader2(input) {
      parseOptions(input, function (k, v) {}, /:/)
    }
    try {
      let line = ''
      if (_this.state === 'INITIAL') {
        if (!/\r\n|\n/.test(_this.buffer)) {
          return this
        }
        line = collectNextLine()
        const m = line.match(/^(ï»¿)?WEBVTT([ \t].*)?$/)
        if (!m || !m[0]) {
          throw new Error('Malformed WebVTT signature.')
        }
        _this.state = 'HEADER'
      }
      let alreadyCollectedLine = false
      while (_this.buffer) {
        if (!/\r\n|\n/.test(_this.buffer)) {
          return this
        }
        if (!alreadyCollectedLine) {
          line = collectNextLine()
        } else {
          alreadyCollectedLine = false
        }
        switch (_this.state) {
          case 'HEADER':
            if (/:/.test(line)) {
              parseHeader2(line)
            } else if (!line) {
              _this.state = 'ID'
            }
            continue
          case 'NOTE':
            if (!line) {
              _this.state = 'ID'
            }
            continue
          case 'ID':
            if (/^NOTE($|[ \t])/.test(line)) {
              _this.state = 'NOTE'
              break
            }
            if (!line) {
              continue
            }
            _this.cue = new vttcue_default(0, 0, '')
            _this.state = 'CUE'
            if (line.indexOf('-->') === -1) {
              _this.cue.id = line
              continue
            }
          case 'CUE':
            if (!_this.cue) {
              _this.state = 'BADCUE'
              continue
            }
            try {
              parseCue(line, _this.cue, _this.regionList)
            } catch (e) {
              _this.cue = null
              _this.state = 'BADCUE'
              continue
            }
            _this.state = 'CUETEXT'
            continue
          case 'CUETEXT':
            {
              const hasSubstring = line.indexOf('-->') !== -1
              if (!line || (hasSubstring && (alreadyCollectedLine = true))) {
                if (_this.oncue && _this.cue) {
                  _this.oncue(_this.cue)
                }
                _this.cue = null
                _this.state = 'ID'
                continue
              }
              if (_this.cue === null) {
                continue
              }
              if (_this.cue.text) {
                _this.cue.text += '\n'
              }
              _this.cue.text += line
            }
            continue
          case 'BADCUE':
            if (!line) {
              _this.state = 'ID'
            }
        }
      }
    } catch (e) {
      if (_this.state === 'CUETEXT' && _this.cue && _this.oncue) {
        _this.oncue(_this.cue)
      }
      _this.cue = null
      _this.state = _this.state === 'INITIAL' ? 'BADWEBVTT' : 'BADCUE'
    }
    return this
  }
  flush() {
    const _this = this
    try {
      if (_this.cue || _this.state === 'HEADER') {
        _this.buffer += '\n\n'
        _this.parse()
      }
      if (_this.state === 'INITIAL' || _this.state === 'BADWEBVTT') {
        throw new Error('Malformed WebVTT signature.')
      }
    } catch (e) {
      if (_this.onparsingerror) {
        _this.onparsingerror(e)
      }
    }
    if (_this.onflush) {
      _this.onflush()
    }
    return this
  }
}

// src/utils/webvtt-parser.ts
var LINEBREAKS = /\r\n|\n\r|\n|\r/g
var startsWith = function (inputString, searchString, position = 0) {
  return inputString.substr(position, searchString.length) === searchString
}
var cueString2millis = function (timeString) {
  let ts = parseInt(timeString.substr(-3))
  const secs = parseInt(timeString.substr(-6, 2))
  const mins = parseInt(timeString.substr(-9, 2))
  const hours =
    timeString.length > 9
      ? parseInt(timeString.substr(0, timeString.indexOf(':')))
      : 0
  if (
    !Number.isFinite(ts) ||
    !Number.isFinite(secs) ||
    !Number.isFinite(mins) ||
    !Number.isFinite(hours)
  ) {
    throw Error(`Malformed X-TIMESTAMP-MAP: Local:${timeString}`)
  }
  ts += 1e3 * secs
  ts += 60 * 1e3 * mins
  ts += 60 * 60 * 1e3 * hours
  return ts
}
var hash = function (text) {
  let hash2 = 5381
  let i = text.length
  while (i) {
    hash2 = (hash2 * 33) ^ text.charCodeAt(--i)
  }
  return (hash2 >>> 0).toString()
}
function generateCueId(startTime, endTime, text) {
  return hash(startTime.toString()) + hash(endTime.toString()) + hash(text)
}
var calculateOffset = function (vttCCs, cc, presentationTime) {
  let currCC = vttCCs[cc]
  let prevCC = vttCCs[currCC.prevCC]
  if (!prevCC || (!prevCC.new && currCC.new)) {
    vttCCs.ccOffset = vttCCs.presentationOffset = currCC.start
    currCC.new = false
    return
  }
  while (prevCC?.new) {
    vttCCs.ccOffset += currCC.start - prevCC.start
    currCC.new = false
    currCC = prevCC
    prevCC = vttCCs[currCC.prevCC]
  }
  vttCCs.presentationOffset = presentationTime
}
function parseWebVTT(
  vttByteArray,
  initPTS,
  timescale,
  vttCCs,
  cc,
  timeOffset,
  callBack,
  errorCallBack
) {
  const parser = new VTTParser()
  const vttLines = utf8ArrayToStr(new Uint8Array(vttByteArray))
    .trim()
    .replace(LINEBREAKS, '\n')
    .split('\n')
  const cues = []
  const initPTS90Hz = toMpegTsClockFromTimescale(initPTS, timescale)
  let cueTime = '00:00.000'
  let timestampMapMPEGTS = 0
  let timestampMapLOCAL = 0
  let parsingError
  let inHeader = true
  let timestampMap = false
  parser.oncue = function (cue) {
    const currCC = vttCCs[cc]
    let cueOffset = vttCCs.ccOffset
    const webVttMpegTsMapOffset = (timestampMapMPEGTS - initPTS90Hz) / 9e4
    if (currCC?.new) {
      if (timestampMapLOCAL !== void 0) {
        cueOffset = vttCCs.ccOffset = currCC.start
      } else {
        calculateOffset(vttCCs, cc, webVttMpegTsMapOffset)
      }
    }
    if (webVttMpegTsMapOffset) {
      cueOffset = webVttMpegTsMapOffset - vttCCs.presentationOffset
    }
    if (timestampMap) {
      const duration = cue.endTime - cue.startTime
      const startTime =
        normalizePts(
          (cue.startTime + cueOffset - timestampMapLOCAL) * 9e4,
          timeOffset * 9e4
        ) / 9e4
      cue.startTime = startTime
      cue.endTime = startTime + duration
    }
    const text = cue.text.trim()
    cue.text = decodeURIComponent(encodeURIComponent(text))
    if (!cue.id) {
      cue.id = generateCueId(cue.startTime, cue.endTime, text)
    }
    if (cue.endTime > 0) {
      cues.push(cue)
    }
  }
  parser.onparsingerror = function (error) {
    parsingError = error
  }
  parser.onflush = function () {
    if (parsingError) {
      errorCallBack(parsingError)
      return
    }
    callBack(cues)
  }
  vttLines.forEach(line => {
    if (inHeader) {
      if (startsWith(line, 'X-TIMESTAMP-MAP=')) {
        inHeader = false
        timestampMap = true
        line
          .substr(16)
          .split(',')
          .forEach(timestamp => {
            if (startsWith(timestamp, 'LOCAL:')) {
              cueTime = timestamp.substr(6)
            } else if (startsWith(timestamp, 'MPEGTS:')) {
              timestampMapMPEGTS = parseInt(timestamp.substr(7))
            }
          })
        try {
          timestampMapLOCAL = cueString2millis(cueTime) / 1e3
        } catch (error) {
          timestampMap = false
          parsingError = error
        }
        return
      } else if (line === '') {
        inHeader = false
      }
    }
    parser.parse(line + '\n')
  })
  parser.flush()
}

// src/utils/imsc1-ttml-parser.ts
var IMSC1_CODEC = 'stpp.ttml.im1t'
var HMSF_REGEX = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/
var TIME_UNIT_REGEX = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/
var textAlignToLineAlign = {
  left: 'start',
  center: 'center',
  right: 'end',
  start: 'start',
  end: 'end'
}
function parseIMSC1(payload, initPTS, timescale, callBack, errorCallBack) {
  const results = findBox(new Uint8Array(payload), ['mdat'])
  if (results.length === 0) {
    errorCallBack(new Error('Could not parse IMSC1 mdat'))
    return
  }
  const mdat = results[0]
  const ttml = utf8ArrayToStr(
    new Uint8Array(payload, mdat.start, mdat.end - mdat.start)
  )
  const syncTime = toTimescaleFromScale(initPTS, 1, timescale)
  try {
    callBack(parseTTML(ttml, syncTime))
  } catch (error) {
    errorCallBack(error)
  }
}
function parseTTML(ttml, syncTime) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(ttml, 'text/xml')
  const tt = xmlDoc.getElementsByTagName('tt')[0]
  if (!tt) {
    throw new Error('Invalid ttml')
  }
  const defaultRateInfo = {
    frameRate: 30,
    subFrameRate: 1,
    frameRateMultiplier: 0,
    tickRate: 0
  }
  const rateInfo = Object.keys(defaultRateInfo).reduce((result, key) => {
    result[key] = tt.getAttribute(`ttp:${key}`) || defaultRateInfo[key]
    return result
  }, {})
  const trim = tt.getAttribute('xml:space') !== 'preserve'
  const styleElements = collectionToDictionary(
    getElementCollection(tt, 'styling', 'style')
  )
  const regionElements = collectionToDictionary(
    getElementCollection(tt, 'layout', 'region')
  )
  const cueElements = getElementCollection(tt, 'body', '[begin]')
  return [].map
    .call(cueElements, cueElement => {
      const cueText = getTextContent(cueElement, trim)
      if (!cueText || !cueElement.hasAttribute('begin')) {
        return null
      }
      const startTime = parseTtmlTime(
        cueElement.getAttribute('begin'),
        rateInfo
      )
      const duration = parseTtmlTime(cueElement.getAttribute('dur'), rateInfo)
      let endTime = parseTtmlTime(cueElement.getAttribute('end'), rateInfo)
      if (startTime === null) {
        throw timestampParsingError(cueElement)
      }
      if (endTime === null) {
        if (duration === null) {
          throw timestampParsingError(cueElement)
        }
        endTime = startTime + duration
      }
      const cue = new vttcue_default(
        startTime - syncTime,
        endTime - syncTime,
        cueText
      )
      cue.id = generateCueId(cue.startTime, cue.endTime, cue.text)
      const region = regionElements[cueElement.getAttribute('region')]
      const style = styleElements[cueElement.getAttribute('style')]
      cue.position = 10
      cue.size = 80
      const styles = getTtmlStyles(region, style)
      const { textAlign } = styles
      if (textAlign) {
        const lineAlign = textAlignToLineAlign[textAlign]
        if (lineAlign) {
          cue.lineAlign = lineAlign
        }
        cue.align = textAlign
      }
      Object.assign(cue, styles)
      return cue
    })
    .filter(cue => cue !== null)
}
function getElementCollection(fromElement, parentName, childName) {
  const parent = fromElement.getElementsByTagName(parentName)[0]
  if (parent) {
    return [].slice.call(parent.querySelectorAll(childName))
  }
  return []
}
function collectionToDictionary(elementsWithId) {
  return elementsWithId.reduce((dict, element) => {
    const id = element.getAttribute('xml:id')
    if (id) {
      dict[id] = element
    }
    return dict
  }, {})
}
function getTextContent(element, trim) {
  return [].slice.call(element.childNodes).reduce((str, node, i) => {
    if (node.nodeName === 'br' && i) {
      return str + '\n'
    }
    if (node.childNodes?.length) {
      return getTextContent(node, trim)
    } else if (trim) {
      return str + node.textContent.trim().replace(/\s+/g, ' ')
    }
    return str + node.textContent
  }, '')
}
function getTtmlStyles(region, style) {
  const ttsNs = 'http://www.w3.org/ns/ttml#styling'
  const styleAttributes = [
    'displayAlign',
    'textAlign',
    'color',
    'backgroundColor',
    'fontSize',
    'fontFamily'
  ]
  return styleAttributes.reduce((styles, name) => {
    const value =
      getAttributeNS(style, ttsNs, name) || getAttributeNS(region, ttsNs, name)
    if (value) {
      styles[name] = value
    }
    return styles
  }, {})
}
function getAttributeNS(element, ns, name) {
  return element.hasAttributeNS(ns, name)
    ? element.getAttributeNS(ns, name)
    : null
}
function timestampParsingError(node) {
  return new Error(`Could not parse ttml timestamp ${node}`)
}
function parseTtmlTime(timeAttributeValue, rateInfo) {
  if (!timeAttributeValue) {
    return null
  }
  let seconds = parseTimeStamp(timeAttributeValue)
  if (seconds === null) {
    if (HMSF_REGEX.test(timeAttributeValue)) {
      seconds = parseHoursMinutesSecondsFrames(timeAttributeValue, rateInfo)
    } else if (TIME_UNIT_REGEX.test(timeAttributeValue)) {
      seconds = parseTimeUnits(timeAttributeValue, rateInfo)
    }
  }
  return seconds
}
function parseHoursMinutesSecondsFrames(timeAttributeValue, rateInfo) {
  const m = HMSF_REGEX.exec(timeAttributeValue)
  const frames = (m[4] | 0) + (m[5] | 0) / rateInfo.subFrameRate
  return (
    (m[1] | 0) * 3600 +
    (m[2] | 0) * 60 +
    (m[3] | 0) +
    frames / rateInfo.frameRate
  )
}
function parseTimeUnits(timeAttributeValue, rateInfo) {
  const m = TIME_UNIT_REGEX.exec(timeAttributeValue)
  const value = Number(m[1])
  const unit = m[2]
  switch (unit) {
    case 'h':
      return value * 3600
    case 'm':
      return value * 60
    case 'ms':
      return value * 1e3
    case 'f':
      return value / rateInfo.frameRate
    case 't':
      return value / rateInfo.tickRate
  }
  return value
}

// src/controller/timeline-controller.ts
var TimelineController = class {
  constructor(hls) {
    this.media = null
    this.enabled = true
    this.textTracks = []
    this.tracks = []
    this.initPTS = []
    this.timescale = []
    this.unparsedVttFrags = []
    this.captionsTracks = {}
    this.nonNativeCaptionsTracks = {}
    this.lastSn = -1
    this.prevCC = -1
    this.vttCCs = newVTTCCs()
    this.hls = hls
    this.config = hls.config
    this.Cues = hls.config.cueHandler
    this.captionsProperties = {
      textTrack1: {
        label: this.config.captionsTextTrack1Label,
        languageCode: this.config.captionsTextTrack1LanguageCode
      },
      textTrack2: {
        label: this.config.captionsTextTrack2Label,
        languageCode: this.config.captionsTextTrack2LanguageCode
      },
      textTrack3: {
        label: this.config.captionsTextTrack3Label,
        languageCode: this.config.captionsTextTrack3LanguageCode
      },
      textTrack4: {
        label: this.config.captionsTextTrack4Label,
        languageCode: this.config.captionsTextTrack4LanguageCode
      }
    }
    if (this.config.enableCEA708Captions) {
      const channel1 = new output_filter_default(this, 'textTrack1')
      const channel2 = new output_filter_default(this, 'textTrack2')
      const channel3 = new output_filter_default(this, 'textTrack3')
      const channel4 = new output_filter_default(this, 'textTrack4')
      this.cea608Parser1 = new cea_608_parser_default(1, channel1, channel2)
      this.cea608Parser2 = new cea_608_parser_default(3, channel3, channel4)
    }
    hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.on(Events.MANIFEST_LOADED, this.onManifestLoaded, this)
    hls.on(Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this)
    hls.on(Events.FRAG_LOADING, this.onFragLoading, this)
    hls.on(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.on(Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this)
    hls.on(Events.FRAG_DECRYPTED, this.onFragDecrypted, this)
    hls.on(Events.INIT_PTS_FOUND, this.onInitPtsFound, this)
    hls.on(Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this)
    hls.on(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
  }
  destroy() {
    const { hls } = this
    hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
    hls.off(Events.MANIFEST_LOADING, this.onManifestLoading, this)
    hls.off(Events.MANIFEST_LOADED, this.onManifestLoaded, this)
    hls.off(Events.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this)
    hls.off(Events.FRAG_LOADING, this.onFragLoading, this)
    hls.off(Events.FRAG_LOADED, this.onFragLoaded, this)
    hls.off(Events.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this)
    hls.off(Events.FRAG_DECRYPTED, this.onFragDecrypted, this)
    hls.off(Events.INIT_PTS_FOUND, this.onInitPtsFound, this)
    hls.off(Events.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this)
    hls.off(Events.BUFFER_FLUSHING, this.onBufferFlushing, this)
    this.hls = this.config = this.cea608Parser1 = this.cea608Parser2 = null
  }
  addCues(trackName, startTime, endTime, screen, cueRanges) {
    let merged = false
    for (let i = cueRanges.length; i--; ) {
      const cueRange = cueRanges[i]
      const overlap = intersection(cueRange[0], cueRange[1], startTime, endTime)
      if (overlap >= 0) {
        cueRange[0] = Math.min(cueRange[0], startTime)
        cueRange[1] = Math.max(cueRange[1], endTime)
        merged = true
        if (overlap / (endTime - startTime) > 0.5) {
          return
        }
      }
    }
    if (!merged) {
      cueRanges.push([startTime, endTime])
    }
    if (this.config.renderTextTracksNatively) {
      const track = this.captionsTracks[trackName]
      this.Cues.newCue(track, startTime, endTime, screen)
    } else {
      const cues = this.Cues.newCue(null, startTime, endTime, screen)
      this.hls.trigger(Events.CUES_PARSED, {
        type: 'captions',
        cues,
        track: trackName
      })
    }
  }
  onInitPtsFound(event, { frag, id, initPTS, timescale }) {
    const { unparsedVttFrags } = this
    if (id === 'main') {
      this.initPTS[frag.cc] = initPTS
      this.timescale[frag.cc] = timescale
    }
    if (unparsedVttFrags.length) {
      this.unparsedVttFrags = []
      unparsedVttFrags.forEach(frag2 => {
        this.onFragLoaded(Events.FRAG_LOADED, frag2)
      })
    }
  }
  getExistingTrack(trackName) {
    const { media } = this
    if (media) {
      for (let i = 0; i < media.textTracks.length; i++) {
        const textTrack = media.textTracks[i]
        if (textTrack[trackName]) {
          return textTrack
        }
      }
    }
    return null
  }
  createCaptionsTrack(trackName) {
    if (this.config.renderTextTracksNatively) {
      this.createNativeTrack(trackName)
    } else {
      this.createNonNativeTrack(trackName)
    }
  }
  createNativeTrack(trackName) {
    if (this.captionsTracks[trackName]) {
      return
    }
    const { captionsProperties, captionsTracks, media } = this
    const { label, languageCode } = captionsProperties[trackName]
    const existingTrack = this.getExistingTrack(trackName)
    if (!existingTrack) {
      const textTrack = this.createTextTrack('captions', label, languageCode)
      if (textTrack) {
        textTrack[trackName] = true
        captionsTracks[trackName] = textTrack
      }
    } else {
      captionsTracks[trackName] = existingTrack
      clearCurrentCues(captionsTracks[trackName])
      sendAddTrackEvent(captionsTracks[trackName], media)
    }
  }
  createNonNativeTrack(trackName) {
    if (this.nonNativeCaptionsTracks[trackName]) {
      return
    }
    const trackProperties = this.captionsProperties[trackName]
    if (!trackProperties) {
      return
    }
    const label = trackProperties.label
    const track = {
      _id: trackName,
      label,
      kind: 'captions',
      default: trackProperties.media ? !!trackProperties.media.default : false,
      closedCaptions: trackProperties.media
    }
    this.nonNativeCaptionsTracks[trackName] = track
    this.hls.trigger(Events.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: [track] })
  }
  createTextTrack(kind, label, lang) {
    const media = this.media
    if (!media) {
      return
    }
    return media.addTextTrack(kind, label, lang)
  }
  onMediaAttaching(event, data) {
    this.media = data.media
    this._cleanTracks()
  }
  onMediaDetaching() {
    const { captionsTracks } = this
    Object.keys(captionsTracks).forEach(trackName => {
      clearCurrentCues(captionsTracks[trackName])
      delete captionsTracks[trackName]
    })
    this.nonNativeCaptionsTracks = {}
  }
  onManifestLoading() {
    this.lastSn = -1
    this.prevCC = -1
    this.vttCCs = newVTTCCs()
    this._cleanTracks()
    this.tracks = []
    this.captionsTracks = {}
    this.nonNativeCaptionsTracks = {}
    this.textTracks = []
    this.unparsedVttFrags = this.unparsedVttFrags || []
    this.initPTS = []
    this.timescale = []
    if (this.cea608Parser1 && this.cea608Parser2) {
      this.cea608Parser1.reset()
      this.cea608Parser2.reset()
    }
  }
  _cleanTracks() {
    const { media } = this
    if (!media) {
      return
    }
    const textTracks = media.textTracks
    if (textTracks) {
      for (let i = 0; i < textTracks.length; i++) {
        clearCurrentCues(textTracks[i])
      }
    }
  }
  onSubtitleTracksUpdated(event, data) {
    this.textTracks = []
    const tracks = data.subtitleTracks || []
    const hasIMSC1 = tracks.some(track => track.textCodec === IMSC1_CODEC)
    if (this.config.enableWebVTT || (hasIMSC1 && this.config.enableIMSC1)) {
      const sameTracks =
        this.tracks && tracks && this.tracks.length === tracks.length
      this.tracks = tracks || []
      if (this.config.renderTextTracksNatively) {
        const inUseTracks = this.media ? this.media.textTracks : []
        this.tracks.forEach((track, index) => {
          let textTrack
          if (index < inUseTracks.length) {
            let inUseTrack = null
            for (let i = 0; i < inUseTracks.length; i++) {
              if (canReuseVttTextTrack(inUseTracks[i], track)) {
                inUseTrack = inUseTracks[i]
                break
              }
            }
            if (inUseTrack) {
              textTrack = inUseTrack
            }
          }
          if (textTrack) {
            clearCurrentCues(textTrack)
          } else {
            textTrack = this.createTextTrack(
              'subtitles',
              track.name,
              track.lang
            )
            if (textTrack) {
              textTrack.mode = 'disabled'
            }
          }
          if (textTrack) {
            textTrack.groupId = track.groupId
            this.textTracks.push(textTrack)
          }
        })
      } else if (!sameTracks && this.tracks && this.tracks.length) {
        const tracksList = this.tracks.map(track => {
          return {
            label: track.name,
            kind: track.type.toLowerCase(),
            default: track.default,
            subtitleTrack: track
          }
        })
        this.hls.trigger(Events.NON_NATIVE_TEXT_TRACKS_FOUND, {
          tracks: tracksList
        })
      }
    }
  }
  onManifestLoaded(event, data) {
    if (this.config.enableCEA708Captions && data.captions) {
      data.captions.forEach(captionsTrack => {
        const instreamIdMatch = /(?:CC|SERVICE)([1-4])/.exec(
          captionsTrack.instreamId
        )
        if (!instreamIdMatch) {
          return
        }
        const trackName = `textTrack${instreamIdMatch[1]}`
        const trackProperties = this.captionsProperties[trackName]
        if (!trackProperties) {
          return
        }
        trackProperties.label = captionsTrack.name
        if (captionsTrack.lang) {
          trackProperties.languageCode = captionsTrack.lang
        }
        trackProperties.media = captionsTrack
      })
    }
  }
  onFragLoading(event, data) {
    const { cea608Parser1, cea608Parser2, lastSn } = this
    if (!this.enabled || !(cea608Parser1 && cea608Parser2)) {
      return
    }
    if (data.frag.type === PlaylistLevelType.MAIN) {
      const sn = data.frag.sn
      if (sn !== lastSn + 1) {
        cea608Parser1.reset()
        cea608Parser2.reset()
      }
      this.lastSn = sn
    }
  }
  onFragLoaded(event, data) {
    const { frag, payload } = data
    const { initPTS, unparsedVttFrags } = this
    if (frag.type === PlaylistLevelType.SUBTITLE) {
      if (payload.byteLength) {
        if (!Number.isFinite(initPTS[frag.cc])) {
          unparsedVttFrags.push(data)
          if (initPTS.length) {
            this.hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
              success: false,
              frag,
              error: new Error('Missing initial subtitle PTS')
            })
          }
          return
        }
        const decryptData = frag.decryptdata
        if (
          decryptData == null ||
          decryptData.key == null ||
          decryptData.method !== 'AES-128'
        ) {
          const trackPlaylistMedia = this.tracks[frag.level]
          const vttCCs = this.vttCCs
          if (!vttCCs[frag.cc]) {
            vttCCs[frag.cc] = {
              start: frag.start,
              prevCC: this.prevCC,
              new: true
            }
            this.prevCC = frag.cc
          }
          if (
            trackPlaylistMedia &&
            trackPlaylistMedia.textCodec === IMSC1_CODEC
          ) {
            this._parseIMSC1(frag, payload)
          } else {
            this._parseVTTs(frag, payload, vttCCs)
          }
        }
      } else {
        this.hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
          success: false,
          frag,
          error: new Error('Empty subtitle payload')
        })
      }
    }
  }
  _parseIMSC1(frag, payload) {
    const hls = this.hls
    parseIMSC1(
      payload,
      this.initPTS[frag.cc],
      this.timescale[frag.cc],
      cues => {
        this._appendCues(cues, frag.level)
        hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
          success: true,
          frag
        })
      },
      error => {
        logger.log(`Failed to parse IMSC1: ${error}`)
        hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
          success: false,
          frag,
          error
        })
      }
    )
  }
  _parseVTTs(frag, payload, vttCCs) {
    const hls = this.hls
    parseWebVTT(
      payload,
      this.initPTS[frag.cc],
      this.timescale[frag.cc],
      vttCCs,
      frag.cc,
      frag.start,
      cues => {
        this._appendCues(cues, frag.level)
        hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
          success: true,
          frag
        })
      },
      error => {
        this._fallbackToIMSC1(frag, payload)
        logger.log(`Failed to parse VTT cue: ${error}`)
        hls.trigger(Events.SUBTITLE_FRAG_PROCESSED, {
          success: false,
          frag,
          error
        })
      }
    )
  }
  _fallbackToIMSC1(frag, payload) {
    const trackPlaylistMedia = this.tracks[frag.level]
    if (!trackPlaylistMedia.textCodec) {
      parseIMSC1(
        payload,
        this.initPTS[frag.cc],
        this.timescale[frag.cc],
        () => {
          trackPlaylistMedia.textCodec = IMSC1_CODEC
          this._parseIMSC1(frag, payload)
        },
        () => {
          trackPlaylistMedia.textCodec = 'wvtt'
        }
      )
    }
  }
  _appendCues(cues, fragLevel) {
    const hls = this.hls
    if (this.config.renderTextTracksNatively) {
      const textTrack = this.textTracks[fragLevel]
      if (textTrack.mode === 'disabled') {
        return
      }
      cues.forEach(cue => addCueToTrack(textTrack, cue))
    } else {
      const currentTrack = this.tracks[fragLevel]
      const track = currentTrack.default ? 'default' : 'subtitles' + fragLevel
      hls.trigger(Events.CUES_PARSED, { type: 'subtitles', cues, track })
    }
  }
  onFragDecrypted(event, data) {
    const { frag } = data
    if (frag.type === PlaylistLevelType.SUBTITLE) {
      if (!Number.isFinite(this.initPTS[frag.cc])) {
        this.unparsedVttFrags.push(data)
        return
      }
      this.onFragLoaded(Events.FRAG_LOADED, data)
    }
  }
  onSubtitleTracksCleared() {
    this.tracks = []
    this.captionsTracks = {}
  }
  onFragParsingUserdata(event, data) {
    const { cea608Parser1, cea608Parser2 } = this
    if (!this.enabled || !(cea608Parser1 && cea608Parser2)) {
      return
    }
    for (let i = 0; i < data.samples.length; i++) {
      const ccBytes = data.samples[i].bytes
      if (ccBytes) {
        const ccdatas = this.extractCea608Data(ccBytes)
        cea608Parser1.addData(data.samples[i].pts, ccdatas[0])
        cea608Parser2.addData(data.samples[i].pts, ccdatas[1])
      }
    }
  }
  onBufferFlushing(event, { startOffset, endOffset, type }) {
    if (!type || type === 'video') {
      const { media } = this
      if (!media || media.currentTime < endOffset) {
        return
      }
      const { captionsTracks } = this
      Object.keys(captionsTracks).forEach(trackName =>
        removeCuesInRange(captionsTracks[trackName], startOffset, endOffset)
      )
    }
  }
  extractCea608Data(byteArray) {
    const count = byteArray[0] & 31
    let position = 2
    const actualCCBytes = [[], []]
    for (let j = 0; j < count; j++) {
      const tmpByte = byteArray[position++]
      const ccbyte1 = 127 & byteArray[position++]
      const ccbyte2 = 127 & byteArray[position++]
      const ccValid = (4 & tmpByte) !== 0
      const ccType = 3 & tmpByte
      if (ccbyte1 === 0 && ccbyte2 === 0) {
        continue
      }
      if (ccValid) {
        if (ccType === 0 || ccType === 1) {
          actualCCBytes[ccType].push(ccbyte1)
          actualCCBytes[ccType].push(ccbyte2)
        }
      }
    }
    return actualCCBytes
  }
}
function canReuseVttTextTrack(inUseTrack, manifestTrack) {
  return (
    inUseTrack &&
    inUseTrack.label === manifestTrack.name &&
    !(inUseTrack.textTrack1 || inUseTrack.textTrack2)
  )
}
function intersection(x1, x2, y1, y2) {
  return Math.min(x2, y2) - Math.max(x1, y1)
}
function newVTTCCs() {
  return {
    ccOffset: 0,
    presentationOffset: 0,
    0: {
      start: 0,
      prevCC: -1,
      new: false
    }
  }
}

// src/controller/cap-level-controller.ts
var CapLevelController = class {
  constructor(hls) {
    this.hls = hls
    this.autoLevelCapping = Number.POSITIVE_INFINITY
    this.firstLevel = -1
    this.media = null
    this.restrictedLevels = []
    this.timer = void 0
    this.clientRect = null
    this.registerListeners()
  }
  setStreamController(streamController) {
    this.streamController = streamController
  }
  destroy() {
    this.unregisterListener()
    if (this.hls.config.capLevelToPlayerSize) {
      this.stopCapping()
    }
    this.media = null
    this.clientRect = null
    this.hls = this.streamController = null
  }
  registerListeners() {
    const { hls } = this
    hls.on(Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this)
    hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.on(Events.BUFFER_CODECS, this.onBufferCodecs, this)
    hls.on(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
  }
  unregisterListener() {
    const { hls } = this
    hls.off(Events.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this)
    hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
    hls.off(Events.BUFFER_CODECS, this.onBufferCodecs, this)
    hls.off(Events.MEDIA_DETACHING, this.onMediaDetaching, this)
  }
  onFpsDropLevelCapping(event, data) {
    if (
      CapLevelController.isLevelAllowed(
        data.droppedLevel,
        this.restrictedLevels
      )
    ) {
      this.restrictedLevels.push(data.droppedLevel)
    }
  }
  onMediaAttaching(event, data) {
    this.media = data.media instanceof HTMLVideoElement ? data.media : null
  }
  onManifestParsed(event, data) {
    const hls = this.hls
    this.restrictedLevels = []
    this.firstLevel = data.firstLevel
    if (hls.config.capLevelToPlayerSize && data.video) {
      this.startCapping()
    }
  }
  onBufferCodecs(event, data) {
    const hls = this.hls
    if (hls.config.capLevelToPlayerSize && data.video) {
      this.startCapping()
    }
  }
  onMediaDetaching() {
    this.stopCapping()
  }
  detectPlayerSize() {
    if (this.media && this.mediaHeight > 0 && this.mediaWidth > 0) {
      const levels = this.hls.levels
      if (levels.length) {
        const hls = this.hls
        hls.autoLevelCapping = this.getMaxLevel(levels.length - 1)
        if (
          hls.autoLevelCapping > this.autoLevelCapping &&
          this.streamController
        ) {
          this.streamController.nextLevelSwitch()
        }
        this.autoLevelCapping = hls.autoLevelCapping
      }
    }
  }
  getMaxLevel(capLevelIndex) {
    const levels = this.hls.levels
    if (!levels.length) {
      return -1
    }
    const validLevels = levels.filter(
      (level, index) =>
        CapLevelController.isLevelAllowed(index, this.restrictedLevels) &&
        index <= capLevelIndex
    )
    this.clientRect = null
    return CapLevelController.getMaxLevelByMediaSize(
      validLevels,
      this.mediaWidth,
      this.mediaHeight
    )
  }
  startCapping() {
    if (this.timer) {
      return
    }
    this.autoLevelCapping = Number.POSITIVE_INFINITY
    this.hls.firstLevel = this.getMaxLevel(this.firstLevel)
    self.clearInterval(this.timer)
    this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3)
    this.detectPlayerSize()
  }
  stopCapping() {
    this.restrictedLevels = []
    this.firstLevel = -1
    this.autoLevelCapping = Number.POSITIVE_INFINITY
    if (this.timer) {
      self.clearInterval(this.timer)
      this.timer = void 0
    }
  }
  getDimensions() {
    if (this.clientRect) {
      return this.clientRect
    }
    const media = this.media
    const boundsRect = {
      width: 0,
      height: 0
    }
    if (media) {
      const clientRect = media.getBoundingClientRect()
      boundsRect.width = clientRect.width
      boundsRect.height = clientRect.height
      if (!boundsRect.width && !boundsRect.height) {
        boundsRect.width =
          clientRect.right - clientRect.left || media.width || 0
        boundsRect.height =
          clientRect.bottom - clientRect.top || media.height || 0
      }
    }
    this.clientRect = boundsRect
    return boundsRect
  }
  get mediaWidth() {
    return this.getDimensions().width * CapLevelController.contentScaleFactor
  }
  get mediaHeight() {
    return this.getDimensions().height * CapLevelController.contentScaleFactor
  }
  static get contentScaleFactor() {
    let pixelRatio = 1
    try {
      pixelRatio = self.devicePixelRatio
    } catch (e) {}
    return pixelRatio
  }
  static isLevelAllowed(level, restrictedLevels = []) {
    return restrictedLevels.indexOf(level) === -1
  }
  static getMaxLevelByMediaSize(levels, width, height) {
    if (!levels || !levels.length) {
      return -1
    }
    const atGreatestBandiwdth = (curLevel, nextLevel) => {
      if (!nextLevel) {
        return true
      }
      return (
        curLevel.width !== nextLevel.width ||
        curLevel.height !== nextLevel.height
      )
    }
    let maxLevelIndex = levels.length - 1
    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i]
      if (
        (level.width >= width || level.height >= height) &&
        atGreatestBandiwdth(level, levels[i + 1])
      ) {
        maxLevelIndex = i
        break
      }
    }
    return maxLevelIndex
  }
}
var cap_level_controller_default = CapLevelController

// src/controller/fps-controller.ts
var FPSController = class {
  constructor(hls) {
    this.isVideoPlaybackQualityAvailable = false
    this.media = null
    this.lastDroppedFrames = 0
    this.lastDecodedFrames = 0
    this.hls = hls
    this.registerListeners()
  }
  setStreamController(streamController) {
    this.streamController = streamController
  }
  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
  }
  unregisterListeners() {
    this.hls.off(Events.MEDIA_ATTACHING, this.onMediaAttaching)
  }
  destroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.unregisterListeners()
    this.isVideoPlaybackQualityAvailable = false
    this.media = null
  }
  onMediaAttaching(event, data) {
    const config = this.hls.config
    if (config.capLevelOnFPSDrop) {
      const media =
        data.media instanceof self.HTMLVideoElement ? data.media : null
      this.media = media
      if (media && typeof media.getVideoPlaybackQuality === 'function') {
        this.isVideoPlaybackQualityAvailable = true
      }
      self.clearInterval(this.timer)
      this.timer = self.setInterval(
        this.checkFPSInterval.bind(this),
        config.fpsDroppedMonitoringPeriod
      )
    }
  }
  checkFPS(video, decodedFrames, droppedFrames) {
    const currentTime = performance.now()
    if (decodedFrames) {
      if (this.lastTime) {
        const currentPeriod = currentTime - this.lastTime
        const currentDropped = droppedFrames - this.lastDroppedFrames
        const currentDecoded = decodedFrames - this.lastDecodedFrames
        const droppedFPS = (1e3 * currentDropped) / currentPeriod
        const hls = this.hls
        hls.trigger(Events.FPS_DROP, {
          currentDropped,
          currentDecoded,
          totalDroppedFrames: droppedFrames
        })
        if (droppedFPS > 0) {
          if (
            currentDropped >
            hls.config.fpsDroppedMonitoringThreshold * currentDecoded
          ) {
            let currentLevel = hls.currentLevel
            logger.warn(
              'drop FPS ratio greater than max allowed value for currentLevel: ' +
                currentLevel
            )
            if (
              currentLevel > 0 &&
              (hls.autoLevelCapping === -1 ||
                hls.autoLevelCapping >= currentLevel)
            ) {
              currentLevel = currentLevel - 1
              hls.trigger(Events.FPS_DROP_LEVEL_CAPPING, {
                level: currentLevel,
                droppedLevel: hls.currentLevel
              })
              hls.autoLevelCapping = currentLevel
              this.streamController.nextLevelSwitch()
            }
          }
        }
      }
      this.lastTime = currentTime
      this.lastDroppedFrames = droppedFrames
      this.lastDecodedFrames = decodedFrames
    }
  }
  checkFPSInterval() {
    const video = this.media
    if (video) {
      if (this.isVideoPlaybackQualityAvailable) {
        const videoPlaybackQuality = video.getVideoPlaybackQuality()
        this.checkFPS(
          video,
          videoPlaybackQuality.totalVideoFrames,
          videoPlaybackQuality.droppedVideoFrames
        )
      } else {
        this.checkFPS(
          video,
          video.webkitDecodedFrameCount,
          video.webkitDroppedFrameCount
        )
      }
    }
  }
}
var fps_controller_default = FPSController

// src/utils/mediakeys-helper.ts
var KeySystems
;(function (KeySystems2) {
  KeySystems2['WIDEVINE'] = 'com.widevine.alpha'
  KeySystems2['PLAYREADY'] = 'com.microsoft.playready'
})(KeySystems || (KeySystems = {}))
var requestMediaKeySystemAccess = (function () {
  if (
    typeof self !== 'undefined' &&
    self.navigator &&
    self.navigator.requestMediaKeySystemAccess
  ) {
    return self.navigator.requestMediaKeySystemAccess.bind(self.navigator)
  } else {
    return null
  }
})()

// src/controller/eme-controller.ts
var MAX_LICENSE_REQUEST_FAILURES = 3
var createWidevineMediaKeySystemConfigurations = function (
  audioCodecs,
  videoCodecs,
  drmSystemOptions
) {
  const baseConfig = {
    audioCapabilities: [],
    videoCapabilities: []
  }
  audioCodecs.forEach(codec => {
    baseConfig.audioCapabilities.push({
      contentType: `audio/mp4; codecs="${codec}"`,
      robustness: drmSystemOptions.audioRobustness || ''
    })
  })
  videoCodecs.forEach(codec => {
    baseConfig.videoCapabilities.push({
      contentType: `video/mp4; codecs="${codec}"`,
      robustness: drmSystemOptions.videoRobustness || ''
    })
  })
  return [baseConfig]
}
var getSupportedMediaKeySystemConfigurations = function (
  keySystem,
  audioCodecs,
  videoCodecs,
  drmSystemOptions
) {
  switch (keySystem) {
    case KeySystems.WIDEVINE:
      return createWidevineMediaKeySystemConfigurations(
        audioCodecs,
        videoCodecs,
        drmSystemOptions
      )
    default:
      throw new Error(`Unknown key-system: ${keySystem}`)
  }
}
var EMEController = class {
  constructor(hls) {
    this._mediaKeysList = []
    this._media = null
    this._hasSetMediaKeys = false
    this._requestLicenseFailureCount = 0
    this.mediaKeysPromise = null
    this._onMediaEncrypted = this.onMediaEncrypted.bind(this)
    this.hls = hls
    this._config = hls.config
    this._widevineLicenseUrl = this._config.widevineLicenseUrl
    this._licenseXhrSetup = this._config.licenseXhrSetup
    this._licenseResponseCallback = this._config.licenseResponseCallback
    this._emeEnabled = this._config.emeEnabled
    this._requestMediaKeySystemAccess = this._config.requestMediaKeySystemAccessFunc
    this._drmSystemOptions = this._config.drmSystemOptions
    this._registerListeners()
  }
  destroy() {
    this._unregisterListeners()
    this.hls = this._onMediaEncrypted = null
    this._requestMediaKeySystemAccess = null
  }
  _registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    this.hls.on(Events.MEDIA_DETACHED, this.onMediaDetached, this)
    this.hls.on(Events.MANIFEST_PARSED, this.onManifestParsed, this)
  }
  _unregisterListeners() {
    this.hls.off(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    this.hls.off(Events.MEDIA_DETACHED, this.onMediaDetached, this)
    this.hls.off(Events.MANIFEST_PARSED, this.onManifestParsed, this)
  }
  getLicenseServerUrl(keySystem) {
    switch (keySystem) {
      case KeySystems.WIDEVINE:
        if (!this._widevineLicenseUrl) {
          break
        }
        return this._widevineLicenseUrl
    }
    throw new Error(
      `no license server URL configured for key-system "${keySystem}"`
    )
  }
  _attemptKeySystemAccess(keySystem, audioCodecs, videoCodecs) {
    const mediaKeySystemConfigs = getSupportedMediaKeySystemConfigurations(
      keySystem,
      audioCodecs,
      videoCodecs,
      this._drmSystemOptions
    )
    logger.log('Requesting encrypted media key-system access')
    const keySystemAccessPromise = this.requestMediaKeySystemAccess(
      keySystem,
      mediaKeySystemConfigs
    )
    this.mediaKeysPromise = keySystemAccessPromise.then(mediaKeySystemAccess =>
      this._onMediaKeySystemAccessObtained(keySystem, mediaKeySystemAccess)
    )
    keySystemAccessPromise.catch(err => {
      logger.error(`Failed to obtain key-system "${keySystem}" access:`, err)
    })
  }
  get requestMediaKeySystemAccess() {
    if (!this._requestMediaKeySystemAccess) {
      throw new Error('No requestMediaKeySystemAccess function configured')
    }
    return this._requestMediaKeySystemAccess
  }
  _onMediaKeySystemAccessObtained(keySystem, mediaKeySystemAccess) {
    logger.log(`Access for key-system "${keySystem}" obtained`)
    const mediaKeysListItem = {
      mediaKeysSessionInitialized: false,
      mediaKeySystemAccess,
      mediaKeySystemDomain: keySystem
    }
    this._mediaKeysList.push(mediaKeysListItem)
    const mediaKeysPromise = Promise.resolve()
      .then(() => mediaKeySystemAccess.createMediaKeys())
      .then(mediaKeys => {
        mediaKeysListItem.mediaKeys = mediaKeys
        logger.log(`Media-keys created for key-system "${keySystem}"`)
        this._onMediaKeysCreated()
        return mediaKeys
      })
    mediaKeysPromise.catch(err => {
      logger.error('Failed to create media-keys:', err)
    })
    return mediaKeysPromise
  }
  _onMediaKeysCreated() {
    this._mediaKeysList.forEach(mediaKeysListItem => {
      if (!mediaKeysListItem.mediaKeysSession) {
        mediaKeysListItem.mediaKeysSession = mediaKeysListItem.mediaKeys.createSession()
        this._onNewMediaKeySession(mediaKeysListItem.mediaKeysSession)
      }
    })
  }
  _onNewMediaKeySession(keySession) {
    logger.log(`New key-system session ${keySession.sessionId}`)
    keySession.addEventListener(
      'message',
      event => {
        this._onKeySessionMessage(keySession, event.message)
      },
      false
    )
  }
  _onKeySessionMessage(keySession, message) {
    logger.log('Got EME message event, creating license request')
    this._requestLicense(message, data => {
      logger.log(
        `Received license data (length: ${
          data ? data.byteLength : data
        }), updating key-session`
      )
      keySession.update(data)
    })
  }
  onMediaEncrypted(e) {
    logger.log(`Media is encrypted using "${e.initDataType}" init data type`)
    if (!this.mediaKeysPromise) {
      logger.error(
        'Fatal: Media is encrypted but no CDM access or no keys have been requested'
      )
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_NO_KEYS,
        fatal: true
      })
      return
    }
    const finallySetKeyAndStartSession = mediaKeys => {
      if (!this._media) {
        return
      }
      this._attemptSetMediaKeys(mediaKeys)
      this._generateRequestWithPreferredKeySession(e.initDataType, e.initData)
    }
    this.mediaKeysPromise
      .then(finallySetKeyAndStartSession)
      .catch(finallySetKeyAndStartSession)
  }
  _attemptSetMediaKeys(mediaKeys) {
    if (!this._media) {
      throw new Error(
        'Attempted to set mediaKeys without first attaching a media element'
      )
    }
    if (!this._hasSetMediaKeys) {
      const keysListItem = this._mediaKeysList[0]
      if (!keysListItem || !keysListItem.mediaKeys) {
        logger.error(
          'Fatal: Media is encrypted but no CDM access or no keys have been obtained yet'
        )
        this.hls.trigger(Events.ERROR, {
          type: ErrorTypes.KEY_SYSTEM_ERROR,
          details: ErrorDetails.KEY_SYSTEM_NO_KEYS,
          fatal: true
        })
        return
      }
      logger.log('Setting keys for encrypted media')
      this._media.setMediaKeys(keysListItem.mediaKeys)
      this._hasSetMediaKeys = true
    }
  }
  _generateRequestWithPreferredKeySession(initDataType, initData) {
    const keysListItem = this._mediaKeysList[0]
    if (!keysListItem) {
      logger.error(
        'Fatal: Media is encrypted but not any key-system access has been obtained yet'
      )
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_NO_ACCESS,
        fatal: true
      })
      return
    }
    if (keysListItem.mediaKeysSessionInitialized) {
      logger.warn('Key-Session already initialized but requested again')
      return
    }
    const keySession = keysListItem.mediaKeysSession
    if (!keySession) {
      logger.error('Fatal: Media is encrypted but no key-session existing')
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_NO_SESSION,
        fatal: true
      })
      return
    }
    if (!initData) {
      logger.warn(
        'Fatal: initData required for generating a key session is null'
      )
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_NO_INIT_DATA,
        fatal: true
      })
      return
    }
    logger.log(
      `Generating key-session request for "${initDataType}" init data type`
    )
    keysListItem.mediaKeysSessionInitialized = true
    keySession
      .generateRequest(initDataType, initData)
      .then(() => {
        logger.debug('Key-session generation succeeded')
      })
      .catch(err => {
        logger.error('Error generating key-session request:', err)
        this.hls.trigger(Events.ERROR, {
          type: ErrorTypes.KEY_SYSTEM_ERROR,
          details: ErrorDetails.KEY_SYSTEM_NO_SESSION,
          fatal: false
        })
      })
  }
  _createLicenseXhr(url, keyMessage, callback) {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(
      this,
      xhr,
      url,
      keyMessage,
      callback
    )
    let licenseXhrSetup = this._licenseXhrSetup
    if (licenseXhrSetup) {
      try {
        licenseXhrSetup.call(this.hls, xhr, url)
        licenseXhrSetup = void 0
      } catch (e) {
        logger.error(e)
      }
    }
    try {
      if (!xhr.readyState) {
        xhr.open('POST', url, true)
      }
      if (licenseXhrSetup) {
        licenseXhrSetup.call(this.hls, xhr, url)
      }
    } catch (e) {
      throw new Error(`issue setting up KeySystem license XHR ${e}`)
    }
    return xhr
  }
  _onLicenseRequestReadyStageChange(xhr, url, keyMessage, callback) {
    switch (xhr.readyState) {
      case 4:
        if (xhr.status === 200) {
          this._requestLicenseFailureCount = 0
          logger.log('License request succeeded')
          let data = xhr.response
          const licenseResponseCallback = this._licenseResponseCallback
          if (licenseResponseCallback) {
            try {
              data = licenseResponseCallback.call(this.hls, xhr, url)
            } catch (e) {
              logger.error(e)
            }
          }
          callback(data)
        } else {
          logger.error(
            `License Request XHR failed (${url}). Status: ${xhr.status} (${xhr.statusText})`
          )
          this._requestLicenseFailureCount++
          if (this._requestLicenseFailureCount > MAX_LICENSE_REQUEST_FAILURES) {
            this.hls.trigger(Events.ERROR, {
              type: ErrorTypes.KEY_SYSTEM_ERROR,
              details: ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
              fatal: true
            })
            return
          }
          const attemptsLeft =
            MAX_LICENSE_REQUEST_FAILURES - this._requestLicenseFailureCount + 1
          logger.warn(`Retrying license request, ${attemptsLeft} attempts left`)
          this._requestLicense(keyMessage, callback)
        }
        break
    }
  }
  _generateLicenseRequestChallenge(keysListItem, keyMessage) {
    switch (keysListItem.mediaKeySystemDomain) {
      case KeySystems.WIDEVINE:
        return keyMessage
    }
    throw new Error(
      `unsupported key-system: ${keysListItem.mediaKeySystemDomain}`
    )
  }
  _requestLicense(keyMessage, callback) {
    logger.log('Requesting content license for key-system')
    const keysListItem = this._mediaKeysList[0]
    if (!keysListItem) {
      logger.error(
        'Fatal error: Media is encrypted but no key-system access has been obtained yet'
      )
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_NO_ACCESS,
        fatal: true
      })
      return
    }
    try {
      const url = this.getLicenseServerUrl(keysListItem.mediaKeySystemDomain)
      const xhr = this._createLicenseXhr(url, keyMessage, callback)
      logger.log(`Sending license request to URL: ${url}`)
      const challenge = this._generateLicenseRequestChallenge(
        keysListItem,
        keyMessage
      )
      xhr.send(challenge)
    } catch (e) {
      logger.error(`Failure requesting DRM license: ${e}`)
      this.hls.trigger(Events.ERROR, {
        type: ErrorTypes.KEY_SYSTEM_ERROR,
        details: ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
        fatal: true
      })
    }
  }
  onMediaAttached(event, data) {
    if (!this._emeEnabled) {
      return
    }
    const media = data.media
    this._media = media
    media.addEventListener('encrypted', this._onMediaEncrypted)
  }
  onMediaDetached() {
    const media = this._media
    const mediaKeysList = this._mediaKeysList
    if (!media) {
      return
    }
    media.removeEventListener('encrypted', this._onMediaEncrypted)
    this._media = null
    this._mediaKeysList = []
    Promise.all(
      mediaKeysList.map(mediaKeysListItem => {
        if (mediaKeysListItem.mediaKeysSession) {
          return mediaKeysListItem.mediaKeysSession.close().catch(() => {})
        }
      })
    )
      .then(() => {
        return media.setMediaKeys(null)
      })
      .catch(() => {})
  }
  onManifestParsed(event, data) {
    if (!this._emeEnabled) {
      return
    }
    const audioCodecs = data.levels
      .map(level => level.audioCodec)
      .filter(audioCodec => !!audioCodec)
    const videoCodecs = data.levels
      .map(level => level.videoCodec)
      .filter(videoCodec => !!videoCodec)
    this._attemptKeySystemAccess(KeySystems.WIDEVINE, audioCodecs, videoCodecs)
  }
}
var eme_controller_default = EMEController

// src/utils/xhr-loader.ts
var AGE_HEADER_LINE_REGEX = /^age:\s*[\d.]+\s*$/m
var XhrLoader = class {
  constructor(config) {
    this.config = null
    this.callbacks = null
    this.loader = null
    this.xhrSetup = config ? config.xhrSetup : null
    this.stats = new LoadStats()
    this.retryDelay = 0
  }
  destroy() {
    this.callbacks = null
    this.abortInternal()
    this.loader = null
    this.config = null
  }
  abortInternal() {
    const loader = this.loader
    self.clearTimeout(this.requestTimeout)
    self.clearTimeout(this.retryTimeout)
    if (loader) {
      loader.onreadystatechange = null
      loader.onprogress = null
      if (loader.readyState !== 4) {
        this.stats.aborted = true
        loader.abort()
      }
    }
  }
  abort() {
    this.abortInternal()
    if (this.callbacks?.onAbort) {
      this.callbacks.onAbort(this.stats, this.context, this.loader)
    }
  }
  load(context, config, callbacks) {
    if (this.stats.loading.start) {
      throw new Error('Loader can only be used once.')
    }
    this.stats.loading.start = self.performance.now()
    this.context = context
    this.config = config
    this.callbacks = callbacks
    this.retryDelay = config.retryDelay
    this.loadInternal()
  }
  loadInternal() {
    const { config, context } = this
    if (!config) {
      return
    }
    const xhr = (this.loader = new self.XMLHttpRequest())
    const stats = this.stats
    stats.loading.first = 0
    stats.loaded = 0
    const xhrSetup = this.xhrSetup
    try {
      if (xhrSetup) {
        try {
          xhrSetup(xhr, context.url)
        } catch (e) {
          xhr.open('GET', context.url, true)
          xhrSetup(xhr, context.url)
        }
      }
      if (!xhr.readyState) {
        xhr.open('GET', context.url, true)
      }
    } catch (e) {
      this.callbacks.onError(
        { code: xhr.status, text: e.message },
        context,
        xhr
      )
      return
    }
    if (context.rangeEnd) {
      xhr.setRequestHeader(
        'Range',
        'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1)
      )
    }
    xhr.onreadystatechange = this.readystatechange.bind(this)
    xhr.onprogress = this.loadprogress.bind(this)
    xhr.responseType = context.responseType
    self.clearTimeout(this.requestTimeout)
    this.requestTimeout = self.setTimeout(
      this.loadtimeout.bind(this),
      config.timeout
    )
    xhr.send()
  }
  readystatechange() {
    const { context, loader: xhr, stats } = this
    if (!context || !xhr) {
      return
    }
    const readyState = xhr.readyState
    const config = this.config
    if (stats.aborted) {
      return
    }
    if (readyState >= 2) {
      self.clearTimeout(this.requestTimeout)
      if (stats.loading.first === 0) {
        stats.loading.first = Math.max(
          self.performance.now(),
          stats.loading.start
        )
      }
      if (readyState === 4) {
        xhr.onreadystatechange = null
        xhr.onprogress = null
        const status = xhr.status
        if (status >= 200 && status < 300) {
          stats.loading.end = Math.max(
            self.performance.now(),
            stats.loading.first
          )
          let data
          let len
          if (context.responseType === 'arraybuffer') {
            data = xhr.response
            len = data.byteLength
          } else {
            data = xhr.responseText
            len = data.length
          }
          stats.loaded = stats.total = len
          if (!this.callbacks) {
            return
          }
          const onProgress = this.callbacks.onProgress
          if (onProgress) {
            onProgress(stats, context, data, xhr)
          }
          if (!this.callbacks) {
            return
          }
          const response = {
            url: xhr.responseURL,
            data
          }
          this.callbacks.onSuccess(response, stats, context, xhr)
        } else {
          if (
            stats.retry >= config.maxRetry ||
            (status >= 400 && status < 499)
          ) {
            logger.error(`${status} while loading ${context.url}`)
            this.callbacks.onError(
              { code: status, text: xhr.statusText },
              context,
              xhr
            )
          } else {
            logger.warn(
              `${status} while loading ${context.url}, retrying in ${this.retryDelay}...`
            )
            this.abortInternal()
            this.loader = null
            self.clearTimeout(this.retryTimeout)
            this.retryTimeout = self.setTimeout(
              this.loadInternal.bind(this),
              this.retryDelay
            )
            this.retryDelay = Math.min(
              2 * this.retryDelay,
              config.maxRetryDelay
            )
            stats.retry++
          }
        }
      } else {
        self.clearTimeout(this.requestTimeout)
        this.requestTimeout = self.setTimeout(
          this.loadtimeout.bind(this),
          config.timeout
        )
      }
    }
  }
  loadtimeout() {
    logger.warn(`timeout while loading ${this.context.url}`)
    const callbacks = this.callbacks
    if (callbacks) {
      this.abortInternal()
      callbacks.onTimeout(this.stats, this.context, this.loader)
    }
  }
  loadprogress(event) {
    const stats = this.stats
    stats.loaded = event.loaded
    if (event.lengthComputable) {
      stats.total = event.total
    }
  }
  getCacheAge() {
    let result = null
    if (
      this.loader &&
      AGE_HEADER_LINE_REGEX.test(this.loader.getAllResponseHeaders())
    ) {
      const ageHeader = this.loader.getResponseHeader('age')
      result = ageHeader ? parseFloat(ageHeader) : null
    }
    return result
  }
}
var xhr_loader_default = XhrLoader

// src/utils/fetch-loader.ts
function fetchSupported() {
  if (
    self.fetch &&
    self.AbortController &&
    self.ReadableStream &&
    self.Request
  ) {
    try {
      new self.ReadableStream({})
      return true
    } catch (e) {}
  }
  return false
}
var FetchLoader = class {
  constructor(config) {
    this.config = null
    this.callbacks = null
    this.loader = null
    this.fetchSetup = config.fetchSetup || getRequest
    this.controller = new self.AbortController()
    this.stats = new LoadStats()
  }
  destroy() {
    this.loader = this.callbacks = null
    this.abortInternal()
  }
  abortInternal() {
    const response = this.response
    if (!response || !response.ok) {
      this.stats.aborted = true
      this.controller.abort()
    }
  }
  abort() {
    this.abortInternal()
    if (this.callbacks?.onAbort) {
      this.callbacks.onAbort(this.stats, this.context, this.response)
    }
  }
  load(context, config, callbacks) {
    const stats = this.stats
    if (stats.loading.start) {
      throw new Error('Loader can only be used once.')
    }
    stats.loading.start = self.performance.now()
    const initParams = getRequestParameters(context, this.controller.signal)
    const onProgress = callbacks.onProgress
    const isArrayBuffer = context.responseType === 'arraybuffer'
    const LENGTH = isArrayBuffer ? 'byteLength' : 'length'
    this.context = context
    this.config = config
    this.callbacks = callbacks
    this.request = this.fetchSetup(context, initParams)
    self.clearTimeout(this.requestTimeout)
    this.requestTimeout = self.setTimeout(() => {
      this.abortInternal()
      callbacks.onTimeout(stats, context, this.response)
    }, config.timeout)
    self
      .fetch(this.request)
      .then(response => {
        this.response = this.loader = response
        if (!response.ok) {
          const { status, statusText } = response
          throw new FetchError(
            statusText || 'fetch, bad network response',
            status,
            response
          )
        }
        stats.loading.first = Math.max(
          self.performance.now(),
          stats.loading.start
        )
        stats.total = parseInt(response.headers.get('Content-Length') || '0')
        if (onProgress && Number.isFinite(config.highWaterMark)) {
          return this.loadProgressively(
            response,
            stats,
            context,
            config.highWaterMark,
            onProgress
          )
        }
        if (isArrayBuffer) {
          return response.arrayBuffer()
        }
        return response.text()
      })
      .then(responseData => {
        const { response } = this
        self.clearTimeout(this.requestTimeout)
        stats.loading.end = Math.max(
          self.performance.now(),
          stats.loading.first
        )
        stats.loaded = stats.total = responseData[LENGTH]
        const loaderResponse = {
          url: response.url,
          data: responseData
        }
        if (onProgress && !Number.isFinite(config.highWaterMark)) {
          onProgress(stats, context, responseData, response)
        }
        callbacks.onSuccess(loaderResponse, stats, context, response)
      })
      .catch(error => {
        self.clearTimeout(this.requestTimeout)
        if (stats.aborted) {
          return
        }
        const code = error.code || 0
        callbacks.onError({ code, text: error.message }, context, error.details)
      })
  }
  getCacheAge() {
    let result = null
    if (this.response) {
      const ageHeader = this.response.headers.get('age')
      result = ageHeader ? parseFloat(ageHeader) : null
    }
    return result
  }
  loadProgressively(response, stats, context, highWaterMark = 0, onProgress) {
    const chunkCache = new chunk_cache_default()
    const reader = response.body.getReader()
    const pump = () => {
      return reader
        .read()
        .then(data => {
          if (data.done) {
            if (chunkCache.dataLength) {
              onProgress(stats, context, chunkCache.flush(), response)
            }
            return Promise.resolve(new ArrayBuffer(0))
          }
          const chunk = data.value
          const len = chunk.length
          stats.loaded += len
          if (len < highWaterMark || chunkCache.dataLength) {
            chunkCache.push(chunk)
            if (chunkCache.dataLength >= highWaterMark) {
              onProgress(stats, context, chunkCache.flush(), response)
            }
          } else {
            onProgress(stats, context, chunk, response)
          }
          return pump()
        })
        .catch(() => {
          return Promise.reject()
        })
    }
    return pump()
  }
}
function getRequestParameters(context, signal) {
  const initParams = {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    signal
  }
  if (context.rangeEnd) {
    initParams.headers = new self.Headers({
      Range: 'bytes=' + context.rangeStart + '-' + String(context.rangeEnd - 1)
    })
  }
  return initParams
}
function getRequest(context, initParams) {
  return new self.Request(context.url, initParams)
}
var FetchError = class extends Error {
  constructor(message, code, details) {
    super(message)
    this.code = code
    this.details = details
  }
}
var fetch_loader_default = FetchLoader

// src/utils/cues.ts
var WHITESPACE_CHAR = /\s/
var Cues = {
  newCue(track, startTime, endTime, captionScreen) {
    const result = []
    let row
    let cue
    let indenting
    let indent
    let text
    const Cue = self.VTTCue || self.TextTrackCue
    for (let r = 0; r < captionScreen.rows.length; r++) {
      row = captionScreen.rows[r]
      indenting = true
      indent = 0
      text = ''
      if (!row.isEmpty()) {
        for (let c = 0; c < row.chars.length; c++) {
          if (WHITESPACE_CHAR.test(row.chars[c].uchar) && indenting) {
            indent++
          } else {
            text += row.chars[c].uchar
            indenting = false
          }
        }
        row.cueStartTime = startTime
        if (startTime === endTime) {
          endTime += 1e-4
        }
        if (indent >= 16) {
          indent--
        } else {
          indent++
        }
        const cueText = fixLineBreaks(text.trim())
        const id = generateCueId(startTime, endTime, cueText)
        if (!track || !track.cues || !track.cues.getCueById(id)) {
          cue = new Cue(startTime, endTime, cueText)
          cue.id = id
          cue.line = r + 1
          cue.align = 'left'
          cue.position = 10 + Math.min(80, Math.floor((indent * 8) / 32) * 10)
          result.push(cue)
        }
      }
    }
    if (track && result.length) {
      result.sort((cueA, cueB) => {
        if (cueA.line === 'auto' || cueB.line === 'auto') {
          return 0
        }
        if (cueA.line > 8 && cueB.line > 8) {
          return cueB.line - cueA.line
        }
        return cueA.line - cueB.line
      })
      result.forEach(cue2 => addCueToTrack(track, cue2))
    }
    return result
  }
}
var cues_default = Cues

// src/config.ts
var __USE_SUBTITLES__
var __USE_ALT_AUDIO__
var __USE_EME_DRM__

var hlsDefaultConfig = {
  autoStartLoad: true,
  startPosition: -1,
  defaultAudioCodec: void 0,
  debug: false,
  capLevelOnFPSDrop: false,
  capLevelToPlayerSize: false,
  initialLiveManifestSize: 1,
  maxBufferLength: 30,
  backBufferLength: Infinity,
  maxBufferSize: 60 * 1e3 * 1e3,
  maxBufferHole: 0.1,
  highBufferWatchdogPeriod: 2,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 3,
  maxFragLookUpTolerance: 0.25,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: Infinity,
  liveSyncDuration: void 0,
  liveMaxLatencyDuration: void 0,
  maxLiveSyncPlaybackRate: 1,
  liveDurationInfinity: false,
  liveBackBufferLength: null,
  maxMaxBufferLength: 600,
  enableWorker: true,
  enableSoftwareAES: true,
  manifestLoadingTimeOut: 1e4,
  manifestLoadingMaxRetry: 1,
  manifestLoadingRetryDelay: 1e3,
  manifestLoadingMaxRetryTimeout: 64e3,
  startLevel: void 0,
  levelLoadingTimeOut: 1e4,
  levelLoadingMaxRetry: 4,
  levelLoadingRetryDelay: 1e3,
  levelLoadingMaxRetryTimeout: 64e3,
  fragLoadingTimeOut: 2e4,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 1e3,
  fragLoadingMaxRetryTimeout: 64e3,
  startFragPrefetch: false,
  fpsDroppedMonitoringPeriod: 5e3,
  fpsDroppedMonitoringThreshold: 0.2,
  appendErrorMaxRetry: 3,
  loader: xhr_loader_default,
  fLoader: void 0,
  pLoader: void 0,
  xhrSetup: void 0,
  licenseXhrSetup: void 0,
  licenseResponseCallback: void 0,
  abrController: abr_controller_default,
  bufferController: buffer_controller_default,
  capLevelController: cap_level_controller_default,
  fpsController: fps_controller_default,
  stretchShortVideoTrack: false,
  maxAudioFramesDrift: 1,
  forceKeyFrameOnDiscontinuity: true,
  abrEwmaFastLive: 3,
  abrEwmaSlowLive: 9,
  abrEwmaFastVoD: 3,
  abrEwmaSlowVoD: 9,
  abrEwmaDefaultEstimate: 5e5,
  abrBandWidthFactor: 0.95,
  abrBandWidthUpFactor: 0.7,
  abrMaxWithRealBitrate: false,
  maxStarvationDelay: 4,
  maxLoadingDelay: 4,
  minAutoBitrate: 0,
  emeEnabled: false,
  widevineLicenseUrl: void 0,
  drmSystemOptions: {},
  requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess,
  testBandwidth: true,
  progressive: false,
  lowLatencyMode: true,
  ...timelineConfig(),
  subtitleStreamController: __USE_SUBTITLES__
    ? SubtitleStreamController
    : void 0,
  subtitleTrackController: __USE_SUBTITLES__
    ? subtitle_track_controller_default
    : void 0,
  timelineController: __USE_SUBTITLES__ ? TimelineController : void 0,
  audioStreamController: __USE_ALT_AUDIO__
    ? audio_stream_controller_default
    : void 0,
  audioTrackController: __USE_ALT_AUDIO__
    ? audio_track_controller_default
    : void 0,
  emeController: __USE_EME_DRM__ ? eme_controller_default : void 0
}
function timelineConfig() {
  return {
    cueHandler: cues_default,
    enableCEA708Captions: __USE_SUBTITLES__,
    enableWebVTT: __USE_SUBTITLES__,
    enableIMSC1: __USE_SUBTITLES__,
    captionsTextTrack1Label: 'English',
    captionsTextTrack1LanguageCode: 'en',
    captionsTextTrack2Label: 'Spanish',
    captionsTextTrack2LanguageCode: 'es',
    captionsTextTrack3Label: 'Unknown CC',
    captionsTextTrack3LanguageCode: '',
    captionsTextTrack4Label: 'Unknown CC',
    captionsTextTrack4LanguageCode: '',
    renderTextTracksNatively: true
  }
}
function mergeConfig(defaultConfig, userConfig) {
  if (
    (userConfig.liveSyncDurationCount ||
      userConfig.liveMaxLatencyDurationCount) &&
    (userConfig.liveSyncDuration || userConfig.liveMaxLatencyDuration)
  ) {
    throw new Error(
      "Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration"
    )
  }
  if (
    userConfig.liveMaxLatencyDurationCount !== void 0 &&
    (userConfig.liveSyncDurationCount === void 0 ||
      userConfig.liveMaxLatencyDurationCount <=
        userConfig.liveSyncDurationCount)
  ) {
    throw new Error(
      'Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"'
    )
  }
  if (
    userConfig.liveMaxLatencyDuration !== void 0 &&
    (userConfig.liveSyncDuration === void 0 ||
      userConfig.liveMaxLatencyDuration <= userConfig.liveSyncDuration)
  ) {
    throw new Error(
      'Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"'
    )
  }
  return Object.assign({}, defaultConfig, userConfig)
}
function enableStreamingMode(config) {
  const currentLoader = config.loader
  if (
    currentLoader !== fetch_loader_default &&
    currentLoader !== xhr_loader_default
  ) {
    logger.log(
      '[config]: Custom loader detected, cannot enable progressive streaming'
    )
    config.progressive = false
  } else {
    const canStreamProgressively = fetchSupported()
    if (canStreamProgressively) {
      config.loader = fetch_loader_default
      config.progressive = true
      config.enableSoftwareAES = true
      logger.log('[config]: Progressive streaming enabled, using FetchLoader')
    }
  }
}

// src/hls.ts
var import_eventemitter32 = __toModule(require_eventemitter3())
var Hls = class {
  constructor(userConfig = {}) {
    this._emitter = new import_eventemitter32.EventEmitter()
    this._media = null
    this.url = null
    const config = (this.config = mergeConfig(Hls.DefaultConfig, userConfig))
    this.userConfig = userConfig
    enableLogs(config.debug)
    this._autoLevelCapping = -1
    if (config.progressive) {
      enableStreamingMode(config)
    }
    const {
      abrController: ConfigAbrController,
      bufferController: ConfigBufferController,
      capLevelController: ConfigCapLevelController,
      fpsController: ConfigFpsController
    } = config
    const abrController = (this.abrController = new ConfigAbrController(this))
    const bufferController = (this.bufferController = new ConfigBufferController(
      this
    ))
    const capLevelController = (this.capLevelController = new ConfigCapLevelController(
      this
    ))
    const fpsController = new ConfigFpsController(this)
    const playListLoader = new playlist_loader_default(this)
    const keyLoader = new key_loader_default(this)
    const id3TrackController = new id3_track_controller_default(this)
    const levelController = (this.levelController = new level_controller_default(
      this
    ))
    const fragmentTracker = new FragmentTracker(this)
    const streamController = (this.streamController = new stream_controller_default(
      this,
      fragmentTracker
    ))
    capLevelController.setStreamController(streamController)
    fpsController.setStreamController(streamController)
    const networkControllers = [levelController, streamController]
    this.networkControllers = networkControllers
    const coreComponents = [
      playListLoader,
      keyLoader,
      abrController,
      bufferController,
      capLevelController,
      fpsController,
      id3TrackController,
      fragmentTracker
    ]
    this.audioTrackController = this.createController(
      config.audioTrackController,
      null,
      networkControllers
    )
    this.createController(
      config.audioStreamController,
      fragmentTracker,
      networkControllers
    )
    this.subtitleTrackController = this.createController(
      config.subtitleTrackController,
      null,
      networkControllers
    )
    this.createController(
      config.subtitleStreamController,
      fragmentTracker,
      networkControllers
    )
    this.createController(config.timelineController, null, coreComponents)
    this.emeController = this.createController(
      config.emeController,
      null,
      coreComponents
    )
    this.latencyController = this.createController(
      latency_controller_default,
      null,
      coreComponents
    )
    this.coreComponents = coreComponents
  }
  static get version() {
    return __VERSION__
  }
  static isSupported() {
    return isSupported()
  }
  static get Events() {
    return Events
  }
  static get ErrorTypes() {
    return ErrorTypes
  }
  static get ErrorDetails() {
    return ErrorDetails
  }
  static get DefaultConfig() {
    if (!Hls.defaultConfig) {
      return hlsDefaultConfig
    }
    return Hls.defaultConfig
  }
  static set DefaultConfig(defaultConfig) {
    Hls.defaultConfig = defaultConfig
  }
  createController(ControllerClass, fragmentTracker, components) {
    if (ControllerClass) {
      const controllerInstance = fragmentTracker
        ? new ControllerClass(this, fragmentTracker)
        : new ControllerClass(this)
      if (components) {
        components.push(controllerInstance)
      }
      return controllerInstance
    }
    return null
  }
  on(event, listener, context = this) {
    this._emitter.on(event, listener, context)
  }
  once(event, listener, context = this) {
    this._emitter.once(event, listener, context)
  }
  removeAllListeners(event) {
    this._emitter.removeAllListeners(event)
  }
  off(event, listener, context = this, once) {
    this._emitter.off(event, listener, context, once)
  }
  listeners(event) {
    return this._emitter.listeners(event)
  }
  emit(event, name, eventObject) {
    return this._emitter.emit(event, name, eventObject)
  }
  trigger(event, eventObject) {
    if (this.config.debug) {
      return this.emit(event, event, eventObject)
    } else {
      try {
        return this.emit(event, event, eventObject)
      } catch (e) {
        logger.error(
          'An internal error happened while handling event ' +
            event +
            '. Error message: "' +
            e.message +
            '". Here is a stacktrace:',
          e
        )
        this.trigger(Events.ERROR, {
          type: ErrorTypes.OTHER_ERROR,
          details: ErrorDetails.INTERNAL_EXCEPTION,
          fatal: false,
          event,
          error: e
        })
      }
    }
    return false
  }
  listenerCount(event) {
    return this._emitter.listenerCount(event)
  }
  destroy() {
    logger.log('destroy')
    this.trigger(Events.DESTROYING, void 0)
    this.detachMedia()
    this.removeAllListeners()
    this._autoLevelCapping = -1
    this.url = null
    this.networkControllers.forEach(component => component.destroy())
    this.networkControllers.length = 0
    this.coreComponents.forEach(component => component.destroy())
    this.coreComponents.length = 0
  }
  attachMedia(media) {
    logger.log('attachMedia')
    this._media = media
    this.trigger(Events.MEDIA_ATTACHING, { media })
  }
  detachMedia() {
    logger.log('detachMedia')
    this.trigger(Events.MEDIA_DETACHING, void 0)
    this._media = null
  }
  loadSource(url) {
    this.stopLoad()
    const media = this.media
    const loadedSource = this.url
    const loadingSource = (this.url = URLToolkit2.buildAbsoluteURL(
      self.location.href,
      url,
      {
        alwaysNormalize: true
      }
    ))
    logger.log(`loadSource:${loadingSource}`)
    if (
      media &&
      loadedSource &&
      loadedSource !== loadingSource &&
      this.bufferController.hasSourceTypes()
    ) {
      this.detachMedia()
      this.attachMedia(media)
    }
    this.trigger(Events.MANIFEST_LOADING, { url })
  }
  startLoad(startPosition = -1) {
    logger.log(`startLoad(${startPosition})`)
    this.networkControllers.forEach(controller => {
      controller.startLoad(startPosition)
    })
  }
  stopLoad() {
    logger.log('stopLoad')
    this.networkControllers.forEach(controller => {
      controller.stopLoad()
    })
  }
  swapAudioCodec() {
    logger.log('swapAudioCodec')
    this.streamController.swapAudioCodec()
  }
  recoverMediaError() {
    logger.log('recoverMediaError')
    const media = this._media
    this.detachMedia()
    if (media) {
      this.attachMedia(media)
    }
  }
  removeLevel(levelIndex, urlId = 0) {
    this.levelController.removeLevel(levelIndex, urlId)
  }
  get levels() {
    const levels = this.levelController.levels
    return levels ? levels : []
  }
  get currentLevel() {
    return this.streamController.currentLevel
  }
  set currentLevel(newLevel) {
    logger.log(`set currentLevel:${newLevel}`)
    this.loadLevel = newLevel
    this.abrController.clearTimer()
    this.streamController.immediateLevelSwitch()
  }
  get nextLevel() {
    return this.streamController.nextLevel
  }
  set nextLevel(newLevel) {
    logger.log(`set nextLevel:${newLevel}`)
    this.levelController.manualLevel = newLevel
    this.streamController.nextLevelSwitch()
  }
  get loadLevel() {
    return this.levelController.level
  }
  set loadLevel(newLevel) {
    logger.log(`set loadLevel:${newLevel}`)
    this.levelController.manualLevel = newLevel
  }
  get nextLoadLevel() {
    return this.levelController.nextLoadLevel
  }
  set nextLoadLevel(level) {
    this.levelController.nextLoadLevel = level
  }
  get firstLevel() {
    return Math.max(this.levelController.firstLevel, this.minAutoLevel)
  }
  set firstLevel(newLevel) {
    logger.log(`set firstLevel:${newLevel}`)
    this.levelController.firstLevel = newLevel
  }
  get startLevel() {
    return this.levelController.startLevel
  }
  set startLevel(newLevel) {
    logger.log(`set startLevel:${newLevel}`)
    if (newLevel !== -1) {
      newLevel = Math.max(newLevel, this.minAutoLevel)
    }
    this.levelController.startLevel = newLevel
  }
  get capLevelToPlayerSize() {
    return this.config.capLevelToPlayerSize
  }
  set capLevelToPlayerSize(shouldStartCapping) {
    const newCapLevelToPlayerSize = !!shouldStartCapping
    if (newCapLevelToPlayerSize !== this.config.capLevelToPlayerSize) {
      if (newCapLevelToPlayerSize) {
        this.capLevelController.startCapping()
      } else {
        this.capLevelController.stopCapping()
        this.autoLevelCapping = -1
        this.streamController.nextLevelSwitch()
      }
      this.config.capLevelToPlayerSize = newCapLevelToPlayerSize
    }
  }
  get autoLevelCapping() {
    return this._autoLevelCapping
  }
  get bandwidthEstimate() {
    const { bwEstimator } = this.abrController
    if (!bwEstimator) {
      return NaN
    }
    return bwEstimator.getEstimate()
  }
  set autoLevelCapping(newLevel) {
    if (this._autoLevelCapping !== newLevel) {
      logger.log(`set autoLevelCapping:${newLevel}`)
      this._autoLevelCapping = newLevel
    }
  }
  get autoLevelEnabled() {
    return this.levelController.manualLevel === -1
  }
  get manualLevel() {
    return this.levelController.manualLevel
  }
  get minAutoLevel() {
    const {
      levels,
      config: { minAutoBitrate }
    } = this
    if (!levels) return 0
    const len = levels.length
    for (let i = 0; i < len; i++) {
      if (levels[i].maxBitrate > minAutoBitrate) {
        return i
      }
    }
    return 0
  }
  get maxAutoLevel() {
    const { levels, autoLevelCapping } = this
    let maxAutoLevel
    if (autoLevelCapping === -1 && levels && levels.length) {
      maxAutoLevel = levels.length - 1
    } else {
      maxAutoLevel = autoLevelCapping
    }
    return maxAutoLevel
  }
  get nextAutoLevel() {
    return Math.min(
      Math.max(this.abrController.nextAutoLevel, this.minAutoLevel),
      this.maxAutoLevel
    )
  }
  set nextAutoLevel(nextLevel) {
    this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, nextLevel)
  }
  get audioTracks() {
    const audioTrackController = this.audioTrackController
    return audioTrackController ? audioTrackController.audioTracks : []
  }
  get audioTrack() {
    const audioTrackController = this.audioTrackController
    return audioTrackController ? audioTrackController.audioTrack : -1
  }
  set audioTrack(audioTrackId) {
    const audioTrackController = this.audioTrackController
    if (audioTrackController) {
      audioTrackController.audioTrack = audioTrackId
    }
  }
  get subtitleTracks() {
    const subtitleTrackController = this.subtitleTrackController
    return subtitleTrackController ? subtitleTrackController.subtitleTracks : []
  }
  get subtitleTrack() {
    const subtitleTrackController = this.subtitleTrackController
    return subtitleTrackController ? subtitleTrackController.subtitleTrack : -1
  }
  get media() {
    return this._media
  }
  set subtitleTrack(subtitleTrackId) {
    const subtitleTrackController = this.subtitleTrackController
    if (subtitleTrackController) {
      subtitleTrackController.subtitleTrack = subtitleTrackId
    }
  }
  get subtitleDisplay() {
    const subtitleTrackController = this.subtitleTrackController
    return subtitleTrackController
      ? subtitleTrackController.subtitleDisplay
      : false
  }
  set subtitleDisplay(value) {
    const subtitleTrackController = this.subtitleTrackController
    if (subtitleTrackController) {
      subtitleTrackController.subtitleDisplay = value
    }
  }
  get lowLatencyMode() {
    return this.config.lowLatencyMode
  }
  set lowLatencyMode(mode) {
    this.config.lowLatencyMode = mode
  }
  get liveSyncPosition() {
    return this.latencyController.liveSyncPosition
  }
  get latency() {
    return this.latencyController.latency
  }
  get maxLatency() {
    return this.latencyController.maxLatency
  }
  get targetLatency() {
    return this.latencyController.targetLatency
  }
  get drift() {
    return this.latencyController.drift
  }
  get forceStartLoad() {
    return this.streamController.forceStartLoad
  }
}

export { Hls }
