import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const centerOfGliwice = [50.293938, 18.665646]


// for debug ONLY
const imageUrls = [
    "https://bi.im-g.pl/im/f6/bc/fe/z16694518V,Centrum-Nowych-Technologii-Politechniki-Slaskiej.jpg",
    "https://pic.conadrogach.pl/zdjecia/obiekt/2366/restauracja-mcdonalds9.450.jpg",
    "https://gliwice.eu/sites/default/files/styles/gliwice_880x495/public/news/images/2_1.jpg?itok=VIZ2TZSf"
]

const coords = [
    [50.288641, 18.677335],
    [50.264850, 18.721861],
    [50.296232, 18.670017]
]

let counter = 0;

export class GameplayScreen extends React.Component {
    state = {
        // also debug values
        imageUrl: imageUrls[0],
        coordinates: coords[0],
        markedPosition: null,
        elapsedTime: 0,
        shouldShowAnswer: false
    }

    constructor() {
        super();
        this.elapsedTime = 0;
    }

    componentDidMount() {
        this.startStopwatch();
        // fetch image url and coordinates
    }

    startStopwatch = () => {
        this.elapsedTime = 0;
        this.stopwatchIntervalId = setInterval(() => {
            this.elapsedTime++;
            this.setState({ elapsedTime: this.elapsedTime})
        }, 100);
    }

    onNextLocationButtonClick = () => {
        counter++;
        this.setState({
            imageUrl: imageUrls[counter],
            coordinates: coords[counter],
            shouldShowAnswer: false,
            markedPosition: null
        });
        const map = this.refs.gameplayMap.leafletElement;
        map.setView(centerOfGliwice, 14);
        this.startStopwatch();
    }

    onSubmitGuessButtonClick = () => {
        this.setState({ shouldShowAnswer: true });
        const map = this.refs.gameplayMap.leafletElement;
        const distance = Math.sqrt(Math.pow(this.state.coordinates[0] - this.state.markedPosition.lat, 2) + Math.pow(this.state.coordinates[1] - this.state.markedPosition.lng, 2));
        //console.log(distance);
        map.setView([(this.state.coordinates[0] + this.state.markedPosition.lat) / 2, (this.state.coordinates[1] + this.state.markedPosition.lng) / 2], 13);
        clearInterval(this.stopwatchIntervalId);
    }

    handleMapClick = (event) => {
        this.setState({ markedPosition: event.latlng });
    }

    render() {
        return (
            <div id="gameplayWrapper">
                <div id="gameplayScreen">
                    <div>
                        <div id="imageWrapper">
                            <img src={this.state.imageUrl} />
                        </div>
                        <h1>Guess the location shown above!</h1>
                        <div id="stopwatch">
                            <span>{`Elapsed time: ${Math.floor(this.state.elapsedTime / 600) % 60}:${Math.floor(this.state.elapsedTime / 10) % 60}:${this.state.elapsedTime % 10}`}</span>
                        </div>
                    </div>
                    <div id="navButtons">
                        <button onClick={this.onSubmitGuessButtonClick} className={this.state.markedPosition == null ? "disabled" : ""}>Submit guess</button>
                        <button onClick={this.onNextLocationButtonClick}>Next location</button>
                    </div>
                </div>
                <Map id="gameplayMap"
                    ref="gameplayMap"
                    center={centerOfGliwice}
                    zoom={14}
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
                        <Marker position={this.state.coordinates}>
                        <Popup>Actual location</Popup>
                    </Marker>
                    )}
                </Map>
            </div>
        );
    }
}