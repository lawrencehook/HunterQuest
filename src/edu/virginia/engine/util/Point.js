class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(point) {
		return new Point(this.x + point.x, this.y + point.y)
	}

	minus(point) {
		return new Point(this.x - point.x, this.y - point.y);
	}

	times(scalar) {
		return new Point(scalar*this.x, scalar*this.y);
	}

	inverse() {
		return new Point(-this.x, -this.y);
	}

	inverseA() {
		return [-this.x, -this.y];
	}

	toA() {
		return [this.x, this.y];
	}

	norm() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	clone() {
		return new Point(this.x, this.y);
	}

	getAngle(p) {
		return Math.atan2(this.y - p.y, this.x - p.x);
	}

	equals(p) {
		return this.x == p.x && this.y == p.y;
	}
}