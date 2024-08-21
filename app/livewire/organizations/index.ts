import Organization from '#models/organization'
import { Component, title, url } from 'adonisjs-livewire'

@title('Organizations')
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
    const organizations = await Organization.query()
      .withScopes((s) => s.filter(this.filters))
      .paginate(this.page, 10)

    organizations.baseUrl('/organizations')

    return this.view.render('livewire/organizations/index', {
      organizations,
    })
  }
}
