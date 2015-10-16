/**
 * 
 */

var unit_cursor = 0


function onAddUnits() {
	this.layer.events.onInputDown.removeAll(this)
	this.layer.events.onInputDown.add(addUnitbyTileDown,this);
}

function addUnitbyTileDown() {
	var x =this.layer.getTileX(game.input.activePointer.worldX);
	var y = this.layer.getTileY(game.input.activePointer.worldY);
	var arr = { x: x, y: y };
	$.ajax({
	    url: host+'add_unit.json',
	    type: 'POST',
	    data: JSON.stringify(arr),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: true,
	    success: function () {}
	});
}

function nextUnit() {
	unit_cursor++
	if ( own_units_pos ) {
		if (unit_cursor>=own_units_pos.length) { unit_cursor=0}
		marker.x = own_units_pos[unit_cursor][1] * tile_size;
		marker.y = own_units_pos[unit_cursor][2] * tile_size;
		this.layer.events.onInputDown.removeAll(this)
		this.layer.events.onInputDown.add(moveUnitbyTileDown,this);
	}
}

function moveUnitbyTileDown() {
	var x =this.layer.getTileX(game.input.activePointer.worldX);
	var y = this.layer.getTileY(game.input.activePointer.worldY);
	var arr = { x: x, y: y, id : own_units_pos[unit_cursor][0] };
	$.ajax({
	    url: host+'move_unit.json',
	    type: 'POST',
	    data: JSON.stringify(arr),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: true,
	    success: function () {onLoadUnits()}
	});
	this.layer.events.onInputDown.removeAll(this)
}