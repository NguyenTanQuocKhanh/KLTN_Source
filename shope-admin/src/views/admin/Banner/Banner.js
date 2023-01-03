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

import * as bannerService from '~/services/bannerService';
import { BannerType } from '~/common/bannerTypeEnum';
import ModalPopup from '~/components/ModalPopup';

const Banner = () => {
    const limit = 5;
    const keyBanner = Object.keys(BannerType);
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [typeBanner, setTypeBanner] = useState(BannerType.All);
    const [keySearch, setKeySearch] = useState('');

    // params
    let params = {
        page: currentPage,
        limit,
        fields: 'id,title,type',
    };

    const getBody = () => {
        switch (true) {
            case Boolean(typeBanner) && Boolean(keySearch):
                return {
                    type: typeBanner,
                    title: keySearch,
                };
            case !Boolean(typeBanner) && Boolean(keySearch):
                return {
                    title: keySearch,
                };
            case Boolean(typeBanner) && !Boolean(keySearch):
                return {
                    type: typeBanner,
                };
            default:
                return {};
        }
    };

    const getBannersApi = async () => {
        setLoading(true);
        const res = await bannerService.getAll(getBody(), params);
        setLoading(false);
        if (res.status === 200) {
            setCurrentPage(params.page);
            setTotalPage(res.data.totalPages);
            setBanners(res.data.data);
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
                            params.currentPage = +e.target.innerText;
                            getBannersApi();
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
        const res = await bannerService.remove(id);
        setLoading(false);
        if (res.status === 200) {
            toast.success('Save Successfully!');
            getBannersApi();
        } else {
            toast.error(res.errors.message);
        }
    };

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            setKeySearch(e.target.value);
        }
    };

    useEffect(() => {
        getBannersApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, typeBanner, keySearch]);
    return (
        <>
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                <h3 className="mb-0">Banners</h3>
                                <div className="d-flex justify-content-between w-50">
                                    {/* Dropdown */}
                                    <UncontrolledDropdown>
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
                                    </UncontrolledDropdown>

                                    <Input
                                        className="mr-3"
                                        placeholder="Search"
                                        type="text"
                                        onKeyDown={handleEnterSearch}
                                    />
                                    <Link
                                        to="/admin/banner/create"
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
                                            title
                                        </th>
                                        <th scope="col" style={{ width: '60%' }}>
                                            image
                                        </th>
                                        <th scope="col" style={{ width: '10%' }}>
                                            type
                                        </th>
                                        <th scope="col" style={{ width: '10%' }}>
                                            status
                                        </th>
                                        <th scope="col" style={{ width: '5%' }} />
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {banners.map((item, index) => (
                                        <tr key={index} data-id={item.id} className="h-auto">
                                            <td>{limit * (currentPage - 1) + index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>
                                                <img
                                                    src={item.photo.path}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    style={{
                                                        height: '400px',
                                                        width: '100%',
                                                    }}
                                                ></img>
                                            </td>
                                            <td>
                                                {item.type}
                                                {BannerType[item.type]}
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
                                                        <Link to={`/admin/banner/edit/${item.id}`}>
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

export default Banner;
