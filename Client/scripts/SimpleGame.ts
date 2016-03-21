﻿/// <reference path="typings/phaser/phaser.d.ts"/>
/// <reference path='typings/firebase/firebase.d.ts'/>

class SimpleGame {

    game: Phaser.Game;
    fireybase: Firebase;

    constructor() {
//        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.fireybase = new Firebase("https://ecma.firebaseio.com/");
    }

    

    preload() {
        this.game.load.image('logo', 'images/phaser2.png');


    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}