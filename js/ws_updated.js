/**
 * 
 */

function onUnitsUpdated(msg) {
	var unit_moved=/^unit moved/;
	var begin_battle=/^begin battle/;
	if (unit_moved.test(msg)) {
		console.log(msg)
		onLoadUnits()
	} else if ( begin_battle.test(msg)) {
		
		console.log(msg)
		onLoadBattles()
	} else {
		console.log(msg)
	}
	
}