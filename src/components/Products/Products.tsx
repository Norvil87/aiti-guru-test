import ProductSearch from '../ProductSearch/ProductSearch'
import ProductTable from '../ProductsTable/ProductsTable'
import './Products.css'

const Products = () => {
  return (
    <div className='products'>
      <ProductSearch />
      <ProductTable />
    </div>
  )
}

export default Products
