import 'source-map-support/register';
import { twitter } from './config/bot-config';
import { hundredDaysOptions} from './searchQuery/hundredDaysOptions';
import { GenericTwitterHandler } from './handler/GenericTwitterHandler';

export const retweet = async () => {
    const genericTwitterHandler = new GenericTwitterHandler(twitter);
    genericTwitterHandler.GenericRT(hundredDaysOptions);    
}
