/*
	Kung Fig Dynamic Instance

	Copyright (c) 2015 - 2020 Cédric Ronvel

	The MIT License (MIT)

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

"use strict" ;



const Dynamic = require( 'kung-fig-dynamic' ) ;
//const common = require( 'kung-fig-common' ) ;



function DynamicInstance( fn , arg , name ) {
	this.fn = fn ;
	this.arg = arg ;
	this.name = name || fn.stringifyId || fn.serializerId || fn.id || fn.name ;
}



DynamicInstance.prototype = Object.create( Dynamic.prototype ) ;
DynamicInstance.prototype.constructor = DynamicInstance ;

module.exports = DynamicInstance ;

DynamicInstance.prototype.__prototypeUID__ = 'kung-fig/DynamicInstance' ;
DynamicInstance.prototype.__prototypeVersion__ = require( '../package.json' ).version ;

DynamicInstance.serializerFnId = 'DynamicInstance' ;



DynamicInstance.serializer = function( object ) {
	//throw new Error( 'DynamicInstance.serializer(): not coded!' ) ;
	// jsbindat should support serializing registered functions
	return {
		args: [ object.fn , object.arg , object.name ] ,
		overideKeys: [ '__isDynamic__' , '__isApplicable__' ]
	} ;
} ;



DynamicInstance.prototype.getValue = DynamicInstance.prototype.get = function( ctx ) {
	if ( ! this.__isDynamic__ ) { return this ; }
	return this.fn( Dynamic.getRecursiveFinalValue( this.arg , ctx ) ) ;
} ;



DynamicInstance.prototype.apply = function( ctx ) {
	if ( ! this.__isApplicable__ ) { return this ; }
	return this.fn( Dynamic.getRecursiveFinalValue( this.arg , ctx ) ) ;
} ;



// Not sure if it should be done here
//DynamicInstance.prototype.stringify = function() {} ;

