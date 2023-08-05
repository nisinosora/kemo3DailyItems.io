document.addEventListener('DOMContentLoaded',function(){
  //翻訳（独自）
  var $lang = "ja"
  var $alerts = {
    "nullIcons":{
      "ja": "削除するアイコンがありません", 
      "zh-TW": "沒有刪除圖像"
    },
    "shareError":{
      "ja": "エラーが発生しました。\n画像が存在しないか、ブラウザが非対応の可能性があります", 
      "zh-TW": "發生錯誤。\n圖像可能不存在或瀏覽器不支持"
    },
    "cantAddIcons":{
      "ja": "これ以上はアイコンを追加できません",
      "zh-TW": "無法追加更多圖象"
    },
    "cantChoiceIcons":{
      "ja": "「アイテム置き換え」欄にアイテムがないため選択できません",
      "zh-TW":"不能選擇，因為「替換品目」中沒有項目"
    },
    "AllIconsRemove":{
      "ja":"全てのアイコンを削除します。よろしいですか？",
      "zh-TW":"刪除所有圖像。確定嗎？"
    }
  }

  var $labels = {
    "title":{"ja": "【けものフレンズ3】ログボマトメールP", "zh-TW":"【動物朋友3】全部都記下來M"},
    "#Usage_PassportList":{"ja": "リスト：パスポート", "zh-TW":"選單：月間通行證"},
    "#Usage_ModeList":{"ja":"リスト：モード", "zh-TW":"選單：方式"},
    "#Usage_Create_Download":{"ja": "生成・ダウンロード", "zh-TW":"生成、下載"},
    "#Usage_Remove":{"ja": "削除", "zh-TW":"刪除"},
    "#Usage_Share":{"ja":"共有","zh-TW":"分享"},
    "#Usage_EmissionRate":{"ja":"排出率算出","zh-TW":"計算機率"},
    "#Usage_Other":{"ja":"その他","zh-TW":"其他"},
    "#Label_Passport":{"ja":"パスポート：","zh-TW":"月間通行證："},
    "#Label_Mode":{"ja":"モード：","zh-TW":"方式："},
  }

  var $options = {
    "option_all":{"ja":"すべて","zh-TW":"全部"},
    "option_first_little":{"ja":"はじめて・ちょこっと","zh-TW":"初次、少許"},
    "option_standard":{"ja":"すたんだーど","zh-TW":"標準"},
    "option_gorgeous":{"ja":"ごーじゃす","zh-TW":"豪華"},
    "option_add":{"ja":"追加","zh-TW":"追加"},
    "opiton_change":{"ja":"置き換え","zh-TW":"調換"}
  }

  var $buttons = {
    "#last_delete":{"ja":"最後尾のアイコンを削除","zh-TW":"刪除最後一個圖標"},
    "#all_delete":{"ja":"全てのアイコンを削除","zh-TW":"刪除一切圖標"},
    "#result_output":{"ja":"排出率算出","zh-TW":"計算機率"},
    "#share":{"ja":"画像・排出率結果を共有する","zh-TW":"分享圖像、機率"},
    "#item_reselect":{"ja":"選択解除","zh-TW":"取消選擇"}
  }

  var $iconsImages = {
    "#l5":{"ja":"ラッキーメダル5","zh-TW":"幸運獎牌5"},
    "#l250":{"ja":"ラッキーメダル250","zh-TW":"幸運獎牌250"},
    "#o1":{"ja":"オシャレメダル","zh-TW":"時尚獎牌"},
    "#g5":{"ja":"輝きの欠片5","zh-TW":"閃耀碎片5"},
    "#g10":{"ja":"輝きの欠片10","zh-TW":"閃耀碎片10"},
    "#g30":{"ja":"輝きのかけら30","zh-TW":"閃耀碎片30"},
    "#msr1":{"ja":"おもいでの石SR","zh-TW":"回憶之石SR"},
    "#mssr1":{"ja":"おもいでの石SSR","zh-TW":"回憶之石SSR"},
    "#g1000":{"ja":"ゴールド1000","zh-TW":"金幣1000"},
    "#g5000":{"ja":"ゴールド5000","zh-TW":"金幣5000"},
    "#d201":{"ja":"スタミナ20回復ドリンク","zh-TW":"體力20回復飲"},
    "#d501":{"ja":"スタミナ50回復ドリンク","zh-TW":"體力50回復飲"},
    "#jm10":{"ja":"ジャパまん（オール）中10","zh-TW":"加帕里饅頭（全）中10"},
    "#jb10":{"ja":"ジャパまん（オール）大10","zh-TW":"加帕里饅頭（全）大10"},
    "#jb30":{"ja":"ジャパまん（オール）大30","zh-TW":"加帕里饅頭（全）大30"},
    "#jb120":{"ja":"ジャパまん（オール）大120","zh-TW":"加帕里饅頭（全）大120"},
    "#b1":{"ja":"ジャパリパン","zh-TW":"加帕里麵包"},
    "#dsr1":{"ja":"虹色のアニマルラムネSR","zh-TW":"虹彩色的動物彈珠汽水SR"},
    "#dssr1":{"ja":"虹色のアニマルラムネSSR","zh-TW":"虹彩色的動物彈珠汽水SSR"},
    "#k4":{"ja":"キラキラ4","zh-TW":"閃亮亮4"},
    "#k12":{"ja":"キラキラ12","zh-TW":"閃亮亮12"},
    "#k25":{"ja":"キラキラ25","zh-TW":"閃亮亮25"},
    "#k50":{"ja":"キラキラ50","zh-TW":"閃亮亮50"},
    "#k75":{"ja":"キラキラ75","zh-TW":"閃亮亮75"},
    "#k100":{"ja":"キラキラ100","zh-TW":"閃亮亮100"},
    "#k150":{"ja":"キラキラ150","zh-TW":"閃亮亮150"},
    "#k250":{"ja":"キラキラ250","zh-TW":"閃亮亮250"},
    "#k300":{"ja":"キラキラ300","zh-TW":"閃亮亮300"},
    "#k500":{"ja":"キラキラ500","zh-TW":"閃亮亮500"},
    "#k1000":{"ja":"キラキラ1000","zh-TW":"閃亮亮1000"},
    "#i1":{"ja":"しょうたい券1","zh-TW":"招待券1"},
    "#i10":{"ja":"しょうたい券10","zh-TW":"招待券10"},
    "#s21":{"ja":"☆2以上フレンズしょうたい券","zh-TW":"☆2以上朋友招待券"},
    "#s31":{"ja":"☆3以上しょうたい券","zh-TW":"☆3以上招待券"},
    "#sf31":{"ja":"☆3以上フレンズしょうたい券","zh-TW":"☆3以上朋友招待券"},
    "#s41":{"ja":"☆4しょうたい券","zh-TW":"☆4招待券"},
    "#sft41":{"ja":"☆4フレンズしょうたいチケット","zh-TW":"☆4朋友招待券碎片"},
    "#sf41":{"ja":"☆4フレンズしょうたい券","zh-TW":"☆4朋友招待券"},
    "#s0":{"ja":"空白","zh-TW":"空白"}
  }

  var $tablesTh = {
    "#th_image":{"ja":"画像","zh-TW":"圖像"},
    "#th_itemName":{"ja":"アイテム名","zh-TW":"品目名"},
    "#th_count":{"ja":"個数","zh-TW":"件數"},
    "#th_EmissionRate":{"ja":"排出率","zh-TW":"機率"}
  }

  var $shareContent = {"ja": "スペシャルデイリーボーナスの結果です！", "zh-TW": "特別每日任務獎勵的結果！"}

  $('input[name="lang"]:radio').change(function(){
    $lang = $(this).val();

    //独自変換部
    for(let [key, value] of Object.entries($labels)){
      $(`${key}`).text(value[$lang]);
    }

    for(let [key, value] of Object.entries($options)){
      var optionElement = document.getElementById(key);
      if (optionElement){
        optionElement.textContent = value[$lang];
      }
    }

    for(let [key, value] of Object.entries($buttons)){
      $(`${key}`).val(value[$lang]);
    }

    for(let [key, value] of Object.entries($iconsImages)){
      $(`${key}`).attr('alt', value[$lang]);
    }

    for(let [key, value] of Object.entries($tablesTh)){
      $(`${key}`).text(value[$lang]);
    }
  })

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

  $("#choice_mode").on('change', function(){
    var select = document.getElementById("choice_mode");
    var download_img = document.getElementById("download_image");
    var calendar = document.getElementById("calendar");
    switch(select.value){
      case 'add':
        download_img.hidden = false;
        calendar.hidden = true;
        break;
      case 'change':
        download_img.hidden = true;
        calendar.hidden = false;
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
          create();
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
      $("#lists li:last").remove();
      if($("#lists li").length < 1){
        var selecting = document.getElementById("item_select");
        selecting.src = ""
        selecting.alt = ""
        $("#item_selecting").css("display", "none");
      }
      create();
    }else{
      alert($alerts["nullIcons"][$lang]);
    }
  });

  //全てのアイコンを削除
  $("#all_delete").on('click', function(){
    if($("#lists li").length > 0){
      var check = confirm($alerts["AllIconsRemove"][$lang])
      if (check == true){
        $("#lists li").remove();
        var selecting = document.getElementById("item_select");
        selecting.src = ""
        selecting.alt = ""
        $("#item_selecting").css("display", "none");
        document.getElementById("choice_mode").value = "add";
        document.getElementById("change_hidden").checked = false;
        var lists = document.getElementById("canvas_2d").getContext('2d');
        lists.clearRect(0, 0, 1050, 900);
        var link_img = document.getElementById("canvas_img");
        link_img.style.display = "none";
        link_img.src = ""
      }
    }else{
      alert($alerts["nullIcons"][$lang]);
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

  //共有
  $("#share").on('click', function(){
    var infos
    var images = []
    infos = {
      "text": $shareContent[$lang],
      "url": "https://nisinosora.github.io/kemo3DailyItems.io/",
      "hashtags": $labels["title"][$lang],
      "image": [document.getElementById("canvas_img").src]
    }

    if($("#result_table tbody tr").length > 0){
      var resule_image = document.getElementById("result_table_image");
      infos["image"].push(resule_image.src);
    }

    try{
      infos["image"].forEach(function(value){
        const blob = toBlob(value);
        const imageFile = new File([blob], "image.png", {type: "image/png"});
        images.push(imageFile)
      });
      navigator.share({
        text: infos["text"],
        url: infos["url"],
        files: images,
      })
    }catch(e){
      alert($alerts["shareError"][$lang]);
      console.log(e);
    }
  });

  $("#result_output").on('click', function(){
    result_table();
    result_table_image();
  })

  //生成関数
  function create() {
    var lists = document.getElementById("canvas_2d").getContext('2d');
    var blank_cell = document.getElementById("blank_cell");
    var canvas_2d = document.getElementById("canvas_2d");
    var arys = [], output_check;
    var x_ind = 0, y_ind = 0;
    lists.clearRect(0, 0, 1050, 900);

    var canvas_img_width, canvas_img_height;
    canvas_img_width = 0;
    canvas_img_height = 1;

    $("#lists").find('img').each(function(i){
      arys[i] = new Image()
      arys[i].src = $(this).attr('src')
      arys[i].alt = $(this).attr('alt')
      output_check = true;
      if(arys[i].alt == "空白" && blank_cell.checked){
        output_check = false
      }
      if(output_check){
        if(y_ind == 0){
          canvas_img_width += 1;
        }
      }
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    });

    canvas_img_height = Math.ceil(parseFloat($("#lists li").length / 7))
    var link_img = document.getElementById("canvas_img")
    link_img.style.width = canvas_img_width * 50 + "px";
    link_img.style.height = canvas_img_height * 50 + "px";
    canvas_2d.width = canvas_img_width * 150;
    canvas_2d.height = canvas_img_height * 150;

    x_ind = 0;
    y_ind = 0;

    $.each(arys, function(i){
      output_check = true;
      if(arys[i].alt == "空白" && blank_cell.checked){
        output_check = false
      }
      if(output_check){
        lists.drawImage(arys[i], x_ind * 150, y_ind * 150, 150, 150);
      }
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    })

    var links = document.getElementById("canvas_2d").toDataURL('image/png')
    link_img.src = links;
    link_img.style.display = "inline"
  }

  //追加関数
  function add(item){
    if($("#lists li").length <= 41){
      var img_src = item.attr('src');
      var img_alt = item.attr('alt');
      $("ul#lists").append(`<li class=\"li_lists\"><img src=\"${img_src}\" alt=\"${img_alt}\" class=\"img_list\"></li>`);
      create();
    }else{
      alert($alerts["cantAddIcons"][$lang]);
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
      create();
    }else{
      alert($alerts["cantChoiceIcons"][$lang]);
    }
  }

  function result_table(){
    var result_lists = {};
    var item_name;
    var src;
    var sum = $("#lists li").length - space_count();
    var sum_par = 0;
    $("#lists").find('img').each(function(){
      item_name = $(this).attr('alt');
      src = $(this).attr('src');
      if(item_name != "空白"){
        if (item_name in result_lists){
          result_lists[item_name].count++;
          var count = result_lists[item_name].count
          result_lists[item_name].parsent = round(count/sum*100,4)
        }else{
          result_lists[item_name] = {count: 1 ,src: src, parsent: round(1/sum*100,4)};
        }
      }
    });

    var table = $("#result_table tbody")
    table.remove();
    $("#result_table").append("<tbody></tbody>");
    for(let [key, value] of Object.entries(result_lists)){
      sum_par = sum_par + value.parsent;
      $("#result_table tbody").append(`<tr><td><img src=\"${value.src}\" alt=\"${key}\"></td><td>${key}</td><td>${value.count}</td><td>${value.parsent}%</td></tr>`);
    }
    sum_par = round(sum_par, 4)
    $("#result_table tbody").append(`<tr><td colspan="2">合計</td><td>${sum}</td><td>${sum_par}%</td></tr>`)
  }

  function result_table_image(){
    html2canvas(document.querySelector("#result_list")).then(canvas => { 
      var src = canvas.toDataURL("image/png");
      var file = document.getElementById("result_table_image")
      file.src = src;
    });
  }

  const toBlob = (base64) => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      buffers[i] = decodedData.charCodeAt(i);
    }
    try {
      const blob = new Blob([buffers.buffer], {
        type: "image/png",
      });
      return blob;
    } catch (e) {
      return null;
    }
  };

  function round(num, digit) {
    var digitVal = Math.pow( 10, digit );
    return Math.trunc( num * digitVal ) / digitVal;
  }

  function space_count(){
    var item_name;
    var count = 0;
    $("#lists").find('img').each(function(){
      item_name = $(this).attr('alt');
      if(item_name == "空白"){
        count++;
      }
    });
    return count;
  }
});