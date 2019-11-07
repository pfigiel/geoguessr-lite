import React from "react"
import { activeScreen } from "../utils/activeScreen";
import { IdentityService } from "../services/identityService";

export class MainMenuScreen extends React.Component {
    state = {
        username: "Test"
    }

    constructor() {
        super();
        this.identityService = new IdentityService();
    }

    onStartGameButtonClick = () => {
        this.props.setActiveScreen(activeScreen.IN_GAME);
    }

    onHighscoresButtonClick = () => {
        this.props.setActiveScreen(activeScreen.HIGH_SCORES);
    }

    onLogoutButtonClick = async () => {
        await this.identityService.logout();
        this.props.setActiveScreen(activeScreen.LOG_IN);
    }

    render() {
        return(
            <div id="mainMenuScreen">
                <h1>Welcome {this.state.username}</h1>
                <button onClick={this.onStartGameButtonClick}>Start game</button>
                <button onClick={this.onHighscoresButtonClick}>Highscores</button>
                <button onClick={this.onLogoutButtonClick}>Logout</button>
            </div>
        );
    }
}