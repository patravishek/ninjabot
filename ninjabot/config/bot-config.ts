import Twit from 'twit';
//Setting Up for environment variables
require("dotenv").config();

export let twitter = new Twit({
    consumer_key:         <string>process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      <string>process.env.TWITTER_CONSUMER_SECRET,
    access_token:         <string>process.env.TOKEN,
    access_token_secret:  <string>process.env.TOKEN_SECRET,
});
 
export const twitterOptions: Twit.Params = {
    q: "#100DaysOfCode #typescript #javascript #python #docker #serverless #technowise #WomenWhoCode",
    count: 10,
    result_type: 'recent',
    lang:"en"
};
