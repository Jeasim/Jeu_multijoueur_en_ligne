class LittleMac {
	constructor() {
		//Key positions
		this.startingPosX = canvas.width / 2;
		this.startingPosY = canvas.height;
		this.fightingPosX = 600;
		this.fightingPosY = canvas.height - 320;
		this.attack1PosX = this.fightingPosX - 20;
		this.attack1PosY = this.fightingPosY - 150;
		this.attack2PosX = this.fightingPosX - 20;
		this.attack2PosY = this.fightingPosY - 190;
		this.attack3PosX = this.fightingPosX;
		this.attack3PosY = this.fightingPosY + 40;
		this.hitPositionX = this.fightingPosX - 10;
		this.hitPositionY = this.fightingPosY + 10;
		this.defeatPositionX = canvas.width / 4;
		this.defeatPositionY = canvas.height + 100;

		//initialize position
		this.posX = this.startingPosX;
		this.posY = this.startingPosY;

		//States
		this.isAttacking1 = false;
		this.isAttacking2 = false;
		this.isAttacking3 = false;
		this.isTakingHit = false;
		this.isEnteringFightingPos = true;
		this.isRepositionningAfterAttack = false;
		this.isRepositionningAfterTakingHit = false;
		this.isWaiting = false;
		this.isInfightingPosition = false;
		this.isInAttackingPosition = false;
		this.isInHitPosition = false;
		this.isInDefeatedPosition = false;
		this.isDefeated = false;
		this.isVictorious = false;
		this.isAlive = true;


		//Tiled image
		this.tiledImage = new TiledImage("images/littleMacSprites.png", 6, 6, 200, true, 4, null);
		this.tiledImage.changeRow(0);
		this.tiledImage.changeMinMaxInterval(0, 2);

	}

	tick() {

		if (this.isAlive) {

			if (this.isTakingHit) {
				this.takingHit();
				this.tysonHitsAnimation();
			}

			else if (this.isRepositionningAfterAttack) {
				this.iddleAnimation();
				this.repositionningAfterAttack();
			}

			else if (this.isAttacking1) {
				this.attack1Animation();
				this.attacking1();
			}

			else if(this.isAttacking2){
				this.attack2Animation();
				this.attacking2();
			}

			else if(this.isAttacking3){
				this.attack3Animation();
				this.attacking3();
			}

			else if (this.isRepositionningAfterTakingHit) {
				this.iddleAnimation();
				this.repositionningAfterTakingHit();
			}

			else if (this.isEnteringFightingPos) {
				this.iddleAnimation();
				this.enteringFightingPos();
			}

			else if(this.isVictorious){
				this.victoryAnimation();
			}

			else if(this.isDefeated){
				this.defeatAnimation();
				this.defeated();
			}

			else if (this.isWaiting) {
				this.iddleAnimation();
			}


			this.tiledImage.tick(this.posX, this.posY, ctx);
		}

		return this.isAlive;
	}

	//External functions
	littleMacIntro() {
		this.isEnteringFightingPos = true;
	}

	macAttack1() {
		this.isAttacking1 = true;
	}

	macAttack2() {
		this.isAttacking3 = true;
	}

	macAttack3() {
		this.isAttacking2 = true;
	}

	receiveHit() {
		this.isTakingHit = true;
	}

	victory() {
		this.isVictorious = true;
	}

	defeat() {
		this.isDefeated = true;
	}


	//Animation functions
	iddleAnimation() {
		this.tiledImage.changeRow(0);
		this.tiledImage.changeMinMaxInterval(0, 2);
	}

	attack1Animation() {
		this.tiledImage.changeRow(1);
		this.tiledImage.changeMinMaxInterval(0, 2);
	}

	attack2Animation() {
		this.tiledImage.changeRow(2);
		this.tiledImage.changeMinMaxInterval(0, 5);
		this.tiledImage.flipped = true;
	}

	attack3Animation() {
		this.tiledImage.changeRow(3);
		this.tiledImage.changeMinMaxInterval(0, 1);
	}

	tysonHitsAnimation() {
		this.tiledImage.changeRow(4);
		this.tiledImage.changeMinMaxInterval(0, 1);
	}

	victoryAnimation() {
		this.tiledImage.changeRow(5);
		this.tiledImage.changeMinMaxInterval(0, 2);
	}

	defeatAnimation() {
		this.tiledImage.changeRow(4);
		this.tiledImage.changeMinMaxInterval(0, 1);
		this.tiledImage.setLooped(false);
	}


	//Mouvement functions
	enteringFightingPos() {
		if (this.posY >= this.fightingPosY) {
			this.posY -= 2;
		}
		else {
			this.isInfightingPosition = true;
			this.isEnteringFightingPos = false;
			this.isWaiting = true;
		}
	}


	takingHit() {
		if (!this.isInHitPosition) {
			if (this.posX >= this.hitPositionX) {
				this.posX -= 1;
			}

			if (this.posY <= this.hitPositionY) {
				this.posY += 1;
			}

			if (this.posY >= this.hitPositionY && this.posX <= this.hitPositionX) {
				this.isInHitPosition = true;
			}
		}
		else {
			this.isInHitPosition = true;
			this.isTakingHit = false;
			this.isInfightingPositionA = false;
			this.isRepositionningAfterTakingHit = true;
		}
	}

	repositionningAfterTakingHit() {

		if (!this.isInfightingPositionA) {
			if (this.posY >= this.fightingPosY) {
				this.posY -= 30;
			}
			if (this.posX <= this.fightingPosX) {
				this.posX += 5;
			}
			if (this.posX >= this.fightingPosX && this.posY <= this.fightingPosY) {
				this.isInfightingPositionA = true;
			}
		}
		else {
			this.isInHitPosition = false;
			this.isRepositionningAfterTakingHit = false;
			this.isWaiting = true;
		}
	}


	attacking1() {

		this.isRepositionningAfterTakingHit = false;
		if (!this.isInAttackingPosition) {
			if (this.posY >= this.attack1PosY) {
				this.posY -= 8;
			}
			if (this.posX <= this.attack1PosX) {
				this.posX += 1;
			}
			if (this.posX >= this.attack1PosX && this.posY <= this.attack1PosY) {
				this.isInAttackingPosition = true;
			}
		}
		else {
			this.isInfightingPositionB = false;
			this.isAttacking1 = false;
			this.isRepositionningAfterAttack = true;
		}
	}

	attacking2() {
		if (!this.isInAttackingPosition) {
			if (this.posY >= this.attack2PosY) {
				this.posY -= 6;
			}
			if (this.posX <= this.attack2PosX) {
				this.posX += 1;
			}
			if (this.posX >= this.attack2PosX && this.posY <= this.attack2PosY) {
				this.isInAttackingPosition = true;
			}
		}
		else {
			this.tiledImage.flipped = false;
			this.isInfightingPositionB = false;
			this.isAttacking2 = false;
			this.isRepositionningAfterAttack = true;
		}
	}

	attacking3() {

		if (!this.isInHitPosition) {
			if (this.posY <= this.attack3PosY) {
				this.posY += 5;
			}
			if (this.posY >= this.attack3PosY) {
				this.isInHitPosition = true;
			}
		}
		else {
			this.isInfightingPositionA = false;
			this.isAttacking3 = false;
			this.isRepositionningAfterTakingHit = true;
		}
	}

	repositionningAfterAttack() {
		if(!this.isInfightingPositionB){
			if (this.posY <= this.fightingPosY) {
				this.posY += 20;
			}
			if (this.posX <= this.fightingPosX) {
				this.posX += 8;
			}
			if (this.posX >= this.fightingPosX && this.posY >= this.fightingPosY) {
				this.isInfightingPositionB = true;
			}
		}
		else {
			this.isInAttackingPosition = false;
			this.isRepositionningAfterAttack = false;
			this.isWaiting = true;
		}
	}

	defeated() {
		if(!this.isInDefeatedPosition){
			if(this.posY <= this.defeatPositionY){
				this.posY += 8;
			}
			if(this.posX >= this.defeatPositionX){
				this.posX -= 5;
			}
			if(this.posY >= this.defeatPositionY && this.posX <= this.defeatPositionX){
				this.isInDefeatedPosition = true;
			}
		}
		else{
			this.isInDefeatedPosition = false;
		}
	}

	resetStates(){
		this.isAttacking1 = false;
		this.isAttacking2 = false;
		this.isAttacking3 = false;
		this.isTakingHit = false;
		this.isEnteringFightingPos = false;
		this.isRepositionningAfterAttack = false;
		this.isRepositionningAfterTakingHit = false;
		this.isWaiting = false;
		this.isInfightingPosition = false;
		this.isInAttackingPosition = false;
		this.isInHitPosition = false;
		this.isInDefeatedPosition = false;
		this.isDefeated = false;
		this.isVictorious = false;
		this.isAlive = true;
	}


}
