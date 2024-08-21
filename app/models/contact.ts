import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed, scope } from '@adonisjs/lucid/orm'
import Organization from './organization.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Contact extends BaseModel {
  static filter = scope((query, filters: Record<string, any>) => {
    query.if(filters.search, (q) => {
      q.where((sq) => {
        sq.where('first_name', 'LIKE', `%${filters.search}%`)
          .orWhere('last_name', 'LIKE', `%${filters.search}%`)
          .orWhere('email', 'LIKE', `%${filters.search}%`)
      })
    })
  })

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare organizationId: number | null

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column()
  declare firstName: string

  @column()
  declare lastName: string

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

  @computed()
  get name() {
    return `${this.firstName} ${this.lastName}`
  }
}
