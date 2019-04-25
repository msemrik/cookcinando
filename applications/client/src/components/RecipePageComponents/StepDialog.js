import './NewDialog.css';
import UtensilsDialog from "./UtensilsDialog";
import IngredientsDialog from "./IngredientsDialog";
import stepType from "../../enum/StepType";
import utensils from "../../enum/Utensils";

var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var Modal = require('react-bootstrap').Modal;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Dropdown = require('react-bootstrap').Dropdown;



class StepDialog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false, action: this.props.actionInputInitValue, stepTypeSelectedOption: this.props.stepTypeSelectedOptionInitValue,
            importantNotes: this.props.importantNotesInputInitValue
        };

        this.handleActionChange = this.handleActionChange.bind(this);
        this.handleImportantNotesChange = this.handleImportantNotesChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.lgClose();
        this.props.action(this.state.action, this.state.importantNotes);
    }

    handleActionChange(event) {
        this.setState({action: event.target.value});
    }

    handleImportantNotesChange(event) {
        this.setState({action: event.target.value});
    }

    lgClose = () => this.setState({lgShow: false});

    render() {
        return (
            <ButtonToolbar>
                <Button className={"playlist-list-button-div-button"} onClick={() => this.setState({lgShow: true, action: this.props.actionInputInitValue, stepTypeSelectedOption: this.props.stepTypeSelectedOptionInitValue, importantNotes: this.props.importantNotesInputInitValue})}>
                    {this.props.buttonText}
                </Button>

                <Modal
                    size="lg"
                    show={this.state.lgShow}
                    onHide={this.lgClose}
                >

                    <div className={"modal-div"}>
                        <h3 className={"modal-div-title"}>{this.props.dialogTitle}</h3>
                        <form className={"modal-div-form"}>

                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text modal-div-form-item-group-input"
                                              id="basic-addon1">{"Action"}</span>
                                    </div>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1"
                                           value={this.state.action} onChange={this.handleActionChange}/>
                                </div>
                            </div>


                             <div className={"modal-div-form-item-group"}>
                                    <div className="input-group mb-3">
                                        <DropdownButton size="sm" variant="success" title={this.state.stepTypeSelectedOption? this.state.stepTypeSelectedOption.textToShow: this.props.dialogDropdownLabel}>
                                            {stepType.map((option) =>
                                                <Dropdown.Item onClick={() =>this.updateStepTypeSelectedOption(option)} >{option.textToShow
                                                }</Dropdown.Item>
                                            )}
                                        </DropdownButton>
                                    </div>
                             </div>

                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text modal-div-form-item-group-input"
                                              id="basic-addon1">{"Important Notes"}</span>
                                    </div>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1"
                                           value={this.state.importantNotes} onChange={this.handleImportantNotesChange}/>
                                </div>
                            </div>

                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <UtensilsDialog {...this.getUtensilsDialogProps()}/>
                                </div>
                            </div>

                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <IngredientsDialog {...this.getUtensilsDialogProps()}/>
                                </div>
                            </div>

                            {/*{this.props.dialogButton ?*/}
                            {/*    <div className={"modal-div-form-item-group"}>*/}
                            {/*        <div className="input-group mb-3">*/}
                            {/*            {this.props.dialogButton}*/}
                            {/*        </div>*/}
                            {/*    </div> : undefined}*/}


                            {/*{this.props.dialogDropdownLabel?*/}
                            {/*    <div className={"modal-div-form-item-group"}>*/}
                            {/*        <div className="input-group mb-3">*/}
                            {/*            /!*<div className="input-group-prepend">*!/*/}
                            {/*            /!*<span className="input-group-text modal-div-form-item-group-input"*!/*/}
                            {/*            /!*      id="basic-addon1">{this.props.dialogInputLabel}</span>*!/*/}
                            {/*            /!*</div>*!/*/}
                            {/*            <DropdownButton size="sm" variant="success" title={this.state.dropdownSelectedOption? this.state.dropdownSelectedOption.textToShow: this.props.dialogDropdownLabel}>*/}
                            {/*                {this.props.dialogDropdownOptions.map((option) =>*/}
                            {/*                    <Dropdown.Item onClick={() =>this.updateDropdownSelectedOption(option)} >{option.textToShow*/}
                            {/*                    }</Dropdown.Item>*/}
                            {/*                )}*/}
                            {/*            </DropdownButton>*/}
                            {/*        </div>*/}
                            {/*    </div> : undefined}*/}

                            {/*{this.props.dialogInputLabel?*/}
                            {/*<div className={"modal-div-form-item-group"}>*/}
                            {/*    <div className="input-group mb-3">*/}
                            {/*        <div className="input-group-prepend">*/}
                            {/*            <span className="input-group-text modal-div-form-item-group-input"*/}
                            {/*                  id="basic-addon1">{this.props.dialogInputLabel}</span>*/}
                            {/*        </div>*/}
                            {/*        <input type="text" className="form-control" aria-describedby="basic-addon1"*/}
                            {/*               value={this.state.name} onChange={this.handleNameChange}/>*/}
                            {/*    </div>*/}
                            {/*</div> : undefined}*/}



                            <div className={"modal-div-form-item-group button-item-group"}>
                                <Button className={"playlist-add-playlist-cancel-button"} onClick={this.lgClose}>
                                    {this.props.closeButtonText? this.props.okButtonText : "Close"}
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

    getUtensilsDialogProps(){
        return{
          utensils: this.getUtensils()
        };
    }

    getUtensils(){
        var utensilsToReturn = utensils;
        utensilsToReturn[2].selected = true;
        return utensilsToReturn;
    }
}

export default StepDialog;