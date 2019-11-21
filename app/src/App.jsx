import React from 'react';
import './App.scss';
import { LogInScreen } from './components/LogInScreen';
import { activeScreen } from "./utils/activeScreen";
import { RegisterScreen } from './components/RegisterScreen';
import { MainMenuScreen } from './components/MainMenuScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HighscoresScreen } from './components/HighscoresScreen';
import Cookies from 'universal-cookie';
import { cookieNames } from './utils/cookieNames';
import { IdentityService } from './services/identityService';

export class App extends React.Component {
  state = {
    activeScreen: activeScreen.LOADING,
    shouldShowCookieBanner: false,
  }

  constructor() {
    super();
    this.cookies = new Cookies();
    this.identityService = new IdentityService();
  }

  async componentDidMount() {
    if(await this.identityService.tryAuthorize()) {
      this.setActiveScreen(activeScreen.MAIN_MENU);
    } else {
      this.setActiveScreen(activeScreen.LOG_IN);
    }
    this.setState({shouldShowCookieBanner: !this.cookies.get(cookieNames.NOT_COOKIES_ACCEPTED)});
  }

  toggleCookieBanner = () => {
    this.cookies.set(cookieNames.NOT_COOKIES_ACCEPTED, true);
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
