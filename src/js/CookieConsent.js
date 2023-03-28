/**
* CookieConsent by Robin Danzinger & Martin Farkas
* www.websites-graphix.com
* MIT License
**/

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
      text_en: `
          <label class="cc-banner_settings_label" for="option1">Marketing / Analyse</label>
        </div>
        <p>
          By performance and marketing cookies we mean cookies which are technically not required. 
          We use performance and marketing cookies only if you have given us your prior consent. 
          With such cookies, we collect information about how users interact with our website and which pages have been visited. 
          This helps us to understand user activity on our website on an aggregated as well as on a personal 
          level to provide you relevant content and services.
        </p>
        <a class="cc-banner_more" href="http://www.domain-xyz.com/privacy-policy/" title="Link to Cookie Informations">More details</a>
      `,
      text_de: `
          <label class="cc-banner_settings_label" for="option1">Marketing / Analyse</label>
        </div>
        <p>
          Wir verwenden Performance und Marketing Cookies nur, wenn Sie uns zuvor Ihre Einwilligung gegeben haben.
          Mit solchen Cookies erfassen wir Informationen darüber, wie Besucher mit unserer Webseite interagieren und welche Seiten sie besucht haben.
          Dies hilft uns, die Benutzeraktivitäten auf unserer Website sowohl auf aggregierter als auch auf persönlicher Ebene zu verstehen,
          um Ihnen relevante Inhalte und Dienste anbieten zu können.
        </p>
        <a class="cc-banner_more" href="http://www.domain-xyz.com/datenschutz/" title="Link zu den Cookie Informationen">Weitere Informationen</a>
      `
    },
    option2: {
      cookies: ['youtube'],
      text_en: `
          <label class="cc-banner_settings_label" for="option2">Youtube</label>
        </div>
        <p>
          By accepting YouTube cookies, you accept YouTube´s privacy policy.
          Regardless of this setting, you can also accept the YouTube cookies 
          directly on the videos on this website.
        </p>
        <a class="cc-banner_more" href="http://www.domain-xyz.com/privacy-policy/" title="Link to Cookie Informations">More details</a>
      `,
      text_de: `
        <label class="cc-banner_settings_label" for="option2">Youtube</label>
        <p>
          Durch das Akzeptieren von YouTube-Cookies akzeptieren Sie die Datenschutzbestimmungen von YouTube. 
          Unabhängig von dieser Einstellung können Sie die YouTube-Cookies auch direkt auf den Videos auf dieser Website akzeptieren.
        </p>
        <a class="cc-banner_more" href="http://www.domain-xyz.com/privacy-policy/" title="Link zu den Cookie Informationen">Weitere Informationen</a>
      `
    }
  }
}

/* COOKIE_CONSENT IMPLEMENTATION */

/*
 * ==================================
 * COOKIECONSENT COOKIE SPECIFIC CODE 
 */

const cookieconsent_cookie_fn = {
  'googlesitetag': {
    allow: enableGooglesitetag,
    deny: disableGooglesitetag
  }, 
  'pardot': {
    allow: enablePardot,
    deny: disablePardot
  },
  'youtube': {
    allow: enableVideo,
    deny: disableVideo
  }
}

function disablePardot () {
  deleteScriptIncluding("pardot.com");
}

function deleteScriptIncluding(includeText) {
  let htmlCollection = document.getElementsByTagName('script');
  let scriptElements = Array.prototype.slice.call( htmlCollection );
  scriptElements.forEach(sc => {
    if (sc.src.includes(includeText)) {
      sc.remove();
    }
  })
}

var piAId; // eslint-disable-line no-unused-vars
var piCId; // eslint-disable-line no-unused-vars
var piHostname; // eslint-disable-line no-unused-vars

function enablePardot () {
    piAId = window.cookieconsent.pardot.piAId;
    piCId = window.cookieconsent.pardot.piCId;
    piHostname = 'pi.pardot.com';
    var s = document.createElement('script'); 
    s.type = 'text/javascript';
    s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
    var c = document.getElementsByTagName('script')[0]; 
    c.parentNode.insertBefore(s, c);
}

// https://developers.google.com/analytics/devguides/collection/gtagjs
function enableGooglesitetag () {
  window['ga-disable-' + window.cookieconsent.googlesitetag.gt_id] = false;

  if (window.cookieconsent.googlesitetag.script_loaded) {
    return;
  }

  const firstScriptElement = document.getElementsByTagName('script')[0];
  const gtScriptElement = document.createElement('script');
  gtScriptElement.async=true;
  gtScriptElement.src="https://www.googletagmanager.com/gtag/js?id=" +window.cookieconsent.googlesitetag.gt_id;
  firstScriptElement.parentNode.insertBefore(gtScriptElement, firstScriptElement);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', window.cookieconsent.googlesitetag.gt_id, { 'anonymize_ip': true });
  window.cookieconsent.googlesitetag.script_loaded = true;
}

function disableGooglesitetag () {
  // disable google analytics, existing cookies will not be deleted
  // existing cookies will neither be updated nor sent to google
  // see: https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
  window['ga-disable-' + window.cookieconsent.googlesitetag.gt_id] = true;
  // if we remove the script and then the user activates the cookies, the script will not be added to dom
  // we have to add the script manually. Therefore we don't delete the script
}

function showVideo(contentElementId) {
  var video_parent_div = document.getElementById(contentElementId)
  var video_iframe = video_parent_div.querySelector('iframe');
  var video_overlay_div = video_parent_div.querySelector('.js-video-overlay');
  video_iframe.src = video_parent_div.dataset.video_src;
  video_overlay_div.style.visibility = "hidden";
}

function hideVideo(contentElementId) {
  var video_parent_div = document.getElementById(contentElementId)
  var video_iframe = video_parent_div.querySelector('iframe');
  var video_overlay_div = video_parent_div.querySelector('.js-video-overlay');
  video_iframe.src = "";
  video_overlay_div.style.visibility = "visible";
}

function enableVideo() {
  var video_divs = Array.from(document.getElementsByClassName("video"));
  video_divs.forEach(function (video_parent_div) {
    showVideo(video_parent_div.id);
  });
}

function disableVideo() {
  var video_divs = Array.from(document.getElementsByClassName("video"));
  video_divs.forEach(function (video_parent_div) {
    hideVideo(video_parent_div.id);
  });
}

/*
 * ==========================
 * COOKIECONSENT COMMON CODE 
 */

const consentBanner = document.createElement("DIV");
consentBanner.className="cookieconsent";
document.body.appendChild(consentBanner)

function showCookieConsentBanner() {
  if (document.documentElement.lang === 'en') {
    consentBanner.innerHTML = `
      <div class='cc_overlay'>
        <div class='cc-banner'>
          <h3>Use of cookies</h3>
          <p>We would like to use cookies to better understand your use of this website. This enables us to improve your future user experience on our website and to provide you with interest-based advertising and tailored content on our website as outside our website by partners. You can change or revoke your cookie settings at any time. </p>
          <div class="cc-banner_btns">
            <button class="cc-banner_btn-settings" onclick='showCookieConsentSettings()' title="Link to view and change cookie settings">View and change cookie settings</button>
            <!--<button class="cc-banner-btn-deny" onclick='denyAll()'>Deny</button>-->
            <button class="cc-banner_btn" onclick='allowAll()'>Accept</button>
          </div>
          <p class="cc-banner_btn-privacy-links"><a href="http://www.domain-xyz.com/privacy-policy/" title="Link to Privacy Policy">Privacy Policy</a></p>
        </div>
      </div>
    `;
  // } else if (document.documentElement.lang === 'fr' ) { 
  //   consentBanner.innerHtml = `franzoesischer text`
  } else {
    consentBanner.innerHTML = `
      <div class='cc_overlay'>
        <div class='cc-banner'>
          <h3>Nutzung von Cookies</h3>
          <p>Wir möchten Cookies verwenden, um Ihre Nutzung dieser Webseite besser zu verstehen. Dies ermöglicht es uns, Ihr zukünftiges Nutzererlebnis auf unserer Webseite zu verbessern und Ihnen interessenbezogene Werbung und maßgeschneiderte Inhalte sowohl auf unserer Webseite als auch außerhalb unserer Webseite durch Partner zu präsentieren. Sie können Ihre Cookie-Einstellungen jederzeit ändern oder widerrufen. </p>
          <div class="cc-banner_btns">
            <button class="cc-banner_btn-settings" onclick='showCookieConsentSettings()' title="Link zum Anzeigen und Ändern der Cookie Einstellungen">Anzeigen und Ändern der Cookie Einstellungen</button>
            <!--<button class="cc-banner_btn--deny" onclick='denyAll()'>Ablehnen</button>-->
            <button class="cc-banner_btn" onclick='allowAll()'>Akzeptieren</button>
          </div>
          <p class="cc-banner_btn-privacy-links"><a href="http://www.domain-xyz.com/datenschutz/" title="Link zur Datenschutzerklärung">Datenschutzerklärung</a></p>
        </div>
      </div>
    `;
  }
}

function hideCookieConsentBanner() {
  const buttontext = document.documentElement.lang === 'en' ? 'Cookie Settings' : 'Cookie Einstellungen';
  consentBanner.innerHTML = `
    <button class="cookieconsent__settings-button" onclick="showCookieConsentBanner()">${buttontext}</button>
  `
}

function showCookieConsentSettings() {// eslint-disable-line no-unused-vars
  let checkboxes = ""
  Object.keys(window.cookieconsent.options).forEach((key) => {
    const cookie = window.cookieconsent.options[key];
    var lang = document.documentElement.lang;
    const checked = cookie.allow ? 'checked' : '';
    checkboxes += `<div class="form-check"><input class='js-cookieconsent__checkbox' type='checkbox' value='${key}' ${checked}> ${cookie['text_' + lang]}`
  })
  if (document.documentElement.lang === 'en') {
    consentBanner.innerHTML = `    
      <div class='cc_overlay'>
        <div class='cc-banner'>
          <h3>Manage Cookie Preferences</h3>
          <div class="cc-banner_settings">
            <div class="form-check">
              <input disabled="" type="checkbox" name="technical-required-cookies" value="technical-required-cookies" checked="">
              <label class="cc-banner_settings_label-required" for="technical-required-cookies">Technically required cookies - always selected by default</label>
            </div>
            <p>By technically required cookies we mean cookies without those the technical provision of the online service cannot be ensured. These include e.g. cookies supporting essential services like a smooth reproduction of video or audio footage. So called ‘functional cookies’ are also assigned belonging to this category. Functional cookies store information in order to provide you comfortable use of our online services (e.g. language selection). The legal basis for the processing of personal data by means of cookies of this category is in our legitimate interest. This includes, among other things, the interest in having a professional external presentation as well as an optimal balancing of the loads on the server due to technical reasons.</p>
            <a class="cc-banner_more" href="http://www.domain-xyz.com/privacy-policy/" title="Link to Cookie Informations">More details</a>
            ${checkboxes}
          </div>
          <button class="cc-banner_settings-btn" onclick='allowOnly()'>Confirm Selection</button>
          <!-- <button onclick='showCookieConsentBanner()'> back </button> -->
        </div>
      </div> 
    `;
  // } else if (document.documentElement.lang === 'fr' ) { 
  //   consentBanner.innerHtml = `french text`
  } else {
    consentBanner.innerHTML = `    
    <div class='cc_overlay'>
      <div class='cc-banner'>
        <h3>Cookie Einstellungen verwalten</h3>
        <div class="cc-banner_settings">
          <div class="form-check">
            <input disabled="" type="checkbox" name="technical-required-cookies" value="technical-required-cookies" checked="">
            <label class="cc-banner_settings_label-required" for="technical-required-cookies">Technisch erforderliche Cookies - standardmäßig immer ausgewählt</label>
          </div>
          <p>Unter technisch erforderlichen Cookies verstehen wir Cookies, ohne die die technische Bereitstellung des Online-Angebots nicht gewährleistet werden kann. Dazu gehören z.B. Cookies, die wesentliche Dienste wie eine reibungslose Wiedergabe von Video- oder Audioaufnahmen unterstützen. Dieser Kategorie werden auch so genannte "funktionale Cookies" zugeordnet. Funktionale Cookies speichern Informationen, um Ihnen eine komfortable Nutzung unserer Online-Services (z.B. Sprachauswahl) zu ermöglichen. Rechtsgrundlage für die Verarbeitung personenbezogener Daten mit Hilfe von Cookies dieser Kategorie sind berechtigte Interessen von uns. Hierzu gehören u.a. das Interesse an einer professionellen Außendarstellung sowie an einer optimalen Verteilung der Lasten auf dem Server aus technischen Gründen.</p>
          <a class="cc-banner_more" href="http://www.domain-xyz.com/datenschutz/" title="Link to Cookie Informations">More details</a>
          ${checkboxes}
        </div>
        <button class="cc-banner_settings-btn" onclick='allowOnly()'>Auswahl bestätigen</button>
        <!-- <button onclick='showCookieConsentBanner()'> zurück </button> -->
      </div>
    </div> 
  `;
  }
}

function readCookieConsentCookie() {
  let cc = getCookie('cookieconsent');
  if (cc === "") {
    showCookieConsentBanner()
  } else {
    hideCookieConsentBanner()
    updateCookieConsent(cc)
  }
}

function updateCookieConsent(cc) {
  if (cc === "allow") {
    Object.keys(window.cookieconsent.options).forEach(allowOption);
  } else if (cc === "deny") {
    Object.keys(window.cookieconsent.options).forEach(denyOption);
  } else if (cc.startsWith("allowOnly:")) {
    const allowedOptions = cc.substring("allowOnly:".length).split(",");
    allowedOptions.filter(notNullOrEmpty).forEach(allowOption);
    Object.keys(window.cookieconsent.options).filter(key => {
      return !allowedOptions.includes(key)
    }).forEach(denyOption)
  }
}

function notNullOrEmpty(str) {
  return str && str.trim().length > 0
}

function allowOption(key) {
  if (!window.cookieconsent.options[key].allow) {
    window.cookieconsent.options[key].allow = true;
    window.cookieconsent.options[key].cookies.forEach((cookie) => cookieconsent_cookie_fn[cookie].allow());
  }
}

function denyOption(key) {
  if (window.cookieconsent.options[key].allow) {
    window.cookieconsent.options[key].allow = false;
    window.cookieconsent.options[key].cookies.forEach((cookie) => cookieconsent_cookie_fn[cookie].deny());
  }
}

function allowAll() {// eslint-disable-line no-unused-vars
  let value = "allow";
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function denyAll() {// eslint-disable-line no-unused-vars
  let value = "deny";
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function allowOnly() {// eslint-disable-line no-unused-vars
  let value = "allowOnly:" + Array.from(document.getElementsByClassName("js-cookieconsent__checkbox"))
    .filter(el => el.checked)
    .map(el => el.value)
    .join(',')
  saveCookieConsent(value);
  updateCookieConsent(value);
  hideCookieConsentBanner();
}

function saveCookieConsent(value) {
  setCookie('cookieconsent', value, 365);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

readCookieConsentCookie()
