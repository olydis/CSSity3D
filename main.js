/// <reference path="typings/jquery/jquery.d.ts" />
define(["require", "exports", "jquery"], function (require, exports, $) {
    function setPerspective(container, perspective) {
        container.css("perspective", perspective + "px");
    }
    function addTransform(container, transform) {
        var old = container.css("transform") || "none";
        container.css("transform", transform + (old == "none" ? "" : " " + old));
    }
    function createChildFace(width, height, container) {
        if (!width)
            width = container.innerWidth();
        if (!height)
            height = container.innerHeight();
        var face = $("<div>");
        face.width(width);
        face.height(height);
        if (container) {
            face.appendTo(container);
            face.css("position", "absolute");
            face.css("left", (container.innerWidth() - width) / 2 + "px");
            face.css("top", (container.innerHeight() - height) / 2 + "px");
        }
        return face;
    }
    function pullOut(amount, base) {
        var baseHTML = base.html();
        base.css("position", "relative");
        var roof = createChildFace(undefined, undefined, base);
        roof.html(baseHTML);
        var wallN = createChildFace(undefined, amount, base);
        var wallS = createChildFace(undefined, amount, base);
        var wallE = createChildFace(undefined, amount, base);
        var wallW = createChildFace(undefined, amount, base);
        addTransform(roof, "translateZ(" + amount + "px)");
        addTransform(wallN, "translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallS, "rotateZ(180deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallE, "rotateZ(90deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallW, "rotateZ(270deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        return { roof: roof, walls: [wallN, wallE, wallS, wallW] };
    }
    function createCube(size) {
        var base = createChildFace(size, size);
        var _a = pullOut(size, base), roof = _a.roof, walls = _a.walls;
        return { base: base, roof: roof, walls: walls };
    }
    $(function () {
        // var plane = $("#plane");
        // var cube = createCube(100);
        // cube.base.offset({ left: 50, top: 50 }).appendTo(plane);
        // cube.roof.css("background","#eee");
        // cube.walls[0].css("background","#ddd");
        // cube.walls[1].css("background","#ccc");
        // cube.walls[2].css("background","#bbb");
        // cube.walls[3].css("background","#aaa");
        pullOut(100, $("#pot"));
    });
});
