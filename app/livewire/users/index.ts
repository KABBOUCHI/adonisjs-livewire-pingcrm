import User from '#models/user'
import { Component, title } from 'adonisjs-livewire'

@title('Users')
export default class Index extends Component {
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
      .paginate(1, 10)

    return this.view.render('livewire/users/index', {
      users,
    })
  }
}
