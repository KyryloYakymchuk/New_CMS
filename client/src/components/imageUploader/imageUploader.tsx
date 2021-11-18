import { Icons } from '@utils/constants/icon';
import { FC, useRef, useState } from 'react';
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
    const uploaderInput = useRef<HTMLInputElement>(null);
    const [activeImage, setActiveImage] = useState<string | null>();
    
    const readerFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.onload = function () {
            const image  = reader.result as string | null;
            setActiveImage(image);
        };
        if (e?.target?.files?.[0]) {
            reader?.readAsDataURL(e.target?.files?.[0]);
        }
    };
    const closeFunction = () => {
        setActiveImage(null);
        if (uploaderInput.current) {
            uploaderInput.current.value = '';
        } 
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
                        ref={uploaderInput}
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
