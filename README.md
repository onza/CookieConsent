# CookieConsent

### A cookie consent implementation script for websites

### Features
* Google Analytics, Pardot (Salesforce), YouTube
* YouTube cookies can either be confirmed by the cookie banner or directly on the videos.
* Styles for Banner and YouTube Video overlay.
* Cookie settings can be changed via the menu.
* Extendable for other cookies
* \>= IE 11 support (not tested below)

### Requirement for YouTube cookie consent
* The HTML structure has to be adapted for YouTube:
```
<div id="video__wrapper-id" class="youtubevideo" data-yt_video_src="https://www.youtube-nocookie.com/embed/{YOUTUBE-VIDEO_ID}?controls=0">
  <div class="youtubevideo__container">
    <iframe height="343" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div class="youtubevideo__consentbanner js-ytbanner">
    <div class="youtubevideo__consentbanner-wrapper">
      <div class="youtubevideo__consentbanner-text">By loading the video, you accept YouTube's privacy policy.</div>
      <button onclick="showYoutubeVideo('video__wrapper-id')">load video</button>
    </div>
  </div>
</div>
```
* Replace `{YOUTUBE-VIDEO_ID}` with YouTube video ID.