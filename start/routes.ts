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
    router.livewire('/contacts')
    router.livewire('/reports')
  })
  .middleware(middleware.auth())

router.livewire('/login')
