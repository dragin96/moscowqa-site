import { Talk } from './entities/talk.entity';
import { Event } from '../events/entities/event.entity';
import { Speaker } from '../speakers/entities/speaker.entity';
import { TalksService } from './talks.service';
import { In } from 'typeorm';

export const TalkResourceOptions = {
  resource: Talk,
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
      abstract: {
        position: 4,
        type: 'richtext',
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: true,
        },
      },
      preview: {
        position: 5,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      videoLink: {
        position: 6,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      slidesLink: {
        position: 7,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      materialsLink: {
        position: 8,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      event_id: {
        position: 9,
        type: 'reference',
        reference: 'Event',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
        availableValues: async () => {
          console.log('Talk event_id availableValues - start');
          try {
            const events = await Event.find();
            console.log('Talk event_id availableValues - found events:', events);
            const values = events.map(event => ({
              value: event.id,
              label: event.title,
            }));
            console.log('Talk event_id availableValues - mapped values:', values);
            return values;
          } catch (error) {
            console.error('Talk event_id availableValues - error:', error);
            throw error;
          }
        },
      },
      event: {
        isVisible: false,
      },
      speakers: {
        position: 10,
        type: 'reference',
        reference: 'Speaker',
        isArray: true,
        isVisible: {
          list: true,
        },
        availableValues: async () => {
          console.log('Talk speakers availableValues - start');
          try {
            const speakers = await Speaker.find();
            console.log('Talk speakers availableValues - found speakers:', speakers);
            const values = speakers.map(speaker => ({
              value: speaker.id,
              label: `${speaker.lastName}`,
            }));
            console.log('Talk speakers availableValues - mapped values:', values);
            return values;
          } catch (error) {
            console.error('Talk speakers availableValues - error:', error);
            throw error;
          }
        },
      }
    },
    sort: {
      sortBy: 'id',
      direction: 'desc',
    },
    listProperties: ['id', 'title', 'videoLink', 'slidesLink', 'materialsLink', 'event_id', 'speakers'],
    filterProperties: ['id', 'title', 'event_id', 'speakers'],
    editProperties: ['title', 'abstract', 'videoLink', 'slidesLink', 'materialsLink', 'event_id', 'speakers'],
    showProperties: ['id', 'title', 'abstract', 'videoLink', 'slidesLink', 'materialsLink', 'event_id', 'speakers'],
    navigation: {
      name: 'Контент',
      icon: 'Presentation',
    },
    actions: {
      new: {
        before: async (request) => {
          console.log('Talk new before - request payload:', request.payload);
          const { speakers, event_id, ...otherParams } = request.payload;
          const processedPayload = {
            ...otherParams,
            speakers: Array.isArray(speakers) ? speakers : (speakers ? [speakers] : []),
            event_id: event_id ? parseInt(event_id) : null,
          };
          console.log('Talk new before - processed payload:', processedPayload);
          return {
            ...request,
            payload: processedPayload,
          };
        },
        after: async (response) => {
          console.log('Talk new after - response record:', response.record);
          const { record } = response;
          const talk = await Talk.findOne({
            where: { id: record.params.id },
            relations: ['speakers', 'event'],
          });
          console.log('Talk new after - found talk:', talk);

          if (talk) {
            if (record.params.speakers && record.params.speakers.length > 0) {
              console.log('Talk new after - processing speakers:', record.params.speakers);
              const speakers = await Speaker.find({
                where: { id: In(record.params.speakers) }
              });
              console.log('Talk new after - found speakers:', speakers);
              talk.speakers = speakers;
            } else {
              console.log('Talk new after - no speakers to process');
              talk.speakers = [];
            }

            if (record.params.event_id) {
              console.log('Talk new after - processing event:', record.params.event_id);
              const event = await Event.findOne({ where: { id: record.params.event_id } });
              console.log('Talk new after - found event:', event);
              if (event) {
                talk.event = event;
                talk.event_id = event.id;
              }
            }

            await talk.save();
            console.log('Talk new after - saved talk:', talk);
          }

          return response;
        },
      },
      edit: {
        before: async (request) => {
          console.log('Talk edit before - request payload:', request.payload);
          const { speakers, event_id, ...otherParams } = request.payload;
          const processedPayload = {
            ...otherParams,
            speakers: Array.isArray(speakers) ? speakers : (speakers ? [speakers] : []),
            event_id: event_id ? parseInt(event_id) : null,
          };
          console.log('Talk edit before - processed payload:', processedPayload);
          return {
            ...request,
            payload: processedPayload,
          };
        },
        after: async (response) => {
          console.log('Talk edit after - response record:', response.record);
          const { record } = response;
          const talk = await Talk.findOne({
            where: { id: record.params.id },
            relations: ['speakers', 'event'],
          });
          console.log('Talk edit after - found talk:', talk);

          if (talk) {
            if (record.params.speakers && record.params.speakers.length > 0) {
              console.log('Talk edit after - processing speakers:', record.params.speakers);
              const speakers = await Speaker.find({
                where: { id: In(record.params.speakers) }
              });
              console.log('Talk edit after - found speakers:', speakers);
              talk.speakers = speakers;
            } else {
              console.log('Talk edit after - no speakers to process');
              talk.speakers = [];
            }

            if (record.params.event_id) {
              console.log('Talk edit after - processing event:', record.params.event_id);
              const event = await Event.findOne({ where: { id: record.params.event_id } });
              console.log('Talk edit after - found event:', event);
              if (event) {
                talk.event = event;
                talk.event_id = event.id;
              }
            } else {
              console.log('Talk edit after - no event to process');
              talk.event = null;
              talk.event_id = null;
            }

            await talk.save();
            console.log('Talk edit after - saved talk:', talk);
          }

          return response;
        },
      },
    },
  },
}; 