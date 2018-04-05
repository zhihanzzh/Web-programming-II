const PixabayApi = require('node-pixabayclient');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });
const redisConnection = require('./redis-connection.js');





redisConnection.on('search:request:*', async function (message, channel) {
    let requestId = message.requestId;
    let eventName = message.eventName;
    
    let successEvent = eventName + ':success:' + requestId;
    let failedEvent = eventName + ':failed:' + requestId;

    let name = message.data.name;
    let img = encodeURIComponent(message.data.img);
    let msg = message.data.message;


    let searchString = '?q=' + img;
    console.log("name");

    try {
        // let response = await axiosInstance.get(searchString);
        let params = {
            key: "8594252-c5bcbfbb14b8e301fde5f14b1",
            q: img, // automatically URL-encoded
            image_type: "photo",
          };
        PixabayPhotos.query(params, function(errors, res, req) {
            if (errors) {
              console.log('One or more errors were encountered:');
              console.log('- ' + errors.join('\n- '));
              return;
            }
          
            console.log('Photos request:');
            console.log(req);
        
            redisConnection.emit(successEvent, {
                requestId,
                eventName,
                data: {
                    name,
                    message: msg,
                    results: res
                }
            });
          });
    } catch (e) {
        console.log('Request error:\n' + e);
        redisConnection.emit(failedEvent, {
            requestId,
            eventName,
            data: e.response.data
        });
    }
});