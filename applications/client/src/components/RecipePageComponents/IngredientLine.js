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

class UtensilsDialog extends React.Component {

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
            <tr>
                <td>
                    <input/>
                </td>
                <td>
                    {this.props.ingredient}
                </td>
                <td>
                    {"AAAA"}
                </td>
            </tr>

        );
    }

    changeSelectedStatus(utensil) {
        console.log(utensil);
        utensil.selected = !utensil.selected;
        this.setState({utensils: this.state.utensils});

    }


    updateStepTypeSelectedOption(option) {
        this.setState({stepTypeSelectedOption: option});
    }
}

export default UtensilsDialog;