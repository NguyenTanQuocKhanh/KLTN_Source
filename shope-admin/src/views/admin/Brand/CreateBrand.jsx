// reactstrap components
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Card, CardHeader, CardBody, Container, Row, FormGroup, Form, Col, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

// client components
import { BannerType } from '~/common/bannerTypeEnum';
import ModalPopup from '~/components/ModalPopup';
import { RichText } from '~/components/RichText';

//services
import * as brandService from '~/services/brandService';
import * as categoryService from '~/services/categoryService';
import * as fileService from '~/services/fileService';
import { MultiSelectDropdown } from '~/components/MultiSelectDropdown';

function CreateBrand() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brandObj, setBrandObj] = useState({
        name: '',
        logo: '',
        pathLogo: '',
        image: '',
        pathImage: '',
        categories: [],
        description: '',
        status: 1,
    });
    const inputFileLogo = useRef();
    const inputFileImage = useRef();

    const keyBanners = Object.keys(BannerType);
    keyBanners.shift();

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

        if (fileLogo && fileImage && brandObj.name) {
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
                    console.log(brandObj);
                    const reqBanner = await brandService.create(brandObj);
                    setLoading(false);
                    if (reqBanner.status === 201) {
                        toast.success('Save Successfully!');
                    } else {
                        toast.error(reqBanner.errors.message);
                    }
                })
                .catch((error) => toast.error(error));
        }
    };

    useEffect(() => {
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
    }, []);

    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Create Brand</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Name</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Ex: Brand"
                                                type="text"
                                                name="name"
                                                onChange={(e) => setBrandObj({ ...brandObj, name: e.target.value })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup>
                                            <label className="form-control-label">Categories</label>
                                            <div>
                                                <MultiSelectDropdown
                                                    onRemove={handleOnRemove}
                                                    onSelect={handleOnSelect}
                                                    options={categories}
                                                    placeholder="Search category ..."
                                                    emptyRecordMsg="Empty category"
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
                                            <RichText onChange={handleOnChangeContext} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
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
                                                    to="/admin/brands"
                                                    className=" btn btn-icon btn-danger"
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

export default CreateBrand;
