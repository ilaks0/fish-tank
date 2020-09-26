class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.surgeSecondsLeft = 0;
    this.imageUri = '/images/fish02.gif';
    this.maxSurge = 1.0;
    this.surgMult = 3.0;
    this.type = 'bite';
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + this.surgeSecondsLeft * this.surgMult));
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
    this.surgeSecondsLeft = Math.max(0, this.surgeSecondsLeft - PHYSICS_TICK_SIZE_S);

    let inRadius = this.tank.getProximateDenizens(this.position, 100);

    for(let fish of inRadius) {
      if(this.id !== fish.id && fish.type !== this.type && fish.type !== 'volcano')
        this.tank.removeDenizen(fish.id, 0);
    }
    
  }


  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge;
  }

}
