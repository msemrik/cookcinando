import './NewDialog.css';
import stepType from "../../enum/StepType";
import measurementUnits from "../../enum/MeasurementUnits";
import _ from "lodash";
import IngredientLine from "./IngredientLine";

var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Table = require('react-bootstrap').Table;
var ToggleButton = require('react-bootstrap').ToggleButton;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
// var DropdownButton = require('react-bootstrap').DropdownButton;
// var Dropdown = require('react-bootstrap').Dropdown;
var  FaPlus = require('react-icons/fa').FaPlus;
var  FaMinus = require('react-icons/fa').FaMinusCircle;

class IngredientsDialog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false,
            ingredients: this.props.ingredients
        };

        this.addIngredient = this.addIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        // this.setState({ingredients: this.props.ingredients});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({utensils: nextProps.utensils});
    }

    // handleClick() {
        // this.lgClose();
        // this.props.action(this.props.item, this.state.name, this.state.dropdownSelectedOption);
    // }

    // handleSearchTextChange(event) {
    //     this.setState({searchText: event.target.value});
    // }

    // handleImportantNotesChange(event) {
    //     this.setState({searchText: event.target.action});
    // }

    handleClose(){
        // this.props.checkIngredientsAreComplete();
        this.lgClose();
    }

    handleSave(){
        this.props.updateIngredients(this.state.ingredients);
        this.lgClose();
    }

    lgClose = () => this.setState({lgShow: false});


    render() {
        var index = 0;
        return (
            <ButtonToolbar>
                <Button className={"playlist-list-button-div-button"} onClick={() => this.setState({
                    lgShow: true,
                    action: this.props.actionInputInitValue,
                    stepTypeSelectedOption: this.props.stepTypeSelectedOptionInitValue,
                    importantNotes: this.props.importantNotesInputInitValue
                })}>
                    {"Ingredients"}
                </Button>

                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={this.lgClose}
                >

                    <div className={"modal-div"}>
                        <h3 className={"modal-div-title"}>
                            {"Ingredients"}
                        </h3>
                        <Button variant="success" onClick={this.addIngredient}>
                            <FaPlus />
                        </Button>
                        <form className={"modal-div-form"}>


                            {/*<div className={"modal-div-form-item-group"}>*/}
                                {/*<div className="input-group mb-3">*/}
                                    {/*<div className="input-group-prepend">*/}
                                        {/*<span className="input-group-text modal-div-form-item-group-input"*/}
                                              {/*id="basic-addon1">{"Search"}</span>*/}
                                    {/*</div>*/}
                                    {/*<input type="text" className="form-control" aria-describedby="basic-addon1"*/}
                                           {/*value={this.state.searchText} onChange={this.handleSearchTextChange}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            <Table >
                                {/*<thead>*/}
                                {/*<tr>*/}
                                {/*    <th>#</th>*/}
                                {/*    <th>First Name</th>*/}
                                {/*    <th>Last Name</th>*/}
                                {/*</tr>*/}
                                {/*</thead>*/}
                                <tbody>
                                {this.state.ingredients ?

                                    this.state.ingredients.map(
                                        (ingredient,i) =>
                                    <IngredientLine {...this.getIngredientProps(i, ingredient)} />
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
                                <Button className={"playlist-add-playlist-cancel-button"} onClick={this.handleClose}>
                                    {"Close"}
                                </Button>
                                <Button className={"playlist-add-playlist-create-button"} onClick={this.handleSave}>
                                    {this.props.okButtonText? this.props.okButtonText : "Save" }
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </ButtonToolbar>
        );
    }

    getIngredientProps(indexOfIngredient, ingredient){
        return {
            index: indexOfIngredient,
            ingredient:ingredient,
            handleIngredientUpdate: this.handleIngredientUpdate,
            removeIngredient: this.handleRemoveIngredient
        }
    }

    handleIngredientUpdate(ingredient){
        var ingredients = this.state.ingredients;
        ingredients[ingredient.index] = ingredient;
        this.setState({ingredients: ingredients});
    }

    handleRemoveIngredient(index){
        var ingredients = this.state.ingredients;
        delete ingredients[index];
        this.setState({ingredients: ingredients});

    }

    changeSelectedStatus(utensil){
        console.log(utensil);
        utensil.selected = !utensil.selected;
        this.setState({utensils: this.state.utensils});

    }

    addIngredient(){
        var ingredients = this.state.ingredients;
        ingredients.push({ingredientName: '', measurementUnits: undefined, amount: 0});
        this.setState({ingredients: ingredients});
    }
    updateStepTypeSelectedOption(option) {
        this.setState({stepTypeSelectedOption: option});
    }
}

export default IngredientsDialog;