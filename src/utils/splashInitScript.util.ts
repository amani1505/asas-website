export const SPLASH_STORAGE_KEY = 'asas-splash';

/**
 * Runs before first paint. The splash plays once per visit: later page loads
 * in the same tab (and browsers with storage blocked) skip it.
 */
export const SPLASH_INIT_SCRIPT = `(function(){var r=document.documentElement;try{if(sessionStorage.getItem("${SPLASH_STORAGE_KEY}")){r.dataset.splash="seen"}else{sessionStorage.setItem("${SPLASH_STORAGE_KEY}","1")}}catch(e){r.dataset.splash="seen"}})()`;
