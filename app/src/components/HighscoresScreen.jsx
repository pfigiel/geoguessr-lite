import React from "react";
import { storageItems } from "../utils/storageItems";

export class HighscoresScreen extends React.Component {
    state = {
        globalHighscores: [{username: "test", score: 1000}, {username: "test2", score: 900}, {username: "test3", score: 800}, {username: "test4", score: 700}],
        userHighscores: [4444, 3333, 2222, 1111],
        isShowingGlobalHighscores: true
    }

    componentDidMount() {
        // fetch highscores
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