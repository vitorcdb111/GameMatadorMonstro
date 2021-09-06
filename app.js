new Vue({
    el: '#app',
    data:
    {
        iniciar: true,
        winner: false,
        loser: false,
        playerLife: 100,
        monsterLife: 100,
        logs: [],
        cssPlayer: true,
    },
    watch:
    {
        playerLife()
        {
            if(this.playerLife <= 0)
            {
                this.loser = true;
                this.iniciar = true;
            }
        },

        monsterLife()
        {
            if(this.monsterLife <= 0)
            {
                this.winner = true;
                this.iniciar = true;
            }
        }

    },
    computed:
    {
        estiloLogs()
        {
            return {
                player: this.cssPlayer,
                monster: !this.cssPlayer,
            }
        }
    },
    methods:
    {
        playerAttack()
        {
            damage = Math.floor((Math.random() * 10) + 1);
            this.logs.unshift("Jogador atingiu o monstro com " + damage);
            this.monsterLife -= damage;     
        },        
        monsterAttack()
        {
            damage = Math.floor((Math.random() * 15) + 1);
            this.logs.unshift("Monstro atingiu o jogador com " + damage);
            this.playerLife -= damage;     
        },
        playerSpecialAttack()
        {
            damage = Math.floor((Math.random() * 20) + 1);
            this.logs.unshift("Jogador atingiu o monstro com " + damage);
            this.monsterLife -= damage; 
        },
        healPlayer()
        {
            heal = Math.floor((Math.random() * 15) + 1);
            this.logs.unshift("Jogador recebeu uma cura de " + heal);
            this.playerLife += heal;
        },
        reset()
        {
            this.playerLife = 100;
            this.monsterLife = 100; 
            this.winner = false;
            this.loser = false;
            this.logs = [];
        }
    }
})