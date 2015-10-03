/**
 * 
 */
var host ="http://127.0.0.1:8000/game/"
function create_right_panel() {
	var r=game.add.sprite(game.width-8*tile_size,0,'right_panel1');
	r.fixedToCamera=true;
	r.inputEnabled=true;
	r.events.onInputDown.add(next_unit,this);
	var s=game.make.sprite(10,20,'buttons',0);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(onNetDown,this);
	r.addChild(s);
	return r;
	
}

function onNetDown() {
	console.log("net down");
	game.load.json("test1",host+"test.json",true)
	game.load.start();
	game.load.onLoadComplete.add(jsonComplete,this)
	//var pj=game.cache.getJSON("test1")
	
}

function jsonComplete() {
	var pj=game.cache.getJSON("test1");
	console.log("hello",pj.hello,"phaser",pj.phaser)
	
}