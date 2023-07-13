import { BrowserRouter, useLocation } from "react-router-dom";
import RouterPaths from "./Routes/RouterPaths";
import Header from "./components/Header/Header";

import AppContext from "./utils/context";
import { useEffect } from "react";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <BrowserRouter>
        <AppContext>
          <Header />
          <RouterPaths />
          <Newsletter />
          <Footer />
        </AppContext>
      </BrowserRouter>
    </>
  );
}

export default App;
