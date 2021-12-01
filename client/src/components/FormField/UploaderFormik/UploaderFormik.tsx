import { IUploader } from '@interfaces/types';
import { Icons } from '@utils/constants/icon';
import { FieldProps } from 'formik';
import { FC, useEffect, useRef, useState } from 'react';

import {
    CloseButton,
    ImgBlock,
    LayoutImg,
    StyledInput,
    StyledLabel,
    UploaderBlock
} from './styled';

interface IProps extends FieldProps {
    isMulti: boolean;
}

export const UploaderFormik: FC<IProps> = ({ field, form, isMulti }) => {
    const [image, setImage] = useState<IUploader[]>([]);
    const uploaderInput = useRef<HTMLInputElement>(null);

    const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && uploaderInput.current) {
            const src = URL.createObjectURL(file);
            setImage(isMulti ? [...image, { file, src }] : [{ file, src }]);
            uploaderInput.current.value = '';
        }
    };

    const deleteImgFunc = (src: string) => () => {
        setImage(image.filter((el) => el.src !== src));
    };

    useEffect(() => {
        if (isMulti && image.length > 0) {
            form.setFieldValue(
                field.name,
                image.map((el) => el.file)
            );
        } else if (!isMulti && image.length > 0) {
            form.setFieldValue(field.name, image?.[0]?.file);
        }
    }, [image]);

    return (
        <UploaderBlock>
            <StyledLabel htmlFor="uploaderInput">
                <LayoutImg>
                    <Icons.DriveFolderUploadIcon fontSize="large" />
                    <div>Upload img</div>
                </LayoutImg>
            </StyledLabel>
            <StyledInput
                id="uploaderInput"
                type="file"
                accept=".jpg, .jpeg, .png, .gif, .ttf, .svg"
                onChange={onChangeFunc}
                ref={uploaderInput}
            />
            <ImgBlock>
                {image?.map(({ src }) => (
                    <div>
                        <img src={src || '#'}></img>
                        <CloseButton onClick={deleteImgFunc(src)}>
                            <Icons.ClearIcon />
                        </CloseButton>
                    </div>
                )) || null}
            </ImgBlock>
        </UploaderBlock>
    );
};
