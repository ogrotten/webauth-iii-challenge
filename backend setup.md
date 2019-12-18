## Initialize repo
`npm init --yes` or `yarn init --yes`
## Install deps
`npm i express sqlite3 knex dotenv` or `yarn add express sqlite3 knex dotenv`
## Install nodemon as dev dep
`npm i -D nodemon` or `yarn add -D nodemon`
## Create knex config file, knexfile.js:
`knex init`
### Configure knex file:
set file path to `data/<filename>.db3`
```
  useNullAsDefault: true
  connection: {
	filename: './data/recipes.db3', // << filename
  },
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
  pool: {
	afterCreate: (conn, done) => {
	  // runs after a connection is made to the sqlite engine
	  conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
	}
  },

```
## Scripts in package.json
```
"server": "nodemon index.js"
```
### for production
	"start": "node index.js"
## Create migration type
`knex migrate:make <migrationName>`
- ## Configure migration file

## Create seed data
`knex seed:make <seedName>`

then Author seed data
## Run migration
`knex migrate:latest`
## Populate DB with seed data
`knex seed:run`
# 
## Make dbConfig.js file
## Import dotenv into index.js at the top of the file
## Author and configure server.js and index.js to get server up
## Author router skeletons and import them into server.js, make initial GET req
## Author DB functions before router functions