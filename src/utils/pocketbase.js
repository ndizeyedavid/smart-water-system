import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// Configure default behaviors
pb.autoCancellation(false);

// Add default headers for CORS
pb.beforeSend = function(url, options) {
    options.headers = {
        ...options.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'ngrok-skip-browser-warning': '1'
    };
    return { url, options };
};

export default pb;
