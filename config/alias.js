const path = require('path');

const CustomAlias = {
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@views': path.resolve(__dirname, 'src/views'),
    '@routers': path.resolve(__dirname, 'src/routers'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@common': path.resolve(__dirname, 'src/common'),
    '@services': path.resolve(__dirname, 'src/services'),
};

module.exports = CustomAlias;