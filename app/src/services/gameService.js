export class GameService {
    async getLeaderboardPosition() {
        // TODO: do proper fetch
        return 1;
    }

    async getGameplayData() {
        // TODO: do proper fetch
        return {
            imageUrls: [
                "https://bi.im-g.pl/im/f6/bc/fe/z16694518V,Centrum-Nowych-Technologii-Politechniki-Slaskiej.jpg",
                "https://pic.conadrogach.pl/zdjecia/obiekt/2366/restauracja-mcdonalds9.450.jpg",
                "https://gliwice.eu/sites/default/files/styles/gliwice_880x495/public/news/images/2_1.jpg?itok=VIZ2TZSf",
                "https://bi.im-g.pl/im/f6/bc/fe/z16694518V,Centrum-Nowych-Technologii-Politechniki-Slaskiej.jpg",
                "https://pic.conadrogach.pl/zdjecia/obiekt/2366/restauracja-mcdonalds9.450.jpg"
            ],
            coordinates: [
                [50.288641, 18.677335],
                [50.264850, 18.721861],
                [50.296232, 18.670017],
                [50.288641, 18.677335],
                [50.264850, 18.721861],
            ]
        }
    }

    async getGlobalHighscores() {
        // TODO: do proper fetch
        return [{username: "test", score: 1000}, {username: "test2", score: 900}, {username: "test3", score: 800}, {username: "test4", score: 700}];
    }

    async getUserHighscores() {
        // TODO: do proper fetch
        return [4444, 3333, 2222, 1111];
    }
}