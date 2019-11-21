import { storageItems } from "../utils/storageItems";

export class GameService {
    async saveScore(score) {
        const response = await fetch("http://127.0.0.1:5000/saveScore", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: localStorage.getItem(storageItems.USERNAME),
                score
            })
        });
        return response.status === 200;
    }

    async getLeaderboardPosition(score) {
        const response = await fetch(`http://127.0.0.1:5000/getLeaderboardPosition?score=${score}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            }
        });
        if(response.status === 200) {
            return await response.json();
        }
    }

    async getGameplayData() {
        const response = await fetch("http://127.0.0.1:5000/getGameData", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            }
        });
        if(response.status === 200) {
            return await response.json();
        }
    }

    async getGlobalHighscores() {
        const response = await fetch("http://127.0.0.1:5000/getGlobalHighscores", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            }
        });
        if(response.status === 200) {
            return await response.json();
        }
    }

    async getUserHighscores() {
        const response = await fetch(`http://127.0.0.1:5000/getUserHighscores?username=${localStorage.getItem(storageItems.USERNAME)}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
            }
        });
        if(response.status === 200) {
            return await response.json();
        }
    }
}