import React from "react";

function YourBotArmy({enlistedBots =[],onRelease, onDischarge}) {

  const handleRelease =(bot) =>{

    onRelease(bot);
  };

  const handleDischarge=(bot) =>{

    onDischarge(bot);
  };

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {enlistedBots.map((bot) =>(
            <div key ={bot.id}>
            <button onClick ={() => handleRelease(bot)}>Release from Army</button>
            <button onClick ={() => handleDischarge(bot)}>Discharge</button>
            </div>
          ))}
         YourBotArmy
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
