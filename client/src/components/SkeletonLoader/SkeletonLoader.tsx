import { FC } from 'react';
import { Skeleton } from '@mui/material';

interface IProps {
    width: string;
    height: string;
}
export const SkeletonLoader: FC<IProps> = ({ width, height }) => {
    return (
        <Skeleton
            sx={{
                bgcolor: 'lightgray',
                borderRadius: '8px'
            }}
            variant="rectangular"
            animation="pulse"
            width={width}
            height={height}
        />
    );
};
