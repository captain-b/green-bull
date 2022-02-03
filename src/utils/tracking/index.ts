import axios from "axios";
import {request} from "express";
const querystring = require('querystring');

// The following environment variable is set by app.yaml when running on App
// Engine, but will need to be set manually when running locally. See README.md.
const {GA_TRACKING_ID} = process.env;
console.log(GA_TRACKING_ID)

export const trackEvent = async () => {
    const data = {
        // API Version.
        v: '1',
        // Tracking ID / Property ID.
        tid: GA_TRACKING_ID,
        // Anonymous Client Identifier. Ideally, this should be a UUID that
        // is associated with particular user, device, or browser instance.
        cid: '555',
        // Event hit type.
        t: 'event',
        // Event category.
        ec: 'test',
        // Event action.
        ea: '/coming-soon',
        // Event label.
        el: 'Home page visited.',
        // // Event value.
        ev: '1',
    };

    try {
        const url = `https://www.google-analytics.com/debug/collect?${querystring.stringify(data)}`
        const tst = await axios.get(url);
    } catch (e) {
        console.log(e)
    }

    return;
};
