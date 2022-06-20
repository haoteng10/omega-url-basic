import WebsiteList from "./components/WebsiteList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// setup apollo
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>OmegaURL</h1>
        <WebsiteList />
      </div>
    </ApolloProvider>
  );
}

export default App;
