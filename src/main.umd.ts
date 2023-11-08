import { serve, fixed, int, img } from "./main"

interface ServePropOption {
  getConfig: typeof serve.getConfig
  setConfig: typeof serve.setConfig
  fixed: typeof fixed
  int: typeof int
  img: typeof img
}

type ServeFunction = typeof serve

type ServeOption = ServeFunction & ServePropOption

Object.assign(serve, { fixed, int, img })

export default (serve as ServeOption)