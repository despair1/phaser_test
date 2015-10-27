/**
 * 
 */
units_tile_offset=8

function add_map(){
	
	map=game.add.tilemap();
	map.addTilesetImage('tileset1',null,32,32,0,0,0);
	//map.addTilesetImage('units',null,32,32,0,0,units_tile_offset);
	layer=map.create("level1",40,30,32,32);
	//layer_units=map.createBlankLayer("units",40,30,32,32);
	layer.resizeWorld();
	layer.inputEnabled=true;
	//layer.events.onInputDown.add(tile_down,this);
	this.layer=layer
	var js1=game.cache.getJSON('map_layer1')
	for (x in js1.map_layer1) {
		for ( y in js1.map_layer1[x])
			//console.log(js1.map_layer1[i])
			map.putTile(js1.map_layer1[x][y],x,y,layer)
	}
	/*
	for ( ix=0; ix<40; ix++) {
		for ( iy=0; iy<30; iy++) {
			map.putTile(game.rnd.integerInRange(0,2),ix,iy,layer);
		}
	}*/
	/*
	for (i=0;i<10;i++) {
		var u={x:game.rnd.integerInRange(0,40-9),
				y:game.rnd.integerInRange(0,29),
				tile: game.rnd.integerInRange(units_tile_offset,units_tile_offset+2)};
		units.push(u);
	};
	for (i in units) {
		map.putTile(units[i].tile,units[i].x,units[i].y,layer_units);
		console.log(units[i]);
	}; */
}