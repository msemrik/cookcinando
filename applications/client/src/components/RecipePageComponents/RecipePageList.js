import React from "react";
import ListItem from "./ListItem";
import NewDialog from "./NewDialog";

var Button = require('react-bootstrap').Button;

class RecipePageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedConfiguredPlaylist: ''};
    }

    getDefaultProps() {
        return {
            itemsToShow: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedConfiguredPlaylist !== this.props.selectedConfiguredPlaylist)
            this.setState({selectedConfiguredPlaylist: nextProps.selectedConfiguredPlaylist});
    }

    render() {
        return (
            <section className={"playlist-list-section"}>
                <div className={"playlist-list-title-div"}>
                    <h1 className={"playlist-list-title-text"}>
                        {this.props.listTitle}
                    </h1>
                    <div className={"playlist-list-button-div"}>
                        {this.props.listButton}
                    </div>
                </div>
                <div className={"playlist-list-div"}>
                    <table className={"playlist-list-div-table"}>
                        <tbody className={"playlist-list-div-table-tbody"}>
                        {this.props.itemsToShow ?


                            (this.props.itemsToShow.length === 0) ?
                                <h1 className={"playlist-list-title-text"}>
                                    <br/>
                                    You do not have any recipe. Start by Clicking on Create Recipe ;)
                                </h1> :

                                this.props.itemsToShow.map(item =>

                                    <ListItem {...this.getRecipeItem(item)}/>
                                ).reduce((prev, curr) => [prev, ' ', curr], '')

                            :

                            undefined
                        }
                        </tbody>
                    </table>
                </div>
            </section>
        );
    };

    getRecipeItem(item) {
        return {
            // isConfiguredPlaylist: this.props.isConfiguredPlaylist,
            // isSelected: playlist.id === this.state.selectedConfiguredPlaylist.id ? true : false,
            item: item,
            itemRightOption: this.props.itemRightButtons(item),
            clickAction: (playlist) => this.props.itemActionOnClick(playlist)
        }
    }
}

export default RecipePageList;
