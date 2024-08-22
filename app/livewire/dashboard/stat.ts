import { Component, lazy } from 'adonisjs-livewire'

@lazy()
export default class Stat extends Component {
  title = 'Stat'
  classes = ''
  prefix = ''

  mount(props: any) {
    this.classes = props.class
    this.title = props.title
    this.prefix = props.prefix || ''
  }

  get value() {
    return (Math.random() * 1000).toFixed(2).toLocaleString()
  }

  async render() {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return /* html */ `<x-card :class="classes">
      <div class="space-y-4">
          <div class="flex items-center gap-x-2">
              <span class="text-sm font-medium text-gray-500">
                  {{ title }}
              </span>
          </div>

          <div wire:poll class="text-3xl font-semibold tracking-tight text-gray-950">
                {{ prefix }}{{ value }}k
          </div>
      </div>
   </x-card>`
  }

  async placeholder() {
    return this.ctx.view.render('components/stat-placeholder')
  }
}
