import Twitter from "twitter";
import Twit from "twit";

export const twitter: Twit.Options = {
    consumer_key: process.env.TWITTER_API_KEY!,
    consumer_secret: process.env.TWITTER_API_SECRET!,
    bearer_token: process.env.TWITTER_BEARER_TOKEN!
}