// reactstrap components
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';

// client components
import { BannerType } from '~/common/bannerTypeEnum';

//services
import * as bannerService from '~/services/bannerService';
import * as fileService from '~/services/fileService';
import ModalPopup from '~/components/ModalPopup';

function CreateBanner() {
    const [loading, setLoading] = useState(false);
    const inputFile = useRef();
    const [bannerObj, setBannerObj] = useState({
        id: 0,
        title: '',
        link: '',
        photo: '',
        path: '',
        type: BannerType.Slider,
        status: 1,
    });
    const keyBanners = Object.keys(BannerType);
    keyBanners.shift();

    const inputPictureOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setBannerObj({ ...bannerObj, path: URL.createObjectURL(file) });
        }
    };

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

                const reqBanner = await bannerService.create(bannerObj);
                setLoading(false);
                if (reqBanner.status === 200) {
                    toast.success('Save Successfully!');
                } else {
                    toast.error(reqBanner.errors.message);
                }
            } else {
                alert(resUploadFile);
            }
        }
    };

    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Create Banner</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Title</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Ex: Banner"
                                                type="text"
                                                name="title"
                                                defaultValue={bannerObj.title}
                                                onChange={(e) => setBannerObj({ ...bannerObj, title: e.target.value })}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <label className="form-control-label">Target url</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Ex: https://demos.creative-tim.com"
                                                type="text"
                                                name="link"
                                                defaultValue={bannerObj.link}
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
                                        <FormGroup>
                                            <div className="d-flex">
                                                <Button
                                                    className="btn btn-icon btn-success"
                                                    type="submit"
                                                    style={{ minWidth: '100px' }}
                                                >
                                                    <span className="btn-inner--text">Save</span>
                                                </Button>
                                                <Link
                                                    to="/admin/banners"
                                                    className=" btn btn-icon btn-danger"
                                                    type="button"
                                                    style={{ minWidth: '100px' }}
                                                >
                                                    <span className="btn-inner--text">Cancel</span>
                                                </Link>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
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
                                            {bannerObj.path ? (
                                                <img
                                                    src={bannerObj.path}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    onClick={() => inputFile.current.click()}
                                                    style={{
                                                        height: '415px',
                                                        width: '100%',
                                                        cursor: 'pointer',
                                                    }}
                                                ></img>
                                            ) : (
                                                <div
                                                    className="rounded shadow"
                                                    style={{
                                                        backgroundRepeat: 'no-repeat',
                                                        paddingTop: '50%',
                                                        backgroundSize: 'contain',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => inputFile.current.click()}
                                                ></div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
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

export default CreateBanner;
