class MikeTyson{
	constructor(){

		//Key positions
		this.startingPosY = 0.2*(canvas.height);
		this.startingPosX = 0.9*(canvas.width);
		this.fightingPosX = 645;
		this.fightingPosY = 0.5*(canvas.height);
		this.attackPosX = this.fightingPosX - 48;
		this.attackPosY = this.fightingPosY + 35;
		this.hitPositionY = this.fightingPosY - 40;
		this.defeatedPositionX = this.fightingPosX + 150;
 		this.defeatedPositionY = this.fightingPosY - 150;

		//Initializing position
		this.posX = this.startingPosX;
		this.posY = this.startingPosY;

		//States
		this.isEnteringFightingPos = true;
		this.isAttacking = false;
		this.isRepositionningToFightingPos = false;
		this.isTakingHit = false;
		this.isWaiting = false;
		this.movingForward = false;
		this.movingBackward = false;
		this.isInfightingPosition = false;
		this.isInAttackingPosition = false;
		this.isVictorious = false;
		this.isDefeated = false;
		this.isInDefeatPosition = false;
		this.isOnThGround = false;
		this.isAlive = true;

		//Tiled image
		this.tiledImage = new TiledImage("images/mikeTysonSprites.png", 4, 6, 150, true, 4, null);
	}

	tick() {

		if(this.isTakingHit){
			this.takingHit();
			this.macHitsAnimation();
		}

		else if(this.isEnteringFightingPos){
			this.iddleAnimation();
			this.enteringFightingPos();
		}

		else if(this.isAttacking){
			this.attackAnimation();
			this.attacking();
		}

		else if(this.isRepositionningToFightingPos){
			this.iddleAnimation();
			this.repositionningToFightingPos();
		}

		else if(this.isVictorious){
			this.victoryAnimation();
		}

		else if(this.isDefeated){
			this.defeatAnimation();
			this.defeated();
		}

		else if(this.isOnThGround){
			this.onTheGroundAnimation();
		}

		else if(this.isWaiting){
			this.iddleAnimation();
		}

		this.tiledImage.tick(this.posX, this.posY, ctx);

		return this.isAlive;
	}


	//External functions
	intro() {
		this.isEnteringFightingPos = true;
	}

	attack() {
		this.isAttacking = true;
	}

	receiveHit() {
		this.isTakingHit = true;
	}

	defeat() {
		this.resetStates();
		this.isDefeated = true;
	}

	victory() {
		this.isVictorious = true;
	}



	//Animation functions
	iddleAnimation() {
		this.tiledImage.changeRow(0);
		this.tiledImage.changeMinMaxInterval(0,3);
	}

	attackAnimation() {
		this.tiledImage.changeRow(1);
		this.tiledImage.changeMinMaxInterval(0,3);
	}

	macHitsAnimation() {
		this.tiledImage.changeRow(2);
		this.tiledImage.changeMinMaxInterval(0,0);
	}

	defeatAnimation() {
		this.tiledImage.changeRow(3);
		this.tiledImage.changeMinMaxInterval(0, 2);
		this.tiledImage.setFlipped(true);
	}

	onTheGroundAnimation() {
		this.tiledImage.changeRow(4);
		this.tiledImage.changeMinMaxInterval(0, 0);
		this.tiledImage.setLooped(false);
	}

	victoryAnimation() {
		this.tiledImage.changeRow(5);
		this.tiledImage.changeMinMaxInterval(0, 2);
	}


	//Mouvement Functions / Changing states
	enteringFightingPos() {

		if(!this.isInfightingPosition){
			if(this.posY <= this.fightingPosY){
				this.posY += 2;
			}
			if(this.posX >= this.fightingPosX){
				this.posX -= 3;
			}
			if(this.posX <= this.fightingPosX && this.posY >= this.fightingPosY){
				this.isInfightingPosition = true;
			}
		}
		else{
			this.isEnteringFightingPos = false;
			this.isWaiting = true;
		}
	}

	attacking(){
		if(!this.isInAttackingPosition){
			if(this.posX >= this.attackPosX){
				this.posX -= 3;
			}
			if(this.posY <= this.attackPosY){
				this.posY += 3;
			}
			if(this.posY >= this.attackPosY && this.posX <= this.attackPosX){
				this.isInAttackingPosition = true;
			}
		}
		else{
			this.isInAttackingPosition = false;
			this.isInfightingPosition = false;
			this.isRepositionningToFightingPos = true;
			this.isAttacking = false;
		}
	}

	takingHit() {
		if(this.posY >= this.hitPositionY){
			this.posY -= 3;
		}
		else{
			this.movingForward = true;
			this.isInfightingPosition = false;
			this.isTakingHit = false;
			this.isRepositionningToFightingPos = true;
		}
	}

	repositionningToFightingPos() {
		if(!this.isInfightingPosition){
			if(this.movingForward){
				if(this.posY <= this.fightingPosY){
					this.posY += 2;
				}
			}else{
				if(this.posY >= this.fightingPosY) {
					this.posY -= 2;
				}
			}
			if(this.posX <= this.fightingPosX){
				this.posX += 2;
			}
			if(this.posX >= this.fightingPosX && this.posY >= this.fightingPosY){
				this.isInfightingPosition = true;
			}
		}
		else{
			this.movingForward = false;
			this.isTakingHit = false;
			this.isRepositionningToFightingPos = false;
			this.isWaiting = true;
		}
	}

	defeated() {
		if(!this.isInDefeatPosition){
			if(this.posY >= this.defeatedPositionY){
				this.posY -= 2;
			}
			if(this.posX <= this.defeatedPositionX){
				this.posX += 2;
			}
			if(this.posX >= this.defeatedPositionX && this.posY <= this.defeatedPositionY){
				this.isInDefeatPosition = true;
			}
		}
		else{
			this.isDefeated = false;
			this.isInDefeatPosition = false;
			this.isOnThGround = true;
		}
	}

	resetStates(){
		this.isEnteringFightingPos = false;
		this.isAttacking = false;
		this.isRepositionningToFightingPos = false;
		this.isTakingHit = false;
		this.isWaiting = false;
		this.movingForward = false;
		this.movingBackward = false;
		this.isInfightingPosition = false;
		this.isInAttackingPosition = false;
		this.isDefeated = false;
		this.isInDefeatPosition = false;
		this.isOnThGround = false;
	}
}