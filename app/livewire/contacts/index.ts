import { Component, title } from 'adonisjs-livewire'

@title('Contacts')
export default class Index extends Component {
  async render() {
    return this.view.render('livewire/contacts/index')
  }
}
