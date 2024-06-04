import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './RouterIndex';
function App() {
  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
