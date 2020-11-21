  
// global @types helper Vscode
import api from './src/api'

declare module 'vue/types/vue' {
  interface Vue{
    $api:typeof api.api,
  }
}