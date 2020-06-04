
/** getting the canves from the document */
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var ObjArrays = [];
var colorArray = [
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#ff1100'
];
var mouse = {
    x : window.innerWidth/2,
    y : window.innerHeight/2
};

/**evets */
canvas.addEventListener("mousemove",event=>{
    mouse.x = event.x;
    mouse.y = event.y;
})

init();

/**
 * set the canvas width and height
 * to much the document with and height
 */
function setCanvas(canvas){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}


/** initilize all the envirement */
function init(){
    setCanvas(canvas);

    //a = new obj(cordinate.x,cordinate.y,5,100);
    for(var i=0;i<20;i++){
        ObjArrays.push(new obj(mouse.x,mouse.y,2,100));
    }
    animate();
}

/** get random integer between two values */
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}

/** create Drawing Object */
function obj(x,y,raduis,cRaduis){
    this.x = x;
    this.y = y;
    this.raduis = Math.random()+1*raduis;
    this.radians = 0;
    this.volecity = (Math.random()+0.2) * 0.02;
    this.cRaduis = randomIntFromRange(cRaduis/2,cRaduis);
    this.color = randomIntFromRange(0,5);
    this.lastMoue = {x:x,y:x};

    this.draw = (lastPoint)=>{
        ctx.beginPath()
        ctx.fillStyle = colorArray[this.color];
        // ctx.strokeStyle = colorArray[this.color];
        // ctx.lineWidth = this.raduis;
        // ctx.moveTo(lastPoint.x,lastPoint.y);
        // ctx.lineTo(this.x,this.y);
        // ctx.stroke();
        // ctx.closePath();
        ctx.arc(this.x,this.y,this.raduis,0,Math.PI * 2,false);
        ctx.fill();
    };

    this.update = ()=>{
        const lastPoint = {x:this.x,y:this.y};
        this.radians += this.volecity;

        this.lastMoue.x += (mouse.x-this.lastMoue.x) *0.05;
        this.lastMoue.y += (mouse.y-this.lastMoue.y) *0.05;


        this.x = this.lastMoue.x + Math.cos(this.radians) * this.cRaduis;        
        this.y = this.lastMoue.y + Math.sin(this.radians) * this.cRaduis;

        // redraw the shap to create the animation
        this.draw(lastPoint);
    } 
}

/** animate function used to animate all the elments on
 * the canvas to create the desired animation
 */


function animate(){
    //ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    window.requestAnimationFrame(animate);

    for(var j=0;j<ObjArrays.length;j++){
        ObjArrays[j].update();
    }
    
}



