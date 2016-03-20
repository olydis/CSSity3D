/// <reference path="typings/jquery/jquery.d.ts" />
define(["require", "exports", "jquery"], function (require, exports, $) {
    function setPerspective(container, perspective) {
        container.css("perspective", perspective + "px");
    }
    function addTransform(container, transform) {
        var old = container.css("transform") || "none";
        container.css("transform", transform + (old == "none" ? "" : " " + old));
        return container;
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
    var classFaceOuter = "faceOuter";
    var classFaceOuterFront = "faceOuterFront";
    var classFaceOuterBack = "faceOuterBack";
    var classFaceBlock = "faceBlock";
    function createBackFace(front) {
        return front;
        var back = createChildFace(undefined, undefined, front);
        back.addClass(classFaceOuter).addClass(classFaceOuterBack);
        var block = createChildFace(undefined, undefined, front);
        block.addClass(classFaceBlock);
        return back;
    }
    function pullOut(amount, base) {
        var baseHTML = base.html();
        base.css("position", "relative");
        var roof = createChildFace(undefined, undefined, base);
        roof.html(baseHTML);
        var floor = createChildFace(undefined, undefined, base);
        var wallN = createChildFace(undefined, amount, base);
        var wallS = createChildFace(undefined, amount, base);
        var wallE = createChildFace(undefined, amount, base);
        var wallW = createChildFace(undefined, amount, base);
        addTransform(floor, "rotateX(-180deg)");
        addTransform(roof, "translateZ(" + amount + "px)");
        addTransform(wallN, "translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallS, "rotateZ(180deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallE, "rotateZ(90deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        addTransform(wallW, "rotateZ(270deg) translateY(-50%) rotateX(-90deg) translateY(-50%) rotateY(180deg)");
        [roof, floor, wallN, wallE, wallS, wallW].forEach(function (x) { return createBackFace(x.addClass(classFaceOuter).addClass(classFaceOuterFront)); });
        return { floor: floor, roof: roof, walls: [wallN, wallE, wallS, wallW] };
    }
    function createCube(size) {
        var base = createChildFace(size, size);
        var _a = pullOut(size, base), floor = _a.floor, roof = _a.roof, walls = _a.walls;
        return { base: base, floor: floor, roof: roof, walls: walls };
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
        var root = $("#pot").css("position", "relative");
        createCube(100).base.appendTo(root);
        for (var i = 0; i < 100; ++i) {
            createCube(100).base.css("position", "absolute").css("transform", "translate3D(" + (Math.random() - 0.5) * 1000 + "px, " + (Math.random() - 0.5) * 1000 + "px, " + (Math.random() - 0.5) * 1000 + "px)").appendTo(root);
        }
    });
});
