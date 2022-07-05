import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Home";

function App() {
  return (
    <ChakraProvider w="100%" h="100%">
      <Home />
    </ChakraProvider>
  );
}
export default App;
