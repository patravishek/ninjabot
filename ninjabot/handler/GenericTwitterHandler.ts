import * as Twit from "twit";

export class GenericTwitterHandler {
    private twitterConfig: Twit;
    
    constructor(twitterConfig: Twit) {
        this.twitterConfig = twitterConfig;
    }
    
    public GenericRT = async (twitterOptions: Twit.Params) => {
        this.twitterConfig.get('search/tweets', twitterOptions, (err: Error, data: any) => {
            if (!err) {
                console.log(data.statuses.length);
                for (let i = 0; i < data.statuses.length; i++) {
                    let retweetId = data.statuses[i].id_str;
                    let tweetInfo = data.statuses[i].text;
                    let retweetCount = data.statuses[i].retweet_count;
                    let favoriteCount = data.statuses[i].favorite_count;
                    console.info(`Received tweet Id: ${retweetId} || Message: ${tweetInfo}`);

                    if ((retweetCount > 2) || (favoriteCount > 1)) {

                        console.info(`Retweet Id: ${retweetId} || Message: ${tweetInfo}`);
                        this.twitterConfig.post('statuses/retweet/' + retweetId, {},
                            (err: Error, data: any) => {
                                if (!err) {
                                    console.info(`Successfully Reply Posted for the tweet id: ${retweetId} and ${data}`);
                                } else {
                                    console.error(`An error has occurred!, ${err}`);
                                }
                            });
                    }
                }
            } else {
                console.error(err);
            }
        });
    }
}