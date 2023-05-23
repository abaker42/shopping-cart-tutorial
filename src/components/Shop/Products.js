import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{ id: 'p1', title: 'Apple', price: 3, descr: 'This first fruit' },
	{ id: 'p2', title: 'Orange', price: 2, descr: 'Plentiful juicy and ripe' },
	{
		id: 'p3',
		title: 'Banana',
		price: 1,
		descr: 'Cheap and loaded with potassium',
	},
	{
		id: 'p4',
		title: 'Pomegrante',
		price: 5,
		descr: 'High on antioxidants and full of flavor',
	},
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product) => (
					<ProductItem
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						description={product.descr}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
