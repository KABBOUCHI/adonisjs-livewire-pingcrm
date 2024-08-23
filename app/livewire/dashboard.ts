import { Component, title } from 'adonisjs-livewire'

@title('Dashboard')
export default class Dashboard extends Component {
  async logout() {
    await this.ctx.auth.use('web').logout()
    this.skipRender()
    this.redirect('/login')
  }

  confetti() {
    this.js(`confetti({
      shapes: [confetti.shapeFromText({ text: 'Livewire', scalar: 5 })],
      scalar: 5,
    })`)
  }

  dd() {
    dd(this.ctx.auth.user, this.ctx.auth.user?.account, this.ctx)
  }

  async render() {
    return this.view.render('livewire/dashboard')
  }
}
