# StoreProjectUdacity

## Started

After you cloned this repo : 'npm install'


To migrate db schema: 'npx db-migrate'

To run tests in test env: 'npm  test'

to build project into build folder: 'npm start'

To run and watch: 'npm run dev'


## Express endpoints examples 
GET: '/users/authentication' returns auth token 
GET: '/users/:id' return user with id 
GET: '/users' returns all users 
POST: '/users' use request header body to make new user 

#DB Creation and Migrations
Create 2 Postgres databases 1 for development and another for test.

Add your DB values like db name, user etc. into .env file and into database.json file

## Example .env file content:
### all of values are secret 
port: PORT,
  host: postgres_HOST,
  dbPort: postgres_PORT,
  database: ENV === "dev" ? postgres_DB : postgres_DB_TEST,
  user: postgres_USER,
  password: postgres_PASSWORD,
  pepper: BCRYPT,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,