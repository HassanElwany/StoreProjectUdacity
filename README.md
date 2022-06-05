# StoreProjectUdacity

# Decryption
A Backend designed with TypeScript, NodeJs and PostgreSQL. It's for a store where users can sign up and log in, navigate the list of products, view specifications of a specific product and add products to their cart so that they can make orders



## Scripts for build the project

After you cloned this repo : 'npm install'

npm run dev: to start the server and watch all changes.


npm run build: to compile typescript.


npm run test: to run tests using jasmine library.

npm run format: formatting the syntax and lint it via pritter and es lint

npm start: to run and build the project




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