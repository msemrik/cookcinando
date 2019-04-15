var React = require('react');

class ListItem extends React.Component {

    render() {
        return (
            <tr id={this.props.item.name}
                className={this.props.isSelected ? "playlist-list-item-row selected" : "playlist-list-item-row"}
                onClick={() => this.props.clickAction(this.props.item)
                }>

                <td className={"playlist-list-item-image-column"}>
                    <img className={"playlist-list-item-image-image"} alt=""
                         src={this.props.item.images ? this.props.item.images[2].url : "/noplaylistimage.png"}/>
                </td>

                <td className={this.props.isSelected ? "playlist-list-item-name-column selected" : "playlist-list-item-name-column"}>
                    <strong>
                        {this.props.item.name}
                    </strong>
                    <br/>
                    {/*Number of tracks: {this.props.playlist.tracks.total}*/}
                </td>

                {this.props.itemRightOption? this.props.itemRightOption : undefined}
                {/*{!this.props.isConfiguredPlaylist ?*/}
                {/*    <td className={"playlist-list-item-checkbox-column"}>*/}
                {/*        <div className="playlist-list-item-checkbox-div">*/}
                {/*            <label>*/}
                {/*                <input type="checkbox" name="notify-product-news:email" value="1" checked="checked"*/}
                {/*                       onChange={() => this.props.clickAction(this.props.playlist)}*/}
                {/*                       className="playlist-list-item-checkbox-input-checkbox"/>*/}
                {/*                <span*/}
                {/*                    className={this.props.playlist.selected ? "playlist-list-item-checkbox-span checked" : "playlist-list-item-checkbox-span"}></span>*/}
                {/*            </label>*/}
                {/*        </div>*/}
                {/*    </td>*/}
                {/*    : undefined}*/}
            </tr>
        );
    }
}

export default ListItem;

