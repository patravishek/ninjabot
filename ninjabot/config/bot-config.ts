import * as Twit from 'twit';
require("dotenv").config();

export const twitter = new Twit({
    consumer_key:         <string>process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      <string>process.env.TWITTER_CONSUMER_SECRET,
    access_token:         <string>process.env.TOKEN,
    access_token_secret:  <string>process.env.TOKEN_SECRET,
});
