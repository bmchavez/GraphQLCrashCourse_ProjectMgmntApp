import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import Clients from './components/Clients';
// import Projects from './components/Projects';
// import AddClientModal from './components/AddClientModal';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache(), <= this line isn't needed since we are saving the `new InMemoryCache()` to the `cache` variable above
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            {/* <AddClientModal />
            <Projects />
            <Clients /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
