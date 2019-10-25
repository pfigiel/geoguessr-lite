import React from "react";
import { activeScreen } from "../utils/activeScreen";

export class LogInScreen extends React.Component {
    onLoginButtonClick = () => {
        this.props.setActiveScreen(activeScreen.MAIN_MENU);
    }

    onRegisterLinkClick = () => {
        this.props.setActiveScreen(activeScreen.REGISTER);
    }

    render() {
        return (
            <div id="logInScreen">
                <h1>Log in</h1>
                <p>Email address:</p>
                <input></input>
                <p>Password:</p>
                <input></input>
                <button onClick={this.onLoginButtonClick}>Log in</button>
                <p onClick={this.onRegisterLinkClick}>Don't have an account yet? Register now!</p>
            </div>
        );
    }
}