import Organization from '#models/organization'
import { Component, title } from 'adonisjs-livewire'

@title('Organizations')
export default class Index extends Component {
  async render() {
    const organizations = await Organization.query().paginate(1, 10)

    return this.view.render('livewire/organizations/index', {
      organizations,
    })
  }
}
