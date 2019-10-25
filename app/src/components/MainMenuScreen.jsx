import React from "react"
import { activeScreen } from "../utils/activeScreen";

export class MainMenuScreen extends React.Component {
    onStartGameButtonClick = () => {
        this.props.setActiveScreen(activeScreen.IN_GAME);
    }

    render() {
        return(
            <div id="mainMenuScreen">
                <button onClick={this.onStartGameButtonClick}>Start game!</button>
            </div>
        );
    }
}