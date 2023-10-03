//1. Initializations
const S = [
  [0, -1, -2, -3],
  [-4, -5, -6, -7],
  [-8, -9, -10, -11],
  [-12, -13, -14, 0],
];
const actions = ["up", "down", "left", "right"];

//2. Policy Evaluation
let delta = 0;
while (delta < 0.1) {
  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      v = S[i][j];
      S[i][j] = calculate_V(S[i][j]);
      const value_def = Math.abs(v - S[i][j]);
      delta = delta > value_def ? delta : value_def;
    }
  }
}

function calculate_V(s) {
  return actions.map((a) => {
    const p = 1;
    const reward = (s, a);
    const next_state_v = get_next_state_v(s, a);
    return p + reward + next_state_v;
  });
}

function get_next_state_v(s, a) {}

function get_reward(s, a) {}
