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
- Axios - for HTTP request
- node-schedule - for schedule tasks
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
- NOTE: Improve here with Azure Blob Storage and Azure Cosmos DB

--
Start Steps for Local
--
- Open project with Visual Studio Code
- Go to server directory
- Configure `dev.js` with the values of the database of Atlas Mongo DB
- Configure URL of Azure local or use the default
- Run `npm i`
- Build the server with `npm run build`
- Launch the server with `npm run start`
- Open postman and import the `environment` and the `collection` from postman folder
- Optional open swagger in (By default) http://localhost:3000/documentation

1) Request to post a task with image
2) Wait to end the request
3) Wait to schedule launch
4) When all finish the status is going to be END and the images with new resolution saved

--
How to use the APP
--
- Use the postman collection to test the endpoints
- Launch jest with this command: `npm run test`

--
Other decisions taked
--
- Used mongoose to have models and simplify the connection (We should use Azure Cosmos DB)
- Saved in local the images to avoid cost of Azure Blob Storage
- Used swagger to documentate the endpoints
- No auth used for be a example project
- No used inversify and decorator to improve the readability of the code for be a small project
- Used the following extensions: 'Prettier', 'ESLint', 'SonarLint', 'Todo Tree'