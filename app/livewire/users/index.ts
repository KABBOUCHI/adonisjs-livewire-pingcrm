import User from '#models/user'
import { title, url } from 'adonisjs-livewire'
import IndexPage from '../index_page.js'

@title('Users')
export default class Index extends IndexPage {
  @url()
  role = ''

  reset() {
    super.reset()

    this.role = ''
  }

  async render() {
    const users = await User.query()
      .withScopes((s) =>
        s.filter({
          search: this.search,
          role: this.role,
        })
      )
      .paginate(this.page, 10)

    users.baseUrl('/users')

    return this.view.render('livewire/users/index', {
      users,
    })
  }
}
