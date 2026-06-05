const https = require('https');
const fs = require('fs');
const path = require('path');

// Keywords that indicate a recipe contains meat/fish/seafood
const nonVegKeywords = [
  'chicken', 'beef', 'pork', 'lamb', 'mutton', 'fish', 'shrimp', 'prawn',
  'salmon', 'tuna', 'crab', 'lobster', 'clam', 'mussel', 'oyster', 'squid',
  'octopus', 'anchovy', 'bacon', 'ham', 'sausage', 'steak', 'meat',
  'turkey', 'duck', 'veal', 'ribs', 'seafood', 'meatball', 'pepperoni',
  'chorizo', 'ground beef', 'ground turkey', 'bone broth'
];

function isNonVeg(recipe) {
  const text = [
    recipe.name,
    ...(recipe.ingredients || []),
    ...(recipe.tags || [])
  ].join(' ').toLowerCase();

  return nonVegKeywords.some(keyword => text.includes(keyword));
}

https.get('https://dummyjson.com/recipes?limit=0', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const mapped = json.recipes.map(r => ({
      _id: r.id.toString(),
      title: r.name,
      type: isNonVeg(r) ? 'Non-Veg' : 'Veg',
      category: r.cuisine || (r.tags && r.tags[0]) || 'General',
      description: r.instructions ? r.instructions[0] : ('A delicious ' + r.name + ' recipe.'),
      ingredients: r.ingredients || [],
      steps: r.instructions || [],
      image: r.image,
      prepTime: r.prepTimeMinutes + ' min',
      cookTime: r.cookTimeMinutes + ' min',
      servings: r.servings,
      difficulty: r.difficulty
    }));

    const dir = path.join(__dirname, 'data');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(path.join(dir, 'recipes.json'), JSON.stringify(mapped, null, 2));

    const veg = mapped.filter(r => r.type === 'Veg');
    const nonVeg = mapped.filter(r => r.type === 'Non-Veg');
    console.log(`Saved ${mapped.length} recipes (${veg.length} Veg, ${nonVeg.length} Non-Veg)`);
    console.log('Veg categories:', [...new Set(veg.map(r => r.category))].join(', '));
    console.log('Non-Veg categories:', [...new Set(nonVeg.map(r => r.category))].join(', '));
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
