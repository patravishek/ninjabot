import * as Twit from "twit";
import { NinjaBotResponse } from "./responses/Response";

export class GenericTwitterHandler {
    private twitterConfig: Twit;
    
    constructor(twitterConfig: Twit) {
        this.twitterConfig = twitterConfig;
    }
    
    public async GenericRT (twitterOptions: Twit.Params) : Promise<NinjaBotResponse> {
        let response = new NinjaBotResponse();
        this.twitterConfig.get('search/tweets', twitterOptions, (err: Error, data: any) => {
            if (!err) {
                response.statusCode = 200;
                response.tweetCount = data.statuses.length;
                console.log(data.statuses.length);
                response.Body = [];

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
                                    let responseBodyExpression = {"RetweetId": retweetId, "Message": tweetInfo, "RTInfo": {data}};
                                    response.Body.push(responseBodyExpression);
                                    console.info(`Successfully Reply Posted for the tweet id: ${retweetId} and ${data}`);
                                } else {
                                    let responseBodyExpression = {"RetweetId": retweetId, "Message": tweetInfo, "RTErrorInfo": {err}};
                                    response.Body.push(responseBodyExpression);
                                    console.error(`An error has occurred!, ${err}`);
                                }
                            });
                    }
                }
            } else {
                response.statusCode = 500;
                response.tweetCount = 0;
                response.Body = [];
                response.Error = err;
                console.error(err);
            }
        });

        return response;
    }
}