import { defineConfig } from 'vite'
export default defineConfig({
  build: { rollupOptions: { input: {
    main: 'index.html', services: 'services.html', solutions: 'solutions.html',
    about: 'about.html', contact: 'contact.html'
  } } }
})
