var _ = require('lodash');
var mongoose = require('mongoose');
var async = require('async');
var dataBasePromiseConnection = null;
var mongoDB = process.env.DATABASE_URL;
var logger = require('./configuration/Logger').logger;
var loggerMessages = require('./configuration/Logger').loggerMessages;
var createErrorObject = require('./configuration/Logger').createErrorObject;

var Schema = mongoose.Schema;
let recipesSchema = new Schema({
    _id: String,
    recipes: [{
        name: String,
        sections: [{
            order: Number,
            name: String,
            sectionType: String,
            steps: [{
                order: Number,
                action: String,
                stepType: String,
                timer: Number,
                importantNotes: String,
                utensils: [{
                    name: String
                }],
                ingredients: [{
                    name: String,
                    quantity: Number,
                    units: String,
                    whereToBuy: String
                }]
            }]
        }]
    }]
});

// let sectionSchema = new Schema({
//         order: Number,
//         name: String,
//         type: String,
//         steps: [{
//             order: Number,
//             importantNotes: String,
//             utensils: [{
//                 name: String
//             }],
//             timer: Number,
//             action: String,
//             type: String,
//             ingredients: [{
//                 name: String,
//                 quantity: Number,
//                 units: String,
//                 whereToBuy: String
//             }]
//         ]}
// });

var RecipesModel = mongoose.model('Recipes', recipesSchema)

var getDataBasePromiseConection = function () {
    if (!dataBasePromiseConnection) {
        dataBasePromiseConnection = mongoose.connect(mongoDB, {useNewUrlParser: true})
            .then(() => {
            })
            .catch(err => {
                console.error('Database connection error')
                throw err;
            });
    }
    return dataBasePromiseConnection;
};

module.exports =
    {
        getUserRecipes: function (loggedId) {
            return (callback) => {
                getDataBasePromiseConection().then(function () {
                    RecipesModel.findOne({'_id': loggedId}, function (err, person) {
                        if (err) {
                            callback(createErrorObject(loggerMessages.gettingDatabasePlaylistsInternalError, err));
                        } else {
                            callback(null, person ? person._doc : undefined);
                        }
                    });
                }).catch((err) => {
                    callback(createErrorObject(loggerMessages.gettingDatabasePlaylistsInternalError, err));
                });
            }
        },

        addRecipe: function (loggedUser, recipeName) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        if (!databaseRecipeObject) {
                            this.createEmptyDBRecipeObject(loggedUser.id)(callback)
                        } else {
                            callback(null, databaseRecipeObject);
                        }
                    },

                    (databaseRecipeObject, callback) => {
                        if (!_.find(databaseRecipeObject.recipes, {name: recipeName})) {
                            databaseRecipeObject.recipes.push({
                                // playlistId: spotifyPlaylistObject.body.id,
                                name: recipeName,
                                sections: []
                            })
                            this.updateDBRecipeObject(databaseRecipeObject)(callback);
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameAlreadyExists));
                        }
                        ;

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }
        },

        updateRecipe: function (loggedUser, recipeToUpdate, newRecipeName) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipe = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name})
                        if (recipe) {
                            recipe.name = newRecipeName;
                            this.updateDBRecipeObject(databaseRecipeObject)(callback);
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }
                        ;

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }
        },

        removeRecipe: function (loggedUser, recipeName) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    // (databaseRecipeObject, callback) => {
                    //     if (!databaseRecipeObject) {
                    //         this.createEmptyDBRecipeObject(loggedUser.id)(callback)
                    //     } else {
                    //         callback(null, databaseRecipeObject);
                    //     }
                    // },

                    (databaseRecipeObject, callback) => {
                        if (_.find(databaseRecipeObject.recipes, {name: recipeName})) {
                            databaseRecipeObject.recipes = _.remove(databaseRecipeObject.recipes, (recipe) => recipe.name !== recipeName);
                            // databaseRecipeObject.recipes.push({
                            // playlistId: spotifyPlaylistObject.body.id,
                            // name: recipeName
                            // })
                            this.updateDBRecipeObject(databaseRecipeObject)(callback);
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }
                        ;

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }
        },

        createEmptyDBRecipeObject: function (loggedUserId) {
            return (callback) => {
                let newDBRecipeModelToBeSave = new RecipesModel();
                newDBRecipeModelToBeSave._doc._id = "msemrik";
                getDataBasePromiseConection().then(function () {
                    newDBRecipeModelToBeSave.save()
                        .then(doc => {
                            callback(null, doc._doc);
                        })
                        .catch(err => {
                            callback(createErrorObject(loggerMessages.creatingDBPlaylistInternalError, err));
                        });
                }).catch((err) => {
                    callback(createErrorObject(loggerMessages.creatingDBPlaylistInternalError, err));
                });
            }
        },

        updateDBRecipeObject: function (databaseRecipeObject) {
            return (callback) => {
                getDataBasePromiseConection().then(function () {
                    RecipesModel.findOneAndReplace({_id: databaseRecipeObject._id}, databaseRecipeObject
                        , function (err, res) {
                            if (err || !res._doc) {
                                callback(createErrorObject(loggerMessages.updatingDBPlaylistInternalError, err));
                            } else {
                                callback(null, res);
                            }
                        }
                    )
                }).catch((err) => {
                    callback(createErrorObject(loggerMessages.updatingDBPlaylistInternalError, err));
                });
            }

        },

        addSection: function (loggedUser, newSection, recipeToUpdate) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipe = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name});

                        if (recipe) {
                            var section = _.find(recipe.sections, {name: newSection.name});
                            if (!section) {
                                RecipesModel.updateOne(
                                    {"_id": loggedUser, "recipes.name": recipeToUpdate.name},
                                    {"$push": {"recipes.$.sections": newSection}},
                                    function (err, raw) {
                                        if (err) callback(createErrorObject(loggerMessages.addingSectionDBError, err));
                                        callback(null, raw);
                                    })
                            } else {
                                callback(createErrorObject(loggerMessages.sectionNameAlreadyExists));
                            }
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }

        },

        updateSection: function (loggedUser, sectionToUpdate, recipeToUpdate, newName, newSelectedType) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipe = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name});

                        if (recipe) {
                            var section = _.find(recipe.sections, {name: sectionToUpdate.name});
                            if (section) {
                                section.name = newName;
                                section.sectionType = newSelectedType;
                                this.updateDBRecipeObject(databaseRecipeObject)(callback);
                            } else {
                                callback(createErrorObject(loggerMessages.sectionNameDoNotExists));
                            }
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }

        },

        copySection: function (loggedUser, recipeToUpdate, sectionToCopy, newName) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipeForUpdating = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name});
                        if (recipeForUpdating) {
                            if(!_.find(recipeForUpdating.sections, {name: newName})){
                                var recipeForCopying = _.find(databaseRecipeObject.recipes, {name: sectionToCopy.recipe})
                                if(recipeForCopying){
                                    var sectionForCopying = _.find(recipeForCopying.sections, {name: sectionToCopy.name})
                                    if(sectionForCopying){
                                        sectionForCopying.name = newName;
                                        RecipesModel.updateOne(
                                            {"_id": loggedUser, "recipes.name": recipeToUpdate.name},
                                            {"$push": {"recipes.$.sections": sectionForCopying}},
                                            function (err, raw) {
                                                if (err) callback(createErrorObject(loggerMessages.addingSectionDBError, err));
                                                callback(null, raw);
                                            })
                                    }else{
                                        callback(createErrorObject(loggerMessages.sectionNameDoNotExists));
                                    }
                                } else {
                                    callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                                }
                            } else {
                                callback(createErrorObject(loggerMessages.sectionNameAlreadyExists));
                            }
                        }
                        else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }



                            // if (section) {
                            //     var newSection = _.clone(section);
                            //     newSection.name = newName;
                            //     // section.sectionType = newSelectedType;
                            //     // this.updateDBRecipeObject(databaseRecipeObject)(callback);
                            //     // RecipesModel.updateOne(
                            //     //     {"_id": loggedUser, "recipes.name": recipeToUpdate.name},
                            //     //     {"$pull": {"recipes.$.sections": sectionToRemove}},
                            //     //     function (err, raw) {
                            //     //         if (err) callback(createErrorObject(loggerMessages.addingSectionDBError, err));
                            //     //         callback(null, raw);
                            //     //     })
                            // }
                        // }
                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }

        },

        removeSection: function (loggedUser, sectionToRemove, recipeToUpdate) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipe = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name});

                        if (recipe) {
                            var section = _.find(recipe.sections, {name: sectionToRemove.name});
                            if (section) {
                                RecipesModel.updateOne(
                                    {"_id": loggedUser, "recipes.name": recipeToUpdate.name},
                                    {"$pull": {"recipes.$.sections": sectionToRemove}},
                                    function (err, raw) {
                                        if (err) callback(createErrorObject(loggerMessages.addingSectionDBError, err));
                                        callback(null, raw);
                                    })
                            } else {
                                callback(createErrorObject(loggerMessages.sectionNameDoNotExists));
                            }
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }

        },

        addStep: function (loggedUser, recipeToUpdate, sectionToUpdate, newStep) {
            return (callback) => {

                async.waterfall([
                    this.getUserRecipes(loggedUser),

                    (databaseRecipeObject, callback) => {
                        var recipe = _.find(databaseRecipeObject.recipes, {name: recipeToUpdate.name});

                        if (recipe) {
                            var section = _.find(recipe.sections, {name: sectionToUpdate.name});
                            if (section) {
                                var step = _.find(section.steps, {name: newStep.name});
                                if(!step){
                                    RecipesModel.updateOne(
                                        {"_id": loggedUser},
                                        {"$push": {"recipes.$[i].sections.$[j].steps": newStep}}, {arrayFilters: [{"i.name": recipeToUpdate.name}, {"j.name": sectionToUpdate.name}]},
                                        function (err, raw) {
                                            if (err) callback(createErrorObject(loggerMessages.addingStepDBError, err));
                                            callback(null, raw);
                                        })
                                }
                                else{
                                    callback(createErrorObject(loggerMessages.stepActionAlreadyExists))
                                }
                            } else {
                                callback(createErrorObject(loggerMessages.sectionNameDoNotExists));
                            }
                        } else {
                            callback(createErrorObject(loggerMessages.recipeNameDoNotExists));
                        }

                    }
                ], function (err, returnedObject) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, returnedObject)
                    }
                });
            }

        },
    };
// var addPlaylist = function (loggedUser, spotifyPlaylistObject) {
//     return (callback) => {
//
//         async.waterfall([
//             getConfiguredPlaylists(loggedUser.id),
//
//             (databasePlaylistObject, callback) => {
//                 if (!databasePlaylistObject) {
//                     createEmptyDBPlaylistsObject(loggedUser.id)(callback)
//                 } else {
//                     callback(null, databasePlaylistObject);
//                 }
//             },
//
//             (databasePlaylistObject, callback) => {
//                 databasePlaylistObject.playlists.push({
//                     playlistId: spotifyPlaylistObject.body.id,
//                     name: spotifyPlaylistObject.body.name
//                 });
//
//                 updateDBRecipeObject(databasePlaylistObject)(callback);
//             }
//         ], function (err, returnedObject) {
//             if (err) {
//                 callback(err);
//             } else {
//                 callback(null, returnedObject)
//             }
//         });
//     }
//
// };

//
// var getConfiguredPlaylists = function (loggedId) {
//     return (callback) => {
//         getDataBasePromiseConection().then(function () {
//             PlaylistModel.findOne({'_id': loggedId}, function (err, person) {
//                 if (err) {
//                     callback(createErrorObject(loggerMessages.gettingDatabasePlaylistsInternalError, err));
//                 } else {
//                     callback(null, person ? person._doc : undefined);
//                 }
//             });
//         }).catch((err) => {
//             callback(createErrorObject(loggerMessages.gettingDatabasePlaylistsInternalError, err));
//         });
//     }
// };
//
// var updateDBRecipeObject = function (DBPlaylistsObject) {
//     return (callback) => {
//         getDataBasePromiseConection().then(function () {
//             PlaylistModel.findOneAndReplace({_id: DBPlaylistsObject._id}, DBPlaylistsObject
//                 , function (err, res) {
//                     if (err || !res._doc) {
//                         callback(createErrorObject(loggerMessages.updatingDBPlaylistInternalError, err));
//                     } else {
//                         callback(null, res);
//                     }
//                 }
//             )
//         }).catch((err) => {
//             callback(createErrorObject(loggerMessages.updatingDBPlaylistInternalError, err));
//         });
//     }
// };
//
// var createEmptyDBPlaylistsObject = function (loggedUserId) {
//     return (callback) => {
//         let newDBPlaylistDBModelToBeSave = new PlaylistModel();
//         newDBPlaylistDBModelToBeSave._doc._id = loggedUserId;
//         getDataBasePromiseConection().then(function () {
//             newDBPlaylistDBModelToBeSave.save()
//                 .then(doc => {
//                     callback(null, doc._doc);
//                 })
//                 .catch(err => {
//                     callback(createErrorObject(loggerMessages.creatingDBPlaylistInternalError, err));
//                 });
//         }).catch((err) => {
//             callback(createErrorObject(loggerMessages.creatingDBPlaylistInternalError, err));
//         });
//     }
// }
//
// var addPlaylist = function (loggedUser, spotifyPlaylistObject) {
//     return (callback) => {
//
//         async.waterfall([
//             getConfiguredPlaylists(loggedUser.id),
//
//             (databasePlaylistObject, callback) => {
//                 if (!databasePlaylistObject) {
//                     createEmptyDBPlaylistsObject(loggedUser.id)(callback)
//                 } else {
//                     callback(null, databasePlaylistObject);
//                 }
//             },
//
//             (databasePlaylistObject, callback) => {
//                 databasePlaylistObject.playlists.push({
//                     playlistId: spotifyPlaylistObject.body.id,
//                     name: spotifyPlaylistObject.body.name
//                 });
//
//                 updateDBRecipeObject(databasePlaylistObject)(callback);
//             }
//         ], function (err, returnedObject) {
//             if (err) {
//                 callback(err);
//             } else {
//                 callback(null, returnedObject)
//             }
//         });
//     }
//
// };
//
// function updatePlaylist(loggedUser, req) {
//     return (callback) => {
//
//         async.waterfall([
//
//             getConfiguredPlaylists(loggedUser.id),
//
//
//             (userConfiguredPlaylists, callback) => {
//                 try {
//                     playlistToUpdate = req.body.playlistToUpdate;
//                     var storedPlaylist = _.find(userConfiguredPlaylists.playlists, {'playlistId': playlistToUpdate.id});
//                     storedPlaylist.includedPlaylists = createIncludedPlaylists(playlistToUpdate);
//
//                     updateDBRecipeObject(userConfiguredPlaylists)(callback);
//                 } catch (err) {
//                     callback(createErrorObject(loggerMessages.updatingDBPlaylistInternalError, err));
//                 }
//             }
//
//         ], function (err, returnedObject) {
//             if (err) {
//                 callback(err);
//             } else {
//                 callback(null, returnedObject)
//             }
//         })
//     }
// }
//
// function createIncludedPlaylists(playlistToUpdate) {
//     var includedPlaylistsObject = [];
//     playlistToUpdate.includedPlaylists.map((includedPlaylistId) => includedPlaylistsObject.push({playlistId: includedPlaylistId}));
//     return includedPlaylistsObject;
// }
//
// module.exports =
//     {
//         getConfiguredPlaylists: getConfiguredPlaylists,
//         addPlaylist: addPlaylist,
//         updatePlaylist: updatePlaylist
//     };