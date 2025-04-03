import { Event } from './entities/event.entity';

export const EventResourceOptions = {
  resource: Event,
  options: {
    properties: {
      id: {
        position: 1,
        isId: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: false,
        },
      },
      title: {
        position: 2,
        isTitle: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      description: {
        position: 3,
        type: 'textarea',
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: true,
        },
      },
      date: {
        position: 4,
        type: 'datetime',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      location: {
        position: 5,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      talks: {
        isVisible: false,
      }
    },
    sort: {
      sortBy: 'date',
      direction: 'desc',
    },
    listProperties: ['id', 'title', 'date', 'location'],
    filterProperties: ['id', 'title', 'date', 'location'],
    editProperties: ['title', 'description', 'date', 'location'],
    showProperties: ['id', 'title', 'description', 'date', 'location'],
    navigation: {
      name: 'Контент',
      icon: 'Calendar',
    },
  },
}; 