import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	totalQuantity: 0,
	changed: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			//console.log('payload quantity: ' + action.payload.totalQuantity);
			state.items = action.payload.items;
			//console.log('payload itmes: ' + action.payload.totalQuantity);
		},
		addItemToCart(state, action) {
			// Logic here can be tanferred to backend code
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			state.changed = true;

			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			//logic here can be tranferred to backend code
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			state.changed = true;

			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
