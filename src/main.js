import Socket from './scripts/Socket'

class App {
    constructor () {
        this.initApp();

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./serviceWorker.js");
        }
    }

    initApp () {
        new Socket()
    }
}

new App()

