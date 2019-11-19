import React from "react";
import { storageItems } from "../utils/storageItems";
import { GameService } from "../services/gameService";

export class HighscoresScreen extends React.Component {
    state = {
        globalHighscores: [],
        userHighscores: [],
        isShowingGlobalHighscores: true
    }

    constructor() {
        super();
        this.gameService = new GameService();
    }

    async componentDidMount() {
        this.setState({
            globalHighscores: await this.gameService.getGlobalHighscores(),
            userHighscores: await this.gameService.getUserHighscores()
        })
    }

    toggleMode = () => {
        this.setState({ isShowingGlobalHighscores: !this.state.isShowingGlobalHighscores });
    }

    render() {
        return (
            <div id="highscores">
                <div>
                    {this.state.isShowingGlobalHighscores ? (
                        <>
                            <h1>Highscores</h1>
                            <div>
                                {this.state.globalHighscores.map((el, index) => (
                                    <div>
                                        <span>{`${index + 1}. ${el.username}`}</span>
                                        <span>{el.score}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Your highscores</h1>
                            <div>
                                {this.state.globalHighscores.map((el, index) => (
                                    <div>
                                        <span>{`${index + 1}. ${localStorage.getItem(storageItems.USERNAME)}`}</span>
                                        <span>{el.score}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={this.toggleMode}>
                        Show{this.state.isShowingGlobalHighscores ? " my highscores" : " global highscores"}
                    </button>
                </div>
            </div>
        )
    }
}