import { useState } from "react"
import { Button, Input, Modal, Typography } from 'antd'
import Refresh from "../../assets/refresh.svg"

import './ProductsTable.css'
import AddProduct from "../AddProduct/AddProduct"
import AppIcon from "../AppIcon/AppIcon"

const ProductTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAddButtonClick = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='productTable'>
            <div className='productTable_top'>
                <Typography.Title level={4}>Все позиции</Typography.Title>
                <div className='productTable_top-actions'>
                    <Button type="dashed" icon={<AppIcon width={22} height={22} icon={Refresh} />}></Button>
                    <Button type="primary" onClick={handleAddButtonClick}>Добавить</Button>
                </div>
            </div>

            <Modal
                title="Добавить товар"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                footer={null}
                onOk={closeModal}
                onCancel={closeModal}
            >
                <AddProduct onClose={closeModal} />
            </Modal>
        </div>
    )
}

export default ProductTable
