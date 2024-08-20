import { Component, title } from 'adonisjs-livewire'

@title('Reports')
export default class Index extends Component {
  async render() {
    return this.view.render('livewire/reports/index')
  }
}
