import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'vue-toastification/dist/index.css'
import Toast from 'vue-toastification'

const app = createApp(App)

// Use Vue Toastification
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})

app.mount('#root')