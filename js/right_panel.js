/**
 * 
 */
var host ="http://127.0.0.1:8000/game/"
	
right_panel_buttons = {
		net:0,
		units:1,
		del:2,
		add_unit:3,
		next_unit:4
}
function create_right_panel() {
	var r=game.add.sprite(game.width-8*tile_size,0,'right_panel1');
	r.fixedToCamera=true;
	r.inputEnabled=true;
	r.events.onInputDown.add(next_unit,this);
	
	var s=game.make.sprite(10,20,'buttons',
			right_panel_buttons.net);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(sendJson,this);
	r.addChild(s);
	
	s=game.make.sprite(80,20,'buttons',
			right_panel_buttons.units);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(onLoadUnits,this);
	r.addChild(s);
	
	s=game.make.sprite(150,20,'buttons',2);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(del_poly,this);
	r.addChild(s);
	
	
	s=game.make.sprite(10,60,'buttons',
			right_panel_buttons.add_unit);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(onAddUnits,this);
	r.addChild(s);
	
	s=game.make.sprite(80,60,'buttons',4);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(onNetDown,this);
	r.addChild(s);
	return r;
	
}




function sendJson() {
	//alert(csrftoken)
	//var a=document.getElementsByName('csrfmiddlewaretoken')[0].value
	
	//alert(getCookie('csrftoken'))
	var arr = { City: 'Moscow', Age: 25 };
	$.ajax({
	    url: host+'send.json',
	    type: 'POST',
	    data: JSON.stringify(arr),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: true,
	    success: sendComplete
	});
}
function sendComplete(msg) {
	console.log(msg)
	alert("hello")
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