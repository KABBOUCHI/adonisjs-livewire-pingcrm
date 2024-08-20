import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Organization extends BaseModel {
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
}
