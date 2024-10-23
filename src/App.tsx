import { ThemeProvider } from "./lib/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "./components/ui/Tooltip";
import AppRoutes from "./Routes";
function App() {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={0}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
