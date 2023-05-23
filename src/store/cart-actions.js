import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const resp = await fetch(
				'https://react-http-30b70-default-rtdb.firebaseio.com/cart.json'
			);

			if (!resp.ok) {
				throw new Error('Could not fetch cart data');
			}

			const respData = await resp.json();

			return respData;
		};

		try {
			const cartData = await fetchData();
			//dispatch(cartActions.replaceCart(cartData));instead of fetching cartData raw tranform to ensure empty arry is passed for 0 items
			dispatch(
				cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity,
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error',
					message: 'Failed to get data!',
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: 'pending',
				title: 'Sending...',
				message: 'Sending cart data!',
			})
		);

		const sendRequest = async () => {
			const resp = await fetch(
				'https://react-http-30b70-default-rtdb.firebaseio.com/cart.json',
				{
					method: 'PUT',
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
					}),
					//instead of sending whole (cart) with isChanged value
				}
			);
			if (!resp.ok) {
				throw new Error('Sending cart data failed');
			}

			const respData = await resp.json();
			console.log(respData);
		};

		try {
			await sendRequest();
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success',
					message: 'Data sent successfully',
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error',
					message: 'Something went wrong!',
				})
			);
		}
	};
};
