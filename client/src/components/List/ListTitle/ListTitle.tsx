import { FC, MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitleContainer, SvgButton } from './styled';
import { Icons } from '@utils/constants/icon';

interface IProps {
    sortParameter?:string ;
    sortHandler:(sortField:string)=> MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    sortParameterName?:string ;
}
export const ListTitle: FC<IProps> = (
    { listColumns, sortHandler, sortParameter, sortParameterName }) =>  {
    
    return (
        <ListTitleContainer>
            {listColumns.map(({ title, name })=>(
                <div onClick = {sortHandler( name )}>
                    {title}
                    {sortParameterName === name && 
                     <SvgButton sortParameter = {sortParameter}>
                         {Icons.ExpandMoreIcon}
                     </SvgButton> }  
                </div>
            ))}
            <div>interact</div>
        </ListTitleContainer>
    );
};


