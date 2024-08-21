import Organization from '#models/organization'
import { title } from 'adonisjs-livewire'
import IndexPage from '../index_page.js'

@title('Organizations')
export default class Index extends IndexPage {
  async render() {
    const organizations = await Organization.query()
      .withScopes((s) =>
        s.filter({
          search: this.search,
        })
      )
      .paginate(this.page, 10)

    organizations.baseUrl('/organizations')

    return this.view.render('livewire/organizations/index', {
      organizations,
    })
  }
}
