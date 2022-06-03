import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Comments from './components/comments/Comments';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import AllQuotes from './pages/AllQuotes';

// import NotFound from './pages/NotFound';
// import QuoteDetail from './pages/QuoteDetail';
// import NewQuote from './pages/NewQuote';
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
   return (
      <Layout>
         <Suspense
            fallback={
               <div className="centered">
                  <LoadingSpinner />
               </div>
            }
         >
            <Routes>
               <Route path="/" element={<Navigate to="/quotes" />} />
               <Route path="/quotes" element={<AllQuotes />} />
               <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
                  <Route path="comments" element={<Comments />} />
               </Route>
               <Route path="/new-quote" element={<NewQuote />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Suspense>
      </Layout>
   );
}

export default App;
