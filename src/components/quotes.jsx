import { useState, useEffect } from 'react';

export const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const FetchQuote = async () => {
      try {
        const Response = await fetch('https://api.quotable.io/random');
        const Data = await Response.json();
        setQuote(Data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    // Fetch a new quote when the component mounts
    FetchQuote();

    // Fetch a new quote every 10 seconds (adjust the interval as needed)
    const IntervalId = setInterval(FetchQuote, 4000);

    // Clear the interval when the component unmounts
    return () => clearInterval(IntervalId);
  }, []);

  return (
    <div className="py-8 px-6 text-sm text-gray-400 h-auto">
      <blockquote>
        <i>{quote}</i>
      </blockquote>
    </div>
  );
};
