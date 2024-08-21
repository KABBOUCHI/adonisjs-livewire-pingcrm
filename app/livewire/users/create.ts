import User from '#models/user'
import vine from '@vinejs/vine'
import { Component, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail(),
    owner: vine.any(),
    password: vine.string().minLength(6),
  })
)

@title('Create User')
export default class Create extends Component {
  form = {
    fullName: null,
    email: null,
    owner: 0,
    password: null,
  }

  async store() {
    await User.create({
      ...(await validator.validate(this.form)),
      accountId: this.ctx.auth.user!.accountId,
    })
    this.ctx.session.flash('success', 'User created.')
    this.skipRender()
    this.redirect('/users', true)
  }

  async render() {
    return this.view.render('livewire/users/create')
  }
}