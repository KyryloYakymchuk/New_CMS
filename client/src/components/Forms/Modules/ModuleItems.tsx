import { FC } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Buttons } from '@components/Button/Button';
import { IModuleFieldsPayload } from '@redux/types/modules';
import { Loader } from '@components/Loader/Loader';
import { fieldComponentData } from '@utils/constants/Modules/fieldComponentData';

interface IProps {
    onSubmit: (value: IModuleFieldsPayload) => void;
    moduleFielsData?: IModuleFieldsPayload[];
}

export const ModuleItems: FC<IProps> = ({ onSubmit, moduleFielsData }) => {
    const moduleItemsForm = useFormik({
        initialValues: { settings: {} },
        onSubmit
    });

    return (
        <FormikProvider value={moduleItemsForm}>
            <Form onSubmit={moduleItemsForm.handleSubmit}>
                {moduleFielsData?.map((item: IModuleFieldsPayload) =>
                    fieldComponentData?.[item?.name as keyof typeof fieldComponentData](item)
                ) || <Loader />}
                <Buttons type="submit" title="submit" style="pinkButton" />
            </Form>
        </FormikProvider>
    );
};
