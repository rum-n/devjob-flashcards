import styled from 'styled-components';
import Card from './Card';

interface CardData {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

interface CardGridProps {
  cards: CardData[];
  selectedTopic: string | null;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const CardGrid = ({ cards, selectedTopic }: CardGridProps) => {
  const filteredCards = selectedTopic
    ? cards.filter(card => card.topic === selectedTopic)
    : cards;

  return (
    <GridContainer>
      {filteredCards.map(card => (
        <Card
          key={card.id}
          topic={card.topic}
          question={card.question}
          answer={card.answer}
        />
      ))}
    </GridContainer>
  );
};

export default CardGrid;