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
      fullName: {
        position: 2,
        isTitle: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
        type: 'string',
      },
      firstName: {
        isVisible: false,
      },
      lastName: {
        isVisible: false,
      },
      photo: {
        position: 3,
        type: 'string',
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
      },
      bio: {
        position: 4,
        type: 'richtext',
        isVisible: {
          list: false,
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
      position: {
        position: 6,
        type: 'string',
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      socialLinks: {
        position: 7,
        type: 'mixed',
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: true,
        },
      },
      talks: {
        position: 8,
        type: 'reference',
        reference: 'Talk',
        isArray: true,
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
        custom: {
          get: (record) => {
            if (record.talks) {
              // Если talks массив объектов с id
              if (Array.isArray(record.talks) && record.talks[0]?.id) {
                return record.talks.map(talk => talk.id);
              }
              // Если talks массив ID
              else if (Array.isArray(record.talks)) {
                return record.talks;
              }
              // Если talks объект с массивом talks
              else if (record.talks.talks) {
                return record.talks.talks.map(talk => talk.id);
              }
            }
            return [];
          },
          set: (value, record) => {
            if (value) {
              record.talks = value;
            } else {
              record.talks = [];
            }
          },
        },
        availableValues: async () => {
          console.log('Speaker talks availableValues - start');
          try {
            const talks = await Talk.find();
            console.log('Speaker talks availableValues - found talks:', talks);
            const values = talks.map(talk => ({
              value: talk.id,
              label: talk.title,
            }));
            console.log('Speaker talks availableValues - mapped values:', values);
            return values;
          } catch (error) {
            console.error('Speaker talks availableValues - error:', error);
            throw error;
          }
        },
      }
    },
    sort: {
      sortBy: 'id',
      direction: 'desc',
    },
    listProperties: ['id', 'fullName', 'photo', 'company', 'position', 'talks'],
    filterProperties: ['id', 'fullName', 'company', 'position', 'talks'],
    editProperties: ['fullName', 'photo', 'bio', 'company', 'position', 'socialLinks', 'talks'],
    showProperties: ['id', 'fullName', 'photo', 'bio', 'company', 'position', 'socialLinks', 'talks'],
    navigation: {
      name: 'Контент',
      icon: 'User',
    },
    actions: {
      new: {
        before: async (request) => {
          console.log('Speaker new before - request payload:', request.payload);
          const processedPayload = { ...request.payload };
          
          // Разбиваем fullName на firstName и lastName
          if (processedPayload.fullName) {
            const [firstName, ...lastNameParts] = processedPayload.fullName.split(' ');
            processedPayload.firstName = firstName;
            processedPayload.lastName = lastNameParts.join(' ');
            delete processedPayload.fullName;
          }
          
          // Собираем все talks из payload
          const talks = [];
          for (const key in processedPayload) {
            if (key.startsWith('talks.')) {
              talks.push(processedPayload[key]);
              delete processedPayload[key];
            }
          }
          
          processedPayload.talks = talks;
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
            // Получаем talks из request.payload, так как в record.params они могут быть в другом формате
            const talks = [];
            for (const key in record.params) {
              if (key.startsWith('talks.')) {
                talks.push(record.params[key]);
              }
            }
            
            console.log('Speaker new after - processing talks:', talks);
            
            if (talks.length > 0) {
              const talkEntities = await Talk.find({
                where: { id: In(talks) }
              });
              console.log('Speaker new after - found talks:', talkEntities);
              speaker.talks = talkEntities;
            } else {
              console.log('Speaker new after - no talks to process');
              speaker.talks = [];
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
          const processedPayload = { ...request.payload };
          
          // Разбиваем fullName на firstName и lastName
          if (processedPayload.fullName) {
            const [firstName, ...lastNameParts] = processedPayload.fullName.split(' ');
            processedPayload.firstName = firstName;
            processedPayload.lastName = lastNameParts.join(' ');
            delete processedPayload.fullName;
          }
          
          // Собираем все talks из payload
          const talks = [];
          for (const key in processedPayload) {
            if (key.startsWith('talks.')) {
              talks.push(processedPayload[key]);
              delete processedPayload[key];
            }
          }
          
          processedPayload.talks = talks;
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
            // Получаем talks из request.payload, так как в record.params они могут быть в другом формате
            const talks = [];
            for (const key in record.params) {
              if (key.startsWith('talks.')) {
                talks.push(record.params[key]);
              }
            }
            
            console.log('Speaker edit after - processing talks:', talks);
            
            if (talks.length > 0) {
              const talkEntities = await Talk.find({
                where: { id: In(talks) }
              });
              console.log('Speaker edit after - found talks:', talkEntities);
              speaker.talks = talkEntities;
            } else {
              console.log('Speaker edit after - no talks to process');
              speaker.talks = [];
            }

            await speaker.save();
            console.log('Speaker edit after - saved speaker:', speaker);
          }

          return response;
        },
      },
      show: {
        after: async (response) => {
          const { record } = response;
          if (record) {
            // Предзаполняем fullName
            record.params.fullName = `${record.params.firstName || ''} ${record.params.lastName || ''}`.trim();
            
            // Предзаполняем talks
            if (record.params.talks) {
              if (Array.isArray(record.params.talks)) {
                record.params.talks = record.params.talks.map(talk => talk.id);
              } else {
                record.params.talks = [];
              }
            } else {
              record.params.talks = [];
            }
            
            console.log('Speaker show after - processed talks:', record.params.talks);
          }
          return response;
        },
      },
    },
  },
}; 