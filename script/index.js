document.addEventListener('DOMContentLoaded',function(){
  //翻訳（独自）
  let $itemList = []
  let $lang = "ja"
  const $alerts = {
    "nullIcons":{
      "ja": "削除するアイコンがありません", 
      "zh-Hant": "沒有可刪除的圖標",
      "zh-Hans":"没有可删除的图标",
      "en":"No icon to delete"
    },
    "shareError":{
      "ja": "エラーが発生しました。\n画像が存在しないか、ブラウザが非対応の可能性があります", 
      "zh-Hant": "發生錯誤。\n圖片可能不存在或瀏覽器不支持",
      "zh-Hans":"发生错误。 \n图片可能不存在或浏览器不支持",
      "en":"Error. \nThe image may not exist or your browser may not support it."
    },
    "cantAddIcons":{
      "ja": "これ以上はアイコンを追加できません",
      "zh-Hant": "無法添加更多圖標",
      "zh-Hans": "无法添加更多图标",
      "en":"No more icons can be added"
    },
    "cantChoiceIcons":{
      "ja": "「アイテム置換」欄にアイテムがないため選択できません",
      "zh-Hant":"無法選中，因為「替換項目」中沒有可選物品",
      "zh-Hans":"无法选中，因为「替换项目」中没有可选物品",
      "en":"Cannot be selected because there is no item in the “Replace Item” field"
    },
    "AllIconsRemove":{
      "ja":"全てのアイコンを削除します。よろしいですか？",
      "zh-Hant":"刪除所有圖標。確定嗎？",
      "zh-Hans":"删除所有图标。确定吗？",
      "en":"Delete all icons. Is it OK?"
    }
  }

  const $labels = {
    "title":{
      "ja": "【けものフレンズ3】ログボマトメールP", 
      "zh-Hant":"【動物朋友3】全部都記下來M", 
      "zh-Hans":"【动物朋友3】全部都记下来M",
      "en":"Kemono Friends 3 Log-In Bonus Collector"
    },
    "#Usage_PassportList":{
      "ja": "リスト：パスポート", 
      "zh-Hant":"列表：月卡",
      "zh-Hans":"列表：月卡",
      "en":"List: Pass"
    },
    "#Usage_ModeList":{
      "ja":"リスト：モード", 
      "zh-Hant":"列表：模式",
      "zh-Hans":"列表：模式",
      "en":"List: Mode"
    },
    "#Usage_Create_Download":{
      "ja": "生成・ダウンロード", 
      "zh-Hant":"生成、下載",
      "zh-Hans":"生成、下载",
      "en":"Generate / Download"
    },
    "#Usage_Remove":{
      "ja": "削除",
      "zh-Hant":"刪除",
      "zh-Hans":"删除",
      "en":"Delete"
    },
    "#Usage_Share":{
      "ja":"共有",
      "zh-Hant":"分享",
      "zh-Hans":"分享",
      "en":"Share"
    },
    "#Usage_EmissionRate":{
      "ja":"排出率算出",
      "zh-Hant":"計算概率",
      "zh-Hans":"计算概率",
      "en":"Calculate Drop Rate"
    },
    "#Usage_Other":{
      "ja":"その他",
      "zh-Hant":"其他",
      "zh-Hans":"其他",
      "en":"Other"
    },
    "#Label_Passport":{
      "ja":"パスポート：",
      "zh-Hant":"月卡：",
      "zh-Hans":"月卡：",
      "en":"Pass:"
    },
    "#Label_Mode":{
      "ja":"モード：",
      "zh-Hant":"模式：",
      "zh-Hans":"模式：",
      "en":"Mode:"
    },
    "#Label_result_list_filter":{
      "ja":"フィルター：",
      "zh-Hant":"篩選：",
      "zh-Hans":"筛选：",
      "en":"Filter:"
    },
    "#HowToUse":{
      "ja":"使用方法：",
      "zh-Hant":"使用方法：",
      "zh-Hans":"使用方法：",
      "en":"How To Use:"
    }
  }

  const $options = {
    "option_all":{
      "ja":"すべて",
      "zh-Hant":"全部",
      "zh-Hans":"全部",
      "en":"All"
    },
    "option_first_little":{
      "ja":"はじめて・ちょこっと",
      "zh-Hant":"初次、少許",
      "zh-Hans":"初次、少许",
      "en":"First & Little"
    },
    "option_standard":{
      "ja":"すたんだーど",
      "zh-Hant":"標準",
      "zh-Hans":"标准",
      "en":"Standard"
    },
    "option_gorgeous":{
      "ja":"ごーじゃす",
      "zh-Hant":"豪華",
      "zh-Hans":"豪华",
      "en":"Gorgeous"
    }
  }

  const $buttons = {
    "#last_delete_text":{
      "ja":"最後尾削除",
      "zh-Hant":"刪除末尾",
      "zh-Hans":"删除末尾",
      "en":"Delete Last"
    },
    "#all_delete_text":{
      "ja":"全削除",
      "zh-Hant":"刪除全部",
      "zh-Hans":"删除全部",
      "en":"Delete All"
    },
    "#EmissionRate_text":{
      "ja":"排出率算出",
      "zh-Hant":"計算概率",
      "zh-Hans":"计算概率",
      "en":"Calculate Drop Rate"
    },
    "#share_text":{
      "ja":"共有",
      "zh-Hant":"分享",
      "zh-Hans":"分享",
      "en":"Share"
    },
    "#itrem_reselect_text":{
      "ja":"選択解除",
      "zh-Hant":"取消選擇",
      "zh-Hans":"取消选择",
      "en":"Deselect"
    }
  }

  const $iconsImages = {
    "#l5":{"ja":"ラッキーメダル5","zh-Hant":"幸運獎牌5","zh-Hans":"幸运奖牌5","en":"Lucky Medal 5"},
    "#l250":{"ja":"ラッキーメダル250","zh-Hant":"幸運獎牌250","zh-Hans":"幸运奖牌250","en":"Lucky Medal 250"},
    "#o1":{"ja":"オシャレメダル","zh-Hant":"時尚獎牌","zh-Hans":"时尚奖牌","en":"Fashion Medal"},
    "#kg5":{"ja":"輝きの欠片5","zh-Hant":"閃耀碎片5","zh-Hans":"闪耀碎片5","en":"Sparkle Shard 5"},
    "#kg10":{"ja":"輝きの欠片10","zh-Hant":"閃耀碎片10","zh-Hans":"闪耀碎片10","en":"Sparkle Shard 10"},
    "#kg30":{"ja":"輝きのかけら30","zh-Hant":"閃耀碎片30","zh-Hans":"闪耀碎片30","en":"Sparkle Shard 30"},
    "#msr1":{"ja":"おもいでの石SR","zh-Hant":"回憶之石SR","zh-Hans":"回忆之石SR","en":"Memory Stone SR"},
    "#mssr1":{"ja":"おもいでの石SSR","zh-Hant":"回憶之石SSR","zh-Hans":"回忆之石SSR","en":"Memory Stone SSR"},
    "#g1000":{"ja":"ゴールド1000","zh-Hant":"金幣1000","zh-Hans":"金币1000","en":"Gold 1000"},
    "#g5000":{"ja":"ゴールド5000","zh-Hant":"金幣5000","zh-Hans":"金币5000","en":"Gold 5000"},
    "#d201":{"ja":"スタミナ20回復ドリンク","zh-Hant":"體力20回復飲","zh-Hans":"体力20回复饮","en":"20 Stamina Recovery Drink"},
    "#d501":{"ja":"スタミナ50回復ドリンク","zh-Hant":"體力50回復飲","zh-Hans":"体力50回复饮","en":"50 Stamina Recovery Drink"},
    "#jm10":{"ja":"ジャパまん（オール）中10","zh-Hant":"加帕里饅頭（全）中10","zh-Hans":"加帕里馒头（全）中10","en":"Japari Bun (All) Mideum 10"},
    "#jb10":{"ja":"ジャパまん（オール）大10","zh-Hant":"加帕里饅頭（全）大10","zh-Hans":"加帕里馒头（全）大10","en":"Japari Bun (All) Large 10"},
    "#jb30":{"ja":"ジャパまん（オール）大30","zh-Hant":"加帕里饅頭（全）大30","zh-Hans":"加帕里馒头（全）大30","en":"Japari Bun (All) Large 30"},
    "#jb120":{"ja":"ジャパまん（オール）大120","zh-Hant":"加帕里饅頭（全）大120","zh-Hans":"加帕里馒头（全）大120","en":"Japari Bun (All) Large 120"},
    "#b1":{"ja":"ジャパリパン","zh-Hant":"加帕里麵包","zh-Hans":"加帕里面包","en":"Japari Bread"},
    "#dsr1":{"ja":"虹色のアニマルラムネSR","zh-Hant":"虹彩色的動物彈珠汽水SR","zh-Hans":"虹彩色的动物弹珠汽水SR","en":"Rainbow-Colored Animal Ramune SR"},
    "#dssr1":{"ja":"虹色のアニマルラムネSSR","zh-Hant":"虹彩色的動物彈珠汽水SSR","zh-Hans":"虹彩色的动物弹珠汽水SSR","en":"Rainbow-Colored Animal Ramune SSR"},
    "#k4":{"ja":"キラキラ4","zh-Hant":"閃亮亮4","zh-Hans":"闪亮亮4","en":"Kirakira 4"},
    "#k12":{"ja":"キラキラ12","zh-Hant":"閃亮亮12","zh-Hans":"闪亮亮12","en":"Kirakira 12"},
    "#k25":{"ja":"キラキラ25","zh-Hant":"閃亮亮25","zh-Hans":"闪亮亮25","en":"Kirakira 25"},
    "#k50":{"ja":"キラキラ50","zh-Hant":"閃亮亮50","zh-Hans":"闪亮亮50","en":"Kirakira 50"},
    "#k75":{"ja":"キラキラ75","zh-Hant":"閃亮亮75","zh-Hans":"闪亮亮75","en":"Kirakira 75"},
    "#k100":{"ja":"キラキラ100","zh-Hant":"閃亮亮100","zh-Hans":"闪亮亮100","en":"Kirakira 100"},
    "#k150":{"ja":"キラキラ150","zh-Hant":"閃亮亮150","zh-Hans":"闪亮亮150","en":"Kirakira 150"},
    "#k250":{"ja":"キラキラ250","zh-Hant":"閃亮亮250","zh-Hans":"闪亮亮250","en":"Kirakira 250"},
    "#k300":{"ja":"キラキラ300","zh-Hant":"閃亮亮300","zh-Hans":"闪亮亮300","en":"Kirakira 300"},
    "#k500":{"ja":"キラキラ500","zh-Hant":"閃亮亮500","zh-Hans":"闪亮亮500","en":"Kirakira 500"},
    "#k1000":{"ja":"キラキラ1000","zh-Hant":"閃亮亮1000","zh-Hans":"闪亮亮1000","en":"Kirakira 1000"},
    "#i1":{"ja":"しょうたい券1","zh-Hant":"招待券1","zh-Hans":"招待券1","en":"Invitation Ticket 1"},
    "#i10":{"ja":"しょうたい券10","zh-Hant":"招待券10","zh-Hans":"招待券10","en":"Invitation Ticket 10"},
    "#s21":{"ja":"☆2以上フレンズしょうたい券","zh-Hant":"☆2以上朋友招待券","zh-Hans":"☆2以上朋友招待券","en":"2 or More Friend Invitation Ticket"},
    "#s31":{"ja":"☆3以上しょうたい券","zh-Hant":"☆3以上招待券","zh-Hans":"☆3以上招待券","en":"3 or More Invitation Ticket"},
    "#sf31":{"ja":"☆3以上フレンズしょうたい券","zh-Hant":"☆3以上朋友招待券","zh-Hans":"☆3以上朋友招待券","en":"3 or More Friend Invitation Ticket"},
    "#s41":{"ja":"☆4しょうたい券","zh-Hant":"☆4招待券","zh-Hans":"☆4招待券","en":"4 or More Invitation Ticket"},
    "#sft41":{"ja":"☆4フレンズしょうたいチケット","zh-Hant":"☆4朋友招待券碎片","zh-Hans":"☆4朋友招待券碎片","en":"4 or More Friend Invitation Ticket Shard"},
    "#sf41":{"ja":"☆4フレンズしょうたい券","zh-Hant":"☆4朋友招待券","zh-Hans":"☆4朋友招待券","en":"4 or More Friend Invitation Ticket"},
    "#s0":{"ja":"空白","zh-Hant":"空白","zh-Hans":"空白","en":"Space"}
  }

  const $multiItems = {
    "l5":{"ja":"ラッキーメダル","zh-Hant":"幸運獎牌","zh-Hans":"幸运奖牌","en":"Lucky Medal"},
    "l250":{"ja":"ラッキーメダル","zh-Hant":"幸運獎牌","zh-Hans":"幸运奖牌","en":"Lucky Medal"},
    "kg5":{"ja":"輝きの欠片","zh-Hant":"閃耀碎片","zh-Hans":"闪耀碎片","en":"Sparkle Shard"},
    "kg10":{"ja":"輝きの欠片","zh-Hant":"閃耀碎片","zh-Hans":"闪耀碎片","en":"Sparkle Shard"},
    "kg30":{"ja":"輝きの欠片","zh-Hant":"閃耀碎片","zh-Hans":"闪耀碎片","en":"Sparkle Shard"},
    "g1000":{"ja":"ゴールド","zh-Hant":"金幣","zh-Hans":"金币","en":"Gold"},
    "g5000":{"ja":"ゴールド","zh-Hant":"金幣","zh-Hans":"金币","en":"Gold"},
    "jb10":{"ja":"ジャパまん（オール）大","zh-Hant":"加帕里饅頭（全）大","zh-Hans":"加帕里馒头（全）大","en":"Japari Bun (All) Large"},
    "jb30":{"ja":"ジャパまん（オール）大","zh-Hant":"加帕里饅頭（全）大","zh-Hans":"加帕里馒头（全）大","en":"Japari Bun (All) Large"},
    "jb120":{"ja":"ジャパまん（オール）大","zh-Hant":"加帕里饅頭（全）大","zh-Hans":"加帕里馒头（全）大","en":"Japari Bun (All) Large"},
    "k4":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k12":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k25":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k50":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k75":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k100":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k150":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k250":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k300":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k500":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "k1000":{"ja":"キラキラ","zh-Hant":"閃亮亮","zh-Hans":"闪亮亮","en":"Kirakira"},
    "i1":{"ja":"しょうたい券","zh-Hant":"招待券","zh-Hans":"招待券","en":"Invitation Ticket"},
    "i10":{"ja":"しょうたい券","zh-Hant":"招待券","zh-Hans":"招待券","en":"Invitation Ticket"},
  }

  const $tablesTh = {
    "#th_image":{
      "ja":"画像",
      "zh-Hant":"圖片",
      "zh-Hans":"图片",
      "en":"image"
    },
    "#th_itemName":{
      "ja":"アイテム名",
      "zh-Hant":"物品名",
      "zh-Hans":"物品名",
      "en":"Item Name"
    },
    "#th_count":{
      "ja":"個数",
      "zh-Hant":"數量",
      "zh-Hans":"数量",
      "en":"Quantity"
    },
    "#th_EmissionRate":{
      "ja":"排出率",
      "zh-Hant":"概率",
      "zh-Hans":"概率",
      "en":"Drop Rate"
    }
  }

  const $selecters = {"ja": "選択してください", "zh-Hant": "請選擇", "zh-Hans":"请选择", "en":"Please Select"}

  const $shareContent = {
    "ja": "スペシャルデイリーボーナスの結果です！",
    "zh-Hant": "特別每日任務獎勵的結果！",
    "zh-Hans":"特别每日任务奖励的结果！",
    "en":"Special Daily Bonus Results!"
  }
  const $total = {"ja": "合計", "zh-Hant":"總計","zh-Hans":"总计", "en":"Total"}
  const $daysTotal = {"ja": "アイコン数", "zh-Hant":"物品數量", "zh-Hans":"物品数量", "en":"Number of Icons"}
  const $acquisitionsCount = {"ja": "獲得数", "zh-Hant":"獲得數量", "zh-Hans":"获得数量", "en":"Number of Acquisitions"}

  //初期起動時の処理
  $(window).on('load',function(){
    //算出率フィルタ
    $("#filters").css("display", "none");

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

    // 画像キャプション
    // スマートフォンの場合はキャプションを非表示にする
    if ($(window).width() <= 768) { // 768px以下の幅の場合（スマートフォン用）
      $(".image-with-caption .caption").css("display", "none");
    }

    // マウスオーバー時の挙動
    $(".image-with-caption").mouseenter(function() {
      if ($(window).width() > 768) { // スマートフォン以外の場合
        $(this).find(".caption").css("display", "block");
      }
    });

    // マウス離れ時の挙動
    $(".image-with-caption").mouseleave(function() {
      if ($(window).width() > 768) { // スマートフォン以外の場合
        $(this).find(".caption").css("display", "none");
      }
    });

    $(".image-with-caption img").each(function() {
      var altText = $(this).attr("alt");
      $(this).next(".caption").text(altText);
    });
  })

  //翻訳モードの切り替え時の処理
  $('input[name="lang"]:radio').change(function(){
    translate($(this).val());
    result_table();
    result_table_image();
    $(".image-with-caption img").each(function() {
      var altText = $(this).attr("alt");
      $(this).next(".caption").text(altText);
    });
  })

  //画像クリック時の処理
  $("#images > .image-with-caption > img").on('click', function(){
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
      case 'Escape':
      $("#item_reselect").click();
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
        let lists = document.getElementById("canvas_2d").getContext('2d',{willReadFrequently:true});
        lists.clearRect(0, 0, 1050, 900);
        let link_img = document.getElementById("canvas_img");
        link_img.style.display = "none";
        link_img.src = ""

        reset_all();
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

  $("#blank_cell").on('click',function(){
    if($("#lists li").length > 0){
      create();
    }
  });

  //共有
  $("#share").on('click', function(){
    let infos
    let images = []
    const url = new URL(window.location.href);
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

  //排出率
  $("#result_list_filter").on('change',function(){
    let item = $(this);
    let serch = ""
    switch (item.val()) {
      case "l":
        serch = "l[0-9]+";
        break;
      case "kagayaki":
        serch = "kg[0-9]+";
        break;
      case "gold":
        serch = "g[0-9]+";
        break;
      case "jb":
        serch = "jb[0-9]+";
        break;
      case "k":
        serch = "k[0-9]+";
        break;
      case "i":
        serch = "i[0-9]+";
        break;
      case "none":
        serch = "";
        break;
      default:
        serch = item.val();
        break;
    }
    if(serch != ""){
      result_table(true, serch);
    }else{
      result_table();
    }
    
    result_table_image();
  })

  //生成関数
  function create() {
    let lists = document.getElementById("canvas_2d").getContext('2d',{willReadFrequently:true});
    let blank_cell = document.getElementById("blank_cell");
    let canvas_2d = document.getElementById("canvas_2d");
    let canvas_img_back_2d = document.getElementById("canvas_img_back_2d").getContext('2d',{willReadFrequently: true});
    let arys = [], output_check;
    let x_ind = 0, y_ind = 0;
    let img_hidden = "none";
    lists.clearRect(0, 0, 1050, 900);
    canvas_img_back_2d.clearRect(0, 0, 350, 350);

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
    let link_back_img = document.getElementById("canvas_img_back")
    link_img.style.width = canvas_img_width * 50 + "px";
    link_img.style.height = canvas_img_height * 50 + "px";
    link_back_img.style.width = canvas_img_width * 50 + "px";
    link_back_img.style.height = canvas_img_height * 50 + "px";
    canvas_2d.width = canvas_img_width * 150;
    canvas_2d.height = canvas_img_height * 150;
    document.getElementById("canvas_img_back_2d").width = canvas_img_width * 150;
    document.getElementById("canvas_img_back_2d").height = canvas_img_height * 150;

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
      }else{
        canvas_img_back_2d.fillStyle = "#87cefa";
        canvas_img_back_2d.fillRect(x_ind * 50, y_ind * 50, 50, 50);
      }
      x_ind++;
      if(x_ind == 7){
        x_ind = 0;
        y_ind++;
      }
    })

    let links = document.getElementById("canvas_2d");
    links = links.toDataURL('image/png')
    link_img.src = links;
    let backImage = document.getElementById("canvas_img_back_2d").toDataURL('image/png')
    link_img.style.backgroundImage = `url(${backImage})`;
    link_img.style.display = img_hidden

    ReItemList()
    const url = new URL(window.location.href);
    url.searchParams.set('lang', $lang)
    UrlReplace();

    count_kirakira();
    result_table();
    result_table_image();
    $("#canvas_img_back").css('display', img_hidden);
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
      if($("#lists li").length > 0){
        create()
      }else{
        reset_all();
      }
    }else{
      alert($alerts["nullIcons"][$lang]);
    }
  }

  //排出率
  function result_table(filter = false, serch = ""){
    let result_lists = {};
    let item_name;
    let item_id;
    let src;
    let all_sum = $("#lists li").length - space_count();
    let filter_sum = 0;
    let filter_val = "";
    let filter_item = "";
    let sum_par = 0;

    let regex = new RegExp("^"+serch+"$")
    let add_check = !filter;
    let lukeys = ["l5", "l250"]
    let kagayakis = ["kg5", "kg10", "kg30"]
    let golds = ["g1000", "g5000"]
    let japamans = ["jb10", "jb30", "jb120"]
    let kirakiras = ["k4", "k12", "k25", "k50", "k75", "k100", "k150", "k250", "k300", "k500", "k1000"]
    let shoutaikens = ["i1", "i10"]
    let flags = {"lukeys": true, "kagayakis": true, "golds": true, "japamans": true, "kirakiras": true, "shoutaikens": true}

    if(!filter){
      $("#result_list_filter").children().remove();
      $("#result_list_filter").append(`<option value="none">${$selecters[$lang]}</option>`);
    }else{
      $("#lists").find('img').each(function(){
        item_id = $(this).attr('id');
        if(regex.test(item_id)){
          if(filter_item == ""){
            filter_item = $(this).attr('alt')
            filter_item = filter_item.match(/(\D+\d{1,2}\D+)|(\D+)\d+|(\D+)/).filter((value) => value != undefined);
          }
          filter_val = $(this).attr('alt').match(/\D+(\d+)$/)
          if(filter_val == null){
            filter_sum++;
          }else{
            filter_sum = filter_sum + parseInt(filter_val[1])
          }
        }
      });
    }
    
    $("#lists").find('img').each(function(){
      add_check = !filter;
      item_id = $(this).attr('id');
      item_name = $iconsImages[`#${item_id}`][$lang]
      src = $(this).attr('src');
      if(item_id != "s0"){
        if (item_name in result_lists){
          if(filter && regex.test(item_id)){
            add_check = true;
          }
          if(add_check){
            result_lists[item_name].count++;
            let count = result_lists[item_name].count
            result_lists[item_name].parsent = round(count/all_sum*100,4)
          }
        }else{
          if(filter && regex.test(item_id)){
            add_check = true;
          }
          if(add_check){
            result_lists[item_name] = {count: 1 ,src: src, parsent: round(1/all_sum*100,4)};
          }
          if(lukeys.includes(item_id) && !filter){
            if(flags.lukeys){
              $("#result_list_filter").append(`<option value="l">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.lukeys = false;
          }else if(kagayakis.includes(item_id) && !filter){
            if(flags.kagayakis){
              $("#result_list_filter").append(`<option value="kagayaki">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.kagayakis = false;
          }else if(golds.includes(item_id) && !filter){
            if(flags.golds){
              $("#result_list_filter").append(`<option value="gold">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.golds = false;
          }else if(japamans.includes(item_id) && !filter){
            if(flags.japamans){
              $("#result_list_filter").append(`<option value="jb">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.japamans = false;
          }else if(kirakiras.includes(item_id) && !filter){
            if(flags.kirakiras){
              $("#result_list_filter").append(`<option value="k">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.kirakiras = false;
          }else if(shoutaikens.includes(item_id) && !filter){
            if(flags.shoutaikens){
              $("#result_list_filter").append(`<option value="i">${$multiItems[item_id][$lang]}</option>`)
            }
            flags.shoutaikens = false;
          }else{
            if(!filter){
              let regex = new RegExp(/\D+\d+\D|\D+\d/)
              if(regex.test(item_name)){
                item_name = item_name.match(/(\D+\d{1,2}\D+)|(\D+)\d+|(\D+)/).filter((value) => value != undefined)[1];
              }
              $("#result_list_filter").append(`<option value="${item_id}">${item_name}</option>`)
            }
          }
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

    if(all_sum == 0){
      $("#filters").css("display", "none");
    }else{
      $("#filters").css("display", "inline");
      if(filter){
        $("#result_table tbody").append(`<tr><td colspan="2">${filter_item[1]} ${$acquisitionsCount[$lang]}</td><td>${filter_sum}</td><td>${sum_par}%</td></tr>`)
        $("#result_table tbody").append(`<tr><td colspan="2">${$daysTotal[$lang]}</td><td>${all_sum}</td><td>${$("#result_all_par").text()}%</td></tr>`)
        $("#result_filter_count").text(`${filter_item[1]} ${$acquisitionsCount[$lang]}：${filter_sum}`);
      }else{
        $("#result_filter_count").text("");
        $("#result_all_par").text(`${sum_par}`)
        $("#result_table tbody").append(`<tr><td colspan="2">${$total[$lang]}</td><td>${all_sum}</td><td>${sum_par}%</td></tr>`)
      }
    }
  }

  function result_table_image(){
    html2canvas(document.querySelector("#result_list"), {useCORS: true, allowTaint: true,}).then(canvas => { 
      let src = canvas.toDataURL("image/png");
      let file = document.getElementById("result_table_image")
      file.src = src;
    });
  }

  //キラキラの個数と、アイコン数を数える
  function count_kirakira(){
    let CountOfKiakira = $("#CountOfKiakira")
    let CountOfIcons = $("#CountOfIcons")
    let regex = new RegExp(/k\d+/)
    let count = {"kirakira":0, "icons": 0};
    $("#lists").find('img').each(function(){
      let item = $(this);
      count.icons ++;
      if(regex.test(item.attr('id'))){
        count.kirakira = count.kirakira + parseInt(item.attr('id').match(/^k(\d+)$/)[1])
      }
    });
    CountOfKiakira.text(`${$multiItems["k4"][$lang]}${$acquisitionsCount[$lang]}：${count.kirakira}`);
    CountOfIcons.text(`${$daysTotal[$lang]}：${count.icons}`);
  }

  function reset_all(){
    $("#CountOfKiakira").text(`${$multiItems["k4"][$lang]}${$acquisitionsCount[$lang]}：0`);
    $("#CountOfIcons").text(`${$daysTotal[$lang]}：0`)
    $("#lists li").remove();
    $("#canvas_img").attr('src','');
    ReItemList()
    const url = new URL(window.location.href);
    url.searchParams.set('lang', $lang)
    UrlReplace();
    $("#result_table tbody").children().remove();
    $("#filters").css("display", "none");
    $("#canvas_img").css('display', "none");
    $("#canvas_img_back").css('display', "none");
  }

  //その他
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

    $("#lists").find('img').each(function(){
      let item = $(this)
      $(this).attr('alt', $iconsImages[`#${item.attr('id')}`][$lang])
    });

    $(".toggle").attr('lang', $lang)

    const url = new URL(window.location.href);
    
    let ParamCheck = false
    let urlParam = url.searchParams.get('lang')

    if(urlParam != _lang){ParamCheck = true}

    if(ParamCheck){
      url.searchParams.set('lang', $lang)
      UrlReplace();
    }

    count_kirakira();
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