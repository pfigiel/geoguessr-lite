import React from "react";
import { activeScreen } from "../utils/activeScreen";

export class RegisterScreen extends React.Component {
    onRegisterButtonClicked = () => {
        this.props.setActiveScreen(activeScreen.LOG_IN);
    }

    render() {
        return (
            <div id="registerScreen">
                <h1>Register</h1>
                <p>Email address:</p>
                <input></input>
                <p>Username:</p>
                <input />
                <p>Password:</p>
                <input></input>
                <p>Confirm password:</p>
                <input></input>
                <button onClick={this.onRegisterButtonClicked}>Register</button>
            </div>
        );
    }
}