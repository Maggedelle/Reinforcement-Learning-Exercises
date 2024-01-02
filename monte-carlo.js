let S = [0, 0.5, 0.5, 0.5, 0.5, 0.5, 0];
let a = 0.05;
let episodes = 10000;
let actions = ["up", "down"];
for (let episode = 0; episode < episodes; episode++) {
  let curr_state = 3;
  let reward = 0;
  let episode_data = [];
  let G = 0;
  while (curr_state != 0 && curr_state != 6) {
    let action = actions[Math.floor(Math.random() * actions.length)];
    if (action == "up") {
      curr_state++;
    } else {
      curr_state--;
    }
    if (curr_state == 6) {
      reward = 1;
    }
    episode_data.push({ curr_state });
  }

  for (let i = episode_data.length - 1; i >= 0; i--) {
    const step = episode_data[i];
    G = reward; // no need to accumulate, since reward is binary.

    S[step.curr_state] = S[step.curr_state] + a * (G - S[step.curr_state]);
  }
}

console.log(S);
