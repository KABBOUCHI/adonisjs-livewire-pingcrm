import User from '#models/user'
import vine from '@vinejs/vine'
import { bind, Component, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail(),
    owner: vine.any(),
    password: vine.string().minLength(6).nullable().optional(),
  })
)

@title('Edit User')
export default class Edit extends Component {
  declare user: User

  form: any = {
    fullName: null,
    email: null,
    owner: 0,
    password: null,
  }

  @bind()
  async mount({}, user: User) {
    this.user = user

    this.form = {
      fullName: this.user.fullName,
      email: this.user.email,
      owner: this.user.owner,
      password: null,
    }
  }

  async update() {
    if (this.user.isDemoUser()) {
      this.ctx.session.flash('error', 'Updating the demo user is not allowed.')
      this.redirect('/users', true)
      return
    }

    const data = await validator.validate(this.form)

    if (!data.password) {
      delete data.password
    }

    this.user.merge(data)
    await this.user.save()

    this.ctx.session.flash('success', 'User updated.')

    this.redirect('/users', true)
  }

  async destroy() {
    if (this.user.isDemoUser()) {
      this.ctx.session.flash('error', 'Deleting the demo user is not allowed.')
      this.redirect('/users', true)
      return
    }

    await this.user.delete()

    this.ctx.session.flash('success', 'User deleted.')

    this.redirect('/users', true)
  }

  async render() {
    return this.view.render('livewire/users/edit')
  }
}
