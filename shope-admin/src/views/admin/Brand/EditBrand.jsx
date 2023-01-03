// reactstrap components
import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Card, CardHeader, CardBody, Container, Row, FormGroup, Form, Col, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
// import Multiselect from 'multiselect-react-dropdown';

// client components
import ModalPopup from '~/components/ModalPopup';
import { RichText } from '~/components/RichText';
import { MultiSelectDropdown } from '~/components/MultiSelectDropdown';

//services
import * as brandService from '~/services/brandService';
import * as categoryService from '~/services/categoryService';
import * as fileService from '~/services/fileService';

function EditBrand() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brandObj, setBrandObj] = useState({
        id: id,
        name: '',
        logo: '',
        pathLogo: '',
        image: '',
        pathImage: '',
        categories: [],
        categoriesDisplay: [],
        description: '',
        status: 1,
        statusName: '',
    });
    const inputFileLogo = useRef();
    const inputFileImage = useRef();

    const inputLogoOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setBrandObj({ ...brandObj, pathLogo: URL.createObjectURL(file) });
        }
    };

    const inputImageOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setBrandObj({ ...brandObj, pathImage: URL.createObjectURL(file) });
        }
    };

    const handleOnSelect = (selectedList, currentSelect) => {
        setBrandObj({ ...brandObj, categories: [...brandObj.categories, currentSelect.id] });
    };

    const handleOnRemove = (selectedList, currentSelect) => {
        setBrandObj({ ...brandObj, categories: brandObj.categories.filter((e) => e !== currentSelect.id) });
    };

    const handleOnChangeContext = (editor) => {
        setBrandObj((prevObj) => ({
            ...prevObj,
            description: editor.current.getCharCount() ? editor.current.getContents() : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileLogo = inputFileLogo && inputFileLogo.current.files[0];
        const fileImage = inputFileImage && inputFileImage.current.files[0];

        if (fileLogo && fileImage) {
            var formDataLogo = new FormData();
            formDataLogo.append('file', fileLogo);

            var formDataImage = new FormData();
            formDataImage.append('file', fileImage);

            const resUploadFileLogo = fileService.upload(formDataLogo);
            const resUploadFileImage = fileService.upload(formDataImage);
            setLoading(true);
            Promise.all([resUploadFileLogo, resUploadFileImage])
                .then(async (values) => {
                    brandObj.logo = values[0].data.id;
                    brandObj.image = values[1].data.id;

                    const reqBanner = await brandService.update(brandObj);
                    setLoading(false);
                    if (reqBanner.status === 200) {
                        toast.success('Save Successfully!');
                    } else {
                        toast.error(reqBanner.errors.message, {});
                    }
                })
                .catch((error) => toast.error(error));
        } else {
            if (brandObj.name) {
                setLoading(true);
                const reqBanner = await brandService.update(brandObj);
                setLoading(false);
                if (reqBanner.status === 200) {
                    toast.success('Save Successfully!');
                } else {
                    toast.error(reqBanner.errors.message);
                }
            }
        }
    };

    const handleInActive = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await brandService.remove(id);
        setLoading(false);
        if (res.status === 200) {
            toast.success('Save Successfully!');
            getBannerById();
        } else {
            toast.error(res.errors.message);
        }
    };

    const getBannerById = async () => {
        setLoading(true);
        const res = await brandService.getBannerById(id);
        setLoading(false);
        if (res.status === 200) {
            let { id, name, description, image, logo, categories, status } = res.data;
            const arrCate = categories.reduce((accumulator, currentValue) => [...accumulator, currentValue.id], []);

            setBrandObj((prevObj) => ({
                ...brandObj,
                id,
                name,
                logo: logo.id,
                pathLogo: logo.path,
                image: image.id,
                pathImage: image.path,
                categories: arrCate,
                categoriesDisplay: categories,
                description,
                status: status.id,
                statusName: status.name,
            }));
        }
    };
    useEffect(() => {
        // fetch API
        const getCategoriesApi = async () => {
            setLoading(true);
            const res = await categoryService.getAll({}, { fields: 'id,name' });
            setLoading(false);
            if (res.status === 200) {
                setCategories(res.data.data);
            } else {
                toast.error(res.errors.message);
            }
        };

        getCategoriesApi();
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
                            <h3 className="mb-0">Edit Brand</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form>
                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Name</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Ex: Brand"
                                                type="text"
                                                name="name"
                                                defaultValue={brandObj.name}
                                                onChange={(e) => setBrandObj({ ...brandObj, name: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Categories</label>
                                            <div>
                                                <MultiSelectDropdown
                                                    placeholder="Search category ..."
                                                    emptyRecordMsg="Empty category"
                                                    onRemove={handleOnRemove}
                                                    onSelect={handleOnSelect}
                                                    options={categories}
                                                    selectedValues={brandObj.categoriesDisplay}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ flex: 1, flexShrink: 0 }}>
                                        <input
                                            ref={inputFileLogo}
                                            onChange={inputLogoOnchange}
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            name="picture"
                                            hidden
                                        />
                                        <FormGroup>
                                            <label className="form-control-label">Logo</label>
                                            {brandObj.pathLogo ? (
                                                <img
                                                    src={brandObj.pathLogo}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    onClick={() => inputFileLogo.current.click()}
                                                    style={{
                                                        height: '350px',
                                                        width: '100%',
                                                        cursor: 'pointer',
                                                    }}
                                                ></img>
                                            ) : (
                                                <div
                                                    className="rounded shadow"
                                                    style={{
                                                        backgroundRepeat: 'no-repeat',
                                                        paddingTop: '80%',
                                                        backgroundSize: 'contain',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => inputFileLogo.current.click()}
                                                ></div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <input
                                            ref={inputFileImage}
                                            onChange={inputImageOnchange}
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            name="picture"
                                            hidden
                                        />
                                        <FormGroup>
                                            <label className="form-control-label">Image</label>
                                            {brandObj.pathImage ? (
                                                <img
                                                    src={brandObj.pathImage}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    onClick={() => inputFileImage.current.click()}
                                                    style={{
                                                        height: '350px',
                                                        width: '100%',
                                                        cursor: 'pointer',
                                                    }}
                                                ></img>
                                            ) : (
                                                <div
                                                    className="rounded shadow"
                                                    style={{
                                                        backgroundRepeat: 'no-repeat',
                                                        paddingTop: '40%',
                                                        backgroundSize: 'contain',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => inputFileImage.current.click()}
                                                ></div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Descriptions</label>
                                            <RichText
                                                defaultContent={brandObj.description}
                                                onChange={handleOnChangeContext}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
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
                                                        {' '}
                                                        {brandObj.statusName === 'Active' ? 'InActive' : 'Active'}
                                                    </span>
                                                </Button>
                                                <Link
                                                    to="/admin/brands"
                                                    className=" btn btn-icon btn-info"
                                                    type="button"
                                                    style={{ minWidth: '100px' }}
                                                >
                                                    <span className="btn-inner--text">Cancel</span>
                                                </Link>
                                            </div>
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

export default EditBrand;
