import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, scope } from '@adonisjs/lucid/orm'
import Contact from './contact.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Organization extends BaseModel {
  static filter = scope((query, filters: Record<string, any>) => {
    query.if(filters.search, (q) => {
      q.where((sq) => {
        sq.where('name', 'LIKE', `%${filters.search}%`)
      })
    })
  })

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare name: string

  @column()
  declare email: string | null

  @column()
  declare phone: string | null

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare region: string | null

  @column()
  declare country: string | null

  @column()
  declare postalCode: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Contact)
  declare contacts: HasMany<typeof Contact>
}
