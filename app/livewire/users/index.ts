import User from '#models/user'
import { Component, title } from 'adonisjs-livewire'

@title('Users')
export default class Index extends Component {
  form = {
    search: '',
  }

  reset() {
    this.form.search = ''
  }

  async render() {
    const users = await User.query()
      .if(this.form.search, (q) => q.where('full_name', 'LIKE', `%${this.form.search}%`))
      .paginate(1, 10)

    return this.view.render('livewire/users/index', {
      users,
    })
  }
}
