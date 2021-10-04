const axios = require('axios');
const sharp = require('sharp');

module.exports = {
    downloadAndResize: function (imageUrl) {
        axios
            .get(imageUrl)
            .then((res) => {
                console.log('Got the image');
                return res.data
            })
            .then((img) => {
                console.log('resizing...');
                sharp(img)
                .resize(40, 40)
            })
            .catch((err) => {
                console.error('Failed to retrieve image');
                console.error(err);
            });
    }
}