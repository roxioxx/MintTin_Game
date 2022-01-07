const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require("body-parser");

const CardDeckService = require("./services/cardDeckService");
const CharacterService = require("./services/characterService");

const cardDeckService = new CardDeckService("./data/cardDeck.JSON");
const characterService = new CharacterService("./data/characterProfiles.JSON");
const traitsService = new CardDeckService("./data/traits.JSON");

const routes = require('./routes/index.js');
const { request } = require('express');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
    cookieSession({
        name: 'session',
        keys: ['Ghdur87399s7w', 'hhjjdf8s866799'],
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = 'Board Game Prototype';

//This is how you set application level variables. 
//To use them to pull the specific character's data, use "locals.selectedCharacter"
app.locals.selectedCharacter = "Xander";

app.use(express.static(path.join(__dirname, "./website")))


app.use(async(request, response, next) => {
    try {
        const names = await characterService.getNames();
        response.locals.characterNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
});


app.use(
    '/',
    routes({
        cardDeckService,
        characterService,
        traitsService,
    })
);

// app.use((request, response, next) => {
//     return next(createError(404, 'File not found'));
// });

app.use((err, request, response, next) => {
    response.locals.message = err.message;
    console.error(err);
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});