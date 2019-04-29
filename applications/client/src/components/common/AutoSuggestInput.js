import './AutoSuggestInput.css';
import Autosuggest from 'react-autosuggest';

var React = require('react');

class AutoSuggestInput extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            // value: this.props.value? this.props.value: '',
            suggestions: []
        };
    }

    componentWillMount() {
        this.setState({value: this.props.value? this.props.value : ''});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value? nextProps.value : ''});
    }

    onChange = (event, { newValue }) => {
        this.props.onChange(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Ingrese un ingrediente',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = function(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.suggestions.filter(lang =>
            lang.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = function(suggestion) {return suggestion};

    // Use your imagination to render suggestions.
    renderSuggestion = function(suggestion) {
        return (<div>
            {suggestion}
        </div>);
    }

}

export default AutoSuggestInput;