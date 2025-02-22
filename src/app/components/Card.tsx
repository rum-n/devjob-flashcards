import styled from 'styled-components';
import { useState } from 'react';

import { useAIFeedback } from '../hooks/useAIFeedback';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface CardProps {
  topic: string;
  question: string;
  answer: string;
}

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'none'};
  `;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled(CardSide)`
  background-color: white;
  display: flex;
`;

const CardBack = styled(CardSide)`
  background-color: #f0f9ff;
  transform: rotateY(180deg);
`;

const Topic = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const Question = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: auto;
`;

const Answer = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
`;

const AIFeedbackButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2563eb;
  }
`;

const FeedbackText = styled.p`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const Card = ({ topic, question, answer }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, startListening, stopListening } = useSpeechRecognition();
  const { evaluateExplanation } = useAIFeedback();

  const handleAIFeedback = async () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
      // Send transcript to AI for evaluation
      if (transcript) {
        console.log('Transcript:', transcript);
        const response = await evaluateExplanation(transcript, answer);
        setFeedback(response);
      }
    } else {
      setFeedback('');
      setIsRecording(true);
      startListening();
    }
  };

  return (
    <CardContainer onClick={() => !isRecording && setIsFlipped(!isFlipped)}>
      <CardInner isFlipped={isFlipped}>
        <CardFront>
          <Topic>{topic}</Topic>
          <Question>{question}</Question>
          <AIFeedbackButton onClick={(e) => {
            e.stopPropagation();
            handleAIFeedback();
          }}>
            {isRecording ? 'Stop Recording' : 'Explain to AI'}
          </AIFeedbackButton>
        </CardFront>
        <CardBack>
          <Answer>{answer}</Answer>
          {feedback && <FeedbackText>{feedback}</FeedbackText>}
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default Card;