import { FC } from "react";
import { IlistColums } from "../ListElement/ListElement";
import { ListTitleContainer } from "./styled/styled";



interface IProps {
    listColums: IlistColums[];
  }
export const ListTitle: FC<IProps> = ({listColums}) =>  {
    
    
    return (
        <ListTitleContainer>
            {listColums.map(({title})=>(
                <div>{title}</div>
            ))}
            <div>interact</div>
        </ListTitleContainer>
    )
}


