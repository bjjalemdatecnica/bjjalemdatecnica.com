const assert = require('assert');
const {
  normalizeGender,
  renderVoteReminderNotification,
  voteReminderPtBR,
} = require('./notificationStrings.js');

assert.strictEqual(normalizeGender('male'), 'm');
assert.strictEqual(normalizeGender('female'), 'f');
assert.strictEqual(normalizeGender('Feminino'), 'f');

const mane = renderVoteReminderNotification({
  locale: 'pt-BR',
  user: { displayName: 'Mané', gender: 'male' },
  reminder: { roleKey: 'meditator' },
});
assert.ok(
  mane.includes('um meditador'),
  `expected "um meditador", got: ${mane}`,
);
assert.ok(!mane.toLowerCase().includes('meditator'), 'no English role word in pt-BR');
assert.ok(!mane.includes(' a medit'), 'no feminine article with male role');

const maria = renderVoteReminderNotification({
  locale: 'pt-BR',
  user: { displayName: 'Maria', gender: 'female' },
});
assert.ok(maria.includes('uma meditadora'), `got: ${maria}`);

assert.ok(
  voteReminderPtBR({ displayName: 'X', genderKey: 'm' }).includes('um meditador'),
);
assert.ok(
  voteReminderPtBR({ displayName: 'X', genderKey: 'f' }).includes('uma meditadora'),
);

const en = renderVoteReminderNotification({
  locale: 'en-US',
  user: { displayName: 'Alex', gender: 'female' },
});
assert.ok(en.includes('meditator'), `en copy keeps English role: ${en}`);

console.log('notificationStrings.test.js: ok');
