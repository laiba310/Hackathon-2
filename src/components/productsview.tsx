import { Product } from '../../sanity.types';
import ProductGrid from './productgrid';
interface ProductsViewProp {
    products : Product[]
}


const ProductView = ({ products }: ProductsViewProp ) => {
return <>
<div className='flex-1'>
<div>

    <ProductGrid products= {products} />

    <hr className='w-1/2 sm:w-1/3'/>
</div>
</div>

</>
};
export default ProductView;