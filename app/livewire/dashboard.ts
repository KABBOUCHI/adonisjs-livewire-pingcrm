import { Component, title } from 'adonisjs-livewire'
import { dd } from '@adonisjs/core/services/dumper'

@title('Dashboard')
export default class Dashboard extends Component {
  async logout() {
    await this.ctx.auth.use('web').logout()
    this.redirect('/login')
  }

  confetti() {
    this.js(`confetti({
      shapes: [confetti.shapeFromText({ text: 'Livewire', scalar: 5 })],
      scalar: 5,
    })`)

    this.dispatch('notification-created', {
      message: 'Confetti!',
    })
  }

  dd() {
    dd([this.ctx.auth.user, new Map([['foo', 'bar']])])
  }

  async render() {
    return this.view.render('livewire/dashboard')
  }
}
