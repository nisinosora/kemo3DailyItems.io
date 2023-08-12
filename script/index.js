document.addEventListener('DOMContentLoaded',function(){
  //翻訳（独自）
  let $itemList = []
  let $lang = "ja"
  const $alerts = {
    "nullIcons":{
      "ja": "削除するアイコンがありません", 
      "zh-TW": "沒有可刪除的圖標",
      "zh-CN":"没有可删除的图标"
    },
    "shareError":{
      "ja": "エラーが発生しました。\n画像が存在しないか、ブラウザが非対応の可能性があります", 
      "zh-TW": "發生錯誤。\n圖片可能不存在或瀏覽器不支持",
      "zh-CN":"发生错误。 \n图片可能不存在或浏览器不支持"
    },
    "cantAddIcons":{
      "ja": "これ以上はアイコンを追加できません",
      "zh-TW": "無法添加更多圖標",
      "zh-CN": "无法添加更多图标"
    },
    "cantChoiceIcons":{
      "ja": "「アイテム置換」欄にアイテムがないため選択できません",
      "zh-TW":"無法選中，因為「替換項目」中沒有可選物品",
      "zh-CN":"无法选中，因为「替换项目」中没有可选物品"
    },
    "AllIconsRemove":{
      "ja":"全てのアイコンを削除します。よろしいですか？",
      "zh-TW":"刪除所有圖標。確定嗎？",
      "zh-CN":"删除所有图标。确定吗？"
    },
    "Saved":{
      "ja":"保存しました\nURLをコピーして下さい",
      "zh-TW":"已保存\n請複製網址",
      "zh-CN":"已保存\n请复制网址"
    }
  }

  const $labels = {
    "title":{
      "ja": "【けものフレンズ3】ログボマトメールP", 
      "zh-TW":"【動物朋友3】全部都記下來M", 
      "zh-CN":"【动物朋友3】全部都记下来M"
    },
    "#Usage_PassportList":{
      "ja": "リスト：パスポート", 
      "zh-TW":"列表：月卡",
      "zh-CN":"列表：月卡"
    },
    "#Usage_ModeList":{
      "ja":"リスト：モード", 
      "zh-TW":"列表：模式",
      "zh-CN":"列表：模式"
    },
    "#Usage_Create_Download":{
      "ja": "生成・ダウンロード", 
      "zh-TW":"生成、下載",
      "zh-CN":"生成、下载"
    },
    "#Usage_Remove":{
      "ja": "削除",
      "zh-TW":"刪除",
      "zh-CN":"删除"
    },
    "#Usage_Share":{
      "ja":"共有",
      "zh-TW":"分享",
      "zh-CN":"分享"
    },
    "#Usage_EmissionRate":{
      "ja":"排出率算出",
      "zh-TW":"計算概率",
      "zh-CN":"计算概率"
    },
    "#Usage_Other":{
      "ja":"その他",
      "zh-TW":"其他",
      "zh-CN":"其他"
    },
    "#Label_Passport":{
      "ja":"パスポート：",
      "zh-TW":"月卡：",
      "zh-CN":"月卡："
    },
    "#Label_Mode":{
      "ja":"モード：",
      "zh-TW":"模式：",
      "zh-CN":"模式："
    },
    "#Usage_Save_now":{
      "ja":"状態を保存する",
      "zh-TW":"保存狀態",
      "zh-CN":"保存状态"
    }
  }

  const $options = {
    "option_all":{
      "ja":"すべて",
      "zh-TW":"全部",
      "zh-CN":"全部"
    },
    "option_first_little":{
      "ja":"はじめて・ちょこっと",
      "zh-TW":"初次、少許",
      "zh-CN":"初次、少许"
    },
    "option_standard":{
      "ja":"すたんだーど",
      "zh-TW":"標準",
      "zh-CN":"标准"
    },
    "option_gorgeous":{
      "ja":"ごーじゃす",
      "zh-TW":"豪華",
      "zh-CN":"豪华"
    }
  }

  const $buttons = {
    "#last_delete_text":{
      "ja":"最後尾削除",
      "zh-TW":"刪除末尾",
      "zh-CN":"删除末尾"
    },
    "#all_delete_text":{
      "ja":"全削除",
      "zh-TW":"刪除全部",
      "zh-CN":"删除全部"
    },
    "#EmissionRate_text":{
      "ja":"排出率算出",
      "zh-TW":"計算概率",
      "zh-CN":"计算概率"
    },
    "#share_text":{
      "ja":"共有",
      "zh-TW":"分享",
      "zh-CN":"分享"
    },
    "#itrem_reselect_text":{
      "ja":"選択解除",
      "zh-TW":"取消選擇",
      "zh-CN":"取消选择"
    }
  }

  const $iconsImages = {
    "#l5":{"ja":"ラッキーメダル5","zh-TW":"幸運獎牌5","zh-CN":"幸运奖牌5"},
    "#l250":{"ja":"ラッキーメダル250","zh-TW":"幸運獎牌250","zh-CN":"幸运奖牌250"},
    "#o1":{"ja":"オシャレメダル","zh-TW":"時尚獎牌","zh-CN":"时尚奖牌"},
    "#g5":{"ja":"輝きの欠片5","zh-TW":"閃耀碎片5","zh-CN":"闪耀碎片5"},
    "#g10":{"ja":"輝きの欠片10","zh-TW":"閃耀碎片10","zh-CN":"闪耀碎片10"},
    "#g30":{"ja":"輝きのかけら30","zh-TW":"閃耀碎片30","zh-CN":"闪耀碎片30"},
    "#msr1":{"ja":"おもいでの石SR","zh-TW":"回憶之石SR","zh-CN":"回忆之石SR"},
    "#mssr1":{"ja":"おもいでの石SSR","zh-TW":"回憶之石SSR","zh-CN":"回忆之石SSR"},
    "#g1000":{"ja":"ゴールド1000","zh-TW":"金幣1000","zh-CN":"金币1000"},
    "#g5000":{"ja":"ゴールド5000","zh-TW":"金幣5000","zh-CN":"金币5000"},
    "#d201":{"ja":"スタミナ20回復ドリンク","zh-TW":"體力20回復飲","zh-CN":"体力20回复饮"},
    "#d501":{"ja":"スタミナ50回復ドリンク","zh-TW":"體力50回復飲","zh-CN":"体力50回复饮"},
    "#jm10":{"ja":"ジャパまん（オール）中10","zh-TW":"加帕里饅頭（全）中10","zh-CN":"加帕里馒头（全）中10"},
    "#jb10":{"ja":"ジャパまん（オール）大10","zh-TW":"加帕里饅頭（全）大10","zh-CN":"加帕里馒头（全）大10"},
    "#jb30":{"ja":"ジャパまん（オール）大30","zh-TW":"加帕里饅頭（全）大30","zh-CN":"加帕里馒头（全）大30"},
    "#jb120":{"ja":"ジャパまん（オール）大120","zh-TW":"加帕里饅頭（全）大120","zh-CN":"加帕里馒头（全）大120"},
    "#b1":{"ja":"ジャパリパン","zh-TW":"加帕里麵包","zh-CN":"加帕里面包"},
    "#dsr1":{"ja":"虹色のアニマルラムネSR","zh-TW":"虹彩色的動物彈珠汽水SR","zh-CN":"虹彩色的动物弹珠汽水SR"},
    "#dssr1":{"ja":"虹色のアニマルラムネSSR","zh-TW":"虹彩色的動物彈珠汽水SSR","zh-CN":"虹彩色的动物弹珠汽水SSR"},
    "#k4":{"ja":"キラキラ4","zh-TW":"閃亮亮4","zh-CN":"闪亮亮4"},
    "#k12":{"ja":"キラキラ12","zh-TW":"閃亮亮12","zh-CN":"闪亮亮12"},
    "#k25":{"ja":"キラキラ25","zh-TW":"閃亮亮25","zh-CN":"闪亮亮25"},
    "#k50":{"ja":"キラキラ50","zh-TW":"閃亮亮50","zh-CN":"闪亮亮50"},
    "#k75":{"ja":"キラキラ75","zh-TW":"閃亮亮75","zh-CN":"闪亮亮75"},
    "#k100":{"ja":"キラキラ100","zh-TW":"閃亮亮100","zh-CN":"闪亮亮100"},
    "#k150":{"ja":"キラキラ150","zh-TW":"閃亮亮150","zh-CN":"闪亮亮150"},
    "#k250":{"ja":"キラキラ250","zh-TW":"閃亮亮250","zh-CN":"闪亮亮250"},
    "#k300":{"ja":"キラキラ300","zh-TW":"閃亮亮300","zh-CN":"闪亮亮300"},
    "#k500":{"ja":"キラキラ500","zh-TW":"閃亮亮500","zh-CN":"闪亮亮500"},
    "#k1000":{"ja":"キラキラ1000","zh-TW":"閃亮亮1000","zh-CN":"闪亮亮1000"},
    "#i1":{"ja":"しょうたい券1","zh-TW":"招待券1","zh-CN":"招待券1"},
    "#i10":{"ja":"しょうたい券10","zh-TW":"招待券10","zh-CN":"招待券10"},
    "#s21":{"ja":"☆2以上フレンズしょうたい券","zh-TW":"☆2以上朋友招待券","zh-CN":"☆2以上朋友招待券"},
    "#s31":{"ja":"☆3以上しょうたい券","zh-TW":"☆3以上招待券","zh-CN":"☆3以上招待券"},
    "#sf31":{"ja":"☆3以上フレンズしょうたい券","zh-TW":"☆3以上朋友招待券","zh-CN":"☆3以上朋友招待券"},
    "#s41":{"ja":"☆4しょうたい券","zh-TW":"☆4招待券","zh-CN":"☆4招待券"},
    "#sft41":{"ja":"☆4フレンズしょうたいチケット","zh-TW":"☆4朋友招待券碎片","zh-CN":"☆4朋友招待券碎片"},
    "#sf41":{"ja":"☆4フレンズしょうたい券","zh-TW":"☆4朋友招待券","zh-CN":"☆4朋友招待券"},
    "#s0":{"ja":"空白","zh-TW":"空白","zh-CN":"空白"}
  }

  const $tablesTh = {
    "#th_image":{
      "ja":"画像",
      "zh-TW":"圖片",
      "zh-CN":"图片"
    },
    "#th_itemName":{
      "ja":"アイテム名",
      "zh-TW":"物品名",
      "zh-CN":"物品名"
    },
    "#th_count":{
      "ja":"個数",
      "zh-TW":"數量",
      "zh-CN":"数量"
    },
    "#th_EmissionRate":{
      "ja":"排出率",
      "zh-TW":"概率",
      "zh-CN":"概率"
    }
  }

  const $shareContent = {"ja": "スペシャルデイリーボーナスの結果です！", "zh-TW": "特別每日任務獎勵的結果！","zh-CN":"特别每日任务奖励的结果！"}
  const $total = {"ja": "合計", "zh-TW":"總計","zh-CN":"总计"}

  //初期起動時の処理
  $(window).on('load',function(){
    const url = new URL(window.location.href);
    const urlParam = url.searchParams.get('lang');
    const urlParamSpace = url.searchParams.get('space')
    if(!urlParam){
      url.searchParams.set('lang', "ja")
      window.location.href = url
    }

    if(urlParamSpace){
      if(urlParamSpace == "true"){
       document.getElementById("blank_cell").checked = true;
      }
    }

    let langs = document.querySelectorAll("input[type='radio'][name='lang']");
    let passCheck = false
    for(let element of langs){
      if(element.value == urlParam){
        element.checked = true
        passCheck = true
        break;
      }
    }
    if(passCheck){
      translate(urlParam);
      document.querySelector('html').setAttribute('lang' , urlParam)
    }
    const ItemIds = url.searchParams.get('items');
    if(ItemIds){
      for(let element of splitStringByPattern(ItemIds)){
        if(document.getElementById(element) != null){
          add($(`#${element}`))
        }
      }
      create();
    }
  })

  //翻訳モードの切り替え時の処理
  $('input[name="lang"]:radio').change(function(){
    translate($(this).val());
  })

  //画像クリック時の処理
  $("#images > img").on('click', function(){
    let item = $(this);
    let select = document.getElementById("choice_mode");
    if(!select.checked){
      add(item);
    }else{
      change(item);
    }
  });

  $(".toggle").on("click", function() {
    let download_img = document.getElementById("download_image");
    let calendar = document.getElementById("calendar");
    $(".toggle").toggleClass("checked");
    if(!$('input[name="check"]').prop("checked")) {
      $(".toggle input").prop("checked", true);
      download_img.hidden = true;
      calendar.hidden = false;
    } else {
      $(".toggle input").prop("checked", false);
      download_img.hidden = false;
      calendar.hidden = true;
    }
  });
    
  //アイテム選択解除ボタン処理
  $("#item_reselect").on('click', function(){
    let items = document.getElementsByClassName("item_select")[0];
    items.src = ""
    items.alt = ""
    $("#item_selecting").css("display", "none");
  });

  //生成アイテム処理
  $("#lists").on('mouseenter', function(){
    let mouse_img_list = document.querySelectorAll(".img_list")
    mouse_img_list.forEach(function(value){
      value.addEventListener('click', function(){
        let item = value;
        if(item){
          let selecting = document.getElementsByClassName("item_select")[0];
          let reset_check = document.getElementById("change_hidden");
          let pat = /.png|.PNG|.jpg|.jpeg|.JPG|.JPEG\Z/
          if(selecting.src.match(pat)){
            item.src = selecting.src;
            item.alt = selecting.alt;
            item.id = selecting.id;
            create();
            if(reset_check.checked){
              selecting.src = ""
              selecting.alt = ""
              selecting.id = ""
              $("#item_selecting").css("display", "none");
            }
          }
        }
      });
    });
  });

  //最後のアイコンを削除
  $("#last_delete").on('click', function(){
    lastRemove();
  });
  
  document.addEventListener('keydown', keyEvent);
  function keyEvent(e){
    switch (e.code){
      case 'Backspace':
        $("#last_delete").click();
        break;
      case 'Delete':
        $("#all_delete").click();
        break;
    }
  }

  //全てのアイコンを削除
  $("#all_delete").on('click', function(){
    if($("#lists li").length > 0){
      let check = confirm($alerts["AllIconsRemove"][$lang])
      if (check == true){
        $("#lists li").remove();
        $itemList = [];
        let selecting = document.getElementsByClassName("item_select")[0];
        selecting.src = ""
        selecting.alt = ""
        $("#item_selecting").css("display", "none");
        document.getElementById("choice_mode").value = "add";
        document.getElementById("change_hidden").checked = false;
        let lists = document.getElementById("canvas_2d").getContext('2d');
        lists.clearRect(0, 0, 1050, 900);
        let link_img = document.getElementById("canvas_img");
        link_img.style.display = "none";
        link_img.src = ""

        ReItemList()
        const url = new URL(window.location.href);
        url.searchParams.set('lang', $lang)
        UrlReplace();
      }
    }else{
      alert($alerts["nullIcons"][$lang]);
    }
  });

  //モード切替
  $("#mode-select").on('change', function(){
    let select = document.getElementById("mode-select");
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

  //
  $("#blank_cell").on('click',function(){
    create();
  });

  //共有
  $("#share").on('click', function(){
    let infos
    let images = []
    const url = new URL(window.location.href);
    console.log(document.getElementById("canvas_img").src)
    infos = {
      "text": $shareContent[$lang],
      "url": url,
      "hashtags": $labels["title"][$lang],
      "image": [document.getElementById("canvas_img").src]
    }
    
    let $share_EmissionRate = document.getElementById("share_EmissionRate")
    if($share_EmissionRate.checked){
      if($("#result_table tbody tr").length > 0){
        let resule_image = document.getElementById("result_table_image");
        infos["image"].push(resule_image.src);
      }
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
    let lists = document.getElementById("canvas_2d").getContext('2d');
    let blank_cell = document.getElementById("blank_cell");
    let canvas_2d = document.getElementById("canvas_2d");
    let arys = [], output_check;
    let x_ind = 0, y_ind = 0;
    let img_hidden = "none";
    lists.clearRect(0, 0, 1050, 900);

    let canvas_img_width, canvas_img_height;
    canvas_img_width = 0;
    canvas_img_height = 1;


    $("#lists").find('img').each(function(i){
      arys[i] = new Image()
      arys[i].src = $(this).attr('src')
      arys[i].alt = $(this).attr('alt')
      arys[i].id = $(this).attr('id')
      if(y_ind == 0){
        canvas_img_width += 1;
      }
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    });

    canvas_img_height = Math.ceil(parseFloat($("#lists li").length / 7))
    let link_img = document.getElementById("canvas_img")
    link_img.style.width = canvas_img_width * 50 + "px";
    link_img.style.height = canvas_img_height * 50 + "px";
    canvas_2d.width = canvas_img_width * 150;
    canvas_2d.height = canvas_img_height * 150;

    x_ind = 0;
    y_ind = 0;

    $.each(arys, function(i){
      img_hidden = "inline"
      output_check = true;
      if(arys[i].id == "s0" && blank_cell.checked){
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

    let links = document.getElementById("canvas_2d").toDataURL('image/png')
    link_img.src = links;
    link_img.style.display = img_hidden

    ReItemList()
    const url = new URL(window.location.href);
    url.searchParams.set('lang', $lang)
    UrlReplace();
  }

  //追加関数
  function add(item){
    if($("#lists li").length <= 41){
      let img_src = item.attr('src');
      let img_alt = item.attr('alt');
      let img_id = item.attr('id')
      $itemList.push(item.attr('id'));
      $("ul#lists").append(`<li class=\"li_lists\"><img src=\"${img_src}\" alt=\"${img_alt}\" class=\"img_list\" id=\"${img_id}\"></li>`);
      create();
    }else{
      alert($alerts["cantAddIcons"][$lang]);
    }
  }

  //切り替え関数
  function change(item){
    if($("#lists li").length > 0){
      if(item){
        let items = document.getElementsByClassName("item_select")[0]
        let file_name = document.getElementById("file_name")
        items.src = item.attr('src');
        items.alt = item.attr('alt');
        items.id = item.attr('id');
        items.class = "item_select"
        file_name.value = item.attr('alt');
        $("#item_selecting").css("display", "inline");
        create();
      }
    }else{
      alert($alerts["cantChoiceIcons"][$lang]);
    }
  }

  function lastRemove(){
    if($("#lists li").length > 0){
      $("#lists li:last").remove();
      $itemList.pop()
      if($("#lists li").length < 1){
        let selecting = document.getElementsByClassName("item_select")[0];
        selecting.src = ""
        selecting.alt = ""
        $("#item_selecting").css("display", "none");
      }
      create();
    }else{
      alert($alerts["nullIcons"][$lang]);
    }
  }

  function result_table(){
    let result_lists = {};
    let item_name;
    let item_id;
    let src;
    let sum = $("#lists li").length - space_count();
    let sum_par = 0;
    $("#lists").find('img').each(function(){
      item_id = $(this).attr('id');
      item_name = $(this).attr('alt')
      src = $(this).attr('src');
      if(item_id != "s0"){
        if (item_name in result_lists){
          result_lists[item_name].count++;
          let count = result_lists[item_name].count
          result_lists[item_name].parsent = round(count/sum*100,4)
        }else{
          result_lists[item_name] = {count: 1 ,src: src, parsent: round(1/sum*100,4)};
        }
      }
    });

    let table = $("#result_table tbody")
    table.remove();
    $("#result_table").append("<tbody></tbody>");
    for(let [key, value] of Object.entries(result_lists)){
      sum_par = sum_par + value.parsent;
      $("#result_table tbody").append(`<tr><td><img src=\"${value.src}\" alt=\"${key}\"></td><td>${key}</td><td>${value.count}</td><td>${value.parsent}%</td></tr>`);
    }
    sum_par = round(sum_par, 4)
    $("#result_table tbody").append(`<tr><td colspan="2">${$total[$lang]}</td><td>${sum}</td><td>${sum_par}%</td></tr>`)
  }

  function result_table_image(){
    html2canvas(document.querySelector("#result_list")).then(canvas => { 
      let src = canvas.toDataURL("image/png");
      let file = document.getElementById("result_table_image")
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
    let digitVal = Math.pow( 10, digit );
    return Math.trunc( num * digitVal ) / digitVal;
  }

  function space_count(){
    let item_id;
    let count = 0;
    $("#lists").find('img').each(function(){
      item_id = $(this).attr('id');
      if(item_id == "s0"){
        count++;
      }
    });
    return count;
  }

  function ReItemList(){
    $itemList = []
    $("#lists").find('img').each(function(){
      let elements = $(this)
      $itemList.push(elements.attr('id'))
    })
  }

  function translate(_lang){
    $lang = _lang

    //独自変換部
    for(let [key, value] of Object.entries($labels)){
      $(`${key}`).text(value[$lang]);
    }

    for(let [key, value] of Object.entries($options)){
      let optionElement = document.getElementById(key);
      if (optionElement){
        optionElement.textContent = value[$lang];
      }
    }

    for(let [key, value] of Object.entries($buttons)){
      $(`${key}`).text(value[$lang]);
    }

    for(let [key, value] of Object.entries($iconsImages)){
      $(`${key}`).attr('alt', value[$lang]);
    }

    for(let [key, value] of Object.entries($tablesTh)){
      $(`${key}`).text(value[$lang]);
    }

    $(".toggle").attr('lang', $lang)

    const url = new URL(window.location.href);
    
    let ParamCheck = false
    let urlParam = url.searchParams.get('lang')

    if(urlParam != _lang){ParamCheck = true}

    if(ParamCheck){
      url.searchParams.set('lang', $lang)
      UrlReplace();
    }
  }

  function UrlReplace(){
    let $items, $spaceCheck
    let blank_cell
    blank_cell = document.getElementById("blank_cell")
    $items = ""
    $spaceCheck = ""
    if($itemList.length > 0){
      $items = "&items=" + $itemList.join("")
    }else{
      $items = ""
    }

    if(blank_cell.checked){
      $spaceCheck = "&space=true"
    }else{
      $spaceCheck = ""
    }
    history.replaceState({}, "", '?' + 'lang=' + $lang + $spaceCheck + $items);
  }

  function splitStringByPattern(inputString) {
    const regex = /(\D+)(\d+)/g;
    const resultArray = [];
    let match;
  
    while ((match = regex.exec(inputString))) {
      resultArray.push(match[1] + match[2]);
    }
  
    return resultArray;
  }

});