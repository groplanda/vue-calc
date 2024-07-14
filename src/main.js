import { createApp } from 'vue'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Select from 'primevue/select';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
})

app.component('AppSelectInput', Select);
app.component('AppLoading', ProgressSpinner);

app.mount('#app');
