import React from "react";
import Logo from "../images/logo.png";
import { activeScreen } from "../utils/activeScreen";
import { IdentityService } from "../services/identityService";

export class Header extends React.Component {
    constructor() {
        super();
        this.identityService = new IdentityService();
    }

    onMenuLinkClick = () => {
        this.props.setActiveScreen(activeScreen.MAIN_MENU);
    }

    onLogoutLinkClick = async () => {
        await this.identityService.logout();
        this.props.setActiveScreen(activeScreen.LOG_IN);
    }

    render() {
        return (
            <div id="header">
                <div>
                    <img id="headerLogo" src={Logo} />
                    <div id="headerTitle">
                        <span id>GeoGuessr{" "}</span>
                        <span>Lite</span>
                    </div>
                </div>
                <div id="navlinks">
                    <span className="link" onClick={this.onMenuLinkClick}>Menu</span>
                    <span className="link" onClick={this.onLogoutLinkClick}>Logout</span>
                </div>
            </div>
        );
    }
}