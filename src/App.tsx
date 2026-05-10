import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProgressProvider } from './context/UserProgressContext';
import { HomePage } from './pages/HomePage';
import { ScenePage } from './pages/ScenePage';
import { GamePage } from './pages/GamePage';
import { ResultPage } from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <UserProgressProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scene/:sceneId" element={<ScenePage />} />
          <Route path="/game/:sceneId/:difficulty" element={<GamePage />} />
          <Route path="/result/:sceneId/:difficulty/:score/:total/:stars" element={<ResultPage />} />
        </Routes>
      </UserProgressProvider>
    </BrowserRouter>
  );
}

export default App;
