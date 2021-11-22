import { IModuleItemData } from '@redux/types/modules';

export const formaterModulesItemsData = (data: IModuleItemData[]) =>
    data?.map((element: IModuleItemData) => ({
        name: element.itemData.name,
        status: element.itemData.status,
        publishDate: element.itemData.publishDate,
        ...element
    }));
