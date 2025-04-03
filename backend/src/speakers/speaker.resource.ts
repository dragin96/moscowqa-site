import { Speaker } from './entities/speaker.entity';
import { Talk } from '../talks/entities/talk.entity';
import { SpeakersService } from './speakers.service';
import { In } from 'typeorm';

export const SpeakerResourceOptions = {
  resource: Speaker,
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
      firstName: {
        position: 2,
        isTitle: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      lastName: {
        position: 3,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      photo: {
        position: 4,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      company: {
        position: 5,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      bio: {
        position: 6,
        type: 'richtext',
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: true,
        },
      },
      email: {
        position: 7,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      telegram: {
        position: 8,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      github: {
        position: 9,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      talks: {
        position: 10,
        type: 'reference',
        reference: 'Talk',
        isArray: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      }
    },
    sort: {
      sortBy: 'lastName',
      direction: 'asc',
    },
    listProperties: ['id', 'firstName', 'lastName', 'company', 'email', 'telegram', 'github', 'talks'],
    filterProperties: ['id', 'firstName', 'lastName', 'company', 'email', 'talks'],
    editProperties: ['firstName', 'lastName', 'photo', 'company', 'bio', 'email', 'telegram', 'github', 'talks'],
    showProperties: ['id', 'firstName', 'lastName', 'photo', 'company', 'bio', 'email', 'telegram', 'github', 'talks'],
    navigation: {
      name: 'Контент',
      icon: 'User',
    },
    actions: {
      new: {
        before: async (request) => {
          console.log('Speaker new before - request payload:', request.payload);
          const { talks, ...otherParams } = request.payload;
          const processedPayload = {
            ...otherParams,
            talks: talks ? (Array.isArray(talks) ? talks : [talks]).map(id => parseInt(id)) : [],
          };
          console.log('Speaker new before - processed payload:', processedPayload);
          return {
            ...request,
            payload: processedPayload,
          };
        },
        after: async (response) => {
          console.log('Speaker new after - response record:', response.record);
          const { record } = response;
          const speaker = await Speaker.findOne({
            where: { id: record.params.id },
            relations: ['talks'],
          });
          console.log('Speaker new after - found speaker:', speaker);

          if (speaker) {
            if (record.params.talks && record.params.talks.length > 0) {
              console.log('Speaker new after - processing talks:', record.params.talks);
              const talks = await Talk.find({
                where: { id: In(record.params.talks) }
              });
              console.log('Speaker new after - found talks:', talks);
              speaker.talks = talks;
            }

            await speaker.save();
            console.log('Speaker new after - saved speaker:', speaker);
          }

          return response;
        },
      },
      edit: {
        before: async (request) => {
          console.log('Speaker edit before - request payload:', request.payload);
          const { talks, ...otherParams } = request.payload;
          const processedPayload = {
            ...otherParams,
            talks: talks ? (Array.isArray(talks) ? talks : [talks]).map(id => parseInt(id)) : [],
          };
          console.log('Speaker edit before - processed payload:', processedPayload);
          return {
            ...request,
            payload: processedPayload,
          };
        },
        after: async (response) => {
          console.log('Speaker edit after - response record:', response.record);
          const { record } = response;
          const speaker = await Speaker.findOne({
            where: { id: record.params.id },
            relations: ['talks'],
          });
          console.log('Speaker edit after - found speaker:', speaker);

          if (speaker) {
            if (record.params.talks && record.params.talks.length > 0) {
              console.log('Speaker edit after - processing talks:', record.params.talks);
              const talks = await Talk.find({
                where: { id: In(record.params.talks) }
              });
              console.log('Speaker edit after - found talks:', talks);
              speaker.talks = talks;
            } else {
              speaker.talks = [];
            }

            await speaker.save();
            console.log('Speaker edit after - saved speaker:', speaker);
          }

          return response;
        },
      },
    },
  },
}; 