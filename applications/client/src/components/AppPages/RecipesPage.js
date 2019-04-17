import React from 'react';
import RecipePageList from "../RecipePageComponents/RecipePageList";
import NewDialog from "../RecipePageComponents/NewDialog";
import sectionsType from "../../enum/SectionsType";
import './RecipesPage.css';
import _ from "lodash";

var Button = require('react-bootstrap').Button;

class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userRecipes: [], recipesToBeShown: ''};
        this.getUserRecipes = this.getUserRecipes.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
        this.addSection = this.addSection.bind(this);
        // this.savePlaylistsConfiguration = this.savePlaylistsConfiguration.bind(this);
    }

    componentDidMount() {
        if (this.props.isSpotifyUserLogged)
            this.getUserRecipes();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSpotifyUserLogged !== this.props.isSpotifyUserLogged && nextProps.isSpotifyUserLogged === true)
            this.getUserRecipes();
    }

    getUserRecipes() {
        this.props.showLoadingModal();
        fetch('/recipes', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
        })
            .then((result) => {
                    var state = this;
                    if (result.ok) {
                        result.json().then(function (response) {
                            state.setState({userRecipes: response.recipes});
                            state.props.hideLoadingModal();
                        });
                    } else {
                        result.json().then(function (error) {
                            state.props.handleResponse(error);
                            state.props.hideLoadingModal();
                        });
                    }
                }
            )
    }

    render() {
        return (
            <div>
                {this.props.isSpotifyUserLogged ?

                    this.showAppRecipeApp()
                    :

                    <div>
                        <div className={"playlist-page-title-div"}>

                            <h1 className={"playlist-page-title-text"}>You're not logged in. Please
                                go to
                                'Configure' option.
                            </h1>
                        </div>
                    </div>

                }
            </div>
        );
    }

    showAppRecipeApp() {
        return (
            <div className={"playlist-page-content"}>
                <div
                    className={this.state.selectedRecipe ? "playlist-page-configured-playlist" : "playlist-page-configured-playlist playlist-page-configured-playlist-full-width"}>
                    <RecipePageList {...this.prepareRecipeList()} />
                </div>

                <div
                    className={this.state.selectedRecipe ? "playlist-page-spotify-playlist" : "playlist-page-spotify-playlist playlist-page-spotify-playlist-not-showed"}>
                    <RecipePageList {...this.prepareSectionList()} />
                </div>
            </div>
        );
    }

    prepareRecipeList() {
        return {
            listTitle: "Your recipes",
            listButton: <NewDialog {...this.getNewRecipeDialog()} />,
            // isConfiguredPlaylist: true,
            itemsToShow: this.state.userRecipes,
            // selectedConfiguredPlaylist: this.state.selectedConfiguredPlaylist,

            itemActionOnClick: (recipe) => this.updateSelectedRecipe(recipe),

            itemRightButtons: (item) => this.getRecipeItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    getNewRecipeDialog() {
        return {
            buttonText: "Create Recipe",
            dialogTitle: "Create Recipe",
            dialogInputLabel: "Recipe Name",
            action: this.createRecipe,
            okButtonText: "Create New Recipe"
        }
    }

    prepareSectionList() {
        return {
            listTitle: "Recipe's Sections",
            listButton: <NewDialog {...this.getAddSectionDialog()} />,
            // isConfiguredPlaylist: true,
            itemsToShow: this.state.selectedRecipe ? this.state.selectedRecipe.sections : undefined,
            // selectedConfiguredPlaylist: this.state.selectedConfiguredPlaylist,
            itemActionOnClick: (recipe) => this.updateSelectedSection(recipe),
            itemRightButtons: (item) => this.getSectionItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    getAddSectionDialog() {
        return {
            buttonText: "Add Section",
            dialogTitle: "Create Section",
            dialogDropdownLabel: "Select section type",
            dialogDropdownOptions: sectionsType,
            dialogInputLabel: "Section Name",
            action: this.addSection,
            okButtonText: "Add Section"
        }
    }


    getRecipeItemRightButtons(item) {
        return (
            <div>
                <NewDialog {...this.getRemoveRecipeDialog(item)} />
                <NewDialog {...this.getRenameRecipeDialog(item)} />
            </div>
        );
    }

    getSectionItemRightButtons(item) {
        return (
            <div>
                <NewDialog {...this.getRemoveSectionDialog(item)} />
                {/*<NewDialog {...this.getRenameSectionDialog(item)} />*/}
            </div>
        );
    }

    getRemoveRecipeDialog(item) {
        return {
            item: item,
            buttonText: "Remove Recipe",
            dialogTitle: "Are you sure you want to remove " + item.name + " ?",
            // dialogInputLabel: "Recipe Name",
            action: (name, item) => this.removeRecipe(name, item),
            okButtonText: "Remove Recipe"
        }
    }

    getRenameRecipeDialog(item) {
        return {
            item: item,
            buttonText: "Rename Recipe",
            dialogTitle: "Rename Recipe " + item.name,
            dialogInputLabel: "Recipe Name",
            action: (name, item) => this.renameRecipe(name, item),
            okButtonText: "Rename Recipe"
        }
    }

    getRemoveSectionDialog(item) {
        return {
            item: item,
            buttonText: "Remove Section",
            dialogTitle: "Are you sure you want to remove " + item.name + " ?",
            // dialogInputLabel: "Recipe Name",
            action: (name, item) => this.removeSection(name, item),
            okButtonText: "Remove section"
        }
    }

    //TODO ADD UPDATE SECTION (show dialog)
    getRenameSectionDialog(item) {
        return {
            // item: item,
            // buttonText: "Rename Section",
            // dialogTitle: "Rename Recipe " + item.name,
            // dialogInputLabel: "Recipe Name",
            // action: (name, item) => this.renameRecipe(name, item),
            // okButtonText: "Rename Recipe"
        }
    }

    createRecipe(name) {
        this.props.showLoadingModal();
        fetch('/createrecipe', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({name: name}),
            redirect: 'manual'
        }).then((result) => {
                var state = this;
                if (result.ok) {
                    this.getUserRecipes();
                    state.props.handleResponse({messageToShow: "Recipe Successfully created =D"});
                } else {
                    result.json().then(function (error) {
                        state.props.handleResponse(error);
                        state.props.hideLoadingModal();
                    });
                }
            }
        )
    }

    addSection(name, type) {
        if (!name || !type) {
            this.props.handleResponse(this.createError("Name and Type are mandatory fields"));
        } else {
            this.props.showLoadingModal();
            fetch('/addsection', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    recipe: this.state.selectedRecipe,
                    section: {
                        name: name,
                        type: type
                    }
                }),
                redirect: 'manual'
            }).then((result) => {
                    var state = this;
                    if (result.ok) {
                        this.getUserRecipes();
                        state.props.handleResponse({messageToShow: "Recipe Successfully created =D"});
                    } else {
                        result.json().then(function (error) {
                            state.props.handleResponse(error);
                            state.props.hideLoadingModal();
                        });
                    }
                }
            )
        }

    }

    createError(errorMessage) {
        return {errorToShow: errorMessage};
    }

    removeRecipe(name, item) {
        this.props.showLoadingModal();
        fetch('/removerecipe', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({item: item}),
            redirect: 'manual'
        }).then((result) => {
                var state = this;
                if (result.ok) {
                    this.getUserRecipes();
                    state.props.handleResponse({messageToShow: "Recipe Successfully removed"});
                } else {
                    result.json().then(function (error) {
                        state.props.handleResponse(error);
                        state.props.hideLoadingModal();
                    });
                }
            }
        )
    }

    removeSection(name, item) {
        this.props.showLoadingModal();
        fetch('/removesection', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({section: item, recipe: this.state.selectedRecipe}),
            redirect: 'manual'
        }).then((result) => {
                var state = this;
                if (result.ok) {
                    this.getUserRecipes();
                    state.props.handleResponse({messageToShow: "Recipe Successfully removed"});
                } else {
                    result.json().then(function (error) {
                        state.props.handleResponse(error);
                        state.props.hideLoadingModal();
                    });
                }
            }
        )
    }

    renameRecipe(name, item) {
        this.props.showLoadingModal();
        fetch('/updaterecipe', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({item: item, name: name}),
            redirect: 'manual'
        }).then((result) => {
                var state = this;
                if (result.ok) {
                    this.getUserRecipes();
                    state.props.handleResponse({messageToShow: "Recipe Successfully updated"});
                } else {
                    result.json().then(function (error) {
                        state.props.handleResponse(error);
                        state.props.hideLoadingModal();
                    });
                }
            }
        )
    }

    updateSelectedRecipe(recipe) {
        this.setState({
            selectedRecipe: recipe,
            // spotifyPlaylistsToBeShown: this.state.userPlaylists.spotifyPlaylists.map((spotifyPlaylist) => {
            //     spotifyPlaylist.selected = _.find(playlist.includedPlaylists, {"playlistId": spotifyPlaylist.id}) ? true : false;
            //     return spotifyPlaylist;
            // })
        })
    }

    updateSelectedSection(section) {
        this.setState({
            selectedSection: section,
            // spotifyPlaylistsToBeShown: this.state.userPlaylists.spotifyPlaylists.map((spotifyPlaylist) => {
            //     spotifyPlaylist.selected = _.find(playlist.includedPlaylists, {"playlistId": spotifyPlaylist.id}) ? true : false;
            //     return spotifyPlaylist;
            // })
        })
    }

    //
    // prepareSpotifyPlaylistsList() {
    //     return {
    //         playlistPageTitle: "Your spotify playlists",
    //         playlistPageButton: <Button className={"playlist-list-button-div-button"}
    //                                     onClick={(playlist) => this.savePlaylistsConfiguration(playlist)}>
    //             Save Changes
    //         </Button>,
    //         isConfiguredPlaylist: false,
    //         playlistsToShow: this.state.spotifyPlaylistsToBeShown,
    //         itemActionOnClick: (playlist) => this.changePlaylistChecked(playlist)
    //     }
    // }
    //
    //
    // changePlaylistChecked(playlist) {
    //     _.find(this.state.spotifyPlaylistsToBeShown, {id: playlist.id}).selected = !playlist.selected;
    //     this.setState({
    //         spotifyPlaylistsToBeShown: this.state.spotifyPlaylistsToBeShown
    //     })
    // }
    //
    //
    // savePlaylistsConfiguration() {
    //     this.props.showLoadingModal();
    //     var playlistToUpdate = this.state.selectedConfiguredPlaylist;
    //     playlistToUpdate.includedPlaylists = [];
    //     this.state.spotifyPlaylistsToBeShown.filter((playlist) => playlist.selected).forEach(playlist => {
    //         playlistToUpdate.includedPlaylists.push(playlist.id);
    //     });
    //
    //     fetch('/updateplaylist', {
    //         method: 'POST',
    //         headers: {'Content-Type': "application/json"},
    //         body: JSON.stringify({playlistToUpdate: playlistToUpdate})
    //     }).then((result) => {
    //             var state = this;
    //             if (result.ok) {
    //                 this.getUserPlaylists();
    //                 state.props.handleResponse({messageToShow: "Playlist Successfully updated =D"});
    //                 state.props.hideLoadingModal();
    //             } else {
    //                 result.json().then(function (error) {
    //                     state.props.handleResponse(error);
    //                     state.props.hideLoadingModal();
    //                 });
    //             }
    //
    //             // if (result.ok) {
    //             //         console.log('success updatedplaylist');
    //             //         alert('success updatedplaylist');
    //             //         this.getUserPlaylists();
    //             //     } else {
    //             //         // isSpotifyLogged: false
    //             //         result.json().then((error) => {
    //             //             this.props.handleError(error, (error) => {
    //             //                 if (error.errorType === "dbError") {
    //             //                     alert("Internal errors occurred, Please try later. Error desc: " + error.errorMessage);
    //             //                 } else if (error.errorType === "spotifyError") {
    //             //                     alert("Changes were saved, but was not able to update Spotify playlsit, try saving later. Error desc: " + error.errorMessage);
    //             //                 }
    //             //             });
    //             //         });
    //             //     }
    //             }
    //         );
    //     console.log(playlistToUpdate);
    // }
}

export default RecipesPage;