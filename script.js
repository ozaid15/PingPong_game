let ballspeedx=2;
let ballspeedy=2
let interval;
let totalwidth=window.innerWidth;
let totalheight=window.innerHeight;
let maxscore;
var game=false;
var rod1=document.getElementById('rod1');
var rod2=document.getElementById('rod2');
var ball=document.getElementById('ball');
const storeScore = "scorestore";
const storename = "namestore";
const rod1name="Rod 1";
const rod2name = "rod 2";
var time=10;
var scores=[20,30,40,50,60,70,90,100,110,120,130];
let i=0;

// author : Md Ozaid
let playername;
( function () {
    playername = localStorage.getItem(storename);
    maxscore = localStorage.getItem(storeScore);
    if(playername === null || maxscore===null)
    {
        document.getElementById('first').innerText="this is your first time lets start the game..";
        maxscore=0;
        playername='rod1';
    }
    else
    {
        alert(playername + ' ' + "has maximum score of"+' '+maxscore);
    }
    resetGame(playername);
})();
function resetGame(rodname)
{
    rod1.style.left=(totalwidth/2-rod1.offsetWidth/2)+'px';
    rod2.style.left=rod1.style.left;
    ball.style.left=(totalwidth/2 - 15) + 'px';
    if(rodname==rod1name)
    {
        ball.style.top=(totalheight-50.5) + 'px';
        ballspeedy=-2;
    }
    else
    {
        ball.style.top=20.5 + 'px';
        ballspeedy=2;
    }
    game=false;
}
function endGame(score,rodname){
    if(score>maxscore)
    {
        maxscore=score;
        localStorage.setItem(storeScore,maxscore);
        localStorage.setItem(storename,rodname);
    }
    clearInterval(interval);
    resetGame(rodname);
    alert(rodname +' '+"wins with a score of"+' '+score+' '+": Max score is"+' '+ maxscore);

    //screen before game start
    document.getElementById('first').innerText="Hit enter to start the game";
    document.getElementById('ins').innerText="Instructions";
    document.getElementById('ins1').innerText="1.Press 'd' to go right";
    document.getElementById('ins2').innerText="2.Press 'a' to go left";
}
window.addEventListener('keypress', function(event){

    //rod movement 
    let rodspeed=20;
    let rodrec=rod1.getBoundingClientRect();
    let rod1x=rodrec.x;
    if(event.key==='d')
    {
        let avail=totalwidth-rod1x-150;
        if(avail>=rodspeed)
        rod1x += rodspeed;
        else 
        rod1x += avail;
        rod1.style.left=rod1x + 'px';
        rod2.style.left=rod1x + 'px';
    }
    if(event.key==='a')
    {
        let avail=rod1x;
        if(avail>=rodspeed)
        rod1x -= rodspeed;
        else 
        rod1x -= avail;
        rod1.style.left=rod1x + 'px';
        rod2.style.left=rod1x + 'px';
    }
    if(event.key==='Enter')
    {
        // remove instructions from screen
        document.getElementById('first').innerText="";
        document.getElementById('start').innerText="";
        document.getElementById('ins').innerText="";
        document.getElementById('ins1').innerText="";
        document.getElementById('ins2').innerText="";

        //start game

        if(!game)
        {
            game=true;
            let score=1;
            let rodheight=rod1.offsetHeight;
            let ballrec=ball.getBoundingClientRect();
            let balldia=ballrec.width;
            let bally=ballrec.y;
            let ballx=ballrec.x;
            let rod2height=rod2.offsetHeight;
            let rodwidth=rod1.offsetWidth;
            let rod2width=rod2.offsetWidth;
            //ball movement
            interval = setInterval( function() {
                let rodx=rod1.getBoundingClientRect().x;
                ballx += ballspeedx;
                bally+=ballspeedy;
                ball.style.top=bally + 'px';
                ball.style.left=ballx + 'px';
                if(ballx<=0 || ballx>totalwidth) 
                {
                    ballspeedx=-ballspeedx;
                }
                if(bally<(rodheight+2)&&(ballx>rodx && ballx<rodx+rodwidth))
                {
                    ballspeedy=-ballspeedy;
                    score++;
                }
                else if(bally<(rodheight))
                {
                    endGame(score,rod2name);
                }
                if(bally>=(totalheight - rod2height-2-balldia)&&(ballx>rodx && ballx < (rodx+rod2width)))
                {
                    ballspeedy=-ballspeedy;
                    score++;
                }
                else if(bally>(totalheight - rod2height-2-balldia))
                {
                    endGame(score,rod1name);
                }
                if(score>=scores[i] && time>0)
                {
                    i++;
                    time--;
                }
            }, time);
        }      
    }
});