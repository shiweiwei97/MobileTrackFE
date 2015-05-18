/* jslint node: true */

"use strict";

function Cart (initialItems) {

    var _cartItems = initialItems || [];

    this.removeItem = function (index) {
        _cartItems.splice(index, 1);
        return this;
    };

    this.increaseItem = function (index) {
        _cartItems[index].qty++;
        return this;
    };

    this.decreaseItem = function (index) {
        if (_cartItems[index].qty > 1) {
            _cartItems[index].qty--;
        }
        else {
            this.removeItem(index);
        }

        return this;
    };

    this.addItem = function (item) {

        var inCart = _cartItems.some(

            (function (cartItem, i) {
                if (cartItem.id === item.id) {
                    this.increaseItem(i);
                    return true;
                }
            }).bind(this)
        );

        if (!inCart) {
            item.qty = 1;
            _cartItems.push(item);
        }

        return this;
    };

    this.resetItems = function (items) {
        _cartItems = items;
        return this;
    };

    this.getItems = function () {
        return _cartItems;
    };
}

module.exports = Cart;