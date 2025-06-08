import { trpc } from '~client/trpc';

export function DailyQuotes() {
  const { data: quote, isLoading, error } = trpc.quotes.getDailyQuote.useQuery(undefined, {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return (
      <div className="daily-quote-card">
        <div className="quote-header">
          <h3>Daily Motivation</h3>
        </div>
        <div className="quote-content">
          <p>Loading your daily inspiration...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="daily-quote-card">
        <div className="quote-header">
          <h3>Daily Motivation</h3>
        </div>
        <div className="quote-content">
          <p>Unable to load quote. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="daily-quote-card">
      <div className="quote-header">
        <h3>Daily Motivation</h3>
      </div>
      <div className="quote-content">
        <blockquote>
          <p>"{quote?.quote}"</p>
        </blockquote>
        <cite>~ {quote?.author}</cite>
      </div>
    </div>
  );
}