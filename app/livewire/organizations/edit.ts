import Organization from '#models/organization'
import { Component, title } from 'adonisjs-livewire'

@title('Edit Organization')
export default class Edit extends Component {
  declare id: number

  mount({ id }: any) {
    this.id = id
  }

  async render() {
    const organization = await Organization.findOrFail(this.id)

    return this.view.render('livewire/organizations/edit', {
      organization,
    })
  }
}
