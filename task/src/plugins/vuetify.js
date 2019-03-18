import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#6ac1ed',
    success: '#3cd1c2',
    info: '#f9d8ac',
    error: '#efcbd5'
  }
})
