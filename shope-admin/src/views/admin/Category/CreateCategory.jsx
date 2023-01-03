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
import * as categoryService from '~/services/categoryService';
import * as fileService from '~/services/fileService';
import ModalPopup from '~/components/ModalPopup';

function CreateCategory() {
    const [loading, setLoading] = useState(false);
    const inputFile = useRef();
    const [cateObj, setCateObj] = useState({
        id: 0,
        name: '',
        logo: '',
        path: '',
        file: null,
        status: 1,
    });

    const inputPictureOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setCateObj({ ...cateObj, path: URL.createObjectURL(file), file });
        }
    };

    const createCate = async (cateObj) => {
        setLoading(true);
        const reqCate = await categoryService.create(cateObj);
        setLoading(false);
        if (reqCate.status === 201) {
            toast.success('Save Successfully!');
        } else {
            toast.error(reqCate.errors.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cateObj.file && cateObj.name) {
            var formData = new FormData();
            formData.append('file', cateObj.file);

            setLoading(true);
            const resUploadFile = await fileService.upload(formData);
            setLoading(false);
            if (resUploadFile.status === 201) {
                cateObj.logo = resUploadFile.data.id;
                createCate(cateObj);
            } else {
                toast.error(resUploadFile.errors.message);
            }
        }
    };

    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Create Category</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Name</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Ex: Category"
                                                type="text"
                                                name="name"
                                                defaultValue={cateObj.name}
                                                onChange={(e) => setCateObj({ ...cateObj, name: e.target.value })}
                                            />
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
                                                    to="/admin/categories"
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
                                            {cateObj.path ? (
                                                <img
                                                    src={cateObj.path}
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

export default CreateCategory;
