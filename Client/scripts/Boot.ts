
module YourTurn {
    export class Boot extends Phaser.State {
        preload() {
        }

        create() {
        }

        update() {
            this.game.state.start("Game", true, false);
        }

        render() {
        }
    }
}