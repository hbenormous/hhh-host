# MUDANÇAS EM TEMPO REAL/UPDATES CONFIRMADOS
- adicionar o evento onGameRecording pra saber quando a gravação foi iniciada e terminada
- adicionar o evento onPlayerBallTouch pra saber qual jogador tocou na bola. ele retorna o PlayerObject do jogador
- PlayerObject { fps, maxPing }
- adicionar no RoomConfigObject o `setCustomStadiumpByLink(url)` adiciona um mapa pelo link inserido no `url`
- adicionar onPlayerAvatarChange


# PRÓXIMAS MUDANÇAS/OBJETIVOS
- refazer toda a api novamente(pq sapora eu fiz com o cu e n to entendendo nada dela)
- adicionar o HHM Plugins
- criar uma nova cli(ela é baseada em loop ent se a resposta demorar vai sair junto com a pergunta nessa merda do readline)
- adaptar o HHH-Host pro meu haxball 2. tbm tenho que fazer versão download disso junto com o outro projeto de criador de bots
- deixar o usuario escolher se ele quer iniciar a sala, discord bot ou os dois de uma vez(esse é o padrão)
- criar um Command Handler para o discord e a CLI
- criar um config.json pra armazenar valores que vou usar mais de uma vez
- usar o haxroomie-core pra deixar melhor
- adicionar os novos comandos no CLI
- usar o Simpl.db pra criar uma db local de fácil acesso e edição pro usuário


# ESTRUTURA DO COMMAND HANDLER
fazer em ts isso
```js
[{
	"name": String,
	"params": Array,
	"description": String,
	"fun": Function
}]

EXEMPLO
[{
	"name": "send",
	"params": [{"message": String}],
	"description": "shows the players that are in the room",
	"fun": message => ...
}]
```

# setCustomStadiumpByLink(url)
exemplo
```js

const setCustomStadiumpByLink = url => {

	fetch(url)
	.then(r => r.json())
	.then(map => room.setCustomStadium(JSON.stringify(map)));

};

setCustomStadiumpByLink("https://corsproxy.io/?https://haxmaps.com/dl/10");

```