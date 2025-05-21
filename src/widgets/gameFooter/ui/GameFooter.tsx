import { Box, Typography, Link } from '@mui/material';
import { useGameStore } from '../../../entities/player/model/store';
import { useEffect } from 'react';

export const GameFooter = () => {
  const { updateOfflineProgress, saveGame } = useGameStore();

  // Update offline progress when component mounts
  useEffect(() => {
    updateOfflineProgress();
  }, [updateOfflineProgress]);

  // Save game periodically
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame();
    }, 10000); // Save every 10 seconds

    return () => clearInterval(interval);
  }, [saveGame]);

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 'auto',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Fantasy Clicker © {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        Игра автоматически сохраняется каждые 10 секунд
      </Typography>
      <Link
        href="https://github.com/yourusername/fantasy-clicker"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'text.secondary', textDecoration: 'none' }}
      >
        GitHub
      </Link>
    </Box>
  );
}; 