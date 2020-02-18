"use strict";

/**
* @Project: Cookie Consent
* @Author: Robin Danzinger, Martin Farkas
* @Date:   2020-01-29
* @Email:  info@websites-graphix.com
*/

/* COOKIECONSENT CONFIGURATION */
window.cookieconsent = {
  googlesitetag: {
    gt_id: 'UA-XXXXXXXXXX-X'
  },
  pardot: {
    piAId: 'xxxxx',
    piCId: 'xxxx'
  },
  options: {
    option1: {
      cookies: ['googlesitetag', 'pardot'],
      text_en: "\n        <label for=\"option1\">Marketing / Analyse</label>\n        <p class=\"cookieconsent-banner__p\">\n          By performance and marketing cookies we mean cookies which are technically not required. \n          We use performance and marketing cookies only if you have given us your prior consent. \n          With such cookies, we collect information about how users interact with our website and which pages have been visited. \n          This helps us to understand user activity on our website on an aggregated as well as on a personal \n          level to provide you relevant content and services.\n        </p>\n        <p class=\"cookieconsent-banner__p\">\n          <a href=\"http://www.domain-xyz.com/privacy-policy/\" title=\"Link to Cookie Informations\">More details</a>\n        </p>\n      ",
      text_de: "\n        <label for=\"option1\">Marketing / Analyse</label>\n        <p class=\"cookieconsent-banner__p\">\n          Wir verwenden Performance und Marketing Cookies nur, wenn Sie uns zuvor Ihre Einwilligung gegeben haben.\n          Mit solchen Cookies erfassen wir Informationen dar\xFCber, wie Besucher mit unserer Webseite interagieren und welche Seiten sie besucht haben.\n          Dies hilft uns, die Benutzeraktivit\xE4ten auf unserer Website sowohl auf aggregierter als auch auf pers\xF6nlicher Ebene zu verstehen,\n          um Ihnen relevante Inhalte und Dienste anbieten zu k\xF6nnen.\n        </p>\n        <p class=\"cookieconsent-banner__p\">\n          <a href=\"http://www.domain-xyz.com/datenschutz/\" title=\"Link zu den Cookie Informationen\">Weitere Informationen</a>\n        </p>\n      "
    },
    option2: {
      cookies: ['youtube'],
      text_en: "\n        <label for=\"option2\">Youtube</label>\n        <p class=\"cookieconsent-banner__p\">\n          By accepting YouTube cookies, you accept YouTube\xB4s privacy policy.\n          Regardless of this setting, you can also accept the YouTube cookies \n          directly on the videos on this website.\n        </p>\n        <p class=\"cookieconsent-banner__p\">\n          <a href=\"http://www.domain-xyz.com/privacy-policy/\" title=\"Link to Cookie Informations\">More details</a>\n        </p>\n      ",
      text_de: "\n        <label for=\"option2\">Youtube</label>\n        <p class=\"cookieconsent-banner__p\">\n          Durch das Akzeptieren von YouTube-Cookies akzeptieren Sie die Datenschutzbestimmungen von YouTube. \n          Unabh\xE4ngig von dieser Einstellung k\xF6nnen Sie die YouTube-Cookies auch direkt auf den Videos auf dieser Website akzeptieren.\n        </p>\n        <p class=\"cookieconsent-banner__p\">\n          <a href=\"http://www.domain-xyz.com/privacy-policy/\" title=\"Link zu den Cookie Informationen\">Weitere Informationen</a>\n        </p>\n      "
    }
  }
};
/* COOKIE_CONSENT IMPLEMENTATION */

/*
 * ==================================
 * COOKIECONSENT COOKIE SPECIFIC CODE 
 */

var cookieconsent_cookie_fn = {
  'googlesitetag': {
    allow: enableGooglesitetag,
    deny: disableGooglesitetag
  },
  'pardot': {
    allow: enablePardot,
    deny: disablePardot
  },
  'youtube': {
    allow: enableYoutube,
    deny: disableYoutube
  }
};

function disablePardot() {
  deleteScriptIncluding("pardot.com");
}

function deleteScriptIncluding(includeText) {
  var htmlCollection = document.getElementsByTagName('script');
  var scriptElements = Array.prototype.slice.call(htmlCollection);
  scriptElements.forEach(function (sc) {
    if (sc.src.includes(includeText)) {
      sc.remove();
    }
  });
}

var piAId; // eslint-disable-line no-unused-vars

var piCId; // eslint-disable-line no-unused-vars

var piHostname; // eslint-disable-line no-unused-vars

function enablePardot() {
  piAId = window.cookieconsent.pardot.piAId;
  piCId = window.cookieconsent.pardot.piCId;
  piHostname = 'pi.pardot.com';
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
  var c = document.getElementsByTagName('script')[0];
  c.parentNode.insertBefore(s, c);
} // https://developers.google.com/analytics/devguides/collection/gtagjs


function enableGooglesitetag() {
  window['ga-disable-' + window.cookieconsent.googlesitetag.gt_id] = false;

  if (window.cookieconsent.googlesitetag.script_loaded) {
    return;
  }

  var firstScriptElement = document.getElementsByTagName('script')[0];
  var gtScriptElement = document.createElement('script');
  gtScriptElement.async = true;
  gtScriptElement.src = "https://www.googletagmanager.com/gtag/js?id=" + window.cookieconsent.googlesitetag.gt_id;
  firstScriptElement.parentNode.insertBefore(gtScriptElement, firstScriptElement);
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', window.cookieconsent.googlesitetag.gt_id, {
    'anonymize_ip': true
  });
  window.cookieconsent.googlesitetag.script_loaded = true;
}

function disableGooglesitetag() {
  // disable google analytics, existing cookies will not be deleted
  // existing cookies will neither be updated nor sent to google
  // see: https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
  window['ga-disable-' + window.cookieconsent.googlesitetag.gt_id] = true; // if we remove the script and then the user activates the cookies, the script will not be added to dom
  // we have to add the script manually. Therefore we don't delete the script
}

function showYoutubeVideo(contentElementId) {
  var yt_parent_div = document.getElementById(contentElementId);
  var yt_iframe = yt_parent_div.querySelector('iframe');
  var yt_overlay_div = yt_parent_div.querySelector('.js-ytbanner');
  yt_iframe.src = yt_parent_div.dataset.yt_video_src;
  yt_overlay_div.style.visibility = "hidden";
}

function hideYoutubeVideo(contentElementId) {
  var yt_parent_div = document.getElementById(contentElementId);
  var yt_iframe = yt_parent_div.querySelector('iframe');
  var yt_overlay_div = yt_parent_div.querySelector('.js-ytbanner');
  yt_iframe.src = "";
  yt_overlay_div.style.visibility = "visible";
}

function enableYoutube() {
  var yt_divs = Array.from(document.getElementsByClassName("youtubevideo"));
  yt_divs.forEach(function (yt_parent_div) {
    showYoutubeVideo(yt_parent_div.id);
  });
}

function disableYoutube() {
  var yt_divs = Array.from(document.getElementsByClassName("youtubevideo"));
  yt_divs.forEach(function (yt_parent_div) {
    hideYoutubeVideo(yt_parent_div.id);
  });
}
/*
 * ==========================
 * COOKIECONSENT COMMON CODE 
 */


var consentBanner = document.createElement("DIV");
consentBanner.className = "cookieconsent";
document.body.appendChild(consentBanner);

function showCookieConsentBanner() {
  if (document.documentElement.lang === 'en') {
    consentBanner.innerHTML = "\n      <div class='cookieconsent__overlay'>\n        <div class='cookieconsent-banner'>\n          <h3 class=\"cookieconsent-banner__h3\">Use of cookies</h3>\n          <p class=\"cookieconsent-banner__p\">We would like to use cookies to better understand your use of this website. This enables us to improve your future user experience on our website and to provide you with interest-based advertising and tailored content on our website as outside our website by partners. You can change or revoke your cookie settings at any time. </p>\n          <p class=\"cookieconsent-banner__p\"><a href=\"http://www.domain-xyz.com/privacy-policy/\" title=\"Link to Privacy Policy\">Privacy Policy</a> and <a href=\"http://www.domain-xyz.com/imprint/\" title=\"Link to Imprint\">Imprint</a></p>\n          <button class=\"cookieconsent-banner__button--settings\" onclick='showCookieConsentSettings()' title=\"Link to view and change cookie settings\">View and change cookie settings</button>\n          <button class=\"cookieconsent-banner__button--deny\" onclick='denyAll()'>Deny</button>\n          <button class=\"cookieconsent-banner__button--accept\" onclick='allowAll()'>Accept</button>\n        </div>\n      </div>\n    "; // } else if (document.documentElement.lang === 'fr' ) { 
    //   consentBanner.innerHtml = `franzoesischer text`
  } else {
    consentBanner.innerHTML = "\n      <div class='cookieconsent__overlay'>\n        <div class='cookieconsent-banner'>\n          <h3 class=\"cookieconsent-banner__h3\">Nutzung von Cookies</h3>\n          <p class=\"cookieconsent-banner__p\">Wir m\xF6chten Cookies verwenden, um Ihre Nutzung dieser Webseite besser zu verstehen. Dies erm\xF6glicht es uns, Ihr zuk\xFCnftiges Nutzererlebnis auf unserer Webseite zu verbessern und Ihnen interessenbezogene Werbung und ma\xDFgeschneiderte Inhalte sowohl auf unserer Webseite als auch au\xDFerhalb unserer Webseite durch Partner zu pr\xE4sentieren. Sie k\xF6nnen Ihre Cookie-Einstellungen jederzeit \xE4ndern oder widerrufen. </p>\n          <p class=\"cookieconsent-banner__p\"><a href=\"http://www.domain-xyz.com/datenschutz/\" title=\"Link zur Datenschutzerkl\xE4rung\">Datenschutzerkl\xE4rung</a> und <a href=\"http://www.domain-xyz.com/impressum/\" title=\"Link zum Impressum\">Impressum</a></p>\n          <button class=\"cookieconsent-banner__button--settings\" onclick='showCookieConsentSettings()' title=\"Link zum Anzeigen und \xC4ndern der Cookie Einstellungen\">Anzeigen und \xC4ndern der Cookie Einstellungen</button>\n          <button class=\"cookieconsent-banner__button--deny\" onclick='denyAll()'>Ablehnen</button>\n          <button class=\"cookieconsent-banner__button--accept\" onclick='allowAll()'>Akzeptieren</button>\n        </div>\n      </div>\n    ";
  }
}

function hideCookieConsentBanner() {
  var buttontext = document.documentElement.lang === 'en' ? 'Cookie Settings' : 'Cookie Einstellungen';
  consentBanner.innerHTML = "\n    <button class=\"cookieconsent__settings-button\" onclick=\"showCookieConsentBanner()\">".concat(buttontext, "</button>\n  ");
}

function showCookieConsentSettings() {
  // eslint-disable-line no-unused-vars
  var checkboxes = "";
  Object.keys(window.cookieconsent.options).forEach(function (key) {
    var cookie = window.cookieconsent.options[key];
    var lang = document.documentElement.lang;
    var checked = cookie.allow ? 'checked' : '';
    checkboxes += "<input class='js-cookieconsent__checkbox' type='checkbox' value='".concat(key, "' ").concat(checked, "> ").concat(cookie['text_' + lang]);
  });

  if (document.documentElement.lang === 'en') {
    consentBanner.innerHTML = "    \n      <div class='cookieconsent__overlay'>\n        <div class='cookieconsent-banner'>\n          <h3 class=\"cookieconsent-banner__h3\">Manage Cookie Preferences</h3>\n          <div class=\"cookieconsent-banner__settings\">\n            <input disabled=\"\" type=\"checkbox\" name=\"technical-required-cookies\" value=\"technical-required-cookies\" checked=\"\">\n            <label class=\"cookieconsent-banner__settings-label--required\" for=\"technical-required-cookies\">Technically required cookies - always selected by default</label>\n            <p class=\"cookieconsent-banner__p\">By technically required cookies we mean cookies without those the technical provision of the online service cannot be ensured. These include e.g. cookies supporting essential services like a smooth reproduction of video or audio footage. So called \u2018functional cookies\u2019 are also assigned belonging to this category. Functional cookies store information in order to provide you comfortable use of our online services (e.g. language selection). The legal basis for the processing of personal data by means of cookies of this category is Infineon\u2019s legitimate interest. This includes, among other things, the interest in having a professional external presentation as well as an optimal balancing of the loads on the server due to technical reasons.</p>\n            <p class=\"cookieconsent-banner__p\"><a href=\"http://www.domain-xyz.com/privacy-policy/\" title=\"Link to Cookie Informations\">More details</a></p>\n            ".concat(checkboxes, "\n          </div>\n          <button class=\"cookieconsent-banner__settings-button is-centered\" onclick='allowOnly()'>Confirm Selection</button>\n          <!-- <button onclick='showCookieConsentBanner()'> back </button> -->\n        </div>\n      </div> \n    "); // } else if (document.documentElement.lang === 'fr' ) { 
    //   consentBanner.innerHtml = `franzoesischer text`
  } else {
    consentBanner.innerHTML = "    \n    <div class='cookieconsent__overlay'>\n      <div class='cookieconsent-banner'>\n        <h3 class=\"cookieconsent-banner__h3\">Cookie Einstellungen verwalten</h3>\n        <div class=\"cookieconsent-banner__settings\">\n          <input disabled=\"\" type=\"checkbox\" name=\"technical-required-cookies\" value=\"technical-required-cookies\" checked=\"\">\n          <label class=\"cookieconsent-banner__settings-label--required\" for=\"technical-required-cookies\">Technisch erforderliche Cookies - standardm\xE4\xDFig immer ausgew\xE4hlt</label>\n          <p class=\"cookieconsent-banner__p\">Unter technisch erforderlichen Cookies verstehen wir Cookies, ohne die die technische Bereitstellung des Online-Angebots nicht gew\xE4hrleistet werden kann. Dazu geh\xF6ren z.B. Cookies, die wesentliche Dienste wie eine reibungslose Wiedergabe von Video- oder Audioaufnahmen unterst\xFCtzen. Dieser Kategorie werden auch so genannte \"funktionale Cookies\" zugeordnet. Funktionale Cookies speichern Informationen, um Ihnen eine komfortable Nutzung unserer Online-Services (z.B. Sprachauswahl) zu erm\xF6glichen. Rechtsgrundlage f\xFCr die Verarbeitung personenbezogener Daten mit Hilfe von Cookies dieser Kategorie sind berechtigte Interessen von Infineon. Hierzu geh\xF6ren u.a. das Interesse an einer professionellen Au\xDFendarstellung sowie an einer optimalen Verteilung der Lasten auf dem Server aus technischen Gr\xFCnden.</p>\n          <p class=\"cookieconsent-banner__p\"><a href=\"http://www.domain-xyz.com/datenschutz/\" title=\"Link to Cookie Informations\">More details</a></p>\n          ".concat(checkboxes, "\n        </div>\n        <button class=\"cookieconsent-banner__settings-button is-centered\" onclick='allowOnly()'>Auswahl best\xE4tigen</button>\n        <!-- <button onclick='showCookieConsentBanner()'> zur\xFCck </button> -->\n      </div>\n    </div> \n  ");
  }
}

function readCookieConsentCookie() {
  var cc = getCookie('cookieconsent');

  if (cc === "") {
    showCookieConsentBanner();
  } else {
    hideCookieConsentBanner();
    updateCookieConsent(cc);
  }
}

function updateCookieConsent(cc) {
  if (cc === "allow") {
    Object.keys(window.cookieconsent.options).forEach(allowOption);
  } else if (cc === "deny") {
    Object.keys(window.cookieconsent.options).forEach(denyOption);
  } else if (cc.startsWith("allowOnly:")) {
    var allowedOptions = cc.substring("allowOnly:".length).split(",");
    allowedOptions.filter(notNullOrEmpty).forEach(allowOption);
    Object.keys(window.cookieconsent.options).filter(function (key) {
      return !allowedOptions.includes(key);
    }).forEach(denyOption);
  }
}

function notNullOrEmpty(str) {
  return str && str.trim().length > 0;
}

function allowOption(key) {
  if (!window.cookieconsent.options[key].allow) {
    window.cookieconsent.options[key].allow = true;
    window.cookieconsent.options[key].cookies.forEach(function (cookie) {
      return cookieconsent_cookie_fn[cookie].allow();
    });
  }
}

function denyOption(key) {
  if (window.cookieconsent.options[key].allow) {
    window.cookieconsent.options[key].allow = false;
    window.cookieconsent.options[key].cookies.forEach(function (cookie) {
      return cookieconsent_cookie_fn[cookie].deny();
    });
  }
}

function allowAll() {
  // eslint-disable-line no-unused-vars
  var value = "allow";
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function denyAll() {
  // eslint-disable-line no-unused-vars
  var value = "deny";
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function allowOnly() {
  // eslint-disable-line no-unused-vars
  var value = "allowOnly:" + Array.from(document.getElementsByClassName("js-cookieconsent__checkbox")).filter(function (el) {
    return el.checked;
  }).map(function (el) {
    return el.value;
  }).join(',');
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function saveCookieConsent(value) {
  setCookie('cookieconsent', value, 365);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

readCookieConsentCookie();