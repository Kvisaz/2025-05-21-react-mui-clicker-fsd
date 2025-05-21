export type ResourceType = 'gold' | 'mana';

export interface Resource {
  type: ResourceType;
  amount: number;
  perClick: number;
  perSecond: number;
}

export interface Player {
  resources: Record<ResourceType, Resource>;
  lastSaveTime: number;
  totalClicks: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  resourceType: ResourceType;
  effect: {
    type: 'perClick' | 'perSecond';
    value: number;
  };
  level: number;
  maxLevel?: number;
} 