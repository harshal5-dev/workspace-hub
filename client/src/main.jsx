import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme";
import { TooltipProvider } from "./components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </ThemeProvider>
);
