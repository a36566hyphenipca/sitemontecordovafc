// Liste des équipes (même ordre que dans les menus)
window.MC_TEAMS = [
  { name: 'Seniores', category: 'futebol-11' },
  { name: 'Veteranos', category: 'futebol-11' },
  { name: 'Jun A · S19', category: 'futebol-11' },
  { name: 'Jun B · S17', category: 'futebol-11' },
  { name: 'Jun C · S15', category: 'futebol-11' },
  { name: 'Jun D · S13', category: 'futebol-11' },
  { name: 'Jun E · S12', category: 'futebol-11' },
  { name: 'Jun D · S13', category: 'futebol-9' },
  { name: 'Jun D · S13', category: 'futebol-7' },
  { name: 'Jun D · S12', category: 'futebol-7' },
  { name: 'Jun E · S10', category: 'futebol-7' },
  { name: 'Jun E · S11', category: 'futebol-7' },
  { name: 'Jun F · S9', category: 'futebol-7' }
];

// identifiant d'une équipe, ex. "futebol-11-jun-b-s17"
window.MC_teamKey = function (team) {
  return team.category + '-' + team.name.toLowerCase().replace(/·/g, '').trim().replace(/\s+/g, '-');
};

// Branche deux <select> (catégorie + équipe) et appelle onChange(clé de l'équipe)
window.MC_setupTeamPicker = function (categorySelect, teamSelect, onChange) {
  const teams = window.MC_TEAMS;

  function fillTeams(selectedKey) {
    const options = teams
      .map((team, index) => ({ team, index }))
      .filter((item) => item.team.category === categorySelect.value);
    teamSelect.innerHTML = options
      .map((item) => `<option value="${window.MC_teamKey(item.team)}">${item.team.name}</option>`)
      .join('');
    if (selectedKey) teamSelect.value = selectedKey;
  }

  function change() { onChange(teamSelect.value); }

  categorySelect.addEventListener('change', () => { fillTeams(); change(); });
  teamSelect.addEventListener('change', change);

  function applyHash() {
    const key = decodeURIComponent(window.location.hash.slice(1));
    const team = teams.find((item) => window.MC_teamKey(item) === key);
    if (!team) return false;
    categorySelect.value = team.category;
    fillTeams(key);
    change();
    return true;
  }

  window.addEventListener('hashchange', applyHash);
  document.querySelectorAll('.dropdown-menu a').forEach((link) => {
    link.addEventListener('click', () => setTimeout(applyHash, 0));
  });

  fillTeams();
  if (!applyHash()) change();
};
