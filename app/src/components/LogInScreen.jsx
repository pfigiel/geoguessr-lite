import React from "react";
import { activeScreen } from "../utils/activeScreen";
import { IdentityService } from "../services/identityService";
import { storageItems } from "../utils/storageItems";

export class LogInScreen extends React.Component {
    state = {
        email: "",
        password: "",
        isError: false
    }

    constructor() {
        super();
        this.identityService = new IdentityService();
    }

    onLoginButtonClick = async () => {
        const user = await this.identityService.login(this.state.email, this.state.password);
        if (user) {
            localStorage.setItem(storageItems.USERNAME, user.username);
            localStorage.setItem(storageItems.EMAIL_ADDRESS, user.email);
            this.props.setActiveScreen(activeScreen.MAIN_MENU);
        } else {
            this.setState({ isError: true });
        }
    }

    onRegisterLinkClick = () => {
        this.props.setActiveScreen(activeScreen.REGISTER);
    }

    onEmailAddressChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div id="logInScreen">
                <h1>Log in</h1>
                <p>Email address:</p>
                <input onChange={this.onEmailAddressChange} />
                <p>Password:</p>
                <input onChange={this.onPasswordChange} type="password" />
                <button onClick={this.onLoginButtonClick}>Log in</button>
                <span className="link" onClick={this.onRegisterLinkClick}>Don't have an account yet? Register now!</span>
                {this.state.isError && (
                    <span className="errorMessage">Error while logging in. Please try again.</span>
                )}
            </div>
        );
    }
}