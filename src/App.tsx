import { ThemeProvider } from './app/providers/ThemeProvider';
import { GamePage } from './pages/game';

const App = () => {
  return (
    <ThemeProvider>
      <GamePage />
    </ThemeProvider>
  );
};

export default App;
