import { createApp } from 'vue'
import App from './App.vue'
import DragDrop from './components/index.js'

const app = createApp(App)

app.use(DragDrop);
app.mount('#app')
