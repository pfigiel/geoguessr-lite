import React from "react";
import CookieImage from "../images/cookie.png";

export class CookieBanner extends React.Component {
    render() {
        return (
            <div id="cookieBanner">
                <div>
                    <img src={CookieImage} />
                    <span><b>This site doesn't use cookies. We just show this banner to let you know (and because it looks pretty awesome).</b></span>
                </div>
                <div id="buttons">
                    <button onClick={this.props.toggleCookieBanner}>Got it, thanks!</button>
                    <button onClick={this.props.toggleCookieBanner}>WTF?</button>
                </div>
            </div>
        );
    }
}