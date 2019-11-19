import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { activeScreen } from "../utils/activeScreen";
import { GameService } from "../services/gameService";

const centerOfGliwice = [50.293938, 18.665646]

export class GameplayScreen extends React.Component {
    state = {
        imageUrls: [],
        coordinates: [],
        markedPosition: null,
        elapsedTime: 0,
        shouldShowAnswer: false,
        turnDistance: 0,
        turnScore: 0,
        totalDistance: 0,
        totalScore: 0,
        turn: 0,
        isGameFinished: false,
        leaderboardPosition: 0
    }

    constructor() {
        super();
        this.elapsedTime = 0;
        this.gameService = new GameService();
    }

    async componentDidMount() {
        this.startStopwatch();
        await this.setGameplayData();
    }

    setGameplayData = async () => {
        const gameplayData = await this.gameService.getGameplayData();
        this.setState({
            imageUrls: gameplayData.imageUrls,
            coordinates: gameplayData.coordinates
        })
    }

    startStopwatch = () => {
        this.elapsedTime = 0;
        this.stopwatchIntervalId = setInterval(() => {
            this.elapsedTime++;
            this.setState({ elapsedTime: this.elapsedTime})
        }, 100);
    }

    onNextLocationButtonClick = async () => {
        const newTurn = this.state.turn + 1;
        if (newTurn === 5) {
            this.setState({
                isGameFinished: true,
                leaderboardPosition: await this.gameService.getLeaderboardPosition(this.state.totalScore)

            });
        } else {
            this.setState({
                shouldShowAnswer: false,
                markedPosition: null,
                turn: newTurn
            });
            const map = this.refs.gameplayMap.leafletElement;
            map.setView(centerOfGliwice, 14);
            this.startStopwatch();
        }
    }

    onSubmitGuessButtonClick = () => {
        const map = this.refs.gameplayMap.leafletElement;
        const distance = Math.sqrt(
            Math.pow(this.state.coordinates[this.state.turn][0] - this.state.markedPosition.lat, 2) +
            Math.pow(this.state.coordinates[this.state.turn][1] - this.state.markedPosition.lng, 2));
        const linearDistance = (distance * 111.32).toFixed(2);
        const score = Math.round((200 / (1 + Math.pow(Math.E, distance * 111.32 / 5))) * 2 / (1 + Math.pow(Math.E, this.elapsedTime / 1000)));
        map.setView([
            (this.state.coordinates[this.state.turn][0] + this.state.markedPosition.lat) / 2,
            (this.state.coordinates[this.state.turn][1] + this.state.markedPosition.lng) / 2
            ], this.calculateZoom(distance));
        clearInterval(this.stopwatchIntervalId);
        this.setState({
            shouldShowAnswer: true,
            turnDistance: linearDistance,
            turnScore: score,
            totalDistance: (Number(this.state.totalDistance) + Number(linearDistance)).toFixed(2),
            totalScore: this.state.totalScore + score
        });
    }

    onPlayAgainButtonClick = async () => {
        await this.setGameplayData();
        this.setState({
            turnScore: 0,
            turnDistance: 0,
            totalScore: 0,
            totalDistance: 0,
            shouldShowAnswer: false,
            turn: 0,
            elapsedTime: 0,
            isGameFinished: false,
            markedPosition: null
        })
    }

    onMainMenuButtonClick = () => {
        this.props.setActiveScreen(activeScreen.MAIN_MENU);
    }

    calculateZoom = (distance) => {
        let zoom = 1;
        while (true) {
            const temp = Math.round(distance / 360);
            if (temp === 1) {
                return zoom;
            } else {
                zoom += 1;

                if (zoom >= 18) {
                    return zoom;
                } else {
                    distance *= 2;
                }
            }
        }
    }

    handleMapClick = (event) => {
        this.setState({ markedPosition: event.latlng });
    }

    render() {
        return (
            <div id="gameplayWrapper">
                {!this.state.isGameFinished ? (
                    <>
                        <div id="gameplayScreen">
                            <div>
                                <div id="imageWrapper">
                                    <img src={this.state.imageUrls[this.state.turn]} />
                                </div>
                                <h1>Guess the location shown above!</h1>
                                <div id="stopwatch">
                                    <span>{`Elapsed time: ${Math.floor(this.state.elapsedTime / 600) % 60}:${Math.floor(this.state.elapsedTime / 10) % 60}:${this.state.elapsedTime % 10}`}</span>
                                </div>
                                {this.state.shouldShowAnswer && (
                                    <div id="result">
                                        <span>{`Your result: ${this.state.turnScore} points (${this.state.turnDistance}km)`}</span>
                                    </div>
                                )}
                            </div>
                            <div id="navButtons">
                                <button onClick={this.onSubmitGuessButtonClick}
                                    className={this.state.markedPosition == null || this.state.shouldShowAnswer ? "disabled" : ""}>
                                    Submit guess
                                </button>
                                <button onClick={this.onNextLocationButtonClick}
                                    className={!this.state.shouldShowAnswer ? "disabled" : ""}>
                                    {this.state.turn === 4 ? "Finish" : "Next location"}
                                </button>
                            </div>
                        </div>
                        <Map id="gameplayMap"
                            ref="gameplayMap"
                            center={centerOfGliwice}
                            zoom={13}
                            onClick={this.handleMapClick}>
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                            {this.state.markedPosition && (
                                <Marker position={this.state.markedPosition}>
                                    <Popup>Your marked location</Popup>
                                </Marker>
                            )}
                            {this.state.shouldShowAnswer && (
                                <Marker position={this.state.coordinates[this.state.turn]}>
                                <Popup>Actual location</Popup>
                            </Marker>
                            )}
                        </Map>
                    </>
                ) : (
                    <div id="gameplaySummary">
                        <h1>You finished the game!</h1>
                            <span>
                                {`Your score: ${this.state.totalScore} points (${this.state.totalDistance} km)`}
                            </span>
                            <span>
                                {`Your position on the leaderboard: ${this.state.leaderboardPosition}`}
                            </span>
                            <div id="navButtons">
                                <button onClick={this.onPlayAgainButtonClick}>
                                    Play again
                                </button>
                                <button onClick={this.onMainMenuButtonClick}>
                                    Main menu
                                </button>
                            </div>
                    </div>
                )}
            </div>
        );
    }
}