const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { characterService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const topDeck = await characterService.getList();
            // console.log(topDeck);
            return response.render('layouts', { pageTitle: 'Character Select', template: "characterList", topDeck });
        } catch (error) {
            return next(error);
        }
    });

    router.get('/:shortname', async(request, response, next) => {
        try {
            const deckCard = await characterService.getCharacter(request.params.shortname);
            //console.log(deckCard);
            return response.render('layouts', { pageTitle: request.params.shortname, template: "singleCharacterProfile", deckCard });
        } catch (error) {
            return next(error);
        }
    });


    return router;
};