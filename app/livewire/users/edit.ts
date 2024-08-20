import User from '#models/user'
import { Component } from 'adonisjs-livewire'

export default class Edit extends Component {
  declare id: number

  mount({ user }: any) {
    this.id = user
  }

  async render() {
    const user = await User.findOrFail(this.id)

    return this.view.render('livewire/users/edit', {
      user,
    })
  }
}
