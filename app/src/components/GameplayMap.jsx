import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const startingPosition = [50.293938, 18.665646]

export class GameplayMap extends React.Component {
    state = {
        markedPosition: startingPosition
    };

    handleMapClick = (event) => {
        this.setState({ markedPosition: event.latlng });
    }

    render() {
        return (
            <Map id="gameplayMap"
                center={startingPosition}
                zoom={14}
                onClick={this.handleMapClick}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                {this.state.markedPosition &&
                <Marker position={this.state.markedPosition}>
                    <Popup>Your marked point</Popup>
                </Marker>
                }
            </Map>
        );
    }
}