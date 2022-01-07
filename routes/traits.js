const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { traitsService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const traitsThings = await traitsService.getList();
            // console.log(topDeck);
            return response.render('layouts', { pageTitle: 'Traits', template: "traits", traitsThings });
        } catch (error) {
            return next(error);
        }
    });

    router.post('/', (request, response) => {
        return response.send("Deck updated!");
    });


    return router;
};