import { Icons } from '@utils/constants/icon';
import { FC, useState } from 'react';
import { Field } from 'react-final-form';
import {
    CloseButton,
    ErrorBlock,
    ImgBlock,
    LayoutImg,
    StyledInput,
    StyledLabel,
    UploaderBlock
} from './styled';

interface IProps {
    name: string;
}

export const ImageUploader: FC<IProps> = ({ name, ...props }) => {
    const [activeImage, setActiveImage] = useState<any>();
    // problem with type, srs ask type string but setActiveImage(reader.result) its type ArrayBuffer
    //string | ArrayBuffer | null, not working
    const readerFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.onload = function () {
            setActiveImage(reader.result);
        };
        if (e?.target?.files?.[0]) {
            reader?.readAsDataURL(e.target?.files?.[0]);
        }
    };

    const closeFunction = () => {
        setActiveImage(null);
    };
    return (
        <Field<FileList> name={name}>
            {({ input: { value, onChange, ...input }, meta: { touched, error } }) => (
                <UploaderBlock>
                    <StyledLabel htmlFor="uploaderInput">
                        {activeImage ? (
                            <ImgBlock>
                                <img src={activeImage} alt="" draggable={false} />
                            </ImgBlock>
                        ) : (
                            <LayoutImg>
                                <Icons.DriveFolderUploadIcon fontSize="large" />
                                <div>Upload img</div>
                            </LayoutImg>
                        )}
                    </StyledLabel>
                    <StyledInput
                        id="uploaderInput"
                        {...input}
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif, .ttf, .svg"
                        onChange={(e) => {
                            onChange(e.target?.files);
                            readerFunc(e);
                        }}
                        {...props}
                    />
                    <CloseButton onClick={closeFunction}>
                        <Icons.ClearIcon />
                    </CloseButton>
                    <ErrorBlock>
                        {Boolean(touched && error)}
                        {touched && error && <span> {error} </span>}
                    </ErrorBlock>
                </UploaderBlock>
            )}
        </Field>
    );
};
