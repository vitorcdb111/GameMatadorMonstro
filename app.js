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
        result: false,
    },
    watch:
    {
        playerLife()
        {
            if(this.playerLife <= 0)
            {
                this.loser = true;
                this.iniciar = true;
                this.result = true;
            }
        },

        monsterLife()
        {
            if(this.monsterLife <= 0)
            {
                this.winner = true;
                this.iniciar = true;
                this.result = true;
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
        attack(especial)
        {
            this.hurt('monsterLife', especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', false, 'Monstro', 'Jogador', 'monster')
            }
        },
        playerAttack()
        {
            return  damage = Math.floor((Math.random() * 10) + 1);
        },        
        monsterAttack()
        {
            return damage = Math.floor((Math.random() * 15) + 1);
        },
        hurt(prop, especial, source, target, cls)
        {
            const plus = especial ? 5 : 0
            let hurt = 0;
            if(source == 'Jogador')
            {
                 hurt = this.playerAttack() + plus;
            }        
            else
            {   
                 hurt = this.monsterAttack();
            }
            this[prop] = Math.max(this[prop] - hurt, 0)
            if(especial == true)
            {
                this.registerLog(`${source} atingiu ${target} com ${hurt}.`, 'speceialAttackLog')
            }
            else
            {
                this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
            }            
        },
        healPlayer()
        {
            heal = Math.floor((Math.random() * 15) + 1);         
            this.playerLife += heal;
            this.registerLog(`Jogador recebeu uma cura de ${heal}.`, 'healLog')
            this.hurt('playerLife', false, 'Monstro', 'Jogador', 'monster')
        },
        registerLog(text, cls) 
        {
            this.logs.unshift({ text, cls })
        },
        reset()
        {
            this.playerLife = 100;
            this.monsterLife = 100; 
            this.winner = false;
            this.loser = false;
            this.logs = [];
            this.result = false;
        }
    }
})