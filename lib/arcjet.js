import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // track requests by IP address
    rules: [
        tokenBucket({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            refillRate: 10, // refill 10 tokens per interval
            interval: 3660, // 1 hour interval
            capacity: 100, // bucket maximum capacity of 100 tokens
        }),
    ],
});

export default aj;