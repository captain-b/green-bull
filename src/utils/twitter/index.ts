import {twitter} from "./config";
import Twitter from "twitter-v2";

export const Test = async() => {
    const client = new Twitter({bearer_token: process.env.TWITTER_BEARER_TOKEN!});
    const tst = await client.get(`users/${process.env.TWITTER_USER_ID}/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=50`);
    console.log(tst)
}

