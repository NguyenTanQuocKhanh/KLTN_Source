import ImageUploading from 'react-images-uploading';
import { Alert, Button, ButtonGroup, Card } from 'reactstrap';

const ImageUploader = ({
    OnChange,
    OnError,
    images = [],
    maxNumber = 10,
    acceptType = ['jpeg', 'jpg', 'png'],
    maxFileSize = 5000000,
}) => {
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={OnChange}
                onError={OnError}
                maxNumber={maxNumber}
                acceptType={acceptType}
                maxFileSize={maxFileSize}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                }) => (
                    <>
                        {errors && (
                            <Alert color="danger text-start">
                                <ul>
                                    {errors.maxNumber && <li>Number of selected images exceed maxNumber</li>}
                                    {errors.acceptType && <li>Your selected file type is not allow</li>}
                                    {errors.maxFileSize && <li>Selected file size exceed maxFileSize</li>}
                                </ul>
                            </Alert>
                        )}

                        <Card className="shadow">
                            <div
                                className="shadow upload-container"
                                {...dragProps}
                                onClick={onImageUpload}
                                style={{
                                    backgroundColor: isDragging ? 'blue' : 'green',
                                    color: 'white',
                                    height: '30px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                Choose a file or Drag it here
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                {imageList.map((image, index) => (
                                    <div
                                        key={index}
                                        className="image-item"
                                        style={{
                                            width: '150px',
                                            marginRight: '10px',
                                            marginBottom: '10px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <img src={image['data_url']} alt="" style={{ width: '100%' }} />
                                        <div className="image-item__btn-wrapper mt-1">
                                            <ButtonGroup size="sm" style={{ width: '100%' }}>
                                                <Button color="primary" onClick={() => onImageUpdate(index)}>
                                                    Update
                                                </Button>
                                                <Button color="danger" onClick={() => onImageRemove(index)}>
                                                    Remove
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {images.length > 0 && (
                                <Button onClick={onImageRemoveAll} color="danger">
                                    Remove All Images
                                </Button>
                            )}
                        </Card>
                    </>
                )}
            </ImageUploading>
        </div>
    );
};

export default ImageUploader;
