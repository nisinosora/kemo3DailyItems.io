document.addEventListener('DOMContentLoaded',function(){
  function imagecheck(url) {
    var img = new Image();
    var check = true;
    try{
      img.src = url;
      check = true
    }catch{
      check = false
    }
    return check;
  }
  $("#images > img").on('click', function(){
    if($("#lists li").length <= 41){
      var img_src = $(this).attr('src');
      var img_alt = $(this).attr('alt');
      $("ul#lists").append(`<li><img src=\"${img_src}\" alt=\"${img_alt}\" class=\"img_list\"></li>`);
    }else{
      alert("これ以上は追加できません。");
    }
  });
  $("#input_submit").on('click', function(){
    var lists = document.getElementById("canvas_2d").getContext('2d');
    var x_ind = 0;
    var y_ind = 0;
    var arys = [];
    $("#lists").find('img').each(function(i){
      arys[i] = new Image()
      arys[i].src = $(this).attr('src')
    });

    $.each(arys, function(i){
      lists.drawImage(arys[i], x_ind * 50, y_ind * 50, 50, 50);
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    })
    var links = document.getElementById("canvas_2d").toDataURL('image/png')
    var link_img = document.getElementById("canvas_img")
    link_img.src = links;
    link_img.style.display = "inline";
  });
  $("#mode-select").on('change', function(){
    var select = document.getElementById("mode-select");
    switch(select.value){
      case 'all':
        $(".first_little").css("display", "inline");
        $(".standard").css("display", "inline");
        $(".gorgeous").css("display", "inline");
        break;
      case 'first_little':
        $(".first_little").css("display", "inline");
        $(".standard").css("display", "none");
        $(".gorgeous").css("display", "none");
        break;
      case 'standard':
        $(".first_little").css("display", "none");
        $(".standard").css("display", "inline");
        $(".gorgeous").css("display", "none");
        break;
      case 'gorgeous':
        $(".first_little").css("display", "none");
        $(".standard").css("display", "none");
        $(".gorgeous").css("display", "inline");
        break;
    }
  });
});