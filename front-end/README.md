# People Registration

## Front-end

### About

The front-end was developed with [React](https://react.dev/), using [Vite](https://vitejs.dev/) to host the webpage locally, and [Ant Design](https://ant.design/) to build the interface.

### Preconditions to run

To run the front-end, [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) must be installed on your PC.

### Instructions to run

1. Download the repository or clone it with:
   `git clone https://github.com/jonhymeine/people-registration.git`

2. Move into the front-end folder;

3. Run `npm i` to download all dependencies;

4. Create a `.env` file based on `.env.sample` and edit its environment variables to configure your webpage local port and API URL;

5. Run `npm run dev` to start the application.

Observation: make sure the back-end is running to use the application correctly.

**Description of `.env` environment variables:**

-   `PORT`: the port that the webpage is going to run;
-   `VITE_API_URL`: the API's URL to send requests (where the back-end is listening to).
