import React, { useEffect, useState } from 'react';
import { Box, Label, Select } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const SpeakersSelect: React.FC<BasePropertyProps> = (props) => {
  const { onChange, property, record } = props;
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch('/api/speakers');
        const data = await response.json();
        setSpeakers(data);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  const options = speakers.map((speaker: any) => ({
    value: speaker.id,
    label: `${speaker.firstName} ${speaker.lastName}`,
  }));

  const selectedValues = record.params[property.path]?.map((speaker: any) => speaker.id) || [];

  return (
    <Box>
      <Label>{property.label}</Label>
      <Select
        isMulti
        value={selectedValues}
        onChange={(selected) => {
          const selectedSpeakers = speakers.filter((speaker: any) =>
            selected.includes(speaker.id)
          );
          onChange(property.path, selectedSpeakers);
        }}
        options={options}
        isLoading={loading}
      />
    </Box>
  );
};

export default SpeakersSelect; 