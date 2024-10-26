import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import App from "./App.jsx";
import GridBackground from "./Components/ui/GridBackground";
import { BrowserRouter } from "react-router-dom";
const client = new ApolloClient({
  //Todo = > update the url on production level
  uri: "http://localhost:4000/graphql", // url for the graphql server
  cache: new InMemoryCache(), //appollo client uses to cache query results after fetching them
  credentials: 'include', // it tells appollo client to send cookies with every request
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>
);
