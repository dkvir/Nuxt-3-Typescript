import SvgIcon from 'vue-svgicon'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(SvgIcon, {
        tagName: "svg-icon",
    })
  })