# Cookie Consent (Opt-In)

## A cookie consent opt-in implementation script

[Watch Demo](https://onza.github.io/CookieConsent)

Feel free to customize it for your own needs.

### Features

* So far, it works for the scripts from Google Analytics, Pardot (Salesforce), and YouTube/Vimeo.
* Cookie providers that are not required can be commented out or deleted.
* Extendable for other cookies.
* YouTube/Vimeo cookies can either be confirmed by the cookie banner or directly on the overlay of the videos (HTML structure has to be adjusted - see below).
* CSS for Consent Banner and for YouTube Video overlay.
* Cookie settings can be changed via checkboxes on the banner.
* Cookies in the banner settings are grouped as "Essential Cookies", "Marketing/Analysis", "YouTube" but can be changed easily.
* Already accepted cookies are not deleted, Pardot scripts will be removed from the DOM. Google Analytics script will not be deleted. Instead it will be deactivated as described in Google Analytics Opt-Out. Further read [Google Developers Guide](https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out).
* Multilanguage support by reading out the lang attribute.
* Kicked out! (March 2023): To support IE 11 (not tested below IE11) include lib/js/polyfills.js before CookieConsent.js.

<br>

### Requirement for Google Analytics and Pardot

* Replace IDs in **CookieConsent.js**:

```js
  googlesitetag: {
    gt_id: 'UA-XXXXXXXXXX-X'
  },
  pardot: {
    piAId: 'xxxxx',
    piCId: 'xxxx'
  },
```

 <br>

## Requirement for YouTube (or Vimeo)

* The HTML structure has to be adapted for YouTube/Vimeo:

```html
<div id="video_wrapper-id" class="video" data-yt_video_src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}?controls=0">
  <div class="video_container">
    <iframe height="343" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div class="cc_video-overlay js-video-overlay">
    <div class="cc_video-overlay_container">
      <div class="cc_video-overlay_text">By loading the video, you accept YouTube's privacy policy.</div>
      <button onclick="showVideo('video_wrapper-id')">load video</button>
    </div>
  </div>
</div>
```

(Replace `{VIDEO_ID}` with YouTube video ID.)

<br>

## Customization

* Clone repository via git.
* Run `npm install`
* Customize files `src/js/CookieConsent.js` and `src/css/CookieConsent.css`.
* Run `gulp`
* Use the new generated lib-files

<br>

### Define custom cookies

Change the `CookieConsent.js` file in src folder

#### Add custom cookie functions to `cookieconsent_cookie_fn`

```js
const cookieconsent_cookie_fn = {
  ...
  '{CUSTOM_COOKIE_NAME}': {
    allow: {ENABLE_COOKIE_FUNCTION},
    deny: {DISABLE_COOKIE_FUNCTION}
  },
} 

function {ENABLE_COOKIE_FUNCTION} () {
  // custom code
}
function {DISABLE_COOKIE_FUNCTION} () {
  // custom code
}
```

#### Extend `cookieconsent.options`

1) Add cookie to an existing option or define a new option

```js
window.cookieconsent = {
  ...
  options: {
    option1: {
      cookies: ['googlesitetag', 'pardot', {CUSTOM_COOKIE_NAME}],
  ...
```

2) Define a custom option

```js
window.cookieconsent = {
  ...
  options: {
    {CUSTOM_OPTION}: {
      cookies: [{CUSTOM_COOKIE_NAME}],
      text_en `{CUSTOM_TEXT_EN_FOR_OPTION}`
      text_de `{CUSTOM_TEXT_DE_FOR_OPTION}`
  ...
```

Then run command `gulp` and use the new created scripts in lib folder 

<br>

### Remove deny button

Remove the following line in all languages in `src/js/CookieConsent.js` and change the styles.

```html
<button class="cc-banner_btn-deny" onclick='denyAll()'>Deny</button>
```

<br>

### Not happy with the layout?

Define your own CSS-Layout. Adapt file `src/scss/CookieConsent.scss` to your needs.

<br>

## Any recommendations or bugs?

Please open an issue. Thank you.
