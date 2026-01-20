import { Upload, Modal } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CSSProperties, FC, useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';

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

    var currentFile = fileList[0];
    useEffect(() => {
        if (!currentFile) {
            setPreviewImage('');
            return;
        }

        if (currentFile.url) {
            setPreviewImage(currentFile.url);
            return;
        }

        if (currentFile.originFileObj) {
            const url = URL.createObjectURL(currentFile.originFileObj);
            setPreviewImage(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [currentFile]);

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
                title={currentFile?.name}
                footer={null}
                onCancel={() => setPreviewOpen(false)}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};
