import { FC } from 'react';
import { LoaderBlock, LoaderItem2, LoaderItem3, LoaderItem4, LoaderItem5 } from './styled';

export const Loader: FC = () => {
    return (
        <LoaderBlock>
            <div></div>
            <LoaderItem2 />
            <LoaderItem3 />
            <LoaderItem4 />
            <LoaderItem5 />
        </LoaderBlock>
    );
};
