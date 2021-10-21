import { FC } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { ListContainer } from './styled/styled';

export const List: FC = () => {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        editable: true
    });

    return (
        <ListContainer style={{ height: 880, width: '100%' }}>
            <DataGridPro
                {...data}
                loading={data.rows.length === 0}
                rowHeight={60}
                checkboxSelection
                disableSelectionOnClick
            />
        </ListContainer>
    );
};
