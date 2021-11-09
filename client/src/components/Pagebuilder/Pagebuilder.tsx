import { BuilderWrapper } from '@modules/Pages/css/BuilderStyle';
import { FC, useEffect } from 'react';

import grapesjs from 'grapesjs';
import gjsTabs from 'grapesjs-tabs';
import qjsPresetWebpage from 'grapesjs-preset-webpage';
import 'grapesjs-blocks-basic';
import 'grapesjs-preset-newsletter';
import 'grapesjs/dist/css/grapes.min.css';
import { qjsPresetWebpageOptions } from '@modules/Pages/grapes/pluginsOptions';
import { useTranslation } from 'react-i18next';


interface IProps {
    handleClickCreatePage: (Editor: any) =>void;

}
export const Pagebuilder: FC<IProps> = ({ handleClickCreatePage }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const editor =  grapesjs.init({
            container: '#gjs',
            fromElement: true,
            width: '99%',
            storageManager: {
                id: 'gjsPages-',
                type: 'local',
                autosave: true,
                autoload: true,
                stepsBeforeSave: 1
            },
            styleManager: {},
            plugins: [
                'gjs-blocks-basic',
                'gjs-preset-newsletter',
                qjsPresetWebpage,
                gjsTabs
            ],
            pluginsOpts: {
                qjsPresetWebpageOptions        
            }
        });         


        editor.Panels.addPanel({
            id: 'basic-actions',
            el: '.gjs-pn-devices-c',
            buttons: [
                {
                    id: 'alert-button',
                    className: 'btn-alert-button',
                    label: t('Create Page'),
                    command(Editor) {                      
                        handleClickCreatePage(Editor);
                    }
                }
            ]
        });

        editor.BlockManager.add('h1-block', {
            label: 'Settings',
            content: '<h1>wefwefwefwef</h1>',
            category: 'Basic',
            attributes: {
                title: 'Insert h1 block'
            }
        });
    
       
    }, []); 
    

    return (
        <>
            <div className="panel__top">
                <div className="panel__basic-actions"></div>
            </div>
            <BuilderWrapper id="gjs"/>
            <div id="blocks"></div>       
        </>  
    );    
};
