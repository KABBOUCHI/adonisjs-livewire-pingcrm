import Organization from '#models/organization'
import { Component, title } from 'adonisjs-livewire'

@title('Organizations')
export default class Index extends Component {
  form = {
    search: '',
  }

  reset() {
    this.form.search = ''
  }

  async render() {
    const organizations = await Organization.query()
      .if(this.form.search, (q) => q.where('name', 'LIKE', `%${this.form.search}%`))
      .paginate(1, 10)

    return this.view.render('livewire/organizations/index', {
      organizations,
    })
  }
}
