import { useState, useEffect, useMemo, type JSX } from "react"
import { Avatar, Button, Modal, notification, Pagination, Space, Table, Typography, } from 'antd'
import type { ColumnsType, TablePaginationConfig } from "antd/es/table"
import type { FilterValue } from "antd/es/table/interface"
import { AxiosError } from "axios"

import AddProduct from "../AddProduct/AddProduct"
import AppIcon from "../AppIcon/AppIcon"
import Refresh from "../../assets/refresh.svg"
import { getProducts } from "../../services/apiRequests"
import { useAppSelector } from "../../store/hooks"
import { selectSearchTerm } from "../../store/productsSlice"
import { DEFAULT_LIMIT } from "../../consts"
import { TableField } from "./ProductsTable.types"
import type { IProduct, SortDirection } from "../../types"

import './ProductsTable.css'

const ProductTable = () => {
    const searchTerm = useAppSelector(selectSearchTerm)

    const [products, setProducts] = useState<IProduct[]>([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentSortField, setCurrentSortField] = useState<TableField | undefined>(undefined)
    const [currentSortOrder, setCurrentSortOrder] = useState<SortDirection | undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [api, contextHolder] = notification.useNotification();

    const tableData = useMemo(() => products.map(p => ({ ...p, key: p.id })), [products])

    useEffect(() => {
        setCurrentPage(1)
        setCurrentSortField(undefined)
        setCurrentSortOrder(undefined)

        fetchProducts(currentPage, searchTerm, currentSortField, currentSortOrder)
    }, [searchTerm])

    const openNotification = () => {
        api.error({
            title: "Не удалось загрузить товары",
        });
    }

    const handleAddButtonClick = () => {
        setIsModalOpen(true)
    }

    const handleRefreshButtonClick = () => {
        fetchProducts(currentPage, searchTerm, currentSortField, currentSortOrder)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const onTableChange = (_pagination: TablePaginationConfig, _filters: Record<string, FilterValue | null>, sorter: Record<string, any>) => {
        if (sorter.field !== currentSortField || sorter.order !== currentSortOrder) {
            fetchProducts(currentPage, searchTerm, sorter.field, sorter.order)
            setCurrentSortField(sorter.field)
            setCurrentSortOrder(sorter.order)
        }
    }

    const onPaginationChange = (page: number) => {
        fetchProducts(page, searchTerm, currentSortField, currentSortOrder)
        setCurrentPage(page)
    }

    const fetchProducts = async (page: number, searchString: string, sortField: TableField | undefined, sortOrder: SortDirection | undefined) => {
        setLoading(true)

        const result = await getProducts(page, searchString, sortField, sortOrder)

        setLoading(false)

        if (result instanceof AxiosError) {
            openNotification()
        } else {
            setProducts(result.products)
            setTotal(result.total)
        }
    }

    const columns: ColumnsType = useMemo(() => [
        {
            title: 'Наименование',
            key: TableField.TITLE,
            dataIndex: TableField.TITLE,
            render: (_, record) => {
                return <Space>
                    <Avatar src={record.thumbnail} />
                    <div>
                        <Typography.Title level={5}>{record.title}</Typography.Title>
                        <Typography.Text type="secondary">{record.category}</Typography.Text>
                    </div>
                </Space>
            }
        },
        {
            title: 'Вендор',
            key: TableField.BRAND,
            dataIndex: TableField.BRAND,
            render: (value) => <Typography.Text strong>{value}</Typography.Text>,
        },
        {
            title: 'Артикул',
            key: TableField.SKU,
            dataIndex: TableField.SKU
        },
        {
            title: 'Оценка',
            key: TableField.RATING,
            dataIndex: TableField.RATING,
            sorter: true,
            sortOrder: currentSortField === TableField.RATING ? currentSortOrder : null,
            render: (value) => <Typography.Text><Typography.Text className={value < 3 ? "bad-rating" : ""}>{value}</Typography.Text>/5</Typography.Text>
        },
        {
            title: 'Цена',
            key: TableField.PRICE,
            dataIndex: TableField.PRICE,
            sorter: true,
            sortOrder: currentSortField === TableField.PRICE ? currentSortOrder : null,
            render: (value: number) => {
                const splittedPrice = String(value).split(/\.|,/)

                return <><Typography.Text>{splittedPrice[0]}</Typography.Text><Typography.Text type="secondary">,{splittedPrice[1] || "00"}</Typography.Text></>
            }
        },
        {
            title: '',
            dataIndex: '',
            render: () => {
                return <Space>
                    <Button type="primary" className="productsTable_action1">+</Button>
                    <Button type="dashed" className="productsTable_action2">...</Button>
                </Space>
            }
        }
    ], [products]);

    const renderTotalString = (): JSX.Element => {
        const startItem = total === 0 ? 0 : (currentPage * DEFAULT_LIMIT) - DEFAULT_LIMIT + 1
        const lastItem = currentPage * DEFAULT_LIMIT > total ? total : currentPage * DEFAULT_LIMIT

        return <>
            <Typography.Text type="secondary">Показано </Typography.Text>
            <Typography.Text>{startItem}-{lastItem}</Typography.Text>
            <Typography.Text type="secondary"> из </Typography.Text>
            <Typography.Text>{total}</Typography.Text>
        </>
    }

    return (
        <div className='productTable'>
            <div className='productTable_top'>
                <Typography.Title level={4}>Все позиции</Typography.Title>
                <div className='productTable_top-actions'>
                    <Button type="dashed" onClick={handleRefreshButtonClick} icon={<AppIcon width={22} height={22} icon={Refresh} />} />
                    <Button type="primary" onClick={handleAddButtonClick}>Добавить</Button>
                </div>
            </div>

            <div className="productTable_table-container">
                <Table
                    size="small"
                    dataSource={tableData}
                    columns={columns}
                    loading={loading}
                    rowSelection={{}}
                    pagination={false}
                    onChange={onTableChange}
                />
            </div>
            <div className="productTable_pagination-container">
                <div>{renderTotalString()}</div>
                <Pagination current={currentPage} total={total} pageSize={DEFAULT_LIMIT} showSizeChanger={false} onChange={onPaginationChange} />
            </div>

            <Modal
                title="Добавить товар"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                <AddProduct onClose={closeModal} />
            </Modal>
            {contextHolder}
        </div>
    )
}

export default ProductTable
