import { gameState } from "../saveData/saveOrLoadData.js";
import { addResetCheckSkill } from "../skills/updateMenu.js";
import { logger } from "../main.js";

const statsOutline = { //this is unused but a guide to know what stats look like

    accuracy: 0, //chance to hit
    strengthBonus: 0, //effects max hit
    defense: 0, //weakens opponents accuracy

    meleeAffinity: 0, // resistance multiplier against melee can be neg
    rangeAffinity: 0,
    magicAffinity: 0,

    attackSpeed: 0, //speed of attack

    healthBoost: 0, //improves health

      // rolls
    attackRoll: 0,
    defenseRoll: 0,

    // caps
    maxHit: 0,

    // multipliers
    accuracyMultiplier: 1,
    damageMultiplier: 1,
    defenseMultiplier: 1,
}

// attackerPrayer / defenderPrayer examples:
// { type: "boost", stat: "accuracy", pct: 0.15 }
// { type: "boost", stat: "strengthBonus", pct: 0.10 }
// { type: "boost", stat: "defense", pct: 0.20 }
// { type: "protect", style: "melee" }  // blocks melee damage


export function damage(
  attackerStats,
  defenderStats,
  attackerSkills,
  defenderSkills,
  attackerPrayer = null,
  defenderPrayer = null
) {
  const style = attackerStats.type; // "melee" | "ranged" | "magic"

  /* ----------------- PRAYERS ----------------- */
  const atkPrayer = getPrayerMultipliers(attackerPrayer, style);
  const defPrayer = getPrayerMultipliers(defenderPrayer, style);

  // Protection prayers = full block
  if (defPrayer.protectStyle === style) {
    return {
      hit: true,
      damage: 0,
      hitChance: 1,
      maxHit: 0
    };
  }

  /* ----------------- COMBAT TRIANGLE ----------------- */
  let triangleAcc = 1;
  let triangleDmg = 1;

  if (style === "melee" && defenderStats.type === "ranged") {
    triangleAcc = 1.10;
    triangleDmg = 1.05;
  } else if (style === "ranged" && defenderStats.type === "magic") {
    triangleAcc = 1.10;
    triangleDmg = 1.05;
  } else if (style === "magic" && defenderStats.type === "melee") {
    triangleAcc = 1.10;
    triangleDmg = 1.05;
  }

  /* ----------------- LEVEL RESOLUTION ----------------- */
  const atkLvls = getCombatLevels(style, attackerSkills);
  const defLevel = defenderSkills.defense;

  /* ----------------- ATTACK / DEFENSE ROLLS ----------------- */
  const attackRoll =
    (atkLvls.accuracyLevel * 3 + attackerStats.accuracy) *
    attackerStats.accuracyMultiplier *
    atkPrayer.accuracyMultiplier *
    triangleAcc;

  const defenseRoll =
    (defLevel * 3 + defenderStats.defense) *
    defenderStats.defenseMultiplier *
    defPrayer.defenseMultiplier;

  /* ----------------- HIT CHANCE ----------------- */
  let hitChance = attackRoll / (attackRoll + defenseRoll);
  hitChance = Math.max(0.05, Math.min(0.95, hitChance));

  if (Math.random() > hitChance) {
    return {
      hit: false,
      damage: 0,
      hitChance,
      maxHit: 0
    };
  }

  /* ----------------- MAX HIT (THIS IS THE FIX) ----------------- */
  // RuneScape-like scaling:
  // strength level matters MOST
  const baseMax =
    atkLvls.strengthLevel * 2.5 +        // 120 → ~300
    attackerStats.strengthBonus * 6 +    // gear matters
    50;                                  // base floor

  const maxHit = Math.floor(
    baseMax *
    attackerStats.damageMultiplier *
    atkPrayer.damageMultiplier *
    triangleDmg
  );

  /* ----------------- ROLL DAMAGE ----------------- */
  let dmg = Math.floor(Math.random() * (maxHit + 1));

  /* ----------------- AFFINITY MITIGATION ----------------- */
  const affinity =
    style === "melee" ? defenderStats.meleeAffinity :
    style === "ranged" ? defenderStats.rangeAffinity :
    defenderStats.magicAffinity;

  dmg = Math.floor(dmg * (1 - affinity / 100));
  dmg = Math.max(1, dmg);

  return {
    hit: true,
    damage: dmg,
    hitChance,
    maxHit
  };
}





function applyCombatTriangle(attackerType, defenderType) {
  // tweak these whenever you want
  let accuracyMult = 1;
  let damageMult = 1;

  if (attackerType === "melee" && defenderType === "ranged") {
    accuracyMult = 1.10;
    damageMult = 1.05;
  } else if (attackerType === "ranged" && defenderType === "magic") {
    accuracyMult = 1.10;
    damageMult = 1.05;
  } else if (attackerType === "magic" && defenderType === "melee") {
    accuracyMult = 1.10;
    damageMult = 1.05;
  }

  return { accuracyMult, damageMult };
}


function getPrayerMultipliers(prayer, style) {
  const mult = {
    accuracyMultiplier: 1,
    damageMultiplier: 1,
    defenseMultiplier: 1,
    protectStyle: null,
  };

  if (!prayer) return mult;

  if (prayer.type === "boost") {
    const pct = prayer.pct ?? 0;

    if (prayer.stat === "accuracy") mult.accuracyMultiplier += pct;
    if (prayer.stat === "strengthBonus") mult.damageMultiplier += pct;
    if (prayer.stat === "defense") mult.defenseMultiplier += pct;
  }

  if (prayer.type === "protect") {
    mult.protectStyle = prayer.style ?? null;
  }

  return mult;
}

function getCombatLevels(style, skills) {
  if (style === "melee") {
    return {
      accuracyLevel: skills.attack,
      strengthLevel: skills.strength
    };
  }

  if (style === "ranged") {
    return {
      accuracyLevel: skills.ranged,
      strengthLevel: skills.ranged
    };
  }

    if (style === "magic") {
        return {
        accuracyLevel: skills.magic,
        strengthLevel: skills.magic
        };
    }
    return {
      accuracyLevel: skills.attack,
      strengthLevel: skills.strength
    };

}


//test people
const person1Stats = {
  type: "magic",

  accuracy: 3000, //wep power armor
  strengthBonus: 40, //wep
  defense: 40, //armor

  meleeAffinity: 25, //armor shields
  rangeAffinity: 50, //armor shields
  magicAffinity: -50, //armor shields

  attackSpeed: 4, //wep
  healthBoost: 10, //shields

  accuracyMultiplier: 2,
  damageMultiplier: 2,
  defenseMultiplier: 2,
};
const person1Skills = {
  attack: 120,
  strength: 120,
  defense: 120,
  ranged: 120,
  magic: 120,
};


const person2Stats = {
  type: "ranged",

  accuracy: 0,
  strengthBonus: 0,
  defense: 0,

  meleeAffinity: -50,
  rangeAffinity: 25,
  magicAffinity: 50,

  attackSpeed: 3,
  healthBoost: 6,

  accuracyMultiplier: 1,
  damageMultiplier: 1,
  defenseMultiplier: 1,
};

const person2Skills = {
  attack: 1,
  strength: 1,
  defense: 1,
  ranged: 1,
  magic: 1,
};

const person3Stats = {
  type: "melee",

  accuracy: 300000,
  strengthBonus: 400,
  defense: 400,

  meleeAffinity: 25,
  rangeAffinity: 50,
  magicAffinity: -50,

  attackSpeed: 4,
  healthBoost: 10,

  accuracyMultiplier: 5,
  damageMultiplier: 5,
  defenseMultiplier: 5,
};
const person3Skills = {
  attack: 300,
  strength: 300,
  defense: 300,
  ranged: 300,
  magic: 300,
};



export function testDamage(){
    const result = damage( person1Stats, person2Stats, person1Skills, person2Skills);
    const result2 = damage( person1Stats, person3Stats, person1Skills, person3Skills);
    const result3 = damage( person2Stats, person3Stats, person2Skills, person3Skills);
    const result4 = damage( person2Stats, person2Stats, person2Skills, person2Skills);

    const allResults = {
        1: result,
        2: result2,
        3: result3,
        4: result4
    }

    Object.entries(allResults).forEach(([key, value]) => {
        logger(`mode${key} ${value.damage} ${Math.round(value.hitChance * 100)/100} ${value.maxHit}`);
    })



}

