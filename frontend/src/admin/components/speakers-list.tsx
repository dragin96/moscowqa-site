import React from 'react';
import { Box, Label } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const SpeakersList: React.FC<BasePropertyProps> = (props) => {
  const { record, property } = props;
  const speakers = record.params[property.path] || [];

  return (
    <Box>
      <Label>{property.label}</Label>
      <Box>
        {speakers.map((speaker: any) => (
          <Box key={speaker.id} style={{ marginBottom: '4px' }}>
            {speaker.firstName} {speaker.lastName}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SpeakersList; 