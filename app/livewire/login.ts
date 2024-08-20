import User from '#models/user'
import vine from '@vinejs/vine'
import { Component, layout, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(6),
    remember: vine.accepted().optional(),
  })
)

@title('Login')
@layout('components/layouts/empty')
export default class Login extends Component {
  form = {
    email: 'johndoe@example.com',
    password: 'secret',
    remember: true,
  }

  async login() {
    const { email, password, remember } = await validator.validate(this.form)

    await this.ctx.auth.use('web').login(await User.verifyCredentials(email, password), remember)

    this.redirect('/')
  }

  async render() {
    return this.view.render('livewire/login')
  }
}
