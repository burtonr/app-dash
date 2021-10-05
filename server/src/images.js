const axios = require('axios');
const sharp = require('sharp');

module.exports = {
    downloadAndResize: async function (imageUrl) {
        try {
            let imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            if (!imgRes.data) {
                console.error('Failed to download image');
                return;
            } else {
                let imgBuf = Buffer.from(imgRes.data, 'binary')
                return sharp(imgBuf)
                        .resize(40, 40)
                        .toBuffer({ resolveWithObject: true });
            }
        } catch (err) {
            console.error('Failed to retrieve image');
            console.error(err);
        }
    }
}