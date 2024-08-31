import Contact from '#models/contact'
import { Component } from 'adonisjs-livewire'

export default class Row extends Component {
  declare contact: Contact

  mount({ contact }: any) {
    this.contact = contact
  }

  async render() {
    return this.view.render('livewire/contacts/row')
  }
}
