import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import AppRouter from "./components/AppRouter";
import GlobalStyle from "./theme/GlobalStyle";
import { theme } from "./theme/theme";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AppRouter />
          <GlobalStyle />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
