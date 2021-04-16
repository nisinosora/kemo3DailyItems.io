document.addEventListener('DOMContentLoaded',function(){
  $("#images > img").on('click', function(){
    var item = $(this);
    var select = document.getElementById("choice_mode");
    switch(select.value){
      case 'add':
        if($("#lists li").length <= 41){
          var img_src = item.attr('src');
          var img_alt = item.attr('alt');
          $("ul#lists").append(`<li class=\"li_lists\"><img src=\"${img_src}\" alt=\"${img_alt}\" class=\"img_list\"></li>`);
        }else{
          alert("これ以上は追加できません");
        }              
        break;
      case 'change':
        if($("#lists li").length > 0){
          var items = document.getElementById("item_select")
          items.src = item.attr('src');
          items.alt = item.attr('alt');
          $("#item_selecting").css("display", "inline");
        }else{
          alert("アイテム枠にアイテムがないため選択できません");
        }
        break;
    }
  });

  $("#item_reselect").on('click', function(){
    var items = document.getElementById("item_select");
    items.src = ""
    items.alt = ""
    $("#item_selecting").css("display", "none");
  });

  $("#lists").on('mouseenter', function(){
    var mouse_img_list = document.querySelectorAll(".img_list")
    mouse_img_list.forEach(function(value){
      value.addEventListener('click', function(){
        var item = value;
        var selecting = document.getElementById("item_select");
        var reset_check = document.getElementById("change_hidden");
        var pat = /.png|.jpg|.jpeg|.JPG|.JPEG\Z/
        if(selecting.src.match(pat)){
          item.src = selecting.src;
          item.alt = selecting.alt;
          if(reset_check.checked){
            selecting.src = ""
            selecting.alt = ""
            $("#item_selecting").css("display", "none");
          }
        }
      });
    });
  });

  $("#last_delete").on('click', function(){
    if($("#lists li").length > 0){
      var check = confirm("最後に追加したアイコンを削除します。よろしいですか？")
      if (check == true){
        $("#lists li:last").remove();
      }
    }else{
      alert("削除するアイコンがありません。");
    }
  });

  $("#all_delete").on('click', function(){
    if($("#lists li").length > 0){
      var check = confirm("全てを削除します。よろしいですか？")
      if (check == true){
        $("#lists li").remove();
      }
    }else{
      alert("削除するアイコンがありません。");
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