//1. Initializations
const S = [
  [
    { v: 0, id: 0 },
    { v: -1, id: 1 },
    { v: -2, id: 2 },
    { v: -3, id: 3 },
  ],
  [
    { v: -4, id: 4 },
    { v: -5, id: 5 },
    { v: -6, id: 6 },
    { v: -7, id: 7 },
  ],
  [
    { v: -8, id: 8 },
    { v: -9, id: 9 },
    { v: -10, id: 10 },
    { v: -11, id: 11 },
  ],
  [
    { v: -12, id: 12 },
    { v: -13, id: 13 },
    { v: -14, id: 14 },
    { v: 0, id: 15 },
  ],
];
const actions = ["up", "down", "left", "right"];
const policy = [
  ["up"],
  ["down"],
  ["left"],
  ["right"],
  ["up"],
  ["down"],
  ["left"],
  ["right"],
  ["up"],
  ["down"],
  ["left"],
  ["right"],
  ["up"],
  ["down"],
  ["left"],
  ["right"],
];

let terminate = false;

while (!terminate) {
  console.log("Running Policy Evaluation");
  policy_evaluation();
  console.log("Running Policy Improvement");
  let policy_stable = policy_improvement();
  if (policy_stable) terminate = true;
}

console.log(policy);

//2. Policy Evaluation
function policy_evaluation() {
  let delta = null;
  while (delta == null || delta >= 1.1) {
    delta = 0;
    for (let i = 0; i < S.length; i++) {
      for (let j = 0; j < S[i].length; j++) {
        if (S[i][j].id != 0 && S[i][j].id != 15) {
          v = S[i][j].v;
          S[i][j].v = calculate_V(S[i][j]);
          const value_def = Math.abs(v - S[i][j].v);
          delta = delta > value_def ? delta : value_def;
        }
      }
    }
  }
}

//3. Policy Improvement
function policy_improvement() {
  let policy_stable = true;
  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      if (S[i][j].id != 0 && S[i][j].id != 15) {
        let old_action = policy[S[i][j].id];
        let q = null;
        actions.map((action) => {
          q_temp = calculate_Q(S[i][j], action);
          if (q == null || q_temp > q) {
            q = q_temp;
            policy[S[i][j].id] = action;
          }
        });
        if (old_action != policy[S[i][j].id]) {
          policy_stable = false;
        }
      }
    }
  }
  return policy_stable;
}

console.log(S);

function calculate_Q(s, a) {
  let next_state = get_next_state(s, a);
  return 1 * (-1 + next_state.v);
}
function calculate_V(s) {
  let next_state = get_next_state(s, policy[s.id]);
  return 1 * (-1 + next_state.v);
}

function get_next_state(s, a) {
  let state = null;
  switch (a) {
    case "up":
      state = get_state_by_id(s.id - 4);
      break;
    case "down":
      state = get_state_by_id(s.id + 4);
      break;
    case "left":
      state = get_state_by_id(s.id - 1);
      break;
    case "right":
      state = get_state_by_id(s.id + 1);
      break;
  }
  if (!state) return s;
  return state;
}

function get_next_state_v(s, a) {
  let state = get_next_state(s, a);
  if (state) return state.v;
  else return s.v;
}

function get_state_by_id(id) {
  let state = null;
  S.forEach((i) => {
    const s = i.find((state) => state.id == id);
    if (s != null) state = s;
  });
  return state;
}

function get_reward(s, a) {
  return get_next_state(s, a).id == 0 || get_next_state(s, a).id == 14 ? 0 : -1;
}
