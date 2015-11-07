/**
 * 
 */
attack_tile_offset=1
defend_tile_offset=2
function onLoadBattles() {
	console.log("loading battles");
	//console.log("host name  "+window.location.href)
	game.load.json("battles_json",host+"battles.json",true)
	game.load.start();
	game.load.onLoadComplete.add(onBattlesComplete,this)
	//var pj=game.cache.getJSON("test1")
	
}

function onBattlesComplete() {
	var pj=game.cache.getJSON("battles_json");
	for ( a in pj.attackers) {
		map.putTile(sword_tile_offset+attack_tile_offset,
				pj.attackers[a].x_pos,
				pj.attackers[a].y_pos,
				layer_sword)
	}
	for ( a in pj.defenders) {
		map.putTile(sword_tile_offset+defend_tile_offset,
				pj.defenders[a].x_pos,
				pj.defenders[a].y_pos,
				layer_sword)
	}
	console.log(pj)
}