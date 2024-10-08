import { defineConfig } from 'adonisjs-livewire'

const livewireConfig = defineConfig({
  class_namespace: 'app/livewire',
  layout: 'components.layouts.main',
  injectAssets: true,
  navigate: {
    showProgressBar: true,
    progressBarColor: '#2299dd',
  },
})

export default livewireConfig
