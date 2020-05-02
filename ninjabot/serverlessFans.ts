import 'source-map-support/register';
import { twitter } from './config/bot-config';
import { serverlessOptions} from './searchQuery/serverlessOptions';
import { GenericTwitterHandler } from './handler/GenericTwitterHandler';

export const retweet = async () => {
    const genericTwitterHandler = new GenericTwitterHandler(twitter);
    genericTwitterHandler.GenericRT(serverlessOptions);        
}
