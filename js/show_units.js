/**
 * 
 */
var unit_graphics;
var units_color=0xff33ff
var units_own_color=0xff33ff
var units_xofs=5
var units_yofs=5
var units_width=3
var units_min_ofset=7
function draw_poly () {
	poly = new Phaser.Polygon(100,200,103,200,103,400,100,400)
	unit_graphics=game.add.graphics(0,0)
	//unit_graphics.beginFill(0xFF33ff)
	unit_graphics.beginFill(units_color)
	unit_graphics.drawPolygon(poly.points);
	unit_graphics.endFill();
}

function onLoadUnits() {
	console.log("loading units");
	game.load.json("units_json",host+"units.json",true)
	game.load.start();
	game.load.onLoadComplete.add(onUnitsComplete,this)
	//var pj=game.cache.getJSON("test1")
	
}
function onUnitsComplete() {
	var pj=game.cache.getJSON("units_json");
	var max=pj.max
	var yofs=(tile_size-2*units_yofs-units_min_ofset)/max
	unit_graphics=game.add.graphics(0,0)
	unit_graphics.beginFill(units_own_color)
	for (i in pj.own){
		var len1=pj.own[i][2]
		/*if (len1<max/7) {
			len1=max/7
		}*/
		len1=len1*yofs+units_min_ofset
		var poly=new Phaser.Polygon(
				pj.own[i][0]*tile_size+units_xofs,
				pj.own[i][1]*tile_size+units_yofs,
				pj.own[i][0]*tile_size+units_xofs+units_width,
				pj.own[i][1]*tile_size+units_yofs,
				pj.own[i][0]*tile_size+units_xofs+units_width,
				//pj.own[i][1]*tile_size+units_yofs+yofs*pj.own[i][2],
				pj.own[i][1]*tile_size+units_yofs+len1,
				pj.own[i][0]*tile_size+units_xofs,
				//pj.own[i][1]*tile_size+units_yofs+yofs*pj.own[i][2]
				pj.own[i][1]*tile_size+units_yofs+len1
				)
		unit_graphics.drawPolygon(poly.points);
	}
	unit_graphics.endFill();
}

function del_poly() {
	unit_graphics.destroy()
}