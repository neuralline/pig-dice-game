//@ts-check
// { score: 0, tempScore: 3, chain: 1, streak: 0, resets: 0, hands: (2) […], accumulated: (1) […], name: "player 1", info: "continueRolling" }

/**
 *
 * @param {object} data update player stats on player div
 */
export const createDiv = data => {
  let playerStatsCard = document.createElement("nav");
  playerStatsCard.id = `playerStatsCard${data.id}`;
  playerStatsCard.innerHTML = `        
          <p class="title"> ${data.name}</p>
          <ul class='card-stack'>

         
              ${
                data.singleOrDoubleGame
                  ? "<li class='CK'>" + data.hands[0] + "</li>"
                  : data.hands.map(hand => "<li class='CK'>" + hand + "</li>")
              }
          </ul>
          <h1  id='playerScore${data.id}'>
           Score: ${data.score}
          </h1>
          <p class="pars" id='playerScore${data.id}'>
          Temp score : ${data.tempScore}<br/>   
          Streak : ${data.chain}<br />
          Longest streak : ${data.streak}
          </p> 
          <div class="button ">
              <button type="submit" id="${data.id}" class="roll ${data.info}">${
    data.info
  }</button>
            </div>          
       `;
  return playerStatsCard;
};

/**
 *
 * @param {object} data create player div on the dom
 */
export const createCardContainer = data => {
  let container = document.createElement("nav");
  container.className = "card";
  container.id = `player${data.id}Card`;
  return container;
};
