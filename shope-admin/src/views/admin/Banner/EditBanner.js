// reactstrap components
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
    Input,
    Card,
    CardHeader,
    CardBody,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Container,
    Row,
    FormGroup,
    Form,
    Col,
    Button,
} from 'reactstrap';

import { BannerType } from '~/common/bannerTypeEnum';
import ModalPopup from '~/components/ModalPopup';
import * as bannerService from '~/services/bannerService';
import * as fileService from '~/services/fileService';

function EditBanner() {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const [bannerObj, setBannerObj] = useState({
        id: id,
        title: '',
        link: '',
        photo: '',
        path: '',
        type: BannerType.Slider,
        status: 1,
        statusName: '',
    });

    const keyBanners = Object.keys(BannerType);
    keyBanners.shift();

    const inputFile = useRef();

    const isNullObj = Object.values(bannerObj).some((value) => value === null || value === undefined || value === '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = inputFile && inputFile.current.files[0];

        if (file) {
            var formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const resUploadFile = await fileService.upload(formData);
            if (resUploadFile.status === 201) {
                bannerObj.photo = resUploadFile.data.id;
                updateBanner(bannerObj);
            } else {
                alert(resUploadFile);
            }
        } else {
            if (!isNullObj) {
                updateBanner(bannerObj);
            }
        }
    };

    const handleInActive = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await bannerService.remove(id);
        setLoading(false);
        if (res.status === 200) {
            getBannerById();
            toast.success('Save Successfully!');
        } else {
            toast.error(res.errors.message);
        }
    };

    const updateBanner = async (bannerObj) => {
        setLoading(true);
        const reqBanner = await bannerService.update(bannerObj);
        setLoading(false);
        if (reqBanner.status === 200) {
            toast.success('Save Successfully!');
        } else {
            toast.error(reqBanner.errors.message);
        }
        setLoading(false);
    };

    const inputPictureOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setBannerObj({ ...bannerObj, path: URL.createObjectURL(file) });
        }
    };

    const handleUpload = () => {
        inputFile.current.click();
    };
    // fetch API
    const getBannerById = async () => {
        setLoading(true);
        const res = await bannerService.getBannerById(id);
        if (res.status === 200) {
            let { id, link, title, type, photo, status } = res.data;
            setBannerObj({
                id,
                link,
                title,
                photo: photo.id,
                path: photo.path,
                type,
                status: status.id,
                statusName: status.name,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (+id) {
            getBannerById();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Edit Banner</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <label className="form-control-label">Title</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Banner 1"
                                                type="text"
                                                name="title"
                                                value={bannerObj.title}
                                                onChange={(e) => setBannerObj({ ...bannerObj, title: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="form-control-label">Target url</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="https://demos.creative-tim.com"
                                                type="text"
                                                name="link"
                                                value={bannerObj.link}
                                                onChange={(e) => setBannerObj({ ...bannerObj, link: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <UncontrolledDropdown className="">
                                                <DropdownToggle caret color="primary" className="mr-3">
                                                    {keyBanners[bannerObj.type - 1]}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {keyBanners.map((item, index) => (
                                                        <DropdownItem
                                                            key={index}
                                                            onClick={() =>
                                                                setBannerObj({ ...bannerObj, type: BannerType[item] })
                                                            }
                                                        >
                                                            {item}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </FormGroup>
                                    </Col>
                                    <Col className="">
                                        <input
                                            ref={inputFile}
                                            onChange={inputPictureOnchange}
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            name="picture"
                                            hidden
                                        />
                                        <FormGroup>
                                            <label className="form-control-label">Picture</label>
                                            <img
                                                alt="..."
                                                className="rounded shadow"
                                                width="100%"
                                                height="400px"
                                                src={bannerObj.path}
                                                onClick={handleUpload}
                                                style={{ cursor: 'pointer' }}
                                            ></img>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="d-flex">
                                    <Button
                                        className="btn btn-icon btn-success"
                                        type="submit"
                                        style={{ minWidth: '100px' }}
                                        onClick={handleSubmit}
                                    >
                                        <span className="btn-inner--text">Save</span>
                                    </Button>
                                    <Button
                                        className="btn btn-icon btn-danger"
                                        style={{ minWidth: '100px' }}
                                        onClick={handleInActive}
                                    >
                                        <span className="btn-inner--text">
                                            {bannerObj.statusName === 'Active' ? 'InActive' : 'Active'}
                                        </span>
                                    </Button>
                                    <Link
                                        to="/admin/banners"
                                        className=" btn btn-icon btn-info"
                                        type="button"
                                        style={{ minWidth: '100px' }}
                                    >
                                        <span className="btn-inner--text">Cancel</span>
                                    </Link>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Row>
            <ToastContainer />
            <ModalPopup hidden={!loading} />
        </Container>
    );
}

export default EditBanner;
