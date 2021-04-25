class Pokemon {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullhp = hp;
        this.moves = moves;
    }
}
let pkmList = [
    ['Charizard', 'https://img.pokemondb.net/sprites/black-white/normal/charizard.png', 360, [
        ['Flamethrower', 'fire', 95, 0.95],
        ['Dragon Claw', 'dragon', 80, 0.95],
        ['Air slash', 'fly', 75, 0.85],
        ['Slash', 'normal', 70,]
    ]],
    ['Blastoise', 'https://img.pokemondb.net/sprites/black-white/normal/blastoise.png', 362, [
        ['Surf', 'water', 90, 0.95],
        ['Crunch', 'normal', 80, 0.95],
        ['Ice punch', 'ice', 75, 0.95],
        ['Flash cannon', 'steel', 80, 0.95]
    ]],
    ['Venusaur', 'https://img.pokemondb.net/sprites/black-white/normal/venusaur-f.png', 364, [
        ['Petal Blizzard', 'grass', 90, 0.95],
        ['Sludge bomb', 'poison', 90, 0.95],
        ['Earthquake', 'ground', 100, 0.95],
        ['Body Slam', 'normal', 85, 0.95]
    ]],
    ['Gengar', 'https://img.pokemondb.net/sprites/black-white/normal/gengar.png', 360, [
        ['Shadow Ball', 'ghost', 80, 0.95],
        ['Sludge Wave', 'poison', 95, 0.95],
        ['Focus Blast', 'fighthing', 120, 0.70],
        ['Thunder', 'electric', 110, 0.70]
    ]],
    ['Dragonite', 'https://img.pokemondb.net/sprites/black-white/normal/dragonite.png', 361, [
        ['Outrage', 'dragon', 120, 0.95],
        ['Extreme Speed', 'normal', 80, 0.95],
        ['Fly', 'flying', 90, 0.95],
        ['Earthquake', 'ground', 100, 0.95]
    ]],
    ['Gyarados', 'https://img.pokemondb.net/sprites/black-white/normal/gyarados.png', 365, [
        ['Waterfall', 'water', 80, 0.95],
        ['Bounce', 'flying', 85, 0.85],
        ['Crunch', 'flying', 80, 0.95],
        ['Earthquake', 'ground', 100, 0.95]
    ]],
    ['Lapras', 'https://img.pokemondb.net/sprites/black-white/normal/lapras.png', 365, [
        ['Freeze Dry', 'ice', 70, 0.95],
        ['Hydro Pump', 'water', 110, 0.80],
        ['Ice Beam', 'ice', 90, 0.95],
        ['Hidden Power Fire', 'normal', 60, 0.95]
    ]],
    ['Mewtwo', 'https://img.pokemondb.net/sprites/black-white/normal/mewtwo.png', 366, [
        ['Psystrike', 'psychic', 100, 0.95],
        ['Ice Beam', 'ice', 90, 0.95],
        ['Fire Blast', 'fire', 110, 0.85],
        ['Focus Blast', 'fighthing', 120, 0.70]
    ]],
    ['Alakazam', 'https://img.pokemondb.net/sprites/black-white/normal/alakazam.png', 355, [
        ['Psychic', 'psychic', 90, 0.95],
        ['Shadow Ball', 'ghost', 80, 0.95],
        ['Knock Off', 'dark', 65, 0.95],
        ['Focus Blast', 'fighthing', 120, 0.70]
    ]],
    ['Entei', 'https://img.pokemondb.net/sprites/black-white/normal/entei.png', 365, [
        ['Sacred Fire', 'fire', 100, 0.95],
        ['Extreme Speed', 'normal', 80, 0.95],
        ['Stone Edge', 'rock', 100, 0.80],
        ['Flare Blitz', 'fire', 120, 0.95]
    ]]
];

let typeMatch = {
    'Charizard': [['ground'], ['water', 'rock'], ['fire', 'grass', 'steel']],
    'Blastoise': [[''], ['grass'], ['fire', 'water']],
    'Venusaur': [['poison'], ['fire', 'fly', 'ice', 'steel'], ['grass', 'water']],
    'Gengar': [['normal','fighting'], ['psychic','ghost', 'ground', 'dark'], ['grass', 'poison','bug','fairy']],
    'Dragonite': [['ground'], ['rock', 'dragon', 'ice', 'fairy'], ['fire','fighting','grass', 'water','bug']],
    'Gyarados': [['ground'], ['electric', 'rock'], ['fire', 'water','fighting','bug','steel']],
    'Lapras': [['water'], ['eletric', 'grass', 'fighting', 'rock'], ['ice']],
    'Mewtwo': [[''], ['ghost', 'dark', 'bug'], ['psychic', 'fighting']],
    'Alakazam': [[''], ['ghost', 'dark', 'bug'], ['psychic', 'fighting']],
    'Entei': [[''], ['water', 'ground', 'rock', 'steel'], ['grass', 'bug','steel','ice','fairy']]
    
}
function spawn(bool) {
    let p = pkmList[Math.floor(Math.random() * pkmList.length)];
    let pkm = new Pokemon(p[0], p[1], p[2], p[3]);
    if (bool) {
        for (var i = 0; i < 4; i++) {
            document.getElementById('m' + i).value = pkm.moves[i][0];
        }
    }
    return pkm;
}
let pk1 = spawn(true);
s1 = document.createElement('img');
s1.src = pk1.sprite;
document.getElementById('pk1').appendChild(s1);
document.getElementById('hp1').innerHTML = '<p>HP: ' + pk1.hp + '/' + pk1.fullhp + '</p>>';

let pk2 = spawn(true);
s2 = document.createElement('img');
s2.src = pk2.sprite;
document.getElementById('pk2').appendChild(s2);
document.getElementById('hp2').innerHTML = '<p>HP: ' + pk2.hp + '/' + pk2.fullhp + '</p>>';
for (var i = 0; i < 4; i++) {
    let btn = document.getElementById('m' + i);
    let move = pk1.moves[i];
    function addHandler(btn, move, pk1, pk2) {
        btn.addEventListener('click', function (e) {
            attack(move, pk1, pk2, 'hp2', '');
            setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random() * 3)], pk2, pk1, 'hp1', 'Foe ');
        });
    }
    addHandler(btn, move, pk1, pk2);
}
function attack(move, attacker, receiver, hp, owner) {
    document.getElementById('comment').innerHTML = '<p>' + owner + attacker.name + ' used ' + move[0] + '!</p>';
    if (Math.random() < move[3]) {
        let power = move[2] += Math.floor(Math.random() * 10);
        let rtype = typeMatch[receiver.name];
        let mtype = move[1];
        let scale = 1;

        for (i = 0; i < rtype.length; i++) {
            if (rtype[i].includes(mtype)) {
                switch (i) {
                    case 0:
                        scale = 0;
                        setTimeout(function () {
                            document.getElementById('comment').innerHTML = '<p>It had no effect!</p>';
                        }, 1000);
                        break;
                    case 1:
                        scale = 2;
                        setTimeout(function () {
                            document.getElementById('comment').innerHTML = '<p>It was super effective!</p>';
                        }, 1000);
                        break;
                    case 2:
                        scale = 0.5;
                        setTimeout(function () {
                            document.getElementById('comment').innerHTML = '<p>It was not very effective!</p>';
                        }, 1000);
                        break;
                }
                break;
            }
        }
        power *= scale;
        receiver.hp -= Math.floor(power);
        document.getElementById(hp).innerHTML = '<p>HP: ' + receiver.hp + '/' + receiver.fullhp + '</p>';
    } else {
        setTimeout(function () {
            document.getElementById('comment').innerHTML = '<p>Attack missed!</p>';
        })
    }
    checkWinner(hp);

}
function checkWinner() {
    let f = (pk1.hp <= 0) ? pk1 : (pk2.hp <= 0) ? pk2 : false;
    if (f != false) {
        alert('GAME OVER: ' + f.name + ' fainted!');
        // document.getElementById(hp).innerHTML = '<p>HP: 0/' + f.fullhp + '</p>';
        // setTimeout(function () {
        //     location.reload();
        // }, 1500)
        frame = parent.document.getElementById("frame");
        frame.src = "moveAround.html"
        
    }
}