const RULES = {
  'Groceries': ['grocery', 'market', 'trader joe', 'whole foods', 'shoprite'],
  'Food & Drink': ['restaurant', 'cafe', 'chipotle', 'starbucks', 'pizza'],
  'Transportation': ['uber', 'lyft', 'gas', 'shell', 'exxon', 'mta'],
  'Shopping': ['amazon', 'target', 'walmart'],
  'Bills': ['verizon', 'comcast', 'electric', 'rent'],
  'Entertainment': ['netflix', 'spotify', 'movies'],
  'Income': ['payroll', 'deposit', 'salary']
};

export function categorize(description) {
  const desc = description.toLowerCase();

  for (const [category, keywords] of Object.entries(RULES)) {
    if (keywords.some(kw => desc.includes(kw))) {
      return category;
    }
  }

  return 'Other';
}
