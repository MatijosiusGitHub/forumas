import "./App.css";
import { BrowserRouter } from "react-router-dom";

// components
import AnimatedRoutes from "./components/AnimatedSlide/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
