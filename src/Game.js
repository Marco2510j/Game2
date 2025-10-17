class Game {
    #vida = 100;
    #ki = 80;
    #energia = 90;
    #semilla = 3;
    #userName = "";
    #turnosEspecial = 0; 

    constructor(userName) {
        this.#userName = userName;
    }

    getVida() {
        return this.#vida;
    }

    getKi() {
        return this.#ki;
    }

    getEnergia() {
        return this.#energia;
    }

    getSemilla() {
        return this.#semilla;
    }

    getUserName() {
        return this.#userName;
    }

    setVida(decremento) {
        this.#vida = Math.max(0, this.#vida - decremento);
    }

    atk_basico(jugador) {
        this.#ki -= this.#ki < 5 ? 0 : 5;
        this.#energia -= this.#energia < 10 ? 0 : 10;
        jugador.setVida(15);
    }

    atk_especial(jugador) {
        if (this.#turnosEspecial < 2) {
            return false; 
        }
        this.#ki -= this.#ki < 20 ? 0 : 20; 
        this.#energia -= this.#energia < 30 ? 0 : 30; 
        jugador.setVida(30); 
        this.#turnosEspecial = 0; 
        return true;
    }

    incrementarTurno() {
        this.#turnosEspecial++;
    }

    atk_SemillaErmitanio() {
        this.#ki = Math.min(this.#ki + 40, 80);
        this.#energia = Math.min(this.#energia + 45, 90);
        this.#vida = Math.min(this.#vida + 50, 100);
    }

    atk_regenerarki() {
        this.#ki = Math.min(this.#ki + 15, 80);
    }

    incrementarTurno() {
        this.#turnosEspecial++;
    }
}

export default Game;