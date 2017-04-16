import { Options } from './types/index'
import { MixinInit } from './init'
import { MixinApi } from './api'

class Avatar {
  _init: (opt: object) => void

  constructor (option: Options) {
    this._init(option)
  }
}

MixinInit(Avatar)
MixinApi(Avatar)


export default Avatar
