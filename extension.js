
// functions stuff

function load_similar_videos(data) {
  var feed = data.feed;
  var entries = feed.entry || [];
  if (entries.length > 0) {
    entries.splice(0,1);
  }
  var html = [ '<ul id="similar_videos_data">',
    '<span style="font-size: 18px; color: #000000; font-weight: bold; text-decoration:none; display: block; clear: both; margin: 10px">',
    'Подобни</span>'];
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title_full = entry.title.$t;
    var title = title_full.substr(0, 30);
    var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
    var playerUrl = entries[i].media$group.media$content[0].url;
    html.push('<li onclick="loadVideo(\'', playerUrl, '\', true)">',
                '<img src="', thumbnailUrl, '" width="130" height="97" title="', title_full ,'" />',
                '<a href="javascript:void(0);" title="', title_full, '" class="titlec">', title, '...</a>',
              '</li>');
  }
  html.push('</ul><br style="clear: left;"/>');
  document.getElementById('youtube_related_videos').innerHTML = html.join('');

}

// removes stuff
$('div.comments').hide();
$('table.kare-grey').next().next().next().hide();
$('table.kare-grey').next().next().remove();
$('table.kare-grey').next().remove();

// adds stuff
$('div.comments').parent().append('<div style="height:100px;"></div>');
$('div.clipControls').append(' \
    <div class="clipControlsBtn"> \
        <span style="  background-color: #fefcfd; \
                    font-size:10px; \
                    display:block; \
                    height: 24px; \
                    padding: 0 5px ;" \
            ><a href="javascript:void(0);" style="display: block; padding-top:4px; color: #666666;" \
                        onclick="$j(\'div.comments\').toggle()" style="display:block">Расизъм/Хейт/Спам</a></span> \
    </div> \
');
$('table.kare-grey').parent().append('<div id="youtube_related_videos"></div>');


// checks for stuff
youtube_video = null;
$('embed').each(function (i, embd) {
    var match = embd.src.toString().match(/youtube\.com\/\w\/([\w\d-_]+)/);
    if (match) {
        youtube_video = match[1];
        $(embd).parent().attr('id', 'player');
    }
});

if (youtube_video) {
    
    var css_url = chrome.extension.getURL("extension.css");
    var js_url = chrome.extension.getURL("inject.js");
    
    var css_file=document.createElement("link");
    css_file.setAttribute("rel", "stylesheet");
    css_file.setAttribute("type", "text/css");
    css_file.setAttribute("href", css_url);
    
    var js_file = document.createElement("script");
    js_file.setAttribute("type", "text/javascript");
    js_file.setAttribute("src", js_url);
    
    var swf_file = document.createElement("script");
    swf_file.setAttribute("type", "text/javascript");
    swf_file.setAttribute("src", "http://swfobject.googlecode.com/svn/trunk/swfobject/swfobject.js");
    
    $('head').append(css_file).append(js_file).append(swf_file);
    
    var url = "http://gdata.youtube.com/feeds/api/videos/" + youtube_video +
        "/related?v=2&alt=json-in-script&callback=load_similar_videos&format=5&max-results=7";
        
    $.ajax(url, {
        success : function (data, textStatus, jqXHR) {
            return true;
        }
    });
}

