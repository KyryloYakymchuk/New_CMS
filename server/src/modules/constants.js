export const defFields = [
  {
    name: "dropdown",
    type: "string",
    settings: {
      textPrompt: "status",
      values: "disabled,publish,archived",
    },
    id: "f_Status",
    order: 3,
  },
  {
    name: "datePicker",
    type: "string",
    settings: {
      textPrompt: "archiveDate",
    },
    id: "f_aDate",
    order: 2,
  },
  {
    name: "datePicker",
    type: "string",
    settings: {
      textPrompt: "publishDate",
    },
    id: "f_pDate",
    order: 1,
  },
  {
    name: "textbox",
    type: "string",
    settings: {
      textPrompt: "name",
    },
    id: "f_name",
    order: 0,
  },
];
