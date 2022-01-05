document.addEventListener('DOMContentLoaded',function(){
  //画像クリック時の処理
  $("#images > img").on('click', function(){
    var item = $(this);
    var select = document.getElementById("choice_mode");
    switch(select.value){
      case 'add':
        add(item);
        break;
      case 'change':
        change(item);
        break;
    }
  });

  //アイテム選択解除ボタン処理
  $("#item_reselect").on('click', function(){
    var items = document.getElementById("item_select");
    items.src = ""
    items.alt = ""
    $("#item_selecting").css("display", "none");
  });

  //生成アイテム処理
  $("#lists").on('mouseenter', function(){
    var mouse_img_list = document.querySelectorAll(".img_list")
    mouse_img_list.forEach(function(value){
      value.addEventListener('click', function(){
        var item = value;
        var selecting = document.getElementById("item_select");
        var reset_check = document.getElementById("change_hidden");
        var pat = /.png|.PNG|.jpg|.jpeg|.JPG|.JPEG\Z/
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

  //最後のアイコンを削除
  $("#last_delete").on('click', function(){
    if($("#lists li").length > 0){
      var check = confirm("最後に追加したアイコンを削除します。よろしいですか？")
      if (check == true){
        $("#lists li:last").remove();
        if($("#lists li").length < 1){
          var selecting = document.getElementById("item_select");
          selecting.src = ""
          selecting.alt = ""
          $("#item_selecting").css("display", "none");
        }
      }
    }else{
      alert("削除するアイコンがありません。");
    }
  });

  //全てのアイコンを削除
  $("#all_delete").on('click', function(){
    if($("#lists li").length > 0){
      var check = confirm("全てを削除します。よろしいですか？")
      if (check == true){
        $("#lists li").remove();
        var selecting = document.getElementById("item_select");
        selecting.src = ""
        selecting.alt = ""
        $("#item_selecting").css("display", "none");
        document.getElementById("choice_mode").value = "add";
        document.getElementById("change_hidden").checked = false;
      }
    }else{
      alert("削除するアイコンがありません。");
    }
  });

  //生成処理
  $("#input_submit").on('click', function(){
    if($("#lists li").length > 0){
      for (var count = 0; count < 2; count++) {
        create();
      }
    }else{
      alert("アイコンがありません");
    }
  });

  //モード切替
  $("#mode-select").on('change', function(){
    var select = document.getElementById("mode-select");
    switch(select.value){
      case 'all':
        $(".first_little").css("display", "inline");
        $(".standard").css("display", "inline");
        $(".gorgeous").css("display", "inline");
        break;
      case 'first_little':
        $(".standard").css("display", "none");
        $(".gorgeous").css("display", "none");
        $(".first_little").css("display", "inline");
        break;
      case 'standard':
        $(".first_little").css("display", "none");
        $(".gorgeous").css("display", "none");
        $(".standard").css("display", "inline");
        break;
      case 'gorgeous':
        $(".first_little").css("display", "none");
        $(".standard").css("display", "none");
        $(".gorgeous").css("display", "inline");
        break;
    }
  });

  //ツイート
  $("#tweet").on('click', function(){
    var a = document.createElement('a');
    var link_img = document.getElementById("canvas_img")
    if(link_img.style.display == "inline"){
      a.href = link_img.src;
      alert(a.href);
    }
  });

  //生成関数
  function create() {
    var lists = document.getElementById("canvas_2d").getContext('2d');
    var blank_cell = document.getElementById("blank_cell");
    var x_ind = 0, y_ind = 0;
    var canvas_2d = document.getElementById("canvas_2d");
    var arys = [], output_check;
    lists.clearRect(0, 0, 1050, 900);

    $("#lists").find('img').each(function(i){
      arys[i] = new Image()
      arys[i].src = $(this).attr('src')
      arys[i].alt = $(this).attr('alt')
    });

    var canvas_img_width, canvas_img_height;
    canvas_img_width = 0;
    canvas_img_height = 1;
    $.each(arys, function(i){
      output_check = true;
      if(arys[i].alt == "空白" && blank_cell.checked){
        output_check = false
      }
      if(output_check){
        lists.drawImage(arys[i], x_ind * 150, y_ind * 150, 150, 150);
        if(y_ind == 0){
          canvas_img_width += 1;
        }
      }
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    })

    canvas_img_height = Math.ceil(parseFloat($("#lists li").length / 7))
    
    var links = document.getElementById("canvas_2d").toDataURL('image/png')
    var link_img = document.getElementById("canvas_img")
    link_img.style.width = canvas_img_width * 50 + "px";
    link_img.style.height = canvas_img_height * 50 + "px";
    canvas_2d.width = canvas_img_width * 150;
    canvas_2d.height = canvas_img_height * 150;
    link_img.src = links;
    link_img.style.display = "inline"
  }

  //追加関数
  function add(item){
    if($("#lists li").length <= 41){
      var img_src = item.attr('src');
      var img_alt = item.attr('alt');
      $("ul#lists").append(`<li class=\"li_lists\"><img src=\"${img_src}\" alt=\"${img_alt}\" class=\"img_list\"></li>`);
    }else{
      alert("これ以上は追加できません");
    }
  }

  //切り替え関数
  function change(item){
    if($("#lists li").length > 0){
      var items = document.getElementById("item_select")
      var file_name = document.getElementById("file_name")
      items.src = item.attr('src');
      items.alt = item.attr('alt');
      file_name.value = item.attr('alt');
      $("#item_selecting").css("display", "inline");
    }else{
      alert("アイテム枠にアイテムがないため選択できません");
    }
  }
});