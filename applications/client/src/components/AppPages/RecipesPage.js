import React from 'react';
import RecipePageList from "../RecipePageComponents/RecipePageList";
import NewDialog from "../RecipePageComponents/NewDialog";
import './RecipesPage.css';
import _ from "lodash";

var Button = require('react-bootstrap').Button;

class RecipesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userRecipes: [], recipesToBeShown: ''};
        this.getUserRecipes = this.getUserRecipes.bind(this);
        this.createRecipe = this.createRecipe.bind(this);
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
                    className={this.state.selectedConfiguredPlaylist ? "playlist-page-configured-playlist" : "playlist-page-configured-playlist playlist-page-configured-playlist-full-width"}>
                    <RecipePageList {...this.prepareRecipeList()} />
                </div>

                {/*<div*/}
                    {/*className={this.state.selectedConfiguredPlaylist ? "playlist-page-spotify-playlist" : "playlist-page-spotify-playlist playlist-page-spotify-playlist-not-showed"}>*/}
                    {/*<RecipePageList {...this.prepareSpotifyPlaylistsList()} />*/}
                {/*</div>*/}
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

            itemActionOnClick: (recipe) => this.updateSpotifyPlaylistsSelectedStatus(recipe),

            itemRightButtons: (item) => this.getRecipeItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    getNewRecipeDialog(){
        return{
            buttonText: "Create Recipe",
            dialogTitle: "Create Recipe",
            dialogInputLabel: "Recipe Name",
            action: this.createRecipe,
            okButtonText: "Create New Recipe"
        }
    }





    getRecipeItemRightButtons(item){
        return (
            <div>
                <NewDialog {...this.getRemoveRecipeDialog(item)} />
                <NewDialog {...this.getRenameRecipeDialog(item)} />
            </div>
        );
    }

// <NewDialog {...this.getNewRecipeDialog()} />
// <NewDialog {...this.getNewRecipeDialog()} />


    getRemoveRecipeDialog(item){
        return{
            item:item,
            buttonText: "Remove Recipe",
            dialogTitle: "Are you sure you want to remove " + item.name + " ?",
            // dialogInputLabel: "Recipe Name",
            action: (name, item) => this.removeRecipe(name, item),
            okButtonText: "Remove Recipe"
        }
    }

    getRenameRecipeDialog(item){
        return{
            item:item,
            buttonText: "Rename Recipe",
            dialogTitle: "Rename Recipe " + item.name,
            dialogInputLabel: "Recipe Name",
            action: (name, item) => this.renameRecipe(name, item),
            okButtonText: "Rename Recipe"
        }
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
    // updateSpotifyPlaylistsSelectedStatus(playlist) {
    //     this.setState({
    //         selectedConfiguredPlaylist: playlist,
    //         spotifyPlaylistsToBeShown: this.state.userPlaylists.spotifyPlaylists.map((spotifyPlaylist) => {
    //             spotifyPlaylist.selected = _.find(playlist.includedPlaylists, {"playlistId": spotifyPlaylist.id}) ? true : false;
    //             return spotifyPlaylist;
    //         })
    //     })
    // }
    //
    // changePlaylistChecked(playlist) {
    //     _.find(this.state.spotifyPlaylistsToBeShown, {id: playlist.id}).selected = !playlist.selected;
    //     this.setState({
    //         spotifyPlaylistsToBeShown: this.state.spotifyPlaylistsToBeShown
    //     })
    // }
    //
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