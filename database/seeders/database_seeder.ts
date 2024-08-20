import Account from '#models/account'
import Contact from '#models/contact'
import Organization from '#models/organization'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
export default class extends BaseSeeder {
  async run() {
    const account = await Account.create({ name: 'Acme Corporation' })

    await User.create({
      accountId: account.id,
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secret',
      owner: true,
    })

    await User.createMany(
      Array.from({ length: 5 }, () => ({
        accountId: account.id,
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }))
    )

    const organizations = await Organization.createMany(
      Array.from({ length: 100 }, () => ({
        accountId: account.id,
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: 'US',
        postalCode: faker.location.zipCode(),
      }))
    )
    await Contact.createMany(
      Array.from({ length: 100 }, () => ({
        accountId: account.id,
        organizationId: organizations[Math.floor(Math.random() * organizations.length)].id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        region: faker.location.state(),
        country: 'US',
        postalCode: faker.location.zipCode(),
      }))
    )
  }
}
