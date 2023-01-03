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
import * as brandService from '~/services/brandService';

const Brand = () => {
    const limit = 5;

    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [keySearch, setKeySearch] = useState('');

    // params
    let params = {
        page: currentPage,
        limit,
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            setKeySearch(e.target.value);
        }
    };

    const getBrandsApi = async () => {
        const body = keySearch ? { name: keySearch } : {};

        setLoading(true);
        const res = await brandService.getAllPaging(body, params);
        setLoading(false);
        if (res.status === 200) {
            setCurrentPage(params.page);
            setTotalPage(res.data.totalPages);
            setBrands(res.data.data);
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
                            getBrandsApi();
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        return listPaging;
    };

    const handleInActive = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        const res = await brandService.remove(id);
        if (res.status === 200) {
            toast.success('Save Successfully!');
            getBrandsApi();
        } else {
            toast.error(res.errors.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getBrandsApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, keySearch]);

    return (
        <>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Brands</h3>
                                <div className="d-flex justify-content-between w-50">
                                    <Input
                                        className="mr-3"
                                        placeholder="Search"
                                        type="text"
                                        onKeyDown={handleEnterSearch}
                                    />
                                    <Link
                                        to="/admin/brand/create"
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
                                        <th scope="col" style={{ width: '5%' }}>
                                            no.
                                        </th>
                                        <th scope="col" style={{ width: '10%' }}>
                                            name
                                        </th>
                                        <th scope="col" style={{ width: '5%' }}>
                                            total product
                                        </th>
                                        <th scope="col" style={{ width: '35%' }}>
                                            logo
                                        </th>
                                        <th scope="col" style={{ width: '35%' }}>
                                            image
                                        </th>
                                        <th scope="col" style={{ width: '5%' }}>
                                            status
                                        </th>
                                        <th scope="col" style={{ width: '5%' }} />
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {brands.map((item, index) => (
                                        <tr key={index} data-id={item.id} className="h-auto">
                                            <td>{limit * (currentPage - 1) + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.totalProduct}</td>
                                            <td>
                                                <img
                                                    src={item.logo.path}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    style={{
                                                        height: '200px',
                                                        width: '100%',
                                                    }}
                                                ></img>
                                            </td>
                                            <td>
                                                <img
                                                    src={item.image.path}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    style={{
                                                        height: '200px',
                                                        width: '100%',
                                                    }}
                                                ></img>
                                            </td>
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
                                                        <Link to={`/admin/brand/edit/${item.id}`}>
                                                            <DropdownItem>Edit</DropdownItem>
                                                        </Link>

                                                        <DropdownItem onClick={(e) => handleInActive(e, item.id)}>
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

export default Brand;
