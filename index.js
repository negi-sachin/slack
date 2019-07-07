require('dotenv').config();

const SlackBot = require('slackbots');
const axios = require('axios');
const request = require('request');
const bot = new SlackBot({
  token: process.env.SLACK_AUTH_TOKEN,
  name: 'Schatbot'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':blush:'
  };

  bot.postMessageToChannel(
    'general',
    `Hello world , I am Schatbot \n Things i can do for you: \n1.WEATHER \n2.JOKE \n3.QUOTE\n4.USELESS FACT\n5.ADVICE
    Just mention Schatbot (like @Schatbot) followed by any of the above Case sensitive keywords`,
    params
  );
  
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }
   handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {


 if(message.includes(' WEATHER')){
  weather();
}
else if(message.includes(' JOKE')){
  Joke();
}
else if(message.includes(' QUOTE')){
  quote();
}
else if(message.includes(' USELESS FACT')){
  fact();
}
else if(message.includes(' ADVICE')){
  advice();
}


}


//weather 
function weather(){
let apiKey = process.env.Wapi;
let city = 'delhi';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${'metric'}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    
    let weather = JSON.parse(body);
let message1 = `${weather.name}:\n Temp:${weather.main.temp}degrees, \n Humidity:${weather.main.humidity}%, `;

const params = {
                icon_emoji: ':sunny:'
              };
            
bot.postMessageToChannel(
                'general',
                message1,
                params
              );
                             

  }
});
}

//joke
function Joke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `${joke}`, params);
  });
}

//qoute
function quote() {
  
  request('https://thesimpsonsquoteapi.glitch.me/quotes', function (err, response,data) {
    if(err){
      console.log('error:', error);
    } else {
      const params = {
        icon_emoji: ':simple_smile:'
      };
    var data=JSON.parse(data);
    bot.postMessageToChannel('general', data[0].quote,params);

      
    }});
}
//useless fact
function fact() {
  
  request('http://randomuselessfact.appspot.com/random.json?language=en', function (err, response,data) {
    if(err){
      console.log('error:', error);
    } else {
      const params = {
        icon_emoji: ':stuck_out_tongue_winking_eye:'
      };
    var data=JSON.parse(data);
    bot.postMessageToChannel('general', data.text,params);

    
    }});
}

//advice
function advice() {
  
  request('https://api.adviceslip.com/advice', function (err, response,data) {
    if(err){
      console.log('error:', error);
    } else {
      const params = {
        icon_emoji: ':yum:'
      };
    var data=JSON.parse(data);
    bot.postMessageToChannel('general', data.slip.advice,params);

    
    }});
}