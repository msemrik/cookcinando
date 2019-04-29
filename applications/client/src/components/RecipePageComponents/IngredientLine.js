import './NewDialog.css';
import stepType from "../../enum/StepType";
import utensils from "../../enum/Utensils";
import AutoSuggestInput from "../common/AutoSuggestInput";
import _ from "lodash";

import measurementUnits from "../../enum/MeasurementUnits";
var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Table = require('react-bootstrap').Table;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Dropdown = require('react-bootstrap').Dropdown;
var ToggleButton = require('react-bootstrap').ToggleButton;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

var  FaMinus = require('react-icons/fa').FaMinusCircle;

class IngredientsLine extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.updateSelectedMeasurementUnit = this.updateSelectedMeasurementUnit.bind(this);
        this.handleIngredientNameChange = this.handleIngredientNameChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);

    }

    componentWillMount() {
        // this.setState({ingredient: this.props.ingredient});
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ingredient: nextProps.ingredient});
    }

    render() {
        return (
            <tr>
                <td>
                    <AutoSuggestInput value={this.props.ingredient.ingredientName} onChange={this.handleIngredientNameChange} suggestions={["aaaa","aaab","aaac","aaaad","bbbba"]} />
                </td>
                <td>
                    {
                        <div className={"modal-div-form-item-group"}>
                            <div className="input-group mb-3">
                                <DropdownButton size="sm" variant="success" title={this.props.ingredient.measurementUnits? this.props.ingredient.measurementUnits: "Select unit"}>
                                    {measurementUnits.map((option) =>
                                        <Dropdown.Item onClick={() =>this.updateSelectedMeasurementUnit(option)} >{option
                                        }</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </div>
                        </div>
                    }
                </td>
                <td>
                    <input type="number" step=".01"  value={this.props.ingredient.amount} onChange={this.handleAmountChange} />
                </td>
                <td>
                    <Button variant="danger" onClick={() => this.props.removeIngredient(this.props.index)}>
                        <FaMinus />
                    </Button>
                </td>

            </tr>

        );
    }

    updateSelectedMeasurementUnit(option){
        this.props.handleIngredientUpdate({
            index: this.props.index,
            ingredientName: this.props.ingredient.ingredientName,
            amount: this.props.ingredient.amount,
            measurementUnits: option
        });
    }


    handleIngredientNameChange(ingredientName){
        this.props.handleIngredientUpdate({
            index: this.props.index,
            ingredientName: ingredientName,
            amount: this.props.ingredient.amount,
            measurementUnits: this.props.ingredient.measurementUnits
        });
    }

    handleAmountChange(event) {
        this.props.handleIngredientUpdate({
            index: this.props.index,
            ingredientName: this.props.ingredient.ingredientName,
            amount: event.target.value,
            measurementUnits: this.props.ingredient.measurementUnits
        });
    }
}

export default IngredientsLine;