import React from 'react';
import './App.scss';
import { LogInScreen } from './components/LogInScreen';
import { activeScreen } from "./utils/activeScreen";
import { RegisterScreen } from './components/RegisterScreen';
import { MainMenuScreen } from './components/MainMenuScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { storageItems } from './utils/storageItems';
import { CookieBanner } from './components/CookieBanner';
import { HighscoresScreen } from './components/HighscoresScreen';

export class App extends React.Component {
  state = {
    activeScreen: activeScreen.LOADING,
    shouldShowCookieBanner: !localStorage.getItem(storageItems.NOT_COOKIES_ACCEPTED),
  }

  componentDidMount() {
    this.setActiveScreen(activeScreen.LOG_IN);
  }

  toggleCookieBanner = () => {
    this.setState({ shouldShowCookieBanner: !this.state.shouldShowCookieBanner });
  }

  setActiveScreen = (activeScreen) => {
    this.setState({ activeScreen });
  }

  render() {
    return (
      <>
        <Header setActiveScreen={this.setActiveScreen} />
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
          {this.state.activeScreen === activeScreen.HIGH_SCORES && (
            <HighscoresScreen setActiveScreen={this.setActiveScreen} />
          )}
        </div>
        <Footer />
        {this.state.shouldShowCookieBanner && (
          <CookieBanner toggleCookieBanner={this.toggleCookieBanner} />
        )}
      </>
    );
  }
}
