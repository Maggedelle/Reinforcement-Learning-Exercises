//1. Initializations
const S = [
  [{ v: 0, id: 0 }, { v: -1, id: 1 }, { v: -2, id: 2 }, { v: -3, id: 3 }],
  [{ v: -4, id: 4 }, { v: -5, id: 5 }, { v: -6, id: 6 }, { v: -7, id: 7 }],
  [{ v: -8, id: 8 }, { v: -9, id: 9 }, { v: -10, id: 10 }, { v: -11, id: 11 }],
  [{ v: -12, id: 12 }, { v: -13, id: 13 }, { v: -14, id: 14 }, { v: 0, id: 14 }],
];
const actions = ["up", "down", "left", "right"];




//2. Policy Evaluation
let delta = 0;
while (delta < 0.1) {
  for (let i = 0; i < S.length; i++) {
    for (let j = 0; j < S[i].length; j++) {
      if ((i != 0 || j != 0) && (i != 3 || j != 3)) {
        v = S[i][j].v;
        S[i][j].v = calculate_V(S[i][j]);
        const value_def = Math.abs(v - S[i][j].v);
        delta = delta > value_def ? delta : value_def;
      }
    }
  }
}



function calculate_V(s) {
  let v = 0;
  actions.map((a) => {
    const p = 1;
    const reward = -1;
    const next_state_v = get_next_state_v(s, a);
    v += p + reward + next_state_v;
  });
  return v;
}

function get_next_state_v(s, a) {
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

  if (state) return state.v;
  else return s.v;
}

function get_state_by_id(id) {
  let state = null;
  S.forEach(i => {
    const s = i.find(state => state.id == id);
    if (s != null) state = s;
  })


  return state;
}

function get_reward(s, a) { }
