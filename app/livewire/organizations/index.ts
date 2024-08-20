import { Component, title } from 'adonisjs-livewire'

@title('Organizations')
export default class Index extends Component {
  async render() {
    return this.view.render('livewire/organizations/index')
  }
}
