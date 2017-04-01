import areIntlLocalesSupported from 'intl-locales-supported';

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(["zh"])) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors we need with the polyfill's.
        const IntlPolyfill = require("intl");
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require("intl/locale-data/jsonp/zh");
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require("intl");
}

export default {
    DateTimeFormat: Intl.DateTimeFormat,
    NumberFormat: Intl.NumberFormat
}