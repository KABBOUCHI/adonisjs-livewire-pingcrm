import { Component, url } from 'adonisjs-livewire'

export default class IndexPage extends Component {
  @url()
  page = 1

  @url()
  search = ''

  reset() {
    this.search = ''
    this.page = 1
  }

  updatedSearch(search: string) {
    this.search = search || ''
    this.page = 1
  }

  setPage(page: number) {
    this.page = page
  }
}
