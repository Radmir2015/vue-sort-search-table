import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'material-design-icons-iconfont'

Vue.config.productionTip = false

Vue.filter('highlight', (words, query) => {
  if (!query) return words
  const iQuery = new RegExp(query, "ig");
  return words.toString().replace(iQuery, (matchedTxt) => 
      ('<span class=\'highlight\'>' + matchedTxt + '</span>')
  )
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
