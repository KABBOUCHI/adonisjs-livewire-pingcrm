import User from '#models/user'
import { computed, title, url } from 'adonisjs-livewire'
import IndexPage from '../index_page.js'

@title('Users')
export default class Index extends IndexPage {
  @url()
  role = ''

  reset() {
    super.reset()

    this.role = ''
  }

  @computed()
  async users() {
    const users = await User.query()
      .withScopes((s) =>
        s.filter({
          search: this.search,
          role: this.role,
        })
      )
      .paginate(this.page, 10)

    users.baseUrl('/users')

    return users
  }

  async render() {
    return this.view.render('livewire/users/index')
  }
}
