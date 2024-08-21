import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import Account from './account.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  static whereRole = scope((query, role: string) => {
    switch (role) {
      case 'user':
        return query.where('owner', false)
      case 'owner':
        return query.where('owner', true)
    }
  })

  static filter = scope((query, filters: Record<string, any>) => {
    query
      .if(filters.search, (q) => {
        q.where((sq) => {
          sq.where('full_name', 'LIKE', `%${filters.search}%`).orWhere(
            'email',
            'LIKE',
            `%${filters.search}%`
          )
        })
      })
      .if(filters.role && filters.role.length > 0, (q) => {
        // @ts-ignore
        q.withScopes((s) => s.whereRole(filters.role))
      })
  })

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare owner: boolean

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  isDemoUser() {
    return this.email === 'johndoe@example.com'
  }
}
