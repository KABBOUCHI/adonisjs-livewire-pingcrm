import User from '#models/user'
import { Component, title, url } from 'adonisjs-livewire'

@title('Users')
export default class Index extends Component {
  @url()
  page = 1

  setPage(page: number) {
    this.page = page
  }

  filters: any = {
    search: '',
    role: '',
  }

  reset() {
    this.filters = {
      search: '',
      role: '',
    }
  }

  async render() {
    const users = await User.query()
      .withScopes((s) => s.filter(this.filters))
      .paginate(this.page, 10)

    users.baseUrl('/users')

    return this.view.render('livewire/users/index', {
      users,
    })
  }
}
