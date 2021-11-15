export const initialfileds = [
    {
        id: 0,
        name: 'Checkbox',
        key: 'text',
        type: 'checkbox',
        fieldType: 'boolean'
        
      },
      {
        id: 1,
        name: 'TextBox',
        type: 'textbox',
        key: 'text',
        fieldType: 'string',
        settings: [
          {
            id: 0,
            name: 'Max Chars',
            key: 'maxChars',
            defaultValue: '',
            select: [
              { id: 0, value: 1 },
              { id: 1, value: 2 },
              { id: 2, value: 3 },
              { id: 3, value: 4 },
              { id: 4, value: 5 },
              { id: 5, value: 6 },
              { id: 6, value: 7 },
              { id: 7, value: 8 },
              { id: 8, value: 9 },
              { id: 9, value: 10 }
            ]
          },
          { id: 1, name: 'Width', key: 'width', defaultValue: '', input: 'px' },
          {
            id: 2,
            name: 'Default Text',
            key: 'defaultText',
            defaultValue: '',
            input: ''
          },
          {
            id: 3,
            name: 'Required',
            key: 'required',
            defaultValue: 'false',
            select: [
              { id: 0, value: 'false' },
              { id: 1, value: 'true' }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'TextArea',
        type: 'textarea',
        key: 'textarea',
        fieldType: 'string',
        settings: [
          { id: 0, name: 'Width', key: 'width', defaultValue: '', input: 'px' },
          { id: 1, name: 'Height', key: 'height', defaultValue: '', input: 'px' },
          {
            id: 2,
            name: 'Required',
            key: 'required',
            defaultValue: 'false',
            select: [
              { id: 0, value: 'false' },
              { id: 1, value: 'true' }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Upload File(s)',
        type: 'upload',
        key: 'upload',
        fieldType: 'string',
        settings: [
          {
            id: 0,
            name: 'Max Items',
            key: 'maxItems',
            defaultValue: '',
            input: ''
          },
          { id: 1, name: 'Max Size', key: 'maxSize', defaultValue: '', input: '' },
          {
            id: 2,
            name: 'Filetypes',
            key: 'fileTypes',
            defaultValue: '',
            input: 'e.g. jpg, png, gif, jpeg'
          },
          {
            id: 3,
            name: 'Specifications',
            key: 'specifications',
            defaultValue: '',
            input: 'Caption, Filename'
          }
        ]
      },
      {
        id: 4,
        name: 'Module Data from Items',
        type: 'module',
        key: 'moduleDataFromItems',
        fieldType: 'string',
        settings: [
          {
            id: 0,
            name: 'Module',
            key: 'module',
            defaultValue: 'false',
            select: [
              { id: 0, value: 'brand' },
              { id: 1, value: 'newsletter' },
              { id: 2, value: 'discountgifts' },
              { id: 3, value: 'cities' },
              { id: 4, value: 'banner' },
              { id: 5, value: 'footerlinks' },
              { id: 6, value: 'giftregistry' },
              { id: 7, value: 'about' },
              { id: 8, value: 'webshop' }
            ]
          }
        ]
      },
      {
        id: 5,
        name: 'Dropdown',
        type: 'dropdown',
        key: 'dropdown',
        fieldType: 'string',
        settings: [
          {
            id: 1,
            name: 'Width',
            key: 'width',
            defaultValue: '',
            input: 'px'
          },
          {
            id: 2,
            name: 'Names (comma seperated)',
            key: 'names',
            defaultValue: '',
            input: ''
          },
          {
            id: 3,
            name: 'Values (comma seperated)',
            key: 'values',
            defaultValue: '',
            input: ''
          },
          {
            id: 4,
            name: 'Required',
            key: 'required',
            defaultValue: 'false',
            select: [
              { id: 0, value: 'false' },
              { id: 1, value: 'true' }
            ]
          }
        ]
      },
      {
        id: 6,
        name: 'WYSIWYG',
        type: 'wysiwyg',
        key: 'wysiwyg',
        fieldType: 'string',
        settings: [
          { id: 0, name: 'Width', key: 'width', defaultValue: '', input: 'px' },
          { id: 1, name: 'Height', key: 'height', defaultValue: '', input: 'px' }
        ]
      },
      {
        id: 7,
        name: 'Map',
        type: 'map',
        key: 'map',
        fieldType: 'string',
        settings: [
          // {
          //     id: 0, name: 'Max Chars', key: 'maxChars', defaultValue: 'false', select: [
          //         {id: 0, value: 1},
          //         {id: 1, value: 2},
          //         {id: 2, value: 3},
          //         {id: 3, value: 4},
          //         {id: 4, value: 5},
          //         {id: 5, value: 6},
          //         {id: 6, value: 7},
          //         {id: 7, value: 8},
          //         {id: 8, value: 9},
          //         {id: 9, value: 10},
          //         {id: 10, value: 11},
          //         {id: 11, value: 12},
          //         {id: 12, value: 13},
          //         {id: 13, value: 14},
          //         {id: 14, value: 16},
          //         {id: 15, value: 17},
          //         {id: 16, value: 18},
          //         {id: 17, value: 19},
          //         {id: 18, value: 20}
          //
          //     ]
          // },
          {
            id: 1,
            name: 'Width',
            key: 'width',
            defaultValue: '',
            input: 'px'
          },
          {
            id: 2,
            name: 'Coordinates',
            key: 'coordinates',
            defaultValue: '',
            input: ''
          }
        ]
      }
];