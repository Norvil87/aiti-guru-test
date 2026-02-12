import { Button, Form, Input, notification } from 'antd'

import type { IAddProductProps } from "./AddProduct.types"

const AddProduct = (props: IAddProductProps) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.success({
            title: "Товар создан",
        });
    }

    const onFormSubmit = () => {
        openNotification()
        props.onClose()
    }

    return (
        <div className='addProduct'>
            {contextHolder}
            <Form
                name="addProduct"
                layout='vertical'
                onFinish={onFormSubmit}
            >
                <Form.Item
                    label="Наименование"
                    name="name"
                    rules={[{ required: true, message: 'Введите название товара!' }]}
                >
                    <Input allowClear placeholder='Введите название товара' />
                </Form.Item>

                <Form.Item
                    label="Цена"
                    name="price"
                    rules={[{ required: true, message: 'Введите цену!' }]}
                >
                    <Input allowClear type="number" placeholder='Введите цену' />
                </Form.Item>

                <Form.Item
                    label="Производитель"
                    name="vendor"
                    rules={[{ required: true, message: 'Введите производителя!' }]}
                >
                    <Input allowClear placeholder='Введите производителя' />
                </Form.Item>

                <Form.Item
                    label="Артикул"
                    name="code"
                    rules={[{ required: true, message: 'Введите артикул!' }]}
                >
                    <Input allowClear placeholder='Введите артикул' />
                </Form.Item>

                <Form.Item className='align-center' label={null}>
                    <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProduct
