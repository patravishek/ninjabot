import 'source-map-support/register';
import { twitter } from './config/bot-config';
import { serverlessOptions } from './searchQuery/serverlessOptions';
import { GenericTwitterHandler } from './handler/GenericTwitterHandler';

export const retweet = async () => {
    const genericTwitterHandler = new GenericTwitterHandler(twitter);
    const response = await genericTwitterHandler.GenericRT(serverlessOptions);
    if (response.statusCode === 200) {
        console.log(response.tweetCount);
    }
    else if (response.statusCode === 500) {
        console.error(response.Error);
    }
}
