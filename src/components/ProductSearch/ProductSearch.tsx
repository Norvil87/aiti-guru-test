import { useRef, useState, type ChangeEvent } from 'react'
import { Input, Typography } from 'antd'

import Search from "../../assets/search.png"
import AppIcon from '../AppIcon/AppIcon'
import { useAppDispatch } from '../../store/hooks'
import { setSearchTerm } from '../../store/productsSlice'
import { DEBOUNCE_DELAY } from '../../consts'

import './ProductSearch.css'

const ProductSearch = () => {
  const dispatch = useAppDispatch()

  const [searchString, setSearchString] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(setSearchTerm(evt.target.value));
    }, DEBOUNCE_DELAY);
  }

  return (
    <div className='productSearch'>
      <Typography.Title level={3}>Товары</Typography.Title>
      <Input
        className='productSearch_input'
        value={searchString}
        allowClear
        placeholder='Найти'
        prefix={<AppIcon width={24} height={24} icon={Search} />}
        onChange={handleInputChange} />
      <div className='icons-missing' />
    </div>
  )
}

export default ProductSearch
