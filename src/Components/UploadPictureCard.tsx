import { Upload, Modal } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CSSProperties, FC, useState } from 'react';
import ImgCrop from 'antd-img-crop';

interface Props {
    className?: string;
    style?: CSSProperties,
}

export const UploadPictureCard: FC<Props> = ({ className, style }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    //evita error al cargar imagen, simula un ACTION falso
    const dummyRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };


    const handlePreview = (file: UploadFile) => {
        setPreviewImage(
            file.url || URL.createObjectURL(file.originFileObj as File)
        );
        setPreviewOpen(true);
        setPreviewTitle(file.name || '');
    };

    const handleChange: UploadProps['onChange'] = ({ fileList }) => setFileList(fileList)

    return (
        <div className={className}>
            <ImgCrop rotationSlider aspect={1} quality={1}>
                <Upload
                    style={style}
                    listType="picture-card"
                    fileList={fileList}
                    customRequest={dummyRequest}
                    onChange={handleChange}
                    onPreview={handlePreview}
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
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
            >
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};
