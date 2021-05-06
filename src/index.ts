import { Pages } from './pages'

document.addEventListener('DOMContentLoaded',  () => {
  console.log('DOMContentLoaded')
  new Pages().init()
})

window.addEventListener('load',  () => {
  console.log('load')

})



// console.log(window, document)
