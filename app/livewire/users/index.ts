import { Component } from 'adonisjs-livewire'

export default class Index extends Component {
  async render() {
    return this.view.render('livewire/users/index', {
      message: 'Hello World',
    })
  }
}