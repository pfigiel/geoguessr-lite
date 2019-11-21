import React from "react";
import { activeScreen } from "../utils/activeScreen";
import { IdentityService } from "../services/identityService";

const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

export class RegisterScreen extends React.Component {
    state = {
        isError: false,
        isRegisterButtonDisabled: true
    }

    constructor() {
        super();
        this.identityService = new IdentityService();
        this.email = "";
        this.username = "";
        this.password = "";
        this.confirmedPassword = "";
    }

    onRegisterButtonClicked = async () => {
        if (await this.identityService.register(this.email, this.username, this.password)) {
            this.props.setActiveScreen(activeScreen.LOG_IN);
        } else {
            this.setState({ isError: true });
        }
    }

    onEmailAddressChange = (event) => {
        this.email = event.target.value;
        this.validateFormData();
    }

    onUsernameChange = (event) => {
        this.username = event.target.value;
        this.validateFormData();
    }

    onPasswordChange = (event) => {
        this.password = event.target.value;
        this.validateFormData();
    }

    onConfirmedPasswordChange = (event) => {
        this.confirmedPassword = event.target.value;
        this.validateFormData();
    }

    onBackToLoginLinkClick = () => {
        this.props.setActiveScreen(activeScreen.LOG_IN);
    }

    validateFormData = () => {
        this.setState({
            isFormDataValid: this.email !== "" &&
                this.username !== "" &&
                this.password !== "" &&
                this.password === this.confirmedPassword &&
                emailRegex.test(this.email)
        });
    }

    render() {
        return (
            <div id="registerScreen">
                <h1>Register</h1>
                <p>Email address:</p>
                <input onChange={this.onEmailAddressChange} />
                <p>Username:</p>
                <input onChange={this.onUsernameChange} />
                <p>Password:</p>
                <input onChange={this.onPasswordChange}
                    type="password" /> 
                <p>Confirm password:</p>
                <input onChange={this.onConfirmedPasswordChange}
                    type="password" />
                <button onClick={this.onRegisterButtonClicked}
                    className={!this.state.isFormDataValid ? "disabled" : ""}>
                    Register
                </button>
                <span className="link" onClick={this.onBackToLoginLinkClick}>Back to login screen</span>
                {this.state.isError && (
                    <span className="errorMessage">Error while registering. Please try again.</span>
                )}
            </div>
        );
    }
}