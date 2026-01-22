import { CSSProperties, FC, useEffect, useState } from 'react';
import { Upload, Modal } from 'antd';
import type { UploadFile, UploadProps, GetProp } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
// import type { GetProp } from 'antd';

interface Props {
    style?: CSSProperties,
    change?: (images: UploadFile[]) => void,
    value?: UploadFile[]
}

export const UploadPictureCard: FC<Props> = ({ style, change, value }) => {
    const [fileList, setFileList] = useState<UploadFile[]>(value || []);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    //evita error al cargar imagen, simula un ACTION falso
    const dummyRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        setFileList(fileList);
        (change != null && change != undefined) ? change(fileList) : null;
    }


    const handlePreview = () => {
        setPreviewOpen(true);
    };

    // var currentFile = fileList[0];
    // useEffect(() => {
    //     if (!currentFile) {
    //         setPreviewImage('');
    //         return;
    //     }

    //     if (currentFile.url) {
    //         setPreviewImage(currentFile.url);
    //         return;
    //     }

    //     if (currentFile.originFileObj) {
    //         const url = URL.createObjectURL(currentFile.originFileObj);
    //         setPreviewImage(url);
    //         return () => URL.revokeObjectURL(url);
    //     }
    // }, [currentFile]);

    useEffect(() => {
        if (value) {
            setFileList(value.map(f => ({ ...f })));
        }
    }, [value]);

    return (
        <>
            <ImgCrop rotationSlider aspect={1} quality={1}>
                <Upload
                    style={style}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    customRequest={dummyRequest}
                    onChange={handleChange}
                    accept="image/*"
                    maxCount={1}>
                    {fileList.length >= 1 ? null : (
                        <div style={{ color: 'gray' }}>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Subir</div>
                        </div>
                    )}
                </Upload>
            </ImgCrop>

            <Modal
                open={previewOpen}
                // title={currentFile?.name}
                footer={null}
                onCancel={() => setPreviewOpen(false)}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};



type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const UploaderPicture: FC<Props> = ({ style, change, value }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imagePreview, setImagePreview] = useState<HTMLImageElement>(new Image());
    const [imageTitle, setImageTitle] = useState<string>('');
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        (change != null && change != undefined) ? change(fileList) : null;
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            setImageTitle(file.fileName!);
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        setPreviewOpen(true);
        setImagePreview(prev => ({ ...prev, src: src }));
    };

    const cropProps: Omit<ImgCropProps, 'children'> = {
        aspect: 16 / 9,
    };

    useEffect(() => {
        if (value) {
            setFileList(value);
        }
    }, [value]);

    return (
        <>
            <ImgCrop {...cropProps}>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}>
                    {fileList.length >= 1 ? null : (
                        <div style={{ color: 'gray' }}>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Subir</div>
                        </div>
                    )}
                </Upload>
            </ImgCrop>
            <Modal
                open={previewOpen}
                title={imageTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}>
                <img alt="preview" style={{ width: '100%' }} src={imagePreview.src} />
            </Modal>
        </>
    )
}

// const App: React.FC = () => {
//     const [fileList, setFileList] = useState<UploadFile[]>([
//         {
//             uid: '-1',
//             name: 'image.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//         },
//     ]);

//     const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
//         setFileList(newFileList);
//     };

//     const onPreview = async (file: UploadFile) => {
//         let src = file.url as string;
//         if (!src) {
//             src = await new Promise((resolve) => {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file.originFileObj as FileType);
//                 reader.onload = () => resolve(reader.result as string);
//             });
//         }
//         const image = new Image();
//         image.src = src;
//         const imgWindow = window.open(src);
//         imgWindow?.document.write(image.outerHTML);
//     };

//     return (
//         <ImgCrop rotationSlider>
//             <Upload
//                 action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//                 listType="picture-card"
//                 fileList={fileList}
//                 onChange={onChange}
//                 onPreview={onPreview}
//             >
//                 {fileList.length < 5 && '+ Upload'}
//             </Upload>
//         </ImgCrop>
//     );
// };

// export default App;