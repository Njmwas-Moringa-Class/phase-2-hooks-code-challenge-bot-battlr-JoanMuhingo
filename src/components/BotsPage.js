import React,{useState ,useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";


function BotsPage() {
 const [bots,setBots]= useState([]);
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8002/bots')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response not available');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setBots(data);
        })
        .catch(error => {
          console.log('Error fetching:', error);
        });
    };
  
    fetchData(); 
  
  }, []);

  const [enlistedBots ,setEnlistedBots] =useState([]);

 const handleEnlist =(bot) => {
  if(!enlistedBots.some((enlistedBot)=> enlistedBot.id == bot.id)){
    setEnlistedBots([...enlistedBots, bot]);
  }
 }
 const [botArmy, setBotArmy] = useState();

 const handleRelease =(releasedBot) => {
  const updateArmy = botArmy.filter((bot)=> bot.id !== releasedBot.id);
  setBotArmy(updateArmy);
 };

const handleDischarge = (dischargedBot) => {
  const updatedArmy = botArmy.filter((bot) => bot.id !== dischargedBot.id);
  setBotArmy(updatedArmy);
};
  return (
    <div>
      <YourBotArmy
       botArmy ={botArmy}
       onRelease={handleRelease}
       onDischarge={handleDischarge}/>
      <BotCollection bots={bots} onEnlist={handleEnlist}/>
    </div>
  )
}

export default BotsPage;
   




