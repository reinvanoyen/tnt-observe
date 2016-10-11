"use strict";

let observe = require('../lib/index');

let randBetween = function( min, max ) {
	return Math.floor( Math.random() * max ) + min;
};

let obj = {
	state: 'wandering',
	health: 100,
	inventory: [ 'wooden buckler', 'longsword' ]
};

let obs = new observe.ObservableObject( obj, ( res ) => {

	console.log( '[' + res.state + ']', 'HP:', res.health, 'Inventory:', res.inventory );
} );

let pickupInterval = setInterval( () => {

	let items = [ 'health potion', 'crossbow', 'heavy warhammer', 'longbow' ];
	let item = items[ randBetween( 0, items.length ) ];
	console.log( '=== Found a ' + item + '! ===' );
	obs.inventory.push( item );

}, 10000 );

setTimeout( () => {

	obs.state = 'fighting';

	let attackInterval = setInterval( () => {
		
		if( obs.health <= 0 ) {

			obs.state = 'dead';
			clearInterval(attackInterval);
			clearInterval(pickupInterval);
			obs.inventory = [];

		} else {

			if( obs.health < 30 && obs.inventory.indexOf('health potion') > -1 ) {
				obs.inventory.pop();
				obs.health = Math.min( obs.health + 40, 100 );
			}

			let dmg = randBetween( 1, 10 );
			console.log( '=== Hitted for ' + dmg + ' damage ===' );
			obs.health = Math.max( 0, obs.health - dmg );
		}

	}, 1500 );

}, 6000 );
