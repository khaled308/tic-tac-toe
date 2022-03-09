class Player{
    constructor(symbol){
        this.symbol = symbol
        this.movements = []
    }
    move(el){
        el.textContent = this.symbol
        this.movements.push(Number(el.dataset.id))
        this.movements.sort()
    }
}

class Game{
    #fields = document.querySelectorAll(".game div")
    #winningMovements = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7],
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ]
    constructor(){
        this.player1 = this.startGame("X")
        this.player2 = this.startGame("O")
        this.turn = false
        this.fieldPlayed = 0
    }
    startGame(symbol){
        return new Player(symbol)
    }

    
    play(){

        this.#fields.forEach(field=>field.addEventListener('click',(el)=>{
            if(this.turn){
                if(el.target.textContent == ""){
                    this.player1.move(el.target)
                    this.turn = false
                    this.fieldPlayed++
                }
            }
            else{
                if(el.target.textContent == ""){
                    this.player2.move(el.target)
                    this.turn = true
                    this.fieldPlayed++
                }
            }
            let winner = this.whoWin(this.player1,this.player2)

            if(this.fieldPlayed > 8 && !winner){
                alert("no win")
                this.reset()
            }

        }))
    }
    check(movements){
        for(let i=0 ; i < this.#winningMovements.length ; i++){
            let right = 0
            for(let j=0 ; j < movements.length ; j++){
                if(this.#winningMovements[i][right] ==movements[j]) right++
                if(right > 2) return true

            }
        }
    }
    reset(){
        setTimeout(()=>{
            this.player1.movements = []
            this.player2.movements = []
            this.#fields.forEach(field=> field.textContent = "")
            this.fieldPlayed = 0
        },1000)
    }
    whoWin(player1,player2){
        if(this.check(player1.movements)){
            alert(`${player1.symbol} win`)
            this.reset()
            return true
        }

        if(this.check(player2.movements)){
            alert(`${player2.symbol} win`)
            this.reset()
            return true
        }
    }
}

const app = new Game()
app.play()
