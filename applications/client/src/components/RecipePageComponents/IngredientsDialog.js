import './NewDialog.css';
import stepType from "../../enum/StepType";
import utensils from "../../enum/Utensils";
import _ from "lodash";

var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Table = require('react-bootstrap').Table;
var ToggleButton = require('react-bootstrap').ToggleButton;

var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
// var DropdownButton = require('react-bootstrap').DropdownButton;
// var Dropdown = require('react-bootstrap').Dropdown;

class IngredientsDialog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false,
            action: this.props.actionInputInitValue,
            stepTypeSelectedOption: this.props.stepTypeSelectedOptionInitValue,
            importantNotes: this.props.importantNotesInputInitValue
        };

        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({utensils: this.props.utensils});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({utensils: nextProps.utensils});
    }

    handleClick() {
        this.lgClose();
        this.props.action(this.props.item, this.state.name, this.state.dropdownSelectedOption);
    }

    handleSearchTextChange(event) {
        this.setState({searchText: event.target.value});
    }

    // handleImportantNotesChange(event) {
    //     this.setState({searchText: event.target.action});
    // }

    lgClose = () => this.setState({lgShow: false});

    render() {
        return (
            <ButtonToolbar>
                <Button className={"playlist-list-button-div-button"} onClick={() => this.setState({
                    lgShow: true,
                    action: this.props.actionInputInitValue,
                    stepTypeSelectedOption: this.props.stepTypeSelectedOptionInitValue,
                    importantNotes: this.props.importantNotesInputInitValue
                })}>
                    {"Utensils"}
                </Button>

                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={this.lgClose}
                >

                    <div className={"modal-div"}>
                        <h3 className={"modal-div-title"}>{"Utensils"}</h3>
                        <form className={"modal-div-form"}>

                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text modal-div-form-item-group-input"
                                              id="basic-addon1">{"Search"}</span>
                                    </div>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1"
                                           value={this.state.searchText} onChange={this.handleSearchTextChange}/>
                                </div>
                            </div>

                            <Table >
                                {/*<thead>*/}
                                {/*<tr>*/}
                                {/*    <th>#</th>*/}
                                {/*    <th>First Name</th>*/}
                                {/*    <th>Last Name</th>*/}
                                {/*</tr>*/}
                                {/*</thead>*/}
                                <tbody>

                                {this.state.utensils ?
                                    _.chunk(this.state.utensils.filter(utensil =>
                                    (this.state.searchText && this.state.searchText !== '')? utensil.textToShow.toLowerCase().includes(this.state.searchText.toLowerCase()): true), 3).map(
                                    utensils =>
                                        <tr>
                                            { utensils.map(utensil =>
                                            <td>
                                                <Button variant={utensil.selected? "success": "light"} onClick={() => this.changeSelectedStatus(utensil)}>{utensil.textToShow}</Button>
                                            </td>)}
                                        </tr>
                                )
                                : undefined}

                                {/*<tr>*/}
                                {/*    <td>1</td>*/}
                                {/*    <td>Mark</td>*/}
                                {/*    <td>Otto</td>*/}
                                {/*    <td>@mdo</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>2</td>*/}
                                {/*    <td>Jacob</td>*/}
                                {/*    <td>Thornton</td>*/}
                                {/*    <td>@fat</td>*/}
                                {/*</tr>*/}
                                {/*<tr>*/}
                                {/*    <td>3</td>*/}
                                {/*    <td colSpan="2">Larry the Bird</td>*/}
                                {/*    <td>@twitter</td>*/}
                                {/*</tr>*/}
                                </tbody>
                            </Table>

                            <div className={"modal-div-form-item-group button-item-group"}>
                                <Button className={"playlist-add-playlist-cancel-button"} onClick={this.lgClose}>
                                    {this.props.closeButtonText ? this.props.okButtonText : "Close"}
                                </Button>
                                <Button className={"playlist-add-playlist-create-button"} onClick={this.handleClick}>
                                    {this.props.okButtonText}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ButtonToolbar>
        );
    }
    changeSelectedStatus(utensil){
        console.log(utensil);
        utensil.selected = !utensil.selected;
        this.setState({utensils: this.state.utensils});

    }


    updateStepTypeSelectedOption(option) {
        this.setState({stepTypeSelectedOption: option});
    }
}

export default IngredientsDialog;