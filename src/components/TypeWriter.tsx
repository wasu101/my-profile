'use client';
import { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const TypeWriter = ({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenWords = 2000 
}: TypeWriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];

      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        setCurrentText(currentText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypeWriter;