function Point3D(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rotateX = function(angle) {
        var r, c, s, y, z
        r = angle * Math.PI / 180
        c = Math.cos(r)
        s = Math.sin(r)
        y = this.y * c - this.z * s
        z = this.y * s + this.z * c
        return new Point3D(this.x, y, z)
    }

    this.rotateY = function(angle) {
        var r, c, s, x, z
        r = angle * Math.PI / 180
        c = Math.cos(r)
        s = Math.sin(r)
        z = this.z * c - this.x * s
        x = this.z * s + this.x * c
        return new Point3D(x,this.y, z)
    }

    this.rotateZ = function(angle) {
        var r, c, s, x, y
        r = angle * Math.PI / 180
        c = Math.cos(r)
        s = Math.sin(r)
        x = this.x * c - this.y * s
        y = this.x * s + this.y * c
        return new Point3D(x, y, this.z)
    }

    this.project = function(Width, Height, fov, Distance) {
        var factor, x, y
        factor = fov / (Distance + this.z)
        x = this.x * factor + Width / 2.8
        y = this.y * factor + Height / 2.8
        return new Point3D(x, y, this.z)
    }
}

function line(context, p1,p2) {
    
}

function create3DSquare(verticesUpdated) {
    ctx.clearRect(0,0,600,300);
    // line(ctx, verticesUpdated[0],verticesUpdated[1]);
    // line(ctx, verticesUpdated[1],verticesUpdated[2]);
    // line(ctx, verticesUpdated[2],verticesUpdated[3]);
    // line(ctx, verticesUpdated[3],verticesUpdated[0]);
    // line(ctx, verticesUpdated[4],verticesUpdated[5]);
    // line(ctx, verticesUpdated[5],verticesUpdated[6]);
    // line(ctx, verticesUpdated[6],verticesUpdated[7]);
    // line(ctx, verticesUpdated[7],verticesUpdated[4]);
    // line(ctx, verticesUpdated[0],verticesUpdated[4]);
    // line(ctx, verticesUpdated[1],verticesUpdated[5]);
    // line(ctx, verticesUpdated[2],verticesUpdated[6]);
    // line(ctx, verticesUpdated[3],verticesUpdated[7]);
    for( var i = 0; i < faces.length; i++ ) {
        var f = faces[i]
        ctx.fillStyle = "#006BAD";
        ctx.strokeStyle = "#3D3478";
        ctx.beginPath()
        ctx.moveTo(verticesUpdated[f[0]].x,verticesUpdated[f[0]].y)
        ctx.lineTo(verticesUpdated[f[1]].x,verticesUpdated[f[1]].y)
        ctx.lineTo(verticesUpdated[f[2]].x,verticesUpdated[f[2]].y)
        ctx.lineTo(verticesUpdated[f[3]].x,verticesUpdated[f[3]].y)
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}

function rotateCubeX() {
    var t = new Array();
    // Using Perspective Prohection
    for( var i = 0; i < vertices.length; i++ ) {
        var vertice = vertices[i];
        var rotated = vertice.rotateX(1);
        var projected = rotated.project(400,200,100,3.5);
        t.push(projected);
        vertices[i]=rotated;
    }
    
    create3DSquare(t);
    // console.log(angle.x,angle.y,angle.z);
}

function rotateCubeY() {
    var t = new Array();
    // Using Perspective Prohection
    for( var i = 0; i < vertices.length; i++ ) {
        var vertice = vertices[i];
        var rotated = vertice.rotateY(1);
        var projected = rotated.project(400,200,100,3.5);
        t.push(projected);
        vertices[i] = rotated;
    }
    
    create3DSquare(t);
    // console.log(angle.x,angle.y,angle.z);
}

function rotateCubeZ() {
    var t = new Array();
    // Using Perspective Prohection
    for( var i = 0; i < vertices.length; i++ ) {
        var vertice = vertices[i];
        var rotated = vertice.rotateZ(1);
        var projected = rotated.project(400,200,100,3.5);
        t.push(projected);
        vertices[i] = rotated;
    }    
    create3DSquare(t);
}


var vertices = [new Point3D(-1,1,-1), new Point3D(1,1,-1), new Point3D(1,-1,-1), new Point3D(-1,-1,-1),
    new Point3D(-1,1,1), new Point3D(1,1,1), new Point3D(1,-1,1), new Point3D(-1,-1,1)];

var faces = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]]

var angle = 1;
var dacc=0.05,speed ;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

initCube();

function rotateCubeXM() {
    fr = 5;
    for(var i = 0;i<200;i++,fr+=dacc) {
        setTimeout(rotateCubeX,i*fr);
    }
}

function rotateCubeYM() {
    fr = 5;
    for(let i = 0;i<200;i++,fr+=dacc) {
        setTimeout(rotateCubeY,i*fr);
    }
}

function rotateCubeZM() {
    fr = 5;
    for(let i = 0;i<200;i++,fr+=dacc) {
        setTimeout(rotateCubeZ,i*fr);
    }
}

function initCube() {
    var t = new Array();

    for( var i = 0; i < vertices.length; i++ ) {
        var vertice = vertices[i];
        var rotated = vertice.rotateY(140);
        var projected = rotated.project(400,200,100,3.5);
        t.push(projected);
        vertices[i] = rotated;
    }
    create3DSquare(t);
}