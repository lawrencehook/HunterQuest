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
		if (this.visible) {
			super.applyTransformations(context);
			if(this.loaded) {
				context.drawImage(this.displayImage, 0, 0);
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

}