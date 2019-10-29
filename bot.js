const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fetch = require('node-fetch');
const apikeys = require('./apikeys.json');
var dateToday = new Date();
var isMonday = 0;
var rouletteChance = 0;
var rouletteResult = 0;

var degToCard = function(deg){
	if (deg>11.25 && deg<33.75){
		return "northeast";
	}else if (deg>33.75 && deg<56.25){
		return "norteast";
	}else if (deg>56.25 && deg<78.75){
		return "east";
	}else if (deg>78.75 && deg<101.25){
		return "southeast";
	}else if (deg>101.25 && deg<123.75){
		return "southeast";
	}else if (deg>123.75 && deg<146.25){
		return "southeast";
	}else if (deg>146.25 && deg<168.75){
		return "southeast";
	}else if (deg>168.75 && deg<191.25){
		return "south";
	}else if (deg>191.25 && deg<213.75){
		return "southwest";
	}else if (deg>213.75 && deg<236.25){
		return "southwest";
	}else if (deg>236.25 && deg<258.75){
		return "southwest";
	}else if (deg>258.75 && deg<281.25){
		return "west";
	}else if (deg>281.25 && deg<303.75){
		return "northwest";
	}else if (deg>303.75 && deg<326.25){
		return "northwest";
	}else if (deg>326.25 && deg<348.75){
		return "northwest";
	}else{
		return "north"; 
	}
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);

client.on('message', msg => {
	
	if(!msg.content.startsWith(config.prefix) || msg.author.bot) return;
	
	const args = msg.content.slice(config.prefix.length).split(' ');
	const command = args.shift().toLowerCase();

    // BOT INFO
    if (command === `info`){
      msg.channel.send("Decc'lan is currently in version 2.0.2, last build 2019-10-28.");
    }

    // HELP COMMAND
    else if (command === `help`){
        msg.channel.send("\
Use `>help commandname` to get more information about a command.\n\
⠀\n\
BOT INFO\n\
`help - View help for commands.`\n\
`info - View information about the bot application.`\n\
⠀\n\
FUN\n\
`ree - REEEEEEEEEEEEEEEEE`\n\
`monday - Check if today is Monday`\n\
`beans - Link to a picture of beans`\n\
");
    }

    // REEEEE
    else if (command === `ree`){
        msg.channel.send("*REEEEEEEEEEEEEEEEE*");
    }

    // MONDAY
    else if (command === `monday`){
        isMonday = dateToday.getDay();
        if(isMonday === 1)
        {
            msg.channel.send("Yes");
        }
        else
        {
            msg.channel.send("No");
        }
    }

    // BEANS
    else if (command === `beans`){
        msg.channel.send("http://images.media-allrecipes.com/userphotos/960x960/4526591.jpg");
    }

    // WEATHER
    else if (command === `weather`){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Winnipeg,ca&APPID=${(apikeys.weather)}`)
        .then(response => {
            return response.json();
        })
        .then(res => {
			const embed = {
				"title": "Weather for Winnipeg, MB",
				"description": `:thermometer: **${(Math.round(res.main.temp - 273.15))} °C** (Low ${(Math.round(res.main.temp_min - 273.15))} °C, High ${(Math.round(res.main.temp_max - 273.15))} °C)\n\
:dash: **${(res.wind.speed * 3600 / 1000)} km/h** ${(degToCard(res.wind.deg))}`,
				"color": 159217,
				"footer": {
					"text": "Weather provided by OpenWeatherMap API"
				},
				"author": {
					"name": "Decc'lan 2.0",
					"icon_url": "https://cdn.discordapp.com/avatars/634101576746663938/9f63a6ac2a926dbeac529aa17af0cb4e.png"
				}
			}
			msg.channel.send(``, {embed});
		})
	}
	
	else if (command === `convert`){
		fetch(`https://api.exchangeratesapi.io/latest`)
		.then(response => {
			return response.json();
		})
		.then(res => {
			msg.channel.send(`${(args[1])} ${(args[0])} = **${(args[2])} ${((args[0] / res.rates[args[1]] * res.rates[args[2]]).toFixed(2))}**`)
			})
	}
})