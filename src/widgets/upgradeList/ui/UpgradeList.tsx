import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { useGameStore } from '../../../entities/player/model/store';
import { formatNumber } from '../../../shared/lib';

export const UpgradeList = () => {
  const { upgrades, player, buyUpgrade } = useGameStore();
  const { resources } = player;

  return (
    <Grid container spacing={2}>
      {upgrades.map((upgrade) => {
        const canAfford = resources.gold.amount >= upgrade.cost;
        const isMaxLevel = upgrade.maxLevel && upgrade.level >= upgrade.maxLevel;

        return (
          <Grid
            component="div"
            sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}
            key={upgrade.id}
          >
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {upgrade.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {upgrade.description}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" color="text.secondary">
                  Уровень: {upgrade.level}
                  {upgrade.maxLevel && ` / ${upgrade.maxLevel}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Эффект: +{formatNumber(upgrade.effect.value)}
                  {upgrade.effect.type === 'perClick' ? ' за клик' : ' в секунду'}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={Boolean(!canAfford || isMaxLevel)}
                  onClick={() => buyUpgrade(upgrade.id)}
                >
                  {isMaxLevel
                    ? 'Макс. уровень'
                    : `Купить (${formatNumber(upgrade.cost)} золота)`}
                </Button>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}; 