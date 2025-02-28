'use client';

import styled from 'styled-components';
import { useState } from 'react';
import CardGrid from './components/CardGrid';
import CardFilter from './components/CardFilter';
import { flashcards, topics } from './data/flashcards';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: var(--font-geist-sans);
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <PageContainer>
      <Hero>
        <HeroTitle>Master Your Technical Interviews</HeroTitle>
        <HeroSubtitle>
          Practice with a curated collection of software engineering flashcards.
          From algorithms to system design - we&apos;ve got you covered.
        </HeroSubtitle>
      </Hero>

      <MainContent>
        <CardFilter
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicSelect={setSelectedTopic}
        />
        <CardGrid
          cards={flashcards}
          selectedTopic={selectedTopic}
        />
      </MainContent>
    </PageContainer>
  );
}