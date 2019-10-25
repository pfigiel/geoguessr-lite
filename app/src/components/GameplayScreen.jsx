import React from "react";
import { GameplayMenu } from "./GameplayMenu";
import { GameplayMap } from "./GameplayMap";

export class GameplayScreen extends React.Component {
    render() {
        return (
            <div id="gameplayWrapper">
                <GameplayMenu />
                <GameplayMap />
            </div>
        );
    }
}