import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotCard from "./BotCard";


function BotsPage() {
 const [bots,setBots]= useState([]);
 const [enlistedBots ,setEnlistedBots] =useState([]);
 const [botArmy, setBotArmy] = useState();
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

  const handleEnlist = (bot) => {
    if (!enlistedBots.some((enlistedBot) => enlistedBot.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };
 

  const handleRelease = (bot) => {
    setEnlistedBots(enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id));
  };

const handleDischarge = async (bot) => {
  try {
    await fetch(`http://localhost:8002/bots/${bot.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setEnlistedBots(enlistedBots.filter((enlistedBot) => enlistedBot.id !== bot.id));
  } catch (error) {
    console.error("Error discharging bot:", error);
  }
};
  return (
    <div>
      <YourBotArmy
      enlistedBots={enlistedBots}
       botArmy ={botArmy}
       onRelease={handleRelease}
       onDischarge={handleDischarge}/>
      <BotCollection bots={bots} onEnlist={handleEnlist}/>
      
    </div>
  )
}

export default BotsPage;
   




