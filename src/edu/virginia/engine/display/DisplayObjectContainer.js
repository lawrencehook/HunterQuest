"use strict";

/**
 * Allows engine to support a display tree
 */
class DisplayObjectContainer extends DisplayObject {

	constructor(id, filename, parentObj=null) {
		super(id, filename, parentObj);

		this.children = new ArrayList();
	}

	update(pressedKeys) {
		super.update(pressedKeys);
		this.children.contents.forEach(function(child) {
			child.update(pressedKeys);
		});
	}

	draw(context) {
		// if (this.displayImage && this.visible) {
		if (this.visible) {
			super.applyTransformations(context);
			if(this.loaded) {
				context.drawImage(this.displayImage, 0, 0);
				if (this.getId() == 'projectile' && this.isFriendly)
					console.log(context.x, context.y);
			}
			this.children.contents.forEach(function(child) {
				child.draw(context);
			});
			super.reverseTransformations(context);
		}
	}
	
	addChild(child) {
		this.children.add(child);
	}

	// Todo -> delegate to ArrayList
	addChildAtIndex(child, index) {}

	removeChild(child) {
		this.children.remove(child);
	}

	removeByIndex(index) {
		this.children.removeAt(index);
	}

	removeAll() {
		this.children = new ArrayList();
	}

	contains(child) {
		return this.children.contains(child);
	}

	getChildID(id) {
		var childWithId = null;
		this.children.contents.forEach(function(child) {
			if (child.getId() == id) {
				childWithId = child;
			}
		});
		return childWithId;
	}

	getChildIndex(index) {
		return this.children.get(index);
	}

	getChildren() {
		return this.children;
	}

	// checkChildCollisions() {
	// 	var children = this.children.contents;
	// 	var i, j, child1, child2, hitbox1, hitbox2, center1, center2, dx, dy, xOverlap, yOverlap;

	// 	for (i = 0; i < children.length-1; i++) {
	// 		child1 = children[i];
	// 		child1.block.platformDown = false;
	// 		hitbox1 = child1.getHitbox();
	// 		for (j = i+1; j < children.length; j++) {
	// 			child2 = children[j];
	// 			hitbox2 = child2.getHitbox();
	// 			if (child1.id != child2.id && utils.intersects(hitbox1, hitbox2)) {
	// 				if (child2.collidable) {
	// 					center1 = child1.getHitboxCenter();
	// 					center2 = child2.getHitboxCenter();
	// 					dx = center1.minus(center2).x;
	// 					dy = center1.minus(center2).y;
	// 					xOverlap = 0.5*(hitbox1.width + hitbox2.width) - Math.abs(dx);
	// 					yOverlap = 0.5*(hitbox1.height + hitbox2.height) - Math.abs(dy);

	// 					if (xOverlap < yOverlap) {
	// 						child1.position.x += dx > 0 ? xOverlap : -xOverlap;
	// 					} else {
	// 						child1.position.y += dy > 0 ? yOverlap : -yOverlap;
	// 						child1.block.platformDown = true;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

}