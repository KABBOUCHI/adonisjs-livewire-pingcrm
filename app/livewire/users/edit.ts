import User from '#models/user'
import vine from '@vinejs/vine'
import { Component, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail(),
    owner: vine.any(),
    password: vine.string().minLength(6).nullable().optional(),
  })
)

@title('Edit Organization')
export default class Edit extends Component {
  declare user: User

  form: any = {
    fullName: null,
    email: null,
    owner: 0,
    password: null,
  }

  async mount({ id }: any) {
    this.user = await User.findOrFail(id)

    this.form = {
      fullName: this.user.fullName,
      email: this.user.email,
      owner: this.user.owner,
      password: null,
    }
  }

  async update() {
    const data = await validator.validate(this.form)

    if (!data.password) {
      delete data.password
    }

    this.user.merge(data)
    await this.user.save()

    this.ctx.session.flash('success', 'User updated.')

    this.skipRender()
    this.redirect('/users')
  }

  async destroy() {
    await this.user.delete()

    this.ctx.session.flash('success', 'User deleted.')

    this.skipRender()
    this.redirect('/users')
  }

  async render() {
    return this.view.render('livewire/users/edit')
  }
}
