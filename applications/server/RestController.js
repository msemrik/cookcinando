var database = require('./DatabaseApi');
// var spotifyApi = require('./SpotifyApi');
var async = require('async');
var validate = require('jsonschema').validate;
var jsonSchemas = require('./configuration/JSONSchemas');
var logger = require('./configuration/Logger').logger;
var loggerMessages = require('./configuration/Logger').loggerMessages;
var createErrorObject = require('./configuration/Logger').createErrorObject;
var generateErrorMessageToLog = require('./configuration/Logger').generateErrorMessageToLog;
var generateErrorObjectToReturn = require('./configuration/Logger').generateErrorObjectToReturn;
var _ = require('lodash');

var sessionHandler = require('./configuration/SessionHandler');

module.exports = {

    getUserRecipes: function (req, res) {
        async.waterfall(
            [
                database.getUserRecipes("msemrik")],
            function (err, returnedObject) {
                            if (err) {
                                logger.error(generateErrorMessageToLog(err));
                                res.status(500);
                                res.json(generateErrorObjectToReturn(err.errorObject));
                                res.end();
                            } else {
                                try {
                                    res.status(200);
                                    var objectToReturn = returnedObject.recipes? returnedObject.recipes : [];
                                    res.json({
                                        recipes: objectToReturn
                                        // configuredPlaylists: getConfiguredSpotifyPlaylists(returnedObject[1], returnedObject[0]),
                                        // spotifyPlaylists: returnedObject[0].body.items
                                    })
                                    res.end();
                                } catch (e) {
                                    logger.error(generateErrorMessageToLog(createErrorObject(loggerMessages.convertingPlaylistsToReturnError,err)));
                                    res.status(500);
                                    res.json(generateErrorObjectToReturn(loggerMessages.convertingPlaylistsToReturnError));
                                    res.end();
                                }
                            }
                        })
    },

    createRecipe: function (req, res) {
            var recipeName = req.body.name;

            async.waterfall([

                database.addRecipe("msemrik", recipeName)
            ], function (err) {
                if (err) {
                    logger.error(generateErrorMessageToLog(err));
                    res.status(500);
                    res.json(generateErrorObjectToReturn(err.errorObject));
                    res.end();
                    return;
                } else {
                    res.status(200);
                    res.end();
                }
            });
    },

    removeRecipe: function (req, res) {
        var recipeName = req.body.item.name;

        async.waterfall([

            database.removeRecipe("msemrik", recipeName)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    updateRecipe: function (req, res) {
        var recipe = req.body.recipe;
        var newName = req.body.name;

        async.waterfall([

            database.updateRecipe("msemrik", recipe, newName)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    addSection: function (req, res) {
        var section = req.body.section;
        var recipe = req.body.recipe;

        async.waterfall([

            database.addSection("msemrik", section, recipe)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    removeSection: function (req, res) {
        var section = req.body.section;
        var recipe = req.body.recipe;


        async.waterfall([

            database.removeSection("msemrik", section, recipe)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    updateSection: function (req, res) {
        var section = req.body.section;
        var recipe = req.body.recipe;
        var newName = req.body.newName;
        var newSelectedType = req.body.newSelectedType;


        async.waterfall([

            database.updateSection("msemrik", section, recipe, newName, newSelectedType)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    copySection: function (req, res) {
        var recipeToUpdate = req.body.recipe;
        var sectionToCopy = req.body.section;
        var newName = req.body.name;
        // var newSelectedType = req.body.newSelectedType;


        async.waterfall([

            database.copySection("msemrik", recipeToUpdate, sectionToCopy, newName)
        ], function (err) {
            if (err) {
                logger.error(generateErrorMessageToLog(err));
                res.status(500);
                res.json(generateErrorObjectToReturn(err.errorObject));
                res.end();
                return;
            } else {
                res.status(200);
                res.end();
            }
        });
    },

    // isLogged: function (req, res) {
    //     try {
    //         var loggedUser = sessionHandler.isLogged(req.sessionID)
    //         if (!loggedUser) {
    //             res.status(500);
    //             res.end();
    //         } else {
    //             res.status(200);
    //             res.json(loggedUser)
    //             res.end();
    //         }
    //     } catch (err) {
    //         logger.error(generateErrorMessageToLog(createErrorObject(loggerMessages.isLoggedError, err)));
    //         res.status(500);
    //         res.end();
    //     }
    // },
    //
    // login: function (req, res, code) {
    //     async.waterfall(
    //         [
    //             spotifyApi.login(code),
    //
    //
    //             (spotifyUserObject, callback) => {
    //                 try {
    //                     spotifyUserObject = sessionHandler.updateSession(req.sessionID, spotifyUserObject)
    //                     callback(null, spotifyUserObject);
    //                 } catch (e) {
    //                     callback(createErrorObject(loggerMessages.updatingSessionDataError, e))
    //                 }
    //             },
    //
    //
    //             (spotifyUserObject, callback) => {
    //                 spotifyApi.getUserInfo(spotifyUserObject, callback)(callback);
    //             },
    //
    //
    //             (spotifyUserDataObject, callback) => {
    //                 try {
    //                     spotifyUserDataObject = sessionHandler.updateSession(req.sessionID, spotifyUserDataObject)
    //                     callback(null, spotifyUserDataObject);
    //                 } catch (e) {
    //                     callback(createErrorObject(loggerMessages.updatingSessionDataError, e))
    //                 }
    //             },
    //
    //         ],
    //
    //         function (err) {
    //             if (err) {
    //                 logger.error(generateErrorMessageToLog(err));
    //                 sessionHandler.removeSession(req.sessionID);
    //                 res.redirect('/?loginerror');
    //             } else {
    //                 res.redirect('/');
    //             }
    //         });
    // },
    //
    // logout: function (req, res) {
    //     try {
    //         sessionHandler.removeSession(req.sessionID);
    //         req.session.destroy();
    //     } catch (err) {
    //         logger.error(generateErrorMessageToLog(createErrorObject(loggerMessages.loggingOutInternalError, err)));
    //         logger.error("Error while loging out Spotify: " + e);
    //     }
    //     res.redirect('/');
    //
    // },
    //
    // getUserPlaylists: function (req, res) {
    //
    //     var getUserPlaylistFunction = function (loggedUser) {
    //         async.parallel([
    //
    //             spotifyApi.getSpotifyUserPlaylists(loggedUser),
    //
    //             database.getConfiguredPlaylists(loggedUser.id),
    //
    //         ], function (err, returnedObject) {
    //             if (err) {
    //                 logger.error(generateErrorMessageToLog(err));
    //                 res.status(500);
    //                 res.json(generateErrorObjectToReturn(err.errorObject));
    //                 res.end();
    //             } else {
    //                 try {
    //                     res.status(200);
    //                     res.json({
    //                         configuredPlaylists: getConfiguredSpotifyPlaylists(returnedObject[1], returnedObject[0]),
    //                         spotifyPlaylists: returnedObject[0].body.items
    //                     })
    //                     res.end();
    //                 } catch (e) {
    //                     logger.error(generateErrorMessageToLog(createErrorObject(loggerMessages.convertingPlaylistsToReturnError,err)));
    //                     res.status(500);
    //                     res.json(generateErrorObjectToReturn(loggerMessages.convertingPlaylistsToReturnError));
    //                     res.end();
    //                 }
    //             }
    //         })
    //     };
    //
    //     checkIfIsLoggedAndExecute(req, res, getUserPlaylistFunction)
    // },
    //
    // createPlaylist: function (req, res) {
    //
    //     var createPlaylistFunction = function (loggedUser, req) {
    //         var playlistName = req.body.name;
    //         async.waterfall([
    //
    //             spotifyApi.createPlaylist(loggedUser, playlistName),
    //
    //             (spotifyPlaylistObject, callback) => {
    //                 database.addPlaylist(loggedUser, spotifyPlaylistObject)(callback)
    //             }
    //
    //         ], function (err) {
    //             if (err) {
    //                 logger.error(generateErrorMessageToLog(err));
    //                 res.status(500);
    //                 res.json(generateErrorObjectToReturn(err.errorObject));
    //                 res.end();
    //                 return;
    //             } else {
    //                 res.status(200);
    //                 res.end();
    //             }
    //         });
    //     };
    //
    //     checkIfIsLoggedAndExecute(req, res, createPlaylistFunction);
    // },
    //
    // updatePlaylist: function (req, res) {
    //
    //     var updatePlaylistFunction = function (loggedUser, req){
    //         async.series([
    //
    //             database.updatePlaylist(loggedUser, req),
    //             spotifyApi.updatePlaylist(loggedUser, req.body.playlistToUpdate)
    //
    //         ], function (err) {
    //             if (err) {
    //                 logger.error(generateErrorMessageToLog(err));
    //                 res.status(500);
    //                 res.json(generateErrorObjectToReturn(err.errorObject));
    //                 res.end();
    //                 return;
    //             } else {
    //                 res.status(200);
    //                 res.end();
    //             }
    //
    //         });
    //
    //     };
    //
    //
    //
    //     checkIfIsLoggedAndExecute(req, res, updatePlaylistFunction);
    // }
};

// function checkIfIsLoggedAndExecute(req, res, functionToExecute) {
//     var loggedUser = sessionHandler.isLogged(req.sessionID);
//     if (loggedUser) {
//         functionToExecute(loggedUser, req);
//     } else {
//         logger.error(generateErrorMessageToLog(createErrorObject(loggerMessages.userNotLoggedError)));
//         res.status(500);
//         res.json(generateErrorObjectToReturn(loggerMessages.userNotLoggedError));
//         res.end();
//     }
// }
//
function getConfiguredSpotifyPlaylists(DBPlaylistsObject, SPOTIFYPlaylistsObject) {
    if (!DBPlaylistsObject || DBPlaylistsObject.playlists.length === 0 || SPOTIFYPlaylistsObject.body.items.length === 0) {
        return [];
    }

    var DBPlaylistsObjectIDs = DBPlaylistsObject.playlists.map(dbObject => {
        return dbObject.playlistId;
    });
    return SPOTIFYPlaylistsObject.body.items.filter(spotifyObject => DBPlaylistsObjectIDs.includes(spotifyObject.id))
        .map((spotifyObject) => {
            spotifyObject.includedPlaylists = (_.find(DBPlaylistsObject.playlists, {"playlistId": spotifyObject.id}).includedPlaylists);
            return spotifyObject;
        })
}