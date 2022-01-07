const express = require('express');
const { check, validationResult } = require("express-validator");
const router = express.Router();

module.exports = (params) => {

    const { cardDeckService } = params;

    router.get('/', async(request, response, next) => {
        try {
            const topDeck = await cardDeckService.getList();
            // console.log(topDeck);

            const errors = request.session.cardDeck ? request.session.cardDeck.errors : false;

            const successMessage = request.session.cardDeck ? request.session.cardDeck.message : false;

            request.session.cardDeck = {};

            return response.render('layouts', { pageTitle: 'Card Deck', template: "cardDeck", topDeck, errors, successMessage });
        } catch (error) {
            return next(error);
        }
    });

    router.post('/', [
        check("_id")
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("A name is required."),
        check("effect")
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("An effect is required."),
        check("shortname")
        .trim()
        .isLength({ min: 1, max: 5 })
        .escape()
        .withMessage("A variable name is required."),
    ], async(request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            request.session.cardDeck = {
                errors: errors.array(),
            };
            return response.redirect("/cardDeck");
        }

        const { _id, effect, shortname } = request.body;
        await cardDeckService.addEntry(_id, effect, shortname);
        request.session.cardDeck = {
            message: "Deck Updated!"
        }
        return response.redirect("/cardDeck");
    });


    return router;
};