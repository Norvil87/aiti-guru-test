import { Input, Typography } from 'antd'
import Search from "../../assets/search.png"
import './ProductSearch.css'
import AppIcon from '../AppIcon/AppIcon'

const ProductSearch = () => {
  return (
    <div className='productSearch'>
      <Typography.Title level={3}>Товары</Typography.Title>
      <Input className='productSearch_input' allowClear placeholder='Найти' prefix={<AppIcon width={24} height={24} icon={Search} />} />
      <div className='icons-missing' />
    </div>
  )
}

export default ProductSearch
