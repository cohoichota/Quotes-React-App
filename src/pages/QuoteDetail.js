import { Fragment, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
   const params = useParams();
   const { quoteId } = params;

   const {
      sendRequest,
      status,
      data: loadedQuote,
      error,
   } = useHttp(getSingleQuote, true);

   useEffect(() => {
      sendRequest(quoteId);
   }, [sendRequest, quoteId]);

   // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

   if (status === 'pending') {
      return (
         <div className="centered">
            <LoadingSpinner />
         </div>
      );
   }

   if (error) {
      return <p className="centered focused">{error}</p>;
   }

   if (!loadedQuote.text) {
      return <p>No quote found!</p>;
   }

   return (
      <Fragment>
         <HighlightedQuote
            quote={loadedQuote.id}
            text={loadedQuote.text}
            author={loadedQuote.author}
         />
         <div className="centered">
            <Link className="btn--flat" to="comments">
               Load Comments
            </Link>
         </div>
         <Outlet />
      </Fragment>
   );
};

export default QuoteDetail;
