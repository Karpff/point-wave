var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

function getDistance(x1,y1,x2,y2)
{
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function getDistanceFromCenter(x,y)
{
  return getDistance(x,y,innerWidth/2,innerHeight/2);
}

class Point
{
  constructor(x,y,angle)
  {
    this.initX = x-30;
    this.initY = y-30;
    this.angle = -getDistanceFromCenter(this.initX,this.initY);
    this.x = Math.cos(this.angle/180*Math.PI)*10+this.initX;
    this.y = Math.sin(this.angle/180*Math.PI)*10+this.initY;
    this.color = getDistanceFromCenter(this.initX,this.initY)*3/2;
  }

  update()
  {
    this.color-=3.5;
    this.angle+=3;
    this.x = Math.cos(this.angle/180*Math.PI)*20+this.initX;
    this.y = Math.sin(this.angle/180*Math.PI)*20+this.initY;
    this.display();
  }

  display()
  {
    c.beginPath();
    c.arc(this.x,this.y,4,0,Math.PI*2);
    c.fillStyle = "hsl("+this.color+",100%,50%)";
    c.fill();
  }
}

var points = [];
for(let i=0;i<innerWidth/30+2;i++)
{
  for(let j=0;j<innerHeight/30+2;j++)
  {
    points.push(new Point(i*30+j%2*15,j*30))
  }
}


function animate()
{
  c.fillStyle = "black";
  c.fillRect(0,0,innerWidth,innerHeight);
  for(let i=0;i<points.length;i++)
  {
    points[i].update();
  }
  window.requestAnimationFrame(animate);
}
animate();
