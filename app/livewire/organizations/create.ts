import vine from '@vinejs/vine'
import { Component, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    name: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail().nullable(),
    phone: vine.string().maxLength(150).nullable(),
    address: vine.string().maxLength(150).nullable(),
    city: vine.string().maxLength(150).nullable(),
    region: vine.string().maxLength(150).nullable(),
    country: vine.string().maxLength(150).nullable(),
    postalCode: vine.string().maxLength(150).nullable(),
  })
)

@title('Create Organization')
export default class Create extends Component {
  form = {
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postalCode: null,
  }

  async store() {
    this.ctx.auth.user!.account.related('organizations').create(await validator.validate(this.form))
    this.ctx.session.flash('success', 'Organization created.')

    this.redirect('/organizations', true)
  }

  async render() {
    return this.view.render('livewire/organizations/create')
  }
}
