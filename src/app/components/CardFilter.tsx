import styled from 'styled-components';

interface CardFilterProps {
  topics: string[];
  selectedTopic: string | null;
  onTopicSelect: (topic: string | null) => void;
}

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: 2px solid ${props => props.isSelected ? '#3b82f6' : '#e5e7eb'};
  background-color: ${props => props.isSelected ? '#3b82f6' : 'transparent'};
  color: ${props => props.isSelected ? 'white' : '#000'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.isSelected ? '#2563eb' : '#3b82f6'};
  }
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  border: none;
  background-color: transparent;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #374151;
    background-color: #f3f4f6;
  }
`;

const FilterTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #374151;
`;

const CardFilter = ({ topics, selectedTopic, onTopicSelect }: CardFilterProps) => {

  const handleTopicSelect = (topic: string) => {
    onTopicSelect(topic);
  };

  const handleClearFilter = () => {
    onTopicSelect(null);
  };

  return (
    <FilterContainer>
      <FilterTitle>Filter by Topic</FilterTitle>
      {topics.map(topic => (
        <FilterButton
          key={topic}
          isSelected={selectedTopic === topic}
          onClick={() => handleTopicSelect(topic)}
        >
          {topic}
        </FilterButton>
      ))}
      {selectedTopic && (
        <ClearButton onClick={handleClearFilter}>
          Clear Filter
        </ClearButton>
      )}
    </FilterContainer>
  );
};

export default CardFilter;