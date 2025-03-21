import { CollectionConfig } from 'payload';

export const WorkExperience: CollectionConfig = {
  slug: 'experience',
  fields: [
    {
      name: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'Role',
      type: 'text',
      required: true,
    },
    {
      name: 'StartDate',
      type: 'date',
      required: true,
    },
   
    {
      name: 'Current',
      type: 'checkbox',
      required: true,
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (value) {
              if (data) {
                data.EndDate = null;
              }
            }
            return value;
          },
        ],
      },
    },
    {
        name: 'EndDate',
        type: 'date',
        required: false,
        validate: (value, { data }: { data: { Current?: boolean } }) => {
          if (!data.Current && !value) {
            return 'EndDate is required if Current is not checked';
          }
          return true;
        },
        admin: {
          condition: (data) => !data?.Current,
        },
      },
    {
      name: 'Description',
      type: 'text',
      required: true,
    },
  ],
};