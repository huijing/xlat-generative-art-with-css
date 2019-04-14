import { src, dest, watch as watchSrc, parallel, series } from 'gulp'
import del from 'del'
import plumber from 'gulp-plumber'
import cp from 'child_process'

import browserSync from 'browser-sync'

// directories
const SRC = 'src'
const DIST = 'dist'

// source file globs
const IMAGES_GLOB = `${SRC}/img/**/*`
const FAVICONS_GLOB = `${SRC}/favicons/**/*`
const VIEWS_GLOB = `${SRC}/views/**/*`

// clean the output directory
export const clean = () => {
  return del([DIST])
}

export const images = () => {
  return (
    src(IMAGES_GLOB)
      // @TODO Minify
      .pipe(plumber())
      .pipe(dest(`${DIST}/img`))
      .pipe(browserSync.stream())
  )
}

export const generate = done => {
  return cp.spawn('eleventy').on('close', code => {
    if (code === 0) {
      browserSync.reload()
      done()
    } else {
      console.error(`build failed with code ${code}`)
      browserSync.notify('build failed 😞')
      done()
    }
  })
}

export const watch = () => {
  browserSync.init({ server: DIST })
  watchSrc(VIEWS_GLOB, generate)
  watchSrc(IMAGES_GLOB, images)
}

export const dev = series(clean, generate, images, watch)
export const build = series(clean, generate, images)

// set bare 'gulp' command to dev
export default dev
