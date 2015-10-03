/**
 * 
 */



var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var tile_size=32;
var map;
var layer;
var layer_units;
var units=[];
var current_unit=0;
var cursors;
var marker;
var unit_selected=false;

function next_unit() {
	current_unit++;
	if ( current_unit >= units.length) {
		current_unit=0;
	};
	var u=units[current_unit];
	game.camera.focusOnXY(u.x*tile_size,u.y*tile_size);
	unit_selected=true;
	marker.x = u.x*tile_size
	marker.y = u.y*tile_size;
	marker.visible=true;
	console.log(u.x,u.y);
}

function tile_down() {
	if ( ! unit_selected ) {
		var x =layer.getTileX(game.input.activePointer.worldX);
		var y = layer.getTileY(game.input.activePointer.worldY);
		for (i in units) {
			var u=units[i];
			if ( u.x == x && u.y == y) {
				marker.x = layer.getTileX(game.input.activePointer.worldX) * tile_size;
				marker.y = layer.getTileY(game.input.activePointer.worldY) * tile_size;
				current_unit=i;
				unit_selected=true;
				break;
			}
		}
		marker.visible=true
	}
	else {
		var u=units[current_unit];
		var x =layer.getTileX(game.input.activePointer.worldX);
		var y = layer.getTileY(game.input.activePointer.worldY);

		marker.x = x*tile_size;
		marker.y = y*tile_size;
		map.putTile(null,u.x,u.y,layer_units);
		u.x=x;
		u.y=y;
		map.putTile(u.tile,x,y,layer_units);
		unit_selected=false;
		marker.visible=false;


	}
	console.log(" test grid",game.input.activePointer.screenX,game.input.activePointer.screenY )
}

function preload () {
	game.load.image('right_panel1','/static/assets/toolbar.png');
	game.load.image("tileset1",'/static/assets/tileset.png');
	game.load.image("units",'/static/assets/units.png')
	game.load.spritesheet("buttons","/static/assets/Buttons.png",64,32)
	game.load.json('map_layer1','/static/assets/map_layer1',true)
	//game.load.json("test1",host+"test.json",true)
	var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
	game.add.text(0,100,"loading",style);
	//game.load.image('logo', 'phaser.png');

}

function create () {
	game.stage.backgroundColor="#2d2d2d";
	
	//var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
	//game.add.text(0,0,"hello  quiters",style);
	this.right_panel1=create_right_panel();
		//game.add.sprite(game.width-8*tile_size,0,'right_panel1');
	//this.right_panel1=game.add.sprite(256,0,'right_panel1');
	//this.right_panel1.fixedToCamera=true;
	//var r = this.right_panel1;
	//r.inputEnabled=true;
	//r.events.onInputDown.add(next_unit,this);
	//game.camera.x=0;
	//this.right_panel1.cameraOffset.setTo(0,0);
	add_map()
	console.log("adding map")
	/*
	map=game.add.tilemap();
	map.addTilesetImage('tileset1',null,32,32,0,0,0);
	map.addTilesetImage('units',null,32,32,0,0,4);
	layer=map.create("level1",40,30,32,32);
	layer_units=map.createBlankLayer("units",40,30,32,32);
	layer.resizeWorld();
	layer.inputEnabled=true;
	layer.events.onInputDown.add(tile_down,this);
	
	for ( ix=0; ix<40; ix++) {
		for ( iy=0; iy<30; iy++) {
			map.putTile(game.rnd.integerInRange(0,2),ix,iy,layer);
		}
	}
	for (i=0;i<10;i++) {
		var u={x:game.rnd.integerInRange(0,40-9),
				y:game.rnd.integerInRange(0,29),
				tile: game.rnd.integerInRange(5,7)};
		units.push(u);
	};
	for (i in units) {
		map.putTile(units[i].tile,units[i].x,units[i].y,layer_units);
		console.log(units[i]);
	};
	//map.putTile(5,2,0,layer_units); */
	this.right_panel1.bringToTop();
	cursors = game.input.keyboard.createCursorKeys();
	
	
	marker = game.add.graphics();
    marker.lineStyle(2, 0x000000, 1);
    marker.drawRect(0, 0, 32, 32);
	//var logo = game.add.sprite(game.world.centerX+200, game.world.centerY, 'logo');
	//logo.anchor.setTo(0.5, 0.5);

}


function update() {
	//game.camera.x+=1;

	    if (cursors.left.isDown)
	    {
	        game.camera.x -= 4;
	    }
	    else if (cursors.right.isDown)
	    {
	        game.camera.x += 4;
	    }

	    if (cursors.up.isDown)
	    {
	        game.camera.y -= 4;
	    }
	    else if (cursors.down.isDown)
	    {
	        game.camera.y += 4;
	    }
	    /*
	    if (game.input.mousePointer.isDown) {
	    	console.log("screen",game.input.activePointer.screenX,  unit_selected, current_unit)
	    	if ( ! unit_selected && game.input.activePointer.screenX<game.width - this.right_panel1.width ) {
	    		var x =layer.getTileX(game.input.activePointer.worldX);
	    		var y = layer.getTileY(game.input.activePointer.worldY);
	    		for (i in units) {
	    			var u=units[i];
	    			if ( u.x == x && u.y == y) {
	    				marker.x = layer.getTileX(game.input.activePointer.worldX) * tile_size;
	    				marker.y = layer.getTileY(game.input.activePointer.worldY) * tile_size;
	    				current_unit=i;
	    				unit_selected=true;
	    			}
	    		}
	    	}
	    	else if ( game.input.activePointer.screenX<game.width - this.right_panel1.width ){
	    		var u=units[current_unit];
	    		var x =layer.getTileX(game.input.activePointer.worldX);
	    		var y = layer.getTileY(game.input.activePointer.worldY);
	    		if ( u.x!=x || u.y!=y ){
	    			marker.x = x*tile_size;
	    			marker.y = y*tile_size;
	    			map.putTile(null,u.x,u.y,layer_units);
	    			u.x=x;
	    			u.y=y;
	    			map.putTile(u.tile,x,y,layer_units);
	    			unit_selected=false;
	    		}

	    	}
	    	
	    } */

}
	


function render() {

    //game.debug.cameraInfo(game.camera, 32, 32);

}
