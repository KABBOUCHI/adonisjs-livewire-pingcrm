import User from '#models/user'
import { Component, title } from 'adonisjs-livewire'

@title('Edit User')
export default class Edit extends Component {
  declare id: number

  mount({ id }: any) {
    this.id = id
  }

  async render() {
    const user = await User.findOrFail(this.id)

    return this.view.render('livewire/users/edit', {
      user,
    })
  }
}
