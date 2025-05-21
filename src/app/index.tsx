import { ThemeProvider } from './providers/ThemeProvider';
import { GamePage } from '../pages/game';

export const App = () => {
  return (
    <ThemeProvider>
      <GamePage />
    </ThemeProvider>
  );
}; 