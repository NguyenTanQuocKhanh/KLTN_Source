// reactstrap components
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Input,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    FormGroup,
    Form,
    Col,
    Button,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Textarea,
    Collapse,
    Alert,
    ButtonGroup,
} from 'reactstrap';
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import ReactDOM from 'react-dom/client';

// client components
import { BannerType } from '~/common/bannerTypeEnum';
import ModalPopup from '~/components/ModalPopup';
import { RichText } from '~/components/RichText';
import { MultiSelectDropdown } from '~/components/MultiSelectDropdown';
import ImageUploader from '~/components/ImageUploader';

//services
import * as brandService from '~/services/brandService';
import * as fileService from '~/services/fileService';
import * as productService from '~/services/productService';

function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productImagePath, setProductImagePath] = useState('');
    const [images, setImages] = useState([]);
    const [parentModels, setParentModels] = useState([]);
    const [parentKeyModels, serParentKeyModels] = useState([]);
    const [productObj, setProductObj] = useState({
        name: '',
        description: '',
        image: '',
        images: [],
        discount: 0,
        priceBeforeDiscount: 0,
        stock: 0,
        brand: 0,
        categories: 0,
        keywords: [],
        status: 1,
    });

    const inputProductImage = useRef();
    const inputProductName = useRef();
    const inputProductDiscount = useRef();
    const inputProductStock = useRef();
    const inputProductPrice = useRef();
    const inputProductKeyword = useRef();

    const parentId = 'tierModel';
    const tierModelChildContainerId = 'tierModel-child-container';
    const tierModelChildItemIdPattern = 'tierModel-child-item-';

    const parentId2 = 'tierModelChild';
    const tierModelChildContainerId2 = 'tierModelChild-child-container';
    const tierModelChildItemIdPattern2 = 'tierModelChild-child-item-';

    const inputProductImageOnchange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            // setBrandObj({ ...brandObj, pathImage: URL.createObjectURL(file) });
            setProductImagePath(URL.createObjectURL(file));
        }
    };

    const handleOnSelectBrand = (selectedList, currentSelect) => {
        setProductObj({ ...productObj, brand: currentSelect.id });
        getBrandById(currentSelect.id);
    };

    const handleOnRemoveBrand = (selectedList, currentSelect) => {
        setProductObj({ ...productObj, brand: 0, categories: 0 });
        setCategories([]);
    };

    const handleOnSelectCate = (selectedList, currentSelect) => {
        setProductObj({ ...productObj, categories: currentSelect.id });
    };

    const handleOnRemoveCate = (selectedList, currentSelect) => {
        setProductObj({ ...productObj, categories: 0 });
    };

    const handleOnChangeContext = (editor) => {
        setProductObj((prevObj) => ({
            ...prevObj,
            description: editor.current.getCharCount() ? editor.current.getContents() : '',
        }));
    };

    const getValuesModel = (parentId, containerId) => {
        const parentElContainer = document.getElementById(parentId);
        const parentEl = parentElContainer.querySelectorAll(`#${containerId}`);
        const tierModel = {
            tierModel: parentElContainer.querySelector('input[name=name-type-model]').value,
            models: [],
        };

        function filterParent(modeId) {
            const result = parentKeyModels.find((a) => a.id === modeId);
            return result ? result.name : null;
        }

        parentEl[0].childNodes.forEach((el) => {
            const model = {
                name: el.querySelector('input[name=name]') && el.querySelector('input[name=name]').value,
                priceBeforeDiscount:
                    el.querySelector('input[name=price]') && +el.querySelector('input[name=price]').value,
                stock: el.querySelector('input[name=stock]') && +el.querySelector('input[name=stock]').value,
                file: el.querySelector('input[name=image]') && el.querySelector('input[name=image]').files[0],
                parent: filterParent(el.id),
                image: '',
            };
            tierModel.models.push(model);
        });
        return tierModel;
    };

    const setParentModel = (parentId, containerId) => {
        const parentElContainer = document.getElementById(parentId);
        const parentEl = parentElContainer.querySelectorAll(`#${containerId}`);
        const parentModel = [];
        parentEl[0].childNodes.forEach((el) => {
            if (el.querySelector('input[name=name]')) {
                parentModel.push({ name: el.querySelector('input[name=name]').value });
            }
        });
        setParentModels(parentModel);
    };

    const handleAddModelUI = (tierModelChildContainerId, tierModelChildItemIdPattern, showFieldParent = false) => {
        const parentNode = document.getElementById(tierModelChildContainerId);
        const length = parentNode.childNodes.length;
        const dataId = length ? +parentNode.lastChild.getAttribute('data-id') + 1 : 1;
        const modelId = `${tierModelChildItemIdPattern}${dataId}`;
        const childMode = document.createElement('div');
        childMode.setAttribute('id', modelId);
        childMode.setAttribute('data-id', dataId);
        parentNode.appendChild(childMode);
        const root = ReactDOM.createRoot(document.getElementById(modelId));
        root.render(
            <React.StrictMode>
                <Card className="shadow mx-5 mb-2">
                    <Row className="pt-3 px-2 d-flex flex-column" id="example-collapse-text">
                        <Col>
                            <Row>
                                <Col style={{ flex: 1 }}>
                                    <FormGroup className="mb-2">
                                        <label className="form-control-label mb-1">Name</label>
                                        <Input
                                            type="text"
                                            name="name"
                                            className="form-control-alternative"
                                            placeholder="Ex: XXL"
                                            onBlur={() =>
                                                !showFieldParent && setParentModel(parentId, tierModelChildContainerId)
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-2">
                                        <label className="form-control-label mb-1">Price</label>
                                        <Input
                                            type="number"
                                            pattern="[0,9].*"
                                            name="price"
                                            className="form-control-alternative"
                                            placeholder="Ex: 100000"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col style={{ flex: 1 }}>
                                    <FormGroup className="mb-2">
                                        <label className="form-control-label mb-1">Stock</label>
                                        <Input
                                            type="number"
                                            pattern="[0,9].*"
                                            name="stock"
                                            className="form-control-alternative"
                                            placeholder="Ex: 100"
                                        />
                                    </FormGroup>

                                    {showFieldParent && (
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Parent</label>
                                            <MultiSelectDropdown
                                                selectionLimit={1}
                                                onRemove={(a, b) => handleOnRemoveParent(a, b, modelId)}
                                                onSelect={(a, b) => handleOnSelectParent(a, b, modelId)}
                                                options={parentModels}
                                                placeholder="Search parent model ..."
                                                emptyRecordMsg="Empty parent model"
                                            />
                                        </FormGroup>
                                    )}
                                </Col>

                                <Col style={{ flex: 1, flexShrink: 0 }}>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        name="image"
                                        hidden
                                        onChange={(e) => readURL(e.target, modelId, '#image-review')} //'tierModel-child-item-1', 'image-review'
                                    />
                                    <FormGroup className="mb-2">
                                        <label className="form-control-label mb-1">Image</label>
                                        <div
                                            id="image-review"
                                            className="rounded shadow"
                                            style={{
                                                backgroundRepeat: 'no-repeat',
                                                paddingTop: '80%',
                                                backgroundSize: 'cover',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleUploadImageModel(modelId)} //tierModel-child-item-1
                                        ></div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Button className="btn btn-icon btn-danger mx-0" onClick={() => handleRemoveModelUI(modelId)}>
                        <span className="btn-inner--text">Remove</span>
                    </Button>
                </Card>
            </React.StrictMode>,
        );
    };

    const handleRemoveModelUI = (modelId) => {
        document.getElementById(modelId).remove();
        setParentModel(parentId, tierModelChildContainerId);
    };

    const getBrandById = async (id) => {
        const res = await brandService.getBannerById(id);
        if (res.status === 200) {
            setCategories(res.data.categories);
        } else {
            toast.error(res.errors.message);
        }
    };

    const handleOnRemoveParent = (a, b, tierModelChildItemId) => {
        serParentKeyModels((prev) => [...prev.filter((x) => x.id !== tierModelChildItemId)]);
    };

    const handleOnSelectParent = (a, b, tierModelChildItemId) => {
        if (parentKeyModels.findIndex((x) => x.id === tierModelChildItemId) === -1) {
            serParentKeyModels((prev) => [...prev, { id: tierModelChildItemId, name: b.name }]);
        }
    };

    const handleOnChange = (imageList) => {
        setImages(imageList);
    };
    const handleOnError = () => {
        setImages([]);
    };

    function readURL(input, modelId, fieldName) {
        const model = document.getElementById(modelId);
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                model.querySelectorAll(fieldName)[0].style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const handleUploadImageModel = (modelId) => {
        const modelEl = document.getElementById(modelId);
        const inputFile = modelEl.querySelector('input[type=file]');
        inputFile.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = inputProductKeyword.current.value;
        const keyWords = [];
        content.split(',').forEach((item) => {
            if (item.trim()) {
                keyWords.push(item.trim());
            }
        });

        const body = {
            ...productObj,
            name: inputProductName.current.value,
            discount: +inputProductDiscount.current.value,
            priceBeforeDiscount: +inputProductPrice.current.value,
            stock: +inputProductStock.current.value,
            keywords: keyWords,
            tierModels: [
                getValuesModel(parentId, tierModelChildContainerId),
                getValuesModel(parentId2, tierModelChildContainerId2),
            ],
        };

        const arrApi = [];
        // upload image product
        var formData1 = new FormData();
        formData1.append('file', inputProductImage.current.files[0]);
        arrApi.push(fileService.upload(formData1));

        //upload thumbs product
        var formData2 = new FormData();
        images.forEach((item) => {
            // arrayFileThumbs.push(item.file);
            formData2.append('files', item.file);
        });
        arrApi.push(fileService.uploadMultiFile(formData2));

        var formData3 = new FormData();
        body.tierModels[0].models.forEach((item) => {
            formData3.append('files', item.file);
        });
        arrApi.push(fileService.uploadMultiFile(formData3));

        Promise.all(arrApi).then((res) => {
            body.image = res[0].data.id;
            res[1].data.forEach((item) => body.images.push(item.id));
            res[2].data.forEach((item, index) => {
                body.tierModels[0].models[index].image = item.id;
            });

            Promise.resolve(productService.create(body)).then((req) => {
                if (req.status === 201) {
                    toast.success('Save Successfully!');
                } else {
                    toast.error(req.errors.message);
                }
            });
        });
    };

    useEffect(() => {
        const getBrandsApi = async () => {
            const res = await brandService.getAll();
            if (res.status === 200) {
                setBrands(res.data.data);
            } else {
                toast.error(res.errors.message);
            }
        };
        getBrandsApi();
    }, []);

    return (
        <Container className="mt--7" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Create Product</h3>
                        </CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Name</label>
                                            <Input
                                                innerRef={inputProductName}
                                                className="form-control-alternative"
                                                placeholder="Ex: Product"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Brands</label>
                                            <div>
                                                <MultiSelectDropdown
                                                    selectionLimit={1}
                                                    onRemove={handleOnRemoveBrand}
                                                    onSelect={handleOnSelectBrand}
                                                    options={brands}
                                                    placeholder="Search brand ..."
                                                    emptyRecordMsg="Empty brand"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Categories</label>
                                            <div>
                                                <MultiSelectDropdown
                                                    selectionLimit={1}
                                                    onRemove={handleOnRemoveCate}
                                                    onSelect={handleOnSelectCate}
                                                    options={categories}
                                                    placeholder="Search category ..."
                                                    emptyRecordMsg="Empty category"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Price</label>
                                            <Input
                                                innerRef={inputProductPrice}
                                                type="number"
                                                pattern="[0,9].*"
                                                className="form-control-alternative"
                                                placeholder="Ex: 100000"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Discount</label>
                                            <Input
                                                innerRef={inputProductDiscount}
                                                type="number"
                                                pattern="[0,9].*"
                                                className="form-control-alternative"
                                                placeholder="Ex: 10%"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Stock</label>
                                            <Input
                                                innerRef={inputProductStock}
                                                type="number"
                                                pattern="[0,9].*"
                                                className="form-control-alternative"
                                                placeholder="Ex: 1000"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ flex: 2 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Keyword for search</label>
                                            <div>
                                                <Input
                                                    innerRef={inputProductKeyword}
                                                    type="textarea"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Ex: product01, product01"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ flex: 1, flexShrink: 0 }}>
                                        <input
                                            ref={inputProductImage}
                                            onChange={inputProductImageOnchange}
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            hidden
                                        />
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Image</label>
                                            {productImagePath ? (
                                                <img
                                                    src={productImagePath}
                                                    alt="images"
                                                    className="rounded shadow"
                                                    onClick={() => inputProductImage.current.click()}
                                                    style={{
                                                        height: '244px',
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
                                                    onClick={() => inputProductImage.current.click()}
                                                ></div>
                                            )}
                                        </FormGroup>
                                    </Col>

                                    <Col style={{ flex: 2 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Thumbnails</label>
                                            <ImageUploader
                                                images={images}
                                                OnChange={handleOnChange}
                                                OnError={handleOnError}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div id={parentId} className="mb-2">
                                    <Row>
                                        <Col style={{ flex: 1 }}>
                                            <FormGroup className="mb-2">
                                                <label className="form-control-label mb-1">Name Type Model</label>
                                                <Input
                                                    type="text"
                                                    className="form-control-alternative"
                                                    placeholder="Ex: Size"
                                                    name="name-type-model"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <label className="form-control-label mb-1 mx-5">Models</label>

                                    <div id={tierModelChildContainerId}>
                                        <div id={`${tierModelChildItemIdPattern}1`} data-id="1">
                                            <Card className="shadow mx-5 mb-2">
                                                <Row
                                                    className="pt-3 px-2 d-flex flex-column"
                                                    id="example-collapse-text"
                                                >
                                                    <Col>
                                                        <Row>
                                                            <Col style={{ flex: 1 }}>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Name
                                                                    </label>
                                                                    <Input
                                                                        type="text"
                                                                        name="name"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: XXL"
                                                                        onBlur={() =>
                                                                            setParentModel(
                                                                                parentId,
                                                                                tierModelChildContainerId,
                                                                            )
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Price
                                                                    </label>
                                                                    <Input
                                                                        type="number"
                                                                        pattern="[0,9].*"
                                                                        name="price"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: 100000"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col style={{ flex: 1 }}>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Stock
                                                                    </label>
                                                                    <Input
                                                                        type="number"
                                                                        pattern="[0,9].*"
                                                                        name="stock"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: 100"
                                                                    />
                                                                </FormGroup>
                                                            </Col>

                                                            <Col style={{ flex: 1, flexShrink: 0 }}>
                                                                <input
                                                                    type="file"
                                                                    accept=".jpg,.jpeg,.png"
                                                                    name="image"
                                                                    hidden
                                                                    onChange={(e) =>
                                                                        readURL(
                                                                            e.target,
                                                                            `${tierModelChildItemIdPattern}1`,
                                                                            '#image-review',
                                                                        )
                                                                    }
                                                                />
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Image
                                                                    </label>
                                                                    <div
                                                                        id="image-review"
                                                                        className="rounded shadow"
                                                                        style={{
                                                                            backgroundRepeat: 'no-repeat',
                                                                            paddingTop: '80%',
                                                                            backgroundSize: 'cover',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={() =>
                                                                            handleUploadImageModel(
                                                                                `${tierModelChildItemIdPattern}1`,
                                                                            )
                                                                        }
                                                                    ></div>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                {/* <Button className="btn btn-icon btn-danger mx-0" onClick={() => handleRemoveModelUI(`${tierModelChildItemIdPattern}1`)}>
                                                    <span className="btn-inner--text">Remove</span>
                                                </Button> */}
                                            </Card>
                                        </div>
                                    </div>

                                    <Button
                                        className="btn btn-icon btn-success mx-5"
                                        style={{ minWidth: '100px' }}
                                        onClick={() =>
                                            handleAddModelUI(tierModelChildContainerId, tierModelChildItemIdPattern)
                                        }
                                    >
                                        <span className="btn-inner--text">Add Model</span>
                                    </Button>
                                </div>

                                <div id={parentId2} className="mb-2">
                                    <Row>
                                        <Col style={{ flex: 1 }}>
                                            <FormGroup className="mb-2">
                                                <label className="form-control-label mb-1">Name Type Model Child</label>
                                                <Input
                                                    type="text"
                                                    className="form-control-alternative"
                                                    placeholder="Ex: Size"
                                                    name="name-type-model"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <label className="form-control-label mb-1 mx-5">Models</label>

                                    <div id={tierModelChildContainerId2}>
                                        <div id={`${tierModelChildItemIdPattern2}1`} data-id="1">
                                            <Card className="shadow mx-5 mb-2">
                                                <Row
                                                    className="pt-3 px-2 d-flex flex-column"
                                                    id="example-collapse-text"
                                                >
                                                    <Col>
                                                        <Row>
                                                            <Col style={{ flex: 1 }}>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Name
                                                                    </label>
                                                                    <Input
                                                                        type="text"
                                                                        name="name"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: XXL"
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Price
                                                                    </label>
                                                                    <Input
                                                                        type="number"
                                                                        pattern="[0,9].*"
                                                                        name="price"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: 100000"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col style={{ flex: 1 }}>
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Stock
                                                                    </label>
                                                                    <Input
                                                                        type="number"
                                                                        pattern="[0,9].*"
                                                                        name="stock"
                                                                        className="form-control-alternative"
                                                                        placeholder="Ex: 100"
                                                                    />
                                                                </FormGroup>

                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Parent
                                                                    </label>
                                                                    <MultiSelectDropdown
                                                                        selectionLimit={1}
                                                                        onRemove={(a, b) =>
                                                                            handleOnRemoveParent(
                                                                                a,
                                                                                b,
                                                                                `${tierModelChildItemIdPattern2}1`,
                                                                            )
                                                                        }
                                                                        onSelect={(a, b) =>
                                                                            handleOnSelectParent(
                                                                                a,
                                                                                b,
                                                                                `${tierModelChildItemIdPattern2}1`,
                                                                            )
                                                                        }
                                                                        options={parentModels}
                                                                        placeholder="Search parent model ..."
                                                                        emptyRecordMsg="Empty parent model"
                                                                    />
                                                                </FormGroup>
                                                            </Col>

                                                            <Col style={{ flex: 1, flexShrink: 0 }}>
                                                                <input
                                                                    type="file"
                                                                    accept=".jpg,.jpeg,.png"
                                                                    name="image"
                                                                    hidden
                                                                    onChange={(e) =>
                                                                        readURL(
                                                                            e.target,
                                                                            `${tierModelChildItemIdPattern2}1`,
                                                                            '#image-review',
                                                                        )
                                                                    }
                                                                />
                                                                <FormGroup className="mb-2">
                                                                    <label className="form-control-label mb-1">
                                                                        Image
                                                                    </label>
                                                                    <div
                                                                        id="image-review"
                                                                        className="rounded shadow"
                                                                        style={{
                                                                            backgroundRepeat: 'no-repeat',
                                                                            paddingTop: '80%',
                                                                            backgroundSize: 'cover',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={() =>
                                                                            handleUploadImageModel(
                                                                                `${tierModelChildItemIdPattern2}1`,
                                                                            )
                                                                        }
                                                                    ></div>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    </div>

                                    <Button
                                        className="btn btn-icon btn-success mx-5"
                                        style={{ minWidth: '100px' }}
                                        onClick={() =>
                                            handleAddModelUI(
                                                tierModelChildContainerId2,
                                                tierModelChildItemIdPattern2,
                                                true,
                                            )
                                        }
                                    >
                                        <span className="btn-inner--text">Add Model</span>
                                    </Button>
                                </div>

                                <Row>
                                    <Col style={{ flex: 1 }}>
                                        <FormGroup className="mb-2">
                                            <label className="form-control-label mb-1">Descriptions</label>
                                            <RichText onChange={handleOnChangeContext} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FormGroup className="mb-2">
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

export default CreateProduct;
