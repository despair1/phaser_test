/**
 * 
 */

var unit_cursor = null


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