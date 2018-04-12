/**
 * This call generates a random name to be used by the player.
 */

class NameRandomizer {
  constructor() {
    this.nouns = [
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
      'Curse'
    ];

    this.adjectives = [
      'Abnormal',
      'Apprentice',
      'Awful',
      'Beautiful',
      'Berserk',
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
      'Fierce'
    ];

    this.getRandomName = this.getRandomName.bind(this);
  }

  /**
   * Returns a random name based on the list of possible words
   */
  getRandomName() {
    const noun = this.nouns[NameRandomizer.randomIntFromInterval(0, this.nouns.length - 1)];
    const adjective = this.adjectives[
      NameRandomizer.randomIntFromInterval(0, this.adjectives.length - 1)
    ];
    return noun.concat(adjective);
  }

  /**
   * Gives a random number between min and max,
   * credit to Francisc from Stackoverflow for this one
   */
  static randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default NameRandomizer;
