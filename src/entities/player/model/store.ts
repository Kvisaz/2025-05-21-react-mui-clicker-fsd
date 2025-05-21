import { create } from 'zustand';
import type { StateCreator } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import type { PersistOptions } from 'zustand/middleware';
import type { Player, Resource, ResourceType, Upgrade } from './types';

const INITIAL_RESOURCES: Record<ResourceType, Resource> = {
  gold: {
    type: 'gold',
    amount: 0,
    perClick: 1,
    perSecond: 0,
  },
  mana: {
    type: 'mana',
    amount: 0,
    perClick: 0,
    perSecond: 0,
  },
};

const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'goldClick',
    name: 'Улучшенный клик',
    description: 'Увеличивает количество золота за клик',
    cost: 10,
    resourceType: 'gold',
    effect: {
      type: 'perClick',
      value: 1,
    },
    level: 0,
  },
  {
    id: 'goldAuto',
    name: 'Золотой рудник',
    description: 'Автоматически добывает золото',
    cost: 50,
    resourceType: 'gold',
    effect: {
      type: 'perSecond',
      value: 1,
    },
    level: 0,
  },
  {
    id: 'manaClick',
    name: 'Магический клик',
    description: 'Добывает ману при клике',
    cost: 100,
    resourceType: 'mana',
    effect: {
      type: 'perClick',
      value: 1,
    },
    level: 0,
  },
  {
    id: 'manaAuto',
    name: 'Магический кристалл',
    description: 'Автоматически генерирует ману',
    cost: 200,
    resourceType: 'mana',
    effect: {
      type: 'perSecond',
      value: 1,
    },
    level: 0,
  },
];

type GameState = {
  player: Player;
  upgrades: Upgrade[];
  lastUpdateTime: number;
};

type GameActions = {
  click: () => void;
  buyUpgrade: (upgradeId: string) => void;
  updateOfflineProgress: () => void;
  saveGame: () => void;
};

type GameStore = GameState & GameActions;

type GameStorePersist = (
  config: StateCreator<GameStore>,
  options: PersistOptions<GameStore>
) => StateCreator<GameStore>;

export const useGameStore = create<GameStore>()(
  (persist as GameStorePersist)(
    (set, get) => ({
      player: {
        resources: INITIAL_RESOURCES,
        lastSaveTime: Date.now(),
        totalClicks: 0,
      },
      upgrades: INITIAL_UPGRADES,
      lastUpdateTime: Date.now(),

      click: () => {
        const { player, upgrades } = get();
        const newResources = { ...player.resources };

        console.log('upgrades', upgrades);

        // Apply per-click effects from upgrades
        upgrades.forEach((upgrade: Upgrade) => {
          if (upgrade.effect.type === 'perClick') {
            const resource = newResources[upgrade.resourceType];
            if (upgrade.resourceType === 'mana') {
              // Для маны добавляем базовое значение + эффект от улучшений
              resource.amount += (resource.perClick + upgrade.effect.value * upgrade.level);
              console.log('resource', resource);
            } else {
              // Для других ресурсов только эффект от улучшений
              resource.amount += upgrade.effect.value * upgrade.level;
            }
          }
        });

        // Add base click resources (только для золота)
        newResources.gold.amount += newResources.gold.perClick;

        set((state: GameState) => ({
          player: {
            ...state.player,
            resources: newResources,
            totalClicks: state.player.totalClicks + 1,
          },
        }));
      },

      buyUpgrade: (upgradeId: string) => {
        const { player, upgrades } = get();
        const upgrade = upgrades.find((u) => u.id === upgradeId);
        
        if (!upgrade) return;
        if (upgrade.maxLevel && upgrade.level >= upgrade.maxLevel) return;
        if (player.resources.gold.amount < upgrade.cost) return;

        const newResources = { ...player.resources };
        newResources.gold.amount -= upgrade.cost;

        const newUpgrades = upgrades.map((u) =>
          u.id === upgradeId ? { ...u, level: u.level + 1 } : u
        );

        // Apply upgrade effect
        if (upgrade.effect.type === 'perClick') {
          newResources[upgrade.resourceType].perClick += upgrade.effect.value;
        } else {
          newResources[upgrade.resourceType].perSecond += upgrade.effect.value;
        }

        set({
          player: {
            ...player,
            resources: newResources,
          },
          upgrades: newUpgrades,
        });
      },

      updateOfflineProgress: () => {
        const { player, upgrades, lastUpdateTime } = get();
        const now = Date.now();
        const timeDiff = (now - lastUpdateTime) / 1000; // Convert to seconds

        if (timeDiff <= 0) return;

        const newResources = { ...player.resources };

        // Apply per-second effects from upgrades
        upgrades.forEach((upgrade) => {
          if (upgrade.effect.type === 'perSecond') {
            const resource = newResources[upgrade.resourceType];
            // Добавляем базовое значение + эффект от улучшений
            const baseValue = resource.perSecond;
            const upgradeValue = upgrade.effect.value * upgrade.level;
            resource.amount += (baseValue + upgradeValue) * timeDiff;
          }
        });

        set({
          player: {
            ...player,
            resources: newResources,
            lastSaveTime: now,
          },
          lastUpdateTime: now,
        });
      },

      saveGame: () => {
        set((state) => ({
          player: {
            ...state.player,
            lastSaveTime: Date.now(),
          },
          lastUpdateTime: Date.now(),
        }));
      },
    }),
    {
      name: 'game-storage',
    }
  )
); 