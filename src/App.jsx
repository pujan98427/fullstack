import React from "react";

import PopularProduct from "./popular-product";


const App = () => {
	return (
		<>

			<div className="container">
				<h1 className="header">Popular Products</h1>
				<div id="content">
					<div className='ui three column grid cards'>
						<PopularProduct />
					</div>

				</div>
			</div>
		</>
	)
}
export default App;
