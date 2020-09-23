import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import store from '@store'
import windowSize from './mixins/WindowSize'
import App from './App.vue'

const requireComponent = require.context(
  // O caminho relativo da pasta de componentes
  './components',
  // Se deve ou não olhar subpastas
  false,
  // Expressão regular para localizar nomes de componentes base
  /[A-Z]\w+\.(vue|js)$/,
)

requireComponent.keys().forEach((fileName) => {
  // Pega a configuração do componente
  const componentConfig = requireComponent(fileName)

  // Obtém nome em PascalCase do componente
  const componentName = upperFirst(
    camelCase(
      // Obtém o nome do arquivo, independentemente da profundidade da pasta
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  )

  // Registra o componente globalmente
  Vue.component(
    componentConfig.default.name || componentName,
    // Olha para as opções em `.default`, existentes
    // se o componente foi exportado com `export default`,
    // caso contrário usa o módulo raiz.
    componentConfig.default || componentConfig,
  )
})

// Mixins
Vue.mixin(windowSize)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
