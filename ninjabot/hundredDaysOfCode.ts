import 'source-map-support/register';
import { twitter } from './config/bot-config';
import { hundredDaysOptions } from './searchQuery/hundredDaysOptions';
import { GenericTwitterHandler } from './handler/GenericTwitterHandler';

export const retweet = async () => {
    const genericTwitterHandler = new GenericTwitterHandler(twitter);
    const response = await genericTwitterHandler.GenericRT(hundredDaysOptions);
    if (response.statusCode === 200) {
        console.log(response.tweetCount);
    }
    else if (response.statusCode === 500) {
        console.error(response.Error);
    }
}
