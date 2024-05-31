# People Registration

## Back-end

### About

The back-end was developed with [Node.js](https://nodejs.org/en), using [Express](https://expressjs.com/) to create the API and run the server locally, [PostgreSQL](https://www.postgresql.org/) to be the DBMS and [Sequelize](https://sequelize.org/) as ORM.

### Preconditions to run

To run the back-end, it's necessary to have [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed in your PC.
If you are going to run the database locally, it's also needed to have [PostgreSQL](https://www.postgresql.org/) installed.

### Instructions to run

1. Download the repository or clone it with:
   `git clone https://github.com/jonhymeine/people-registration.git`

2. Move into the back-end folder;

3. Run `npm i` to download all dependencies;

4. Create a `.env` file based on `.env.sample` and edit its environment variables to configure your database connection and API port;

5. Run `npm start` to start the application.

**Description of `.env` environment variables:**

-   `PORT`: the port that the API will listen to;
-   `DATABASE_USER`: an existing user in the DBMS with access to the database;
-   `DATABASE_USER_PASSWORD`: the user's password;
-   `DATABASE_NAME`: an existing database;
-   `DATABASE_HOST`: the domain where the database is running;
-   `DATABASE_PORT`: the port of the database connection;
-   `DATABASE_SCHEMA`: an existing schema of the database;
-   `AUTO_FILL_DATABASE`: possibility to auto generate test data in the database. Put value as `true` to execute.
