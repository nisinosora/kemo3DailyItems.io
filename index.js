$(function(){
  $("#images > img").on('click', function(){
    var img_src = $(this).attr('src');
    var img_alt = $(this).attr('alt');
    $("ul#lists").append(`<li class=\"img_list\"><img src=\"${img_src}\" alt=\"${img_alt}\"></li>`);
  });
});