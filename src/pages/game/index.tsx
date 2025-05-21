import { Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { GameHeader } from '../../widgets/gameHeader';
import { GameFooter } from '../../widgets/gameFooter';
import { UpgradeList } from '../../widgets/upgradeList';
import { ClickArea } from '../../features/clicking';
import { useGameStore } from '../../entities/player/model/store';

export const GamePage = () => {
  const { updateOfflineProgress } = useGameStore();

  // Update resources every second
  useEffect(() => {
    const interval = setInterval(() => {
      updateOfflineProgress();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateOfflineProgress]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        gap: 2
      }}>
        <GameHeader />
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <ClickArea />
          <UpgradeList />
        </Box>
        <GameFooter />
      </Box>
    </Container>
  );
}; 