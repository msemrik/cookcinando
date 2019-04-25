import React from 'react';
import RecipePageList from "../RecipePageComponents/RecipePageList";
import NewDialog from "../RecipePageComponents/NewDialog";
import StepDialog from "../RecipePageComponents/StepDialog";
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
        this.renameRecipe= this.renameRecipe.bind(this);
        this.removeRecipe = this.removeRecipe.bind(this);
        this.addSection = this.addSection.bind(this);
        this.editSection = this.editSection.bind(this);
        this.copySection = this.copySection.bind(this);
        this.removeSection = this.removeSection.bind(this);
        this.addStep = this.addStep.bind(this);
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
                            // if(state.selectedRecipe){
                            //
                            // }
                            var selectedRecipe;
                            if(state.state.selectedRecipe){
                                selectedRecipe = _.find(response.recipes, {name: state.state.selectedRecipe.name});
                            }
                            state.setState({userRecipes: response.recipes, selectedRecipe: selectedRecipe});
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

                <div
                    className={this.state.selectedSection ? "playlist-page-spotify-playlist" : "playlist-page-spotify-playlist playlist-page-spotify-playlist-not-showed"}>
                    <RecipePageList {...this.prepareStepList()} />
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

            emptyMessage: "You do not have any recipe. Start by Clicking on Create Recipe. ",
            itemActionOnClick: (recipe) => this.updateSelectedRecipe(recipe),

            itemRightButtons: (item) => this.getRecipeItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    prepareSectionList() {
        return {
            listTitle: "Recipe's Sections",
            listButton: <NewDialog {...this.getAddSectionDialog()} />,
            // isConfiguredPlaylist: true,
            itemsToShow: this.state.selectedRecipe ? this.state.selectedRecipe.sections : undefined,
            // selectedConfiguredPlaylist: this.state.selectedConfiguredPlaylist,
            emptyMessage: "You do not have any section. Start by Clicking on Add Section. ",
            itemActionOnClick: (section) => this.updateSelectedSection(section),
            itemRightButtons: (item) => this.getSectionItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    prepareStepList() {
        return {
            listTitle: "Section's steps",
            listButton: <StepDialog {...this.getAddStepDialog()} />,
            // isConfiguredPlaylist: true,
            itemsToShow: this.state.selectedSection ? this.state.selectedSection.steps : undefined,
            // selectedConfiguredPlaylist: this.state.selectedConfiguredPlaylist,
            emptyMessage: "You do not have any step. Start by Clicking on Add Step. ",
            // itemActionOnClick: (section) => this.updateSelectedSection(section),
            // itemRightButtons: (item) => this.getSectionItemRightButtons(item)
            // itemRemoveAction: (recipe) => this.removeRecipe(recipe),
            // itemRenameAction: (recipe) => this.renameRecipe(recipe),
        }
    }

    getAddStepDialog() {
        return {
            buttonText: "Add Step",
        //     dialogTitle: "Create Section",
        //     dialogButton: <StepDialog {...this.getCopySectionDialog()} />,
        //     dialogDropdownLabel: "Select section type",
        //     dialogDropdownOptions: sectionsType,
        //     dialogInputLabel: "Section Name",
            action: this.addStep,
            okButtonText: "Add Step"
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

    getRenameRecipeDialog(item) {
        return {
            item: item,
            buttonText: "Rename Recipe",
            dialogTitle: "Rename Recipe " + item.name,
            dialogInputLabel: "Recipe Name",
            action: this.renameRecipe,
            okButtonText: "Rename Recipe"
        }
    }

    getRemoveRecipeDialog(item) {
        return {
            item: item,
            buttonText: "Remove Recipe",
            dialogTitle: "Are you sure you want to remove " + item.name + " ?",
            // dialogInputLabel: "Recipe Name",
            action: this.removeRecipe,
            okButtonText: "Remove Recipe"
        }
    }

    getAddSectionDialog() {
        return {
            buttonText: "Add Section",
            dialogTitle: "Create Section",
            dialogButton: <NewDialog {...this.getCopySectionDialog()} />,
            dialogDropdownLabel: "Select section type",
            dialogDropdownOptions: sectionsType,
            dialogInputLabel: "Section Name",
            action: this.addSection,
            okButtonText: "Add Section"
        }
    }

    getEditSectionDialog(item) {
        return {
            item: item,
            buttonText: "Edit Section",
            dialogTitle: "Editing section: " + item.name,
            dialogInputLabel: "Section Name",
            dialogInputInitValue: item.name,
            dialogDropdownLabel: "Select section type",
            dialogDropdownOptions: sectionsType,
            dialogDropdownInitValue: {textToShow: item.sectionType, type: item.sectionType},
            action: this.editSection,
            okButtonText: "Save changes"
        }
    }

    getRemoveSectionDialog(item) {
        return {
            item: item,
            buttonText: "Remove Section",
            dialogTitle: "Are you sure you want to remove " + item.name + " ?",
            // dialogInputLabel: "Recipe Name",
            action: this.removeSection,
            okButtonText: "Remove section"
        }
    }

    getCopySectionDialog() {
        return {
            buttonText: "Copy from existing Section",
            dialogTitle: "Copy Section",
            dialogDropdownLabel: "Select section to copy",
            dialogDropdownOptions: this.getSectionsToCopy(),
            dialogInputLabel: "Section Name",
            action: this.copySection,
            okButtonText: "Add Section"
        }
    }

    getSectionsToCopy() {
        var flatMap = (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], []);

        // var sections = this.state.userRecipes.flatMap(recipe => recipe.sections.map(section => {recipe.name + " - " + section.name}));
        var sections = this.state.userRecipes.flatMap(recipe => recipe.sections.map(section => new Object({"recipe": recipe, "section": section, "textToShow": recipe.name + " - " + section.name})));
        return sections;
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
                <NewDialog {...this.getEditSectionDialog(item)} />
            </div>
        );
    }

    createRecipe(item, name) {
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

    addSection(item, name, type) {
        if (!name || !type.type) {
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
                        sectionType: type.type
                    }
                }),
                redirect: 'manual'
            }).then((result) => {
                    var state = this;
                    if (result.ok) {
                        this.getUserRecipes();
                        state.props.handleResponse({messageToShow: "Section Successfully added =D"});
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

    copySection(item, name, sectionToCopy) {
        if (!name || !sectionToCopy) {
            this.props.handleResponse(this.createError("Name and Section to copy are mandatory fields"));
        } else {
            this.props.showLoadingModal();
            fetch('/copysection', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    recipe: this.state.selectedRecipe,
                    name: name,
                    section: {
                        name: sectionToCopy.section.name,
                        recipe: sectionToCopy.recipe.name,
                        // sectionType: type
                    }
                }),
                redirect: 'manual'
            }).then((result) => {
                    var state = this;
                    if (result.ok) {
                        this.getUserRecipes();
                        state.props.handleResponse({messageToShow: "Section Successfully copied =D"});
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

    addStep(action, importantNotes) {
        if (!action) {
            this.props.handleResponse(this.createError("Action is mandatory field"));
        } else {
            this.props.showLoadingModal();
            fetch('/addstep', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({
                    recipe: this.state.selectedRecipe,
                    section: this.state.selectedSection,
                    step: {
                        action: action,
                        importantNotes: importantNotes
                    }
                }),
                redirect: 'manual'
            }).then((result) => {
                    var state = this;
                    if (result.ok) {
                        this.getUserRecipes();
                        state.props.handleResponse({messageToShow: "Section Successfully added =D"});
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

    removeRecipe(item) {
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

    removeSection(item, name) {
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

    editSection(item, name, selectedType) {
        if (!name || !selectedType) {
            this.props.handleResponse(this.createError("Name and Type are mandatory fields"));
        } else {
            this.props.showLoadingModal();
            fetch('/updatesection', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify({section: item, recipe: this.state.selectedRecipe, newName: name, newSelectedType: selectedType.type}),
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
    }

    renameRecipe(item, name) {
        this.props.showLoadingModal();
        fetch('/updaterecipe', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({recipe: item, name: name}),
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
            selectedSection: '',
        })
    }

    updateSelectedSection(section) {
        this.setState({
            selectedSection: section,
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