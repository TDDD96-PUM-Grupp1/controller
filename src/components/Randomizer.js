/**
 * This call generates a random name to be used by the player.
 */

const nouns = [
<<<<<<< HEAD
  'Amulet',
  'Beast',
  'Beauty',
  'Bersek',
  'Brew',
  'Castle',
  'Cave',
  'Crow',
  'Curse',
  'Demon',
=======
  'Alchemist',
  'Amulet',
  'Apprentice',
  'Beast',
  'Beauty',
  'Bersek',
  'Bogeyman',
  'Brew',
  'Castle',
  'Cauldron',
  'Cave',
  'Chalice',
  'Creature',
  'Crow',
  'Curse',
  'Demon',
  'Detective',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Dragon',
  'Dream',
  'Dwarf',
  'Elf',
  'Empire',
  'Fairy',
  'Ghost',
  'Giant',
  'Gifts',
  'Gnome',
  'Goblin',
<<<<<<< HEAD
  'Gowns',
  'Hag',
  'Herbs',
  'Horror',
  'Imp',
=======
  'Godmother',
  'Gowns',
  'Graveyard',
  'Hag',
  'Harbinger',
  'Herbs',
  'Horror',
  'Illusion',
  'Imp',
  'Incantation',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Joker',
  'Kettle',
  'King',
  'Kingdom',
  'Lands',
  'Legend',
<<<<<<< HEAD
=======
  'Leprechauns',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Lore',
  'Magic',
  'Magician',
  'Majesty',
  'Mask',
  'Medium',
  'Miracle',
  'Monster',
  'Moon',
  'Muse',
  'Mystery',
  'Myth',
  'Nature',
<<<<<<< HEAD
=======
  'Necromancer',
  'Necromancy',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Nemesis',
  'Newt',
  'Ogre',
  'Oracle',
  'Owl',
  'Pixie',
  'Potion',
  'Powder',
  'Power',
  'Prey',
  'Prince',
  'Princess',
  'Prophet',
  'Queen',
  'Quest',
  'Quiver',
  'Realm',
  'Reign',
  'Robe',
  'Rule',
  'Sandman',
  'Scroll',
  'Seer',
  'Shaman',
<<<<<<< HEAD
=======
  'Soothsayer',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Sorcerer',
  'Sorcery',
  'Specter',
  'Spell',
  'Spider',
  'Spirit',
  'Star',
  'Story',
<<<<<<< HEAD
=======
  'Superstition',
  'Talisman',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Theory',
  'Torch',
  'Trick',
  'Troll',
  'Unicorn',
  'Vampire',
  'Vanguard',
  'Victim',
<<<<<<< HEAD
=======
  'Visionary',
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
  'Wand',
  'Ward',
  'Werewolf',
  'Whisper',
  'Wish',
  'Witch',
<<<<<<< HEAD
  'Youth',
=======
  'Youth'
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
];

const adjectives = [
  'Abnormal',
  'Awful',
  'Beautiful',
  'Bewitched',
  'Bizarre',
  'Captivated',
  'Charismatic',
  'Charming',
  'Cruel',
  'Dancing',
  'Delirious',
  'Dramatic',
  'Enchanting',
  'Evil',
  'Familiar',
  'Fantastic',
  'Fascinating',
  'Fierce',
  'Forged',
  'Glimmering',
  'Grateful',
  'Grim',
  'Grotesque',
  'Helpful',
  'Heroic',
  'Horrifying',
  'Imaginary',
  'Impressive',
  'Informative',
  'Ingenious',
  'Invisible',
  'Kidnapping',
  'Legendary',
  'Lucky',
  'Magical',
  'Malevolent',
  'Medieval',
  'Mischievous',
  'Mysterious',
  'Mystical',
  'Mythical',
  'Odd',
  'Otherworldly',
  'Overpowered',
  'Petrifying',
  'Poisonous',
  'Potent',
  'Powerful',
  'Raging',
  'Reasoning',
  'Scolded',
  'Seeking',
  'Supernatural',
  'Terrifying',
  'Thrilling',
  'Tragic',
  'Transformed',
  'Unbelievable',
  'Unexplained',
  'Unique',
  'Unusual',
  'Valiant',
  'Venomous',
  'Vice',
  'Vicious',
  'Visionary',
  'Vital',
  'Watchful',
  'Weird',
  'Western',
  'Whimsical',
  'Wicked',
  'Wise',
<<<<<<< HEAD
  'Wrinkled',
=======
  'Wrinkled'
>>>>>>> 6227798c09fc8603d906bc8bdd3ec586e9fbd325
];

/**
 * Gives a random number between min and max,
 * credit to Francisc from Stackoverflow for this one
 */
export function randomIntFromInterval(length) {
  return Math.floor(Math.random() * length);
}
/**
 * Returns a random name based on the list of possible words
 */
export function getRandomName() {
  const noun = nouns[randomIntFromInterval(nouns.length)];
  const adjective = adjectives[randomIntFromInterval(adjectives.length)];
  return adjective.concat(` ${noun}`);
}
