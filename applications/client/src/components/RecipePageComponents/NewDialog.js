import './NewDialog.css';

var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var Modal = require('react-bootstrap').Modal;
var DropdownButton = require('react-bootstrap').DropdownButton;
var Dropdown = require('react-bootstrap').Dropdown;

class NewDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false, name: '', dropdownSelectedOption: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.lgClose();
        this.props.action(this.state.name, this.props.item? this.props.item: this.state.dropdownSelectedOption);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    lgClose = () => this.setState({lgShow: false, name: ''});

    render() {
        return (
            <ButtonToolbar>
                <Button className={"playlist-list-button-div-button"} onClick={() => this.setState({lgShow: true})}>
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

                            {/*dialogDropdownLabel: "Select section type",*/}
                            {/*dialogDropdownOptions: sectionsType,*/}
                            {this.props.dialogDropdownLabel?
                                <div className={"modal-div-form-item-group"}>
                                    <div className="input-group mb-3">
                                        {/*<div className="input-group-prepend">*/}
                                        {/*<span className="input-group-text modal-div-form-item-group-input"*/}
                                        {/*      id="basic-addon1">{this.props.dialogInputLabel}</span>*/}
                                        {/*</div>*/}
                                        <DropdownButton size="sm" variant="success" title={this.state.dropdownSelectedOption? this.state.dropdownSelectedOption: this.props.dialogDropdownLabel}>
                                            {this.props.dialogDropdownOptions.map((option) =>
                                                <Dropdown.Item onClick={() =>this.updateDropdownSelectedOption(option)} >{option
                                                }</Dropdown.Item>
                                            )}
                                        </DropdownButton>
                                    </div>
                                </div> : undefined}

                            {this.props.dialogInputLabel?
                            <div className={"modal-div-form-item-group"}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text modal-div-form-item-group-input"
                                              id="basic-addon1">{this.props.dialogInputLabel}</span>
                                    </div>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1"
                                           value={this.state.name} onChange={this.handleNameChange}/>
                                </div>
                            </div> : undefined}
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

    updateDropdownSelectedOption(option){
        this.setState({dropdownSelectedOption: option});
    }
}

export default NewDialog;