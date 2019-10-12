/**
 * Layer of Matrix v1.1
 * Copyright 2019 Pavel Smith
 * Written while drinking cofe and listening to rock-n-roll
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
"use strict";

/*
 * Contain simbols string
 */
function Layer( opts ) {
  
  // ----- properties

  this.symbols;      // string of using symbols
  this.string = [];  // array of symbols, contain x,y coordinates and speed
  this.maxSpeed;     // max speed in string
  this.alfa;         // alfa chanel of layer

  this.fontSize;     // font size of symbols
  this.fontFamily;   // font family of symbols
  this.fontColor;    // font color of symbols

  this.hSymColor;    // color of highlighted symbol
  this.hSymProb;     // probability of drawing highlighted symbol

  
  // ----- private properties

  let _countColls;  // count of symbols in string


  // ----- constructor
  
  this.symbols = opts.symbols || "ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  this.alfa = opts.alfa || 1;
  this.maxSpeed = opts.maxSpeed || 0.5;

  this.fontSize = opts.fontSize || 16;
  this.fontFamily = opts.fontFamily || "sans-serif";
  this.fontColor = opts.fontColor || "0, 247, 255";

  this.hSymColor = opts.hSymColor || "rgba(255, 247, 0, 1)";
  this.hSymProb = opts.hSymProb || 1000; // "1 / 1000"

  _countColls = Math.ceil(window.innerWidth / this.fontSize);


  // ----- methods

  /*
   * generate string coordinates and speed
   */
  this.generate = function () {
    for (let i = 0; i < _countColls; i++) {
      this.string[i] = {
        x: this.fontSize * i,                      // x coordinate
        y: Math.random() * window.innerHeight,     // y coordinate
        s: Math.random() * this.maxSpeed + 1       // speed
      }
    }
  }

  /*
   * draw the string
   * @param canvas - Canvas Element
   */
  this.draw = function ( canvas ) {
    for (let i = 0; i < _countColls; i++) {
      let symId = Math.round(Math.random() * (this.symbols.length - 1));

      // draw highlighted symbol
      if (Math.floor(Math.random() * this.hSymProb) === 1) {
        canvas.fillStyle = this.hSymColor;
      } else {
        canvas.fillStyle = "rgba(" + this.fontColor + ", " + this.alfa + ")";
      }
      
      canvas.font = "normal normal " + this.fontSize + "px " + this.fontFamily;
      canvas.fillText(this.symbols[symId], this.string[i].x, this.string[i].y);
    }
  }

  /*
   * generate step of string
   * @param canvas - Canvas Element
   */
  this.step = function ( canvas ) {
    for (let i = 0; i < _countColls; i++) {
      this.string[i].y += this.fontSize * this.string[i].s;

      if (this.string[i].y > window.innerHeight) {
        this.string[i].y = 0;
        this.string[i].s = Math.random() * this.maxSpeed + 1;
      }
    }

    this.draw(canvas);
  }


  // ----- running

  this.generate();
}