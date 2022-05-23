window.fbAsyncInit = function() {
  FB.init({
    appId      : '756618435716469',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); 


function shareScore() {
  FB.ui({
    method: 'share',
    href: 'http://137.184.187.82/plesk-site-preview/affectionate-shamir.137-184-187-82.plesk.page/https/137.184.187.82/screen/principal.html',
    hashtag: "#CrazyColors",
    quote: "¡Juguemos juntos!" 
  }, function(response){});
}
