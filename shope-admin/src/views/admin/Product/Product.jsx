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
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';

//custom component
import ModalPopup from '~/components/ModalPopup';

//services
import * as productService from '~/services/productService';

function Product() {
    const limit = 5;

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const [params, setParams] = useState({
        page: 1,
        limit,
        fields: 'id,name,likedCount,stock,priceBeforeDiscount,discount,sold,status',
    });
    const inputSearch = useRef(null);

    // let params = {
    //     page: 1,
    //     limit,
    //     fields: 'id,name,likedCount,stock,price,sold',
    // }

    const renderPaging = (totalPage) => {
        const listPaging = [];
        for (let i = 1; i <= totalPage; i++) {
            listPaging.push(
                <PaginationItem key={i} className={params.page === i ? 'active' : ''}>
                    <PaginationLink
                        onClick={(e) => {
                            setParams((prevSate) => ({ ...params, page: +e.target.innerText }));
                            // params.page = +e.target.innerText;
                            // getProductsApi();
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        return listPaging;
    };

    const handleInActive = async (id) => {
        setLoading(true);
        const res = await productService.remove(id);
        setLoading(false);
        if (res.status === 200) {
            toast.success('Save Successfully!');
            getProductsApi();
        } else {
            toast.error(res.errors.message);
        }

    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            setKeySearch(inputSearch.current.value);
        }
    };

    //fetch API
    const getProductsApi = async () => {
        setLoading(true);
        const res = await productService.getAll({}, params);
        setLoading(false);
        if (res.status === 200) {
            // setCurrentPage(params.page);
            // setParams(prevPagrams => ({ ...params, page:}))
            setTotalPage(res.data.totalPages);
            setProducts(res.data.data);
        } else {
            toast.error(res.errors.message);
        }
    };

    const searching = async () => {
        const body = { keyword: keySearch };
        setLoading(true);
        const res = await productService.searChing(body, params);
        setLoading(false);
        if (res.status === 200) {
            setTotalPage(res.data.totalPages);
            setProducts(res.data.data);
        } else {
            toast.error(res.errors.message);
        }
    };

    useEffect(() => {
        if (keySearch) {
            searching();
        } else {
            getProductsApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keySearch, params]);

    return (
        <>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Products</h3>
                                <div className="d-flex justify-content-between w-50">
                                    {/* Dropdown */}
                                    {/* <UncontrolledDropdown>
                                        <DropdownToggle caret color="primary" className="mr-3">
                                            {keyBanner[typeBanner]}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {keyBanner.map((item, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={() => setTypeBanner(+BannerType[item])}
                                                >
                                                    {item}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </UncontrolledDropdown> */}

                                    <Input
                                        innerRef={inputSearch}
                                        className="mr-3"
                                        placeholder="Search"
                                        type="text"
                                        onKeyDown={handleEnterSearch}
                                    />
                                    <Link
                                        to="/admin/product/create"
                                        className=" btn btn-icon btn-success d-flex"
                                        type="button"
                                    >
                                        <span className="btn-inner--icon">
                                            <i className="fas fa-plus"></i>
                                        </span>
                                        <span className="btn-inner--text">Add</span>
                                    </Link>
                                </div>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light text-center">
                                    <tr>
                                        <th scope="col" style={{ width: '%' }}>
                                            no.
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            name
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            price
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            discount
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            likedCount
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            stock
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            sold
                                        </th>
                                        <th scope="col" style={{ width: '%' }}>
                                            status
                                        </th>
                                        <th scope="col" style={{ width: '%' }} />
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {products.map((item, index) => (
                                        <tr key={index} data-id={item.id} className="h-auto">
                                            <td>{limit * (params.page - 1) + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.priceBeforeDiscount}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.likedCount}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.sold}</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    {item.status.name === 'Active' ? (
                                                        <i className="bg-success" />
                                                    ) : (
                                                        <i className="bg-warning" />
                                                    )}
                                                    {item.status.name}
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
                                                        <Link to={`/admin/product/edit/${item.id}`}>
                                                            <DropdownItem>Edit</DropdownItem>
                                                        </Link>

                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleInActive(item.id);
                                                            }}
                                                        >
                                                            {item.status.name === 'Active' ? 'InActive' : 'Active'}
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
                                        <PaginationItem className={params.page === 1 ? 'disabled' : ''}>
                                            <PaginationLink
                                                onClick={() =>
                                                    setParams((prevSate) => ({ ...params, page: prevSate.page - 1 }))
                                                }
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>

                                        {/* render paging */}
                                        {renderPaging(totalPage)}

                                        <PaginationItem className={params.page === totalPage ? 'disabled' : ''}>
                                            <PaginationLink
                                                onClick={() =>
                                                    setParams((prevSate) => ({ ...params, page: prevSate.page + 1 }))
                                                }
                                            >
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
}

export default Product;
