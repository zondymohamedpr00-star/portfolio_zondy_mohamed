 let computermove = "";
      let randomnombe = ""; 
      let result = "";
      let firstone;
    const score=JSON.parse(localStorage.getItem('score'))||{
      wins:0,
      loses:0,
      ties:0 
    };
      
        
      function usermove(playermove) {
         let randomnomber;
        randomnomber = Math.random();
        if (randomnomber < 1 / 3 && randomnomber > 0) {
          computermove = "Rock";
        }
        if (randomnomber > 1 / 3 && randomnomber < 2 / 3) {
          computermove = "Paper";
        }
        if (randomnomber < 1 && randomnomber > 2 / 3) {
          computermove = "Scissors";
        }
          if (playermove === computermove) {
          result = "Tie";
        } else if (computermove === "Rock" && playermove === "Scissors") {
          result = "Lose";
        } else if (computermove === "Paper" && playermove === "Scissors") {
          result = "Win";
        } else if (computermove === "Paper" && playermove === "Rock") {
          result = "Lose";
        } else if (computermove === "Rock" && playermove === "Paper") {
          result = "Win";
        } else if (computermove === "Scissors" && playermove === "Rock") {
          result = "Win";
        } else if (computermove === "Scissors" && playermove === "Paper") {
          result = "Lose";
        }
          if(result==='Win'){
        score.wins=score.wins+1;
      }
      if(result==='Lose'){
        score.loses=score.loses+1;
      }
      if(result==='Tie'){
        score.ties=score.ties+1;
      }
      localStorage.setItem('score',JSON.stringify(score));
    
      updatemove();
        updatestate(playermove,computermove);
        updatescore();
    }

         function updatemove(){
            document.querySelector('.js-result').innerHTML=`You ${result} .`;
         }
         function updatestate(playermove,computermove){
               document.querySelector('.js-move').innerHTML=` You picked <img class="move-icone" src="images/game-images/${playermove}-emoji.png" alt="">
    <img  class="move-icone" src="images/game-images//${computermove}-emoji.png" alt=""> computer `;
         }
            function updatescore(){
        document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}.Loses: ${score.loses}.Ties: ${score.ties}.
                `;
            
            }

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-move').innerHTML = '';
  updatescore();
}



updatescore();
