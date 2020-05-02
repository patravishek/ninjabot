import * as Twit from 'twit';

export const serverlessOptions: Twit.Params = {
    q: "#100DaysOfCode",
    count: 1000,
    result_type: 'recent',
    lang:"en"
};
