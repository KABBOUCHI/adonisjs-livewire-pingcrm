# Ping CRM

A demo application to illustrate how [adonijs-livewire](https://github.com/KABBOUCHI/adonisjs-livewire) works.

![](https://raw.githubusercontent.com/inertiajs/pingcrm/master/screenshot.png)

## Installation

Clone the repo locally:

```sh
git clone https://github.com/KABBOUCHI/adonisjs-livewire-pingcrm
cd adonisjs-livewire-pingcrm
```

Install NPM dependencies:

```sh
pnpm install
```

Setup configuration:

```sh
cp .env.example .env
```

Run database migrations:

```sh
node ace migration:run
```

Run database seeder:

```sh
node ace db:seed
```

Run the dev server:

```sh
pnpm dev
```

You're ready to go! Visit Ping CRM in your browser, and login with:

- **Username:** johndoe@example.com
- **Password:** secret

## Credits

- [Inertia PingCRM](https://github.com/inertiajs/pingcrm)
