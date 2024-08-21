/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.livewire('/', 'dashboard')
    router.livewire('/organizations')
    router.livewire('/organizations/create')
    router.livewire('/organizations/:id/edit', 'organizations.edit')
    router.livewire('/contacts')
    router.livewire('/contacts/create')
    router.livewire('/contacts/:id/edit', 'contacts.edit')
    router.livewire('/reports')
    router.livewire('/users')
    router.livewire('/users/:id/edit', 'users.edit')

    router.get('/logout', async ({ auth, response }) => {
      await auth.use('web').logout()

      return response.redirect('/login')
    })
  })
  .middleware(middleware.auth())

router.livewire('/login')
