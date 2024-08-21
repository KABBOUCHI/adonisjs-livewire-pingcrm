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

@title('Edit Contact')
export default class Edit extends Component {
  declare contact: Contact

  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postalCode: null,
    organizationId: null,
  }

  async mount({ id }: any) {
    this.contact = await Contact.findOrFail(id)

    this.form = {
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      email: this.contact.email,
      phone: this.contact.phone,
      address: this.contact.address,
      city: this.contact.city,
      region: this.contact.region,
      country: this.contact.country,
      postalCode: this.contact.postalCode,
      organizationId: this.contact.organizationId,
    }
  }

  async update() {
    this.contact.merge(await validator.validate(this.form))
    await this.contact.save()

    this.ctx.session.flash('success', 'Contact updated.')

    this.skipRender()
    this.redirect('/contacts')
  }

  async render() {
    return this.view.render('livewire/contacts/edit', {
      organizations: await Organization.all(),
    })
  }
}
