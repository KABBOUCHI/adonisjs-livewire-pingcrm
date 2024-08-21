import Contact from '#models/contact'
import { title } from 'adonisjs-livewire'
import IndexPage from '../index_page.js'

@title('Contacts')
export default class Index extends IndexPage {
  async render() {
    const contacts = await Contact.query()
      .preload('organization')
      .withScopes((s) =>
        s.filter({
          search: this.search,
        })
      )
      .paginate(this.page, 10)

    contacts.baseUrl('/contacts')

    return this.view.render('livewire/contacts/index', {
      contacts,
    })
  }
}
