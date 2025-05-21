import { Container, Box } from '@mui/material';
import { GameHeader } from '../../widgets/gameHeader';
import { GameFooter } from '../../widgets/gameFooter';
import { UpgradeList } from '../../widgets/upgradeList';
import { ClickArea } from '../../features/clicking';

export const GamePage = () => {
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