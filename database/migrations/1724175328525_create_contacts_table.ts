import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contacts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('account_id').index()
      table.integer('organization_id').nullable().index()
      table.string('first_name', 25)
      table.string('last_name', 25)
      table.string('email', 50).nullable()
      table.string('phone', 50).nullable()
      table.string('address', 150).nullable()
      table.string('city', 50).nullable()
      table.string('region', 50).nullable()
      table.string('country', 2).nullable()
      table.string('postal_code', 25).nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
