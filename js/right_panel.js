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
	s.events.onInputDown.add(sendJson,this);
	r.addChild(s);
	s=game.make.sprite(80,20,'buttons',1);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(onLoadUnits,this);
	r.addChild(s);
	s=game.make.sprite(150,20,'buttons',2);
	s.inputEnabled=true;
	s.input.priorityID = 1;
	s.events.onInputDown.add(del_poly,this);
	r.addChild(s);
	return r;
	
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
        	console.log(cookies[i])
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sendJson() {
	//alert(csrftoken)
	//var a=document.getElementsByName('csrfmiddlewaretoken')[0].value
	var csrftoken = getCookie('csrftoken');
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
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