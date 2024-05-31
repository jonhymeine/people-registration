# People Registration

## About

This application is a CRUD implementation for managing people data stored in a database. It features an API for handling requests and a webpage for interacting with the API to view and modify the database's data.

#### It's possible to:

-   Register people;
-   Edit people's information;
-   Delete people from the database;
-   List all people;
-   Filter and list people by name, CPF or RG;
-   Display the number of people listed.

#### People information:

-   Name;
-   CPF;
-   RG;
-   Birthdate;
-   Gender.

## Back-end

The back-end was developed with [Node.js](https://nodejs.org/en), using [Express](https://expressjs.com/) to create the API and run the server locally. [PostgreSQL](https://www.postgresql.org/) is used as the DBMS, and [Sequelize](https://sequelize.org/) as the ORM.
Inside the back-end folder, there is another [README](./back-end/README.md) with more details about the requirements and instructions for running and starting the server.

## Front-end

The front-end was developed with [React](https://react.dev/), using [Vite](https://vitejs.dev/) to host the webpage locally, and [Ant Design](https://ant.design/) to build the interface.
Inside the front-end folder, there is another [README](./front-end/README.md) with more details about the requirements and instructions for running and starting the front-end.
