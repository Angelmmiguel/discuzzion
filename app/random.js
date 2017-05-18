// Generate random names and colors
const adjectives = ['strong', 'big', 'huge', 'awesome', 'grumpy', 'fast'],
  things = ['things', 'cat', 'rock', 'rocket', 'table', 'backpack'],
  colors = ['#f39508', '#54a986', '#2679ff', '#ae0adb', '#e20b0b', '#18c8e2'];

// Get a random name;
const name = () => {
  return adjectives[Math.floor(Math.random() * adjectives.length)] +
    '-' + things[Math.floor(Math.random() * things.length)];
}

// Return a random color
const color = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Export
module.exports = { color, name }
