import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Game from "./pages/Game";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Welcome />}/>
        <Route path="game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;