// reactstrap components
import {
    Button,
    Input,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
} from 'reactstrap';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import ModalPopup from '~/components/ModalPopup';

import * as orderService from '~/services/orderService';
import { formatMoney } from '~/utils/FunctionGlobal';
import { CANCEL, DELIVERING, PENDING, SUCCESSFUL } from '~/common/Constant';

const Order = () => {
    const limit = 5;

    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [keySearch, setKeySearch] = useState('');

    // params
    let params = {
        page: currentPage,
        limit,
        // fields: 'id,name',
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            setKeySearch(e.target.value);
        }
    };

    const getOrders = async () => {
        const body = keySearch ? { name: keySearch } : {};

        setLoading(true);
        const res = await orderService.getAll(body, params);
        setLoading(false);
        if (res.status === 200) {
            setCurrentPage(params.page);
            setTotalPage(res.data.totalPages);
            setOrders(res.data.data);
        } else {
            toast.error(res.errors.message);
        }
    };

    const renderPaging = (totalPage) => {
        const listPaging = [];
        for (let i = 1; i <= totalPage; i++) {
            listPaging.push(
                <PaginationItem key={i} className={currentPage === i ? 'active' : ''}>
                    <PaginationLink
                        onClick={(e) => {
                            params.page = +e.target.innerText;
                            getOrders();
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        return listPaging;
    };

    const handleInActive = async (e, id, status) => {
        e.preventDefault();
        const body = {
            orderId: id,
            status,
            note: 'admin',
        };
        setLoading(true);
        const res = await orderService.changeStatus(body);
        setLoading(false);
        if (res.status === 200 || res.status === 201) {
            // toast.success('Delete Successfully!');
            getOrders();
        } else {
            toast.error(res.errors.message);
        }
    };

    const getBgColorByStatusOrder = (statusOrderCode) => {
        switch (statusOrderCode) {
            case CANCEL:
                return 'bg-danger';
            case DELIVERING:
                return 'bg-warning';
            default:
                return 'bg-success';
        }
    };

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, keySearch]);
    console.log(orders);

    return (
        <>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            {/* <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Orders</h3>
                                <div className="d-flex justify-content-between w-50">
                                    <Input
                                        className="mr-3"
                                        placeholder="Search"
                                        type="text"
                                        onKeyDown={handleEnterSearch}
                                    />
                                    <Link
                                        to="/admin/category/create"
                                        className=" btn btn-icon btn-success d-flex"
                                        type="button"
                                    >
                                        <span className="btn-inner--icon">
                                            <i className="fas fa-plus"></i>
                                        </span>
                                        <span className="btn-inner--text">Add</span>
                                    </Link>
                                </div>
                            </CardHeader> */}

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light text-center">
                                    <tr>
                                        <th scope="col">no.</th>
                                        <th scope="col">createdAt</th>
                                        <th scope="col">updatedAt</th>
                                        <th scope="col">totalAmount</th>
                                        <th scope="col">method</th>
                                        <th scope="col">status</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {orders.map((item, index) => (
                                        <tr key={index} data-id={item.id} className="h-auto">
                                            <td>{limit * (currentPage - 1) + index + 1}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.updatedAt}</td>
                                            <td>{formatMoney(item.totalAmount)}</td>
                                            <td>{item.paymentMethod}</td>
                                            <td>
                                                <Badge color="while" className={getBgColorByStatusOrder(item.status)}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="text-right">
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        href="#pablo"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem
                                                            onClick={(e) => handleInActive(e, item.id, DELIVERING)}
                                                        >
                                                            Approve
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => handleInActive(e, item.id, CANCEL)}
                                                        >
                                                            Cancel
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => handleInActive(e, item.id, SUCCESSFUL)}
                                                        >
                                                            Success
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className={currentPage === 1 ? 'disabled' : ''}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage((prevSate) => prevSate - 1)}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        {/* render paging */}
                                        {renderPaging(totalPage)}

                                        <PaginationItem className={currentPage === totalPage ? 'disabled' : ''}>
                                            <PaginationLink onClick={() => setCurrentPage((prevSate) => prevSate + 1)}>
                                                <i className="fas fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>
            <ToastContainer />
            <ModalPopup hidden={!loading} />
        </>
    );
};

export default Order;
