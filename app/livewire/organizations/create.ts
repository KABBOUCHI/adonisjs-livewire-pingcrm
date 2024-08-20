import { Component, title } from 'adonisjs-livewire'

@title('Create Organization')
export default class Create extends Component {
  async render() {
    return this.view.render('livewire/organizations/create')
  }
}
