/**
 * Localized notification bodies — no English tokens in pt-BR.
 * Role keys stay internal (e.g. meditator); surface copy is always localized.
 */

const ROLES_PT_BR = {
  meditator: { m: 'meditador', f: 'meditadora' },
};

const INDEFINITE_PT_BR = { m: 'um', f: 'uma' };

function normalizeGender(raw) {
  if (raw == null) return 'm';
  const g = String(raw).toLowerCase();
  if (g === 'f' || g === 'female' || g === 'feminine' || g === 'feminino' || g === 'mulher') return 'f';
  if (g === 'm' || g === 'male' || g === 'masculine' || g === 'masculino' || g === 'homem') return 'm';
  return 'm';
}

function voteReminderPtBR({ displayName, genderKey, roleKey = 'meditator' }) {
  const g = genderKey;
  const roles = ROLES_PT_BR[roleKey] || ROLES_PT_BR.meditator;
  const roleNoun = roles[g] || roles.m;
  const article = INDEFINITE_PT_BR[g] || INDEFINITE_PT_BR.m;
  const name = displayName || 'amigo';
  return `Ei ${name}, hora de provar que você é ${article} ${roleNoun}! Vamos fazer o seu voto de hoje?`;
}

function voteReminderEnUS({ displayName, roleKey = 'meditator' }) {
  const name = displayName || 'friend';
  return `Hey ${name}, time to prove you're a ${roleKey}! Ready to do your vote for today?`;
}

/**
 * @param {object} contract
 * @param {string} [contract.locale] BCP-47, default en-US
 * @param {{ displayName?: string, gender?: string }} contract.user
 * @param {{ roleKey?: string }} [contract.reminder]
 */
function renderVoteReminderNotification(contract) {
  const locale = (contract.locale || 'en-US').toLowerCase();
  const displayName = contract.user?.displayName;
  const genderKey = normalizeGender(contract.user?.gender);
  const roleKey = contract.reminder?.roleKey || 'meditator';

  if (locale === 'pt-br' || locale.startsWith('pt')) {
    return voteReminderPtBR({ displayName, genderKey, roleKey });
  }
  return voteReminderEnUS({ displayName, roleKey });
}

module.exports = {
  normalizeGender,
  renderVoteReminderNotification,
  voteReminderPtBR,
  ROLES_PT_BR,
  INDEFINITE_PT_BR,
};
