var restController = require('../RestController');
var {Validator, ValidationError} = require('express-json-validator-middleware');

function initRestEndPoints(app) {
    // Initialize a Validator instance first
    var validator = new Validator({allErrors: true}); // pass in options to the Ajv instance
    // Define a shortcut function
    var validate = validator.validate;

    app.post('/recipes', function (req, res) {
        restController.getUserRecipes(req, res);
    });

    var CreatePlaylistSchema = {
        "type": 'object',
        "properties":
            {"name": {"type": "string"}},
        "required": ["name"]
    };
    app.post('/createrecipe', validate({body: CreatePlaylistSchema}), function (req, res) {
            restController.createRecipe(req, res);
        });

    app.post('/removerecipe',
        // validate({body: CreatePlaylistSchema}),
        function (req, res) {
        restController.removeRecipe(req, res);
    });

    app.post('/updaterecipe',
        // validate({body: CreatePlaylistSchema}),
        function (req, res) {
        restController.updateRecipe(req, res);
    });

    app.post('/addsection',
        // validate({body: CreatePlaylistSchema}),
        function (req, res) {
            restController.addSection(req, res);
        });

    app.post('/removesection',
            // validate({body: CreatePlaylistSchema}),
            function (req, res) {
                restController.removeSection(req, res);
            });

    app.post('/updatesection',
        // validate({body: CreatePlaylistSchema}),
        function (req, res) {
            restController.updateSection(req, res);
        });

    app.post('/copysection',
            // validate({body: CreatePlaylistSchema}),
            function (req, res) {
                restController.copySection(req, res);
            });


    //
    //
    // app.post('/spotify/islogged', function (req, res) {
    //     restController.isLogged(req, res);
    // });
    //
    //
    // app.post('/spotify/user/playlists', function (req, res) {
    //     restController.getUserPlaylists(req, res);
    // });
    //
    // var CreatePlaylistSchema = {
    //     "type": 'object',
    //     "properties":
    //         {"name": {"type": "string"}},
    //     "required": ["name"]
    // };
    // app.post('/spotify/createplaylist', validate({body: CreatePlaylistSchema}), function (req, res) {
    //     restController.createPlaylist(req, res);
    // });
    //
    // var UpdatePlaylistSchema = {
    //     "type": 'object',
    //     "properties":
    //         {
    //             "playlistToUpdate": {
    //                 "type": "object",
    //                 "properties": {
    //                     "id": {"type": "string"},
    //                     "includedPlaylists": {"type": "array"}
    //                 }
    //             }
    //         },
    //     "required": ["playlistToUpdate"]
    // };
    // app.post('/updateplaylist', validate({body: UpdatePlaylistSchema}), function (req, res) {
    //     restController.updatePlaylist(req, res);
    // });

}

module.exports = initRestEndPoints;
