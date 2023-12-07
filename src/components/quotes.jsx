import { useState, useEffect } from 'react';

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    // Fetch a new quote when the component mounts
    fetchQuote();

    // Fetch a new quote every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchQuote, 4000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-8 px-6 text-sm text-gray-400 h-auto">
      <blockquote>
        <i>{quote}</i>
      </blockquote>
    </div>
  );
};
