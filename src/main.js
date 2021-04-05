import Socket from './scripts/Socket'

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        new Socket()
    }
}

new App()

