import Contact from '#models/contact'
import Organization from '#models/organization'
import vine from '@vinejs/vine'
import { Component, title } from 'adonisjs-livewire'

const validator = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(100),
    lastName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail().nullable(),
    phone: vine.string().maxLength(150).nullable(),
    address: vine.string().maxLength(150).nullable(),
    city: vine.string().maxLength(150).nullable(),
    region: vine.string().maxLength(150).nullable(),
    country: vine.string().maxLength(150).nullable(),
    postalCode: vine.string().maxLength(150).nullable(),
    organizationId: vine.number().nullable(),
  })
)

@title('Create Contact')
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
    organizationId: null,
  }

  async store() {
    await Contact.create({
      ...(await validator.validate(this.form)),
      accountId: this.ctx.auth.user!.accountId,
    })
    this.ctx.session.flash('success', 'Organization created.')
    this.skipRender()
    this.redirect('/contacts', true)
  }

  async render() {
    return this.view.render('livewire/contacts/create', {
      organizations: await Organization.all(),
    })
  }
}
