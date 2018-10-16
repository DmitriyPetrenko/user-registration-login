// Core
import React, { Component } from "react";
import { func, bool } from "prop-types";

// Instruments
import { validateCorrection } from "../../instruments/validation";
// Components
import Spinner from "../Spinner";

class FormCorrection extends Component {
    static propTypes = {
        isFetching: bool.isRequired,
        formIsValid: bool.isRequired,
        onClickHandler: func.isRequired,
        onBlurHandler: func.isRequired,
        onFocusHandler: func.isRequired,
        formValidHandler: func.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {
            fields: {
                textarea: {
                    content: "",
                    isValid: null,
                    error: ""
                }
            }
        };

        this.onBlur = this.onBlur.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    validationCorrectionField (field, content) {
        let updatedStateOfFields = null;
        let resultOfValidation = null;

        resultOfValidation = validateCorrection.textarea(content);

        updatedStateOfFields = { ...this.state.fields, ...{ [field]: {
            content,
            isValid: resultOfValidation.isValid,
            error: resultOfValidation.error
        } } };

        this.setState({
            fields: updatedStateOfFields
        }, this.props.formValidHandler(updatedStateOfFields));
    }

    onBlur (event) {
        this.props.onBlurHandler(event.target, this.validationCorrectionField.bind(this));
    }

    onSubmitHandler () {

    }

    render () {
        const {
            textarea
        } = this.state.fields;
        const {
            isFetching,
            formIsValid,
            onClickHandler,
            onFocusHandler
        } = this.props;

        return (
            <div className="form">
                <div className="form__wrapper">
                    <form
                        className="form__inner"
                        onSubmit={ this.onSubmitHandler }
                        onClick={ onClickHandler }
                        onFocus={ onFocusHandler }
                        onBlur={ this.onBlur }
                    >
                        <div className="form__head">
                            <h2 className="form__caption">Proper capitalization and spacing</h2>
                        </div>
                        <div className="form__body">
                            <div className="form__body-item text-left">
                                <label className="form__label" htmlFor="textarea">
                                    Input/Output
                                </label>
                                <textarea
                                    className="form__field form__field_textarea"
                                    name="textarea"
                                    id="textarea"
                                    aria-invalid={ textarea.isValid }
                                />
                                { !textarea.isValid && <span className="form__error error">{ textarea.error }</span> }
                            </div>

                            <div className="form__body-item">
                                <button className="form__button" disabled={ !formIsValid }>
                                    { isFetching ? <Spinner /> : "process" }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormCorrection;