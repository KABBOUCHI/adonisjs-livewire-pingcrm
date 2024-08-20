import { Component, title } from 'adonisjs-livewire'

@title('Dashboard')
export default class Dashboard extends Component {
  async render() {
    return this.view.render('livewire/dashboard')
  }
}
