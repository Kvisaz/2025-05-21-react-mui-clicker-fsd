import { Box, Paper, Typography } from '@mui/material';
import { useGameStore } from '../../../entities/player/model/store';

export const ClickArea = () => {
  const { click, player } = useGameStore();

  return (
    <Paper
      onClick={click}
      sx={{
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.1s',
        '&:active': {
          transform: 'scale(0.98)',
        },
        background: 'linear-gradient(45deg, #7b1fa2 30%, #4a0072 90%)',
        color: 'white',
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 200,
          mx: 'auto',
          mb: 2,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Typography variant="h2">✨</Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        Кликни для получения ресурсов
      </Typography>
      <Typography variant="body1" color="rgba(255, 255, 255, 0.7)">
        Всего кликов: {player.totalClicks}
      </Typography>
    </Paper>
  );
}; 