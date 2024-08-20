import { Component, layout, title } from 'adonisjs-livewire'

@title('Login')
@layout('components/layouts/empty')
export default class Login extends Component {
  form = {
    email: 'johndoe@example.com',
    password: 'password',
  }

  async login() {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  async render() {
    return this.view.render('livewire/login')
  }
}
