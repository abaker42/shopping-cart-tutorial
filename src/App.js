import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let initialLoad = true;

function App() {
	const dispatch = useDispatch();
	const seeCart = useSelector((state) => state.ui.showCart);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (initialLoad) {
			initialLoad = false;
			return;
		}

		if (!cart.changed) {
			return;
		}

		dispatch(sendCartData(cart));
	}, [cart, dispatch]);
	return (
		<Fragment>
			{notification && (
				<Notification
					staus={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{seeCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
