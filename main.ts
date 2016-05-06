/// <reference path="typings/jquery/jquery.d.ts" />

import * as $ from "jquery";

$(() => {
    var root = $("#pot").css("position", "relative");
});

type T1 = { a: number, b: number } | { c: number, b: number } | { c: number, b: any } | { a: number, c: number };
type T2 = { a: number, b: number, c: number };
type T3 = { a: number, b: boolean, c: number };
type T4 = { a: number };
 
var t1 : T1;
var t2 : T2;
var t3 : T3;
var t4 : T4;

t1 = t2;