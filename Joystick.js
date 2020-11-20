"use-strict";
        	
class create_joystick {
   // front=null;back=null;touch=null;r=0;c=0;R=0;C=0;
    
    constructor(on_action,touch,front,back) {
    this.on_action = on_action || {dx:0, dy:0,degree:0}; 
    this.touch = touch || {on: false};
    this.front = front || {radius: 24, color: "lime"}; 
    this.back = back || {radius: 40, color: "black"};
    this.r = this.front.radius; 
    this.R = this.back.radius;
    this.c = this.front.color; 
    this.C = this.back.color; 
    

    } 
    
     
     start(e){
        if(this.touch && !this.touch.on) {
            
            this.touch = {
                x:e.touches[0].clientX,
                y:e.touches[0].clientY,
                on:true};
                //document.write(this.touch.x);
            this.back = document.createElement("div");

            this.back.style.position = "absolute";
            this.back.style.width = 2*this.R+"px";
            this.back.style.height = 2*this.R+"px";
            this.back.style.borderRadius = "50%";
            this.back.style.background = this.C;
            this.front = document.createElement("div");
            this.front.style.position = "absolute";
            this.front.style.width = 2*this.r+"px";
            this.front.style.height = 2*this.r+"px";
            this.front.style.borderRadius = "50%";
            this.front.style.background = this.c;
            this.front.style.left = this.touch.x-this.r+"px";
            this.front.style.top = this.touch.y-this.r+"px";
            this.back.style.left = this.touch.x-this.R+"px";
            this.back.style.top = this.touch.y-this.R+"px";
            document.body.appendChild(this.back);
            document.body.appendChild(this.front);
        }
    }
    

     stop(e) {
        if(this.touch && this.touch.on) {
            document.body.removeChild(this.back);
            document.body.removeChild(this.front);
            this.touch.on = false;
            this.on_action = {dx:0, dy:0, degree:0};
        }
    }
    
     move(e) {
        let x = e.touches[0].clientX,
            y = e.touches[0].clientY;
        if(this.touch && this.touch.on) {
            let dx = (x-this.touch.x);
            let dy = (y-this.touch.y);
            let l = Math.hypot(dx,dy);
            let max = 4*this.R/5;
            if(l>max) {dx*=max/l; dy*=max/l}
            this.front.style.left = 
                parseFloat(this.back.style.left)+dx+this.r/2+"px";
            this.front.style.top = 
                parseFloat(this.back.style.top)+dy+this.r/2+"px";
            dx /= max; dy /= max;
            let alpha = Math.atan( dy / dx );
            if (dx<0){
                alpha=alpha+Math.PI;
            }
            let degree=(alpha)*(180/Math.PI);
            if(degree<0){degree+=360;}
            degree+=90;
            this.on_action = {dx:dx, dy:dy, degree:degree};

        }
    }

     position(){
        let data = this.on_action;
        
        return data;
    }
    
    
}
var stick = {dx:0,dy:0};
function Joystick(){
	
    let obj = new create_joystick();
    //let obj = new create_joystick({on:false},{radius: 24, color: "lime"},{radius: 40, color: "black"});
    
    function startPos(e){
             
             obj.start(e);
             stick={dx:obj.position().dx, dy:obj.position().dy, degree:obj.position().degree};
            
    }
    function movePos(e){
             
             obj.move(e);
             stick={dx:obj.position().dx, dy:obj.position().dy, degree:obj.position().degree};
    }
    function stopPos(e){
             
             obj.stop(e);
             stick={dx:obj.position().dx, dy:obj.position().dy, degree:obj.position().degree};
    }
    
    document.addEventListener("touchstart", startPos);
    document.addEventListener("touchmove", movePos);
    document.addEventListener("touchend", stopPos);
    document.addEventListener("touchcancel", stopPos);

    
}
