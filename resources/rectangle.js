function Rectangle (x, y, width, height, rotation) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.linecolor = utils.parseColor("#2f4d2f");
	this.fillcolor = utils.parseColor("#93fcfb");
	this.lineWidth = 1;
	this.rotation = rotation;
}

Rectangle.prototype.draw = function (context) {
	context.save();
	
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	
	context.beginPath();
	context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
	
	context.fillStyle = this.fillcolor;
	context.fill();
	
	context.strokeStyle = this.linecolor;
	context.lineWidth = this.lineWidth;
	context.stroke();
		
	context.restore();

}