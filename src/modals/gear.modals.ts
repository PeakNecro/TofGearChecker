import { randomEnum } from "./utils";

export enum GearType {
  Helmet, Shoulderguards, Suit, Wristguards, Belt, Legguards, Gloves, Boots
}

export enum EnhancementType {
  Attack, ElementalAttack, Hp, AllResist, ElementalResist, Crit
}

export enum GearRarity {
  Pure, Common, Rare, Epic, Legendary
}

export interface EnhancementRange {
  initial: number;
  minUpgrade: number;
  maxUpgrade: number;
}

export interface Range {
  min: number;
  max: number;
}

export class Gear {
  type: GearType = 0;
  enhancements: Map<EnhancementType, number> | null = null;
  stars: 0|1|2|3|4|5 = 0;
  rarity: GearRarity = 0;

  static Random(opts?: {rarity?: GearRarity, type?: GearType, stars?: 0|1|2|3|4|5}): Gear {
    const gear = new Gear();
    gear.type = opts?.type !== undefined ? Number(opts?.type) : randomEnum(GearType);
    gear.rarity = opts?.rarity !== undefined ? Number(opts?.rarity) : randomEnum(GearRarity);
    gear.stars = gear.rarity ? opts?.stars !== undefined ? opts.stars : Math.floor(Math.random() * 5) as 0|1|2|3|4|5 : 0;
    gear.enhancements = new Map<EnhancementType, number>();

    let stars = gear.stars;
    for(let i = 0; i < getEnhancementNumber(gear.rarity); i++) {
      const type = getRandomEnhancementType(gear.type, gear.enhancements);
      let thisStars = Math.floor(Math.random() * stars)
      if(i === getEnhancementNumber(gear.rarity) - 1) thisStars = stars;
      stars -= thisStars;
      const score = getRandomEnhancementScore(gear.rarity, type, thisStars);
      gear.enhancements.set(type, score);
    }

    return gear;
  }

  calculatePercentage(type: EnhancementType, score: number): number {
    if(this.stars === 0 || this.rarity === GearRarity.Pure) return 1;
    const range = gearRanges.get(this.rarity)?.get(type);

    if(!range) return -1;

    const maxScore = range.initial + range.maxUpgrade * this.stars;
    const minScore = range.initial;
    return (score - minScore)/(maxScore - minScore);
  }

  calculateNumberOfStars(type: EnhancementType, score: number): Range {
    if(this.rarity === GearRarity.Pure) return {min: 0, max: 0};
    const range = gearRanges.get(this.rarity)?.get(type);

    if(!range) return {min: -1, max: -1};

    const minStars = Math.ceil((score - range.initial) / range.minUpgrade);
    const maxStars = Math.ceil((score - range.initial) / range.maxUpgrade);
    return {min: minStars, max: maxStars};
  }
}

function getEnhancementNumber(rarity: GearRarity) {
  const enumber = rarity + 1;
  return enumber > 4 ? 4 : enumber;
}

function getRandomEnhancementType(gearType: GearType, enhancements: Map<EnhancementType, number>): EnhancementType {
  let e = gearType > 5 ? randomEnum(EnhancementType) : randomEnum(EnhancementType, 4);
  while(enhancements.has(e)) {
    e = gearType > 5 ? randomEnum(EnhancementType) : randomEnum(EnhancementType, 4);
  }
  return e;
}

function getRandomEnhancementScore(rarity: GearRarity, type: EnhancementType, stars: number): number {
  const range = gearRanges.get(rarity)?.get(type);

  if (!range) return 0;

  let score = range.initial;
  for(let i = 0; i < stars; i++) {
    score += Math.floor(Math.random() * (range.maxUpgrade - range.minUpgrade)) + range.minUpgrade;
  }

  return score;
}

export const gearRanges = new Map<GearRarity, Map<EnhancementType, EnhancementRange>>([
  // --- Pure ---
    [GearRarity.Pure, new Map<EnhancementType, EnhancementRange>([
      [EnhancementType.Attack, {
        initial: 4,
        minUpgrade: 0,
        maxUpgrade: 0
      }],
      [EnhancementType.ElementalAttack, {
        initial: 5,
        minUpgrade: 0,
        maxUpgrade: 0
      }],
      [EnhancementType.Crit, {
        initial: 18,
        minUpgrade: 0,
        maxUpgrade: 0
      }],
      [EnhancementType.Hp, {
        initial: 293,
        minUpgrade: 0,
        maxUpgrade: 0
      }],
      [EnhancementType.AllResist, {
        initial: 5,
        minUpgrade: 0,
        maxUpgrade: 0
      }],
      [EnhancementType.ElementalResist, {
        initial: 15,
        minUpgrade: 0,
        maxUpgrade: 0
      }]
    ])],
  // --- Common ---
    [GearRarity.Common, new Map<EnhancementType, EnhancementRange>([
      [EnhancementType.Attack, {
        initial: 7,
        minUpgrade: 3,
        maxUpgrade: 10
      }],
      [EnhancementType.ElementalAttack, {
        initial: 10,
        minUpgrade: 4,
        maxUpgrade: 13
      }],
      [EnhancementType.Crit, {
        initial: 37,
        minUpgrade: 17,
        maxUpgrade: 50
      }],
      [EnhancementType.Hp, {
        initial: 568,
        minUpgrade: 266,
        maxUpgrade: 797
      }],
      [EnhancementType.AllResist, {
        initial: 9,
        minUpgrade: 4,
        maxUpgrade: 12
      }],
      [EnhancementType.ElementalResist, {
        initial: 31,
        minUpgrade: 14,
        maxUpgrade: 41
      }]
    ])],
  // --- Rare ---
    [GearRarity.Rare, new Map<EnhancementType, EnhancementRange>([
      [EnhancementType.Attack, {
        initial: 15,
        minUpgrade: 13,
        maxUpgrade: 33
      }],
      [EnhancementType.ElementalAttack, {
        initial: 20,
        minUpgrade: 18,
        maxUpgrade: 44
      }],
      [EnhancementType.Crit, {
        initial: 73,
        minUpgrade: 66,
        maxUpgrade: 166
      }],
      [EnhancementType.Hp, {
        initial: 1171,
        minUpgrade: 1062,
        maxUpgrade: 2655
      }],
      [EnhancementType.AllResist, {
        initial: 18,
        minUpgrade: 17,
        maxUpgrade: 41
      }],
      [EnhancementType.ElementalResist, {
        initial: 122,
        minUpgrade: 166,
        maxUpgrade: 415
      }]
    ])],
  // --- Epic ---
    [GearRarity.Epic, new Map<EnhancementType, EnhancementRange>([
      [EnhancementType.Attack, {
        initial: 29,
        minUpgrade: 40,
        maxUpgrade: 100
      }],
      [EnhancementType.ElementalAttack, {
        initial: 39,
        minUpgrade: 53,
        maxUpgrade: 133
      }],
      [EnhancementType.Crit, {
        initial: 146,
        minUpgrade: 199,
        maxUpgrade: 498
      }],
      [EnhancementType.Hp, {
        initial: 2343,
        minUpgrade: 3186,
        maxUpgrade: 7966
      }],
      [EnhancementType.AllResist, {
        initial: 37,
        minUpgrade: 50,
        maxUpgrade: 124
      }],
      [EnhancementType.ElementalResist, {
        initial: 122,
        minUpgrade: 166,
        maxUpgrade: 415
      }]
    ])],
  // --- Legendary ---
    [GearRarity.Legendary, new Map<EnhancementType, EnhancementRange>([
      [EnhancementType.Attack, {
        initial: 52,
        minUpgrade: 93,
        maxUpgrade: 234
      }],
      [EnhancementType.ElementalAttack, {
        initial: 69,
        minUpgrade: 125,
        maxUpgrade: 312
      }],
      [EnhancementType.Crit, {
        initial: 258,
        minUpgrade: 468,
        maxUpgrade: 1169
      }],
      [EnhancementType.Hp, {
        initial: 4125,
        minUpgrade: 7480,
        maxUpgrade: 18700
      }],
      [EnhancementType.AllResist, {
        initial: 64,
        minUpgrade: 117,
        maxUpgrade: 292
      }],
      [EnhancementType.ElementalResist, {
        initial: 215,
        minUpgrade: 390,
        maxUpgrade: 974
      }]
    ])],
  ]);
