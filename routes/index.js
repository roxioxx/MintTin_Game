const express = require('express');

const cardInvRoute = require("./cardsInv.js");
const characterProfileRoute = require("./characterProf.js");
const traitsRoute = require("./traits.js");

const router = express.Router();


module.exports = params => {
    const { characterService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const topDeck = await characterService.getList();
            //console.log(deckCard);
            return response.render('layouts', { pageTitle: 'Board View', template: "index", topDeck });
        } catch (error) {
            return next(error);
        }

    });

    router.use("/cardDeck", cardInvRoute(params));
    router.use("/characterProfile", characterProfileRoute(params));
    router.use("/traits", traitsRoute(params));

    return router;
};