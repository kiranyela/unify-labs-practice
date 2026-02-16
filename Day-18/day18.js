    class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;

    this._health = 100;
    this.hunger = 0;   // 0 = full, 100 = starving
    this.energy = 100; // 100 = full energy
  }

  // Getter for health
  get health() {
    return this._health;
  }

  // Setter for health to enforce bounds (0-100)
  set health(value) {
    if (value > 100) {
      this._health = 100;
    } else if (value < 0) {
      this._health = 0;
    } else {
      this._health = value;
    }
  }

  /**
   * Feeds the pet.
   * Decreases hunger and slightly restores health.
   */
  feed() {
    console.log(`${this.name} is eating... yummy!`);
    this.hunger = Math.max(0, this.hunger - 20); // Decrease hunger, min 0
    this.energy = Math.min(100, this.energy + 10); // Boost energy
    this.health += 5; // Use the setter to automatically clamp at 100
  }

  /**
   * Plays with the pet.
   * Increases hunger and decreases energy.
   */
  play() {
    if (this.energy < 20) {
      console.log(`${this.name} is too tired to play.`);
      return;
    }

    console.log(`${this.name} is playing happily!`);
    this.hunger = Math.min(100, this.hunger + 15); // Increase hunger
    this.energy = Math.max(0, this.energy - 20);   // Drain energy
    // Playing might inherently carry a small risk or just maintain health, 
    // but usually, we don't modify health here unless injured.
  }

  /**
   * Returns a snapshot of the pet's current status.
   */
  getStatus() {
    return {
      name: this.name,
      type: this.type,
      health: this.health,
      hunger: this.hunger,
      energy: this.energy,
      mood: this.calculateMood()
    };
  }

  // Helper method to determine mood based on stats
  calculateMood() {
    if (this.health < 30) return "Sick";
    if (this.hunger > 70) return "Hangry";
    if (this.energy < 30) return "Sleepy";
    return "Happy";
  }
}
const myTamagotchi = new Pet("Pixel", "Cyber-Cat");

console.log("Initial Status:", myTamagotchi.getStatus());

myTamagotchi.play();
myTamagotchi.play();
myTamagotchi.play();

console.log("After playing:", myTamagotchi.getStatus());

myTamagotchi.feed();

myTamagotchi.health = 150;
console.log("Health after invalid set:", myTamagotchi.health); // Should be 100