import Contact from '#models/contact'
import { Component, title } from 'adonisjs-livewire'

@title('Contacts')
export default class Index extends Component {
  form = {
    search: '',
  }

  reset() {
    this.form.search = ''
  }

  async render() {
    const contacts = await Contact.query()
      .preload('organization')
      .if(this.form.search, (q) =>
        q.where((sq) => {
          sq.where('first_name', 'LIKE', `%${this.form.search}%`).orWhere(
            'last_name',
            'LIKE',
            `%${this.form.search}%`
          )
        })
      )
      .paginate(1, 10)

    return this.view.render('livewire/contacts/index', {
      contacts,
    })
  }
}
