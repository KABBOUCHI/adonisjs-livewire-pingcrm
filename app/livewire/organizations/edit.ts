import Organization from '#models/organization'
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

@title('Edit Organization')
export default class Edit extends Component {
  declare organization: Organization

  form: any = {
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postalCode: null,
  }

  async mount({ id }: any) {
    this.organization = await Organization.findOrFail(id)

    this.form = {
      name: this.organization.name,
      email: this.organization.email,
      phone: this.organization.phone,
      address: this.organization.address,
      city: this.organization.city,
      region: this.organization.region,
      country: this.organization.country,
      postalCode: this.organization.postalCode,
    }
  }

  async update() {
    this.organization.merge(await validator.validate(this.form))
    await this.organization.save()

    this.ctx.session.flash('success', 'Organization updated.')
  }

  async destroy() {
    await this.organization.delete()

    this.ctx.session.flash('success', 'Organization deleted.')

    this.redirect('/organizations', true)
  }

  async render() {
    await this.organization.load('contacts')

    return this.view.render('livewire/organizations/edit')
  }
}
