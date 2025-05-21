import { AppBar, Box, Toolbar, Typography, Paper } from '@mui/material';
import { useGameStore } from '../../../entities/player/model/store';
import { formatNumber } from '../../../shared/lib';

export const GameHeader = () => {
  const { player } = useGameStore();
  const { resources } = player;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fantasy Clicker
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper
            sx={{
              px: 2,
              py: 1,
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Золото
            </Typography>
            <Typography variant="h6" color="secondary">
              {formatNumber(resources.gold.amount)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +{formatNumber(resources.gold.perClick)} за клик
              {resources.gold.perSecond > 0 && (
                <> / +{formatNumber(resources.gold.perSecond)} в сек</>
              )}
            </Typography>
          </Paper>
          <Paper
            sx={{
              px: 2,
              py: 1,
              background: 'rgba(123, 31, 162, 0.1)',
              border: '1px solid rgba(123, 31, 162, 0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Мана
            </Typography>
            <Typography variant="h6" color="primary">
              {formatNumber(resources.mana.amount)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +{formatNumber(resources.mana.perClick)} за клик
              {resources.mana.perSecond > 0 && (
                <> / +{formatNumber(resources.mana.perSecond)} в сек</>
              )}
            </Typography>
          </Paper>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 