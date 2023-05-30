--
Frameworks selected
--
- Hapi last version (Last framework server of Node used)
- Joi as validator of the payloads
- MongoDB as BBDD (Free option with Mongo Atlas)
- Mongoose for models and connection
- fs, crypto - default node modules
- buffer-image-size - to get the dimension of the image
- dotenv, config and cross-env - to environment variables
- joi - validation of routes for hapi and allow swagger doc
- nodemon - restart automatically the server with the compilation
- jest - to test the App
- Azure services (More experience with Microsoft technologies)
- Typescript for work with typed code
- OS: Windows (Normal OS used in the projects)

--
Prerequisites
--
- Install Visual Studio Code
- Install Extension Azure Functions
- Install Node V18 / NPM (Recommend use NVM)
- Download the code from Master of the Repository

--
Start Steps for Cloud
--
- Configure Azure with an Account
- Deploy Azure Function
- Deploy Azure App Service

--
Start Steps for Local
--
- Open project with Visual Studio Code
- Go to server directory
- Configure `dev.js` with the values of the database
- Run `npm i`
- Build the server with `npm run build`
- Launch the server with `npm run start`
- Open postman and import the `environment` and the `collection` from postman folder
- Optional open swagger in (By default) http://localhost:3000/documentation

--
How to use the APP
--
- Use the postman collection to test the endpoints
- Launch jest with this command: `npm run test`

--
Other decisions taked
--
- Used mongoose to have models and simplify the connection
- Used swagger to documentate the endpoints
- No auth used for be a example project
- No used inversify and decorator to improve the readability of the code for be a small project
- Used the following extensions: 'Prettier', 'ESLint', 'SonarLint', 'Todo Tree'