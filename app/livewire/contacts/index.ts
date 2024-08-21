import Contact from '#models/contact'
import { Component, title, url } from 'adonisjs-livewire'

@title('Contacts')
export default class Index extends Component {
  @url()
  page = 1

  setPage(page: number) {
    this.page = page
  }

  filters: any = {
    search: '',
  }

  reset() {
    this.filters = {
      search: '',
    }
  }

  async render() {
    const contacts = await Contact.query()
      .preload('organization')
      .withScopes((s) => s.filter(this.filters))
      .paginate(this.page, 10)

    contacts.baseUrl('/contacts')

    return this.view.render('livewire/contacts/index', {
      contacts,
    })
  }
}
