const PixabayApi = require('node-pixabayclient');
const PixabayPhotos = new PixabayApi({ apiUrl: "https://pixabay.com/api/" });

var params = {
  key: "8594252-c5bcbfbb14b8e301fde5f14b1",
  q: "yellow flowers", // automatically URL-encoded
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

  console.log('Photos API response:');
  console.log(res);
});