import './NewDialog.css';

var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var Modal = require('react-bootstrap').Modal;

class NewDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lgShow: false, name: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.lgClose();
        this.props.action(this.state.name, this.props.item);
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
}

export default NewDialog;