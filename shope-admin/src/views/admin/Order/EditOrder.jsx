// reactstrap components
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Card, CardHeader, CardBody, Container, Row, FormGroup, Form, Col, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

//services
import * as categoryService from '~/services/categoryService';
import * as fileService from '~/services/fileService';
import ModalPopup from '~/components/ModalPopup';
import { MenuItem } from 'react-pro-sidebar';

function EditOrder() {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const inputFile = useRef();
    const [cateObj, setCateObj] = useState({
        id: 0,
        name: '',
        logo: '',
        path: '',
        status: 1,
        statusName: '',
    });

    const isNullObj = Object.values(cateObj).some((value) => value === null || value === undefined || value === '');

    const inputPictureOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setCateObj({ ...cateObj, path: URL.createObjectURL(file) });
        }
    };

    const updateCate = async (cateObj) => {
        setLoading(true);
        const reqCate = await categoryService.update(cateObj);
        setLoading(false);
        if (reqCate.status === 200) {
            toast.success('Save Successfully!');
        } else {
            toast.error(reqCate.errors.message);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = inputFile && inputFile.current.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const resUploadFile = await fileService.upload(formData);
            setLoading(false);

            if (resUploadFile.status === 201) {
                cateObj.logo = resUploadFile.data.id;
                updateCate(cateObj);
            } else {
                toast.error(resUploadFile.errors.message);
            }
        } else {
            if (!isNullObj) {
                updateCate(cateObj);
            }
        }
    };

    const handleInActive = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await categoryService.remove(id);
        setLoading(false);
        if (res.status === 200) {
            toast.success('Save Successfully!');
            getCateById();
        } else {
            toast.error(res.errors.message);
        }
    };

    // fetch API
    const getCateById = async () => {
        setLoading(true);
        const res = await categoryService.getCategoryById(id);
        setLoading(false);
        if (res.status === 200) {
            let { id, name, logo, status } = res.data;
            setCateObj({ id, name, logo: logo.id, path: logo.path, status: status.id, statusName: status.name });
        } else {
            toast.error(res.errors.message);
        }
    };
    useEffect(() => {
        if (+id) {
            getCateById();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Edit Category</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form>
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
                                                        {cateObj.statusName === 'Active' ? 'InActive' : 'Active'}
                                                    </span>
                                                </Button>
                                                <Link
                                                    to="/admin/categories"
                                                    className=" btn btn-icon btn-info"
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

export default EditOrder;
