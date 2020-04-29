import 'source-map-support/register';
import {Twit} from 'twit';
import {twitter, twitterOptions} from './config/bot-config';

export const retweet = async (event, _context) => {
  twitter.get('search/tweets', twitterOptions, (err: Error, data: any) => {
    if(!err){
        for(let i=0; i< data.statuses.length; i++){
            let retweetId = data.statuses[i].id_str;
            let tweetInfo = data.statuses[i].text;
            let retweetCount = data.statuses[i].retweet_count;
            let favoriteCount = data.statuses[i].favorite_count;
            console.info(`Received tweet Id: ${retweetId} || Message: ${tweetInfo}`);
            //Checking if the tweet has been retweeted ever
            if((retweetCount>2) || (favoriteCount>1)){
                //Retweeting a tweet.
                console.info(`Retweet Id: ${retweetId} || Message: ${tweetInfo}`);
                twitter.post('statuses/retweet/'+retweetId,{},
                (err: Error, data: any)=>{
                    if(!err){
                        console.info(`Successfully Reply Posted for the tweet id: ${retweetId}`);
                    }else{
                        console.error(`An error has occurred!, ${err}`);
                    }
                });

                //Commeting on a tweet
                console.info(`Commenting Id ${retweetId}`);
                let commentInfo : Twit.Params = {
                    in_reply_to_status_id: data.statuses[i].id_str,
                    status: `@${data.statuses[i].user.screen_name} Keep learning`
                };

                twitter.post('statuses/update/', commentInfo, (err: Error) => {
                    if(!err){
                        console.info(`Successfully Reply Posted for the tweet id: ${retweetId}`);
                    }else{
                        console.error(`An error has occurred!, ${err}`);
                    }
                });
            }
        }
    }else{
        console.error(err);
    }
});
}
