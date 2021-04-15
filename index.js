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
    $("#canvas_link").href = lists.toDataURL('image/png');
    $("#canvas_link").css("display","block");
  });
  $("#download").on('click', function(){
    var check1 = false;
    var check2 = false;
    if($("#lists li").length > 0){check1 = true}
    check2 = imagecheck($("#canvas_2d").src)

    if(check1 && check2){
      let canvas = document.getElementById("canvas_2d");
      let link = document.createElement("a");
      link.href = canvas.toDataURL('image/png');
      link.download = "ダウンロード.png";
      link.click();
    }else{
      alert("ダウンロード用ファイルがないため、ダウンロードできません。");
    }
  });
});