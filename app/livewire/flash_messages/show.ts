import { Component } from 'adonisjs-livewire'

export default class Show extends Component {
  render() {
    return this.view.render('livewire/flash-messages/show')
  }
}
