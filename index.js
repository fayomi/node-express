//firs initialise the folder
//npm init

// then install express
// npm i express

// then create index.js file

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')

const app = express();

const PORT = process.env.PORT || 5000;
const members = require('./Members');

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))

// to import object from different file

const logger = require('./middleware/logger')

// initialise body parser middleware to do post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Handlebars Middleware
// this section uses templates
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members
}));

// to create a route the old way
// app.get('/', (req, res) => {
//     res.send('<h1>Hello Worlds</h1>');
// });

// set a static folder
// which means call html and css templates
app.use(express.static(path.join(__dirname, 'public')));


//Members API routes
// to use route in /routes/api/members.js
app.use('/api/members', require('./routes/api/members'))

// install package called nodemon so it auto-restarts server after a change
// npm i -D nodemon

// in package.json file under scripts add the start and dev scripts
// then 'npm run dev' to work in dev env

// to install package that deals with date formatting
// npm i moment




// to initialise middleware
// app.use(logger)





















