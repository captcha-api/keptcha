const https = require('https');
const axios = require('axios');

/**
 * @name - Generate Captcha
 * @param {{width: number|undefined, height: number|undefined, length: number|undefined, circles: number|undefined}} options - Options to be parsed to the API.
 * @param {number} options.width - Width of image in px.
 * @param {number} options.height - Height of image in px.
 * @param {number} options.circles - Number of circles in image.
 * @param {number} options.length - Number of characters in captcha.
 * @returns {Promise<{captcha: string, uuid: string, ts: string}>}
 */
function _generate(options) {
    return new Promise(function (resolve, reject) {
        if (!options) options = {};
        let query = [];
        let j = 0;
        for (const i in options) {
            if (j === 0) query.push(`?${i}=${options[i]}`)
            else query.push(`&${i}=${options[i]}`);
            j++;
        }
        https.get(`https://captcha-api.akshit.me/v2/generate${query.join('')}`, function (res) {
            let str = '';
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                if (res.statusCode !== 200) reject(JSON.parse(str).message);
                try {
                    resolve(JSON.parse(str));
                } catch (e) {
                    reject('Error trying to parse response from server.');
                }
            });
        });
    });
}

/**
 *
 * @name - Verify Captcha
 * @param {{uuid: string|undefined, captcha: string|undefined}} options - Options to be parsed to the API.
 * @param {number} options.uuid - Captcha UUID.
 * @param {number} options.captcha - Solved CAPTCHA image.
 * @returns {Promise<string>}
 */
function _verify(options) {
    return new Promise(function (resolve, reject) {
        axios.post('https://captcha-api.akshit.me/v2/verify', {
            uuid: options.uuid,
            captcha: options.captcha
        })
            .then(function (response) {
                resolve(response.data.message);
            })
            .catch(function (error) {
                reject(error.response.data.message);
            });
    });
}

module.exports = {
    generate: _generate,
    verify: _verify
}