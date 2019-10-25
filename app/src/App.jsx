import React from 'react';
import './App.scss';
import { LogInScreen } from './components/LogInScreen';
import { activeScreen } from "./utils/activeScreen";
import { RegisterScreen } from './components/RegisterScreen';
import { MainMenuScreen } from './components/MainMenuScreen';
import { GameplayScreen } from './components/GameplayScreen';

export class App extends React.Component {
  state = {
    activeScreen: activeScreen.LOADING
  }

  componentDidMount() {
    this.setActiveScreen(activeScreen.LOG_IN);
  }

  setActiveScreen = (activeScreen) => {
    this.setState({ activeScreen });
  }

  render() {
    return (
      <div id="mainContent">
        {this.state.activeScreen === activeScreen.LOG_IN && (
          <LogInScreen setActiveScreen={this.setActiveScreen} />
        )}
        {this.state.activeScreen === activeScreen.REGISTER && (
          <RegisterScreen setActiveScreen={this.setActiveScreen} />
        )}
        {this.state.activeScreen === activeScreen.MAIN_MENU && (
          <MainMenuScreen setActiveScreen={this.setActiveScreen} />
        )}
        {this.state.activeScreen === activeScreen.IN_GAME && (
          <GameplayScreen setActiveScreen={this.setActiveScreen} />
        )}
      </div>
    );
  }
}
