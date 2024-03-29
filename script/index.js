document.addEventListener('DOMContentLoaded',function(){
  //翻訳（独自）
  let $itemList = []
  let $lang = "ja"

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

  $("#HowToUse").on('click',function(){
    $("#usage").find(".ac-cap >input:checkbox").each(function(){
      let item = $(this)
      item.click();
    });
  });
  
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
            filter_item = filter_item.match(/(\d?\*\+?\D+)|(\D+\d{1,2}\D+)|(\D+)\d+|(\D+)/).filter((value) => value != undefined);
          }
          filter_val = $(this).attr('alt').replace("&#42;","*").replace("&#43;","+").match(/\D+(\d+)$/)
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
      item_name = $iconsImages[`#${item_id}`][$lang].replace("&#42;","*").replace("&#43;","+")
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
                item_name = item_name.match(/(\d?\*\+?\D+)|(\D+\d{1,2}\D+)|(\D+)\d+|(\D+)/).filter((value) => value != undefined)[1];
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
    if($lang == "en"){
      CountOfKiakira.text(`Number of Kirakira Obtained：${count.kirakira}`);
    }else{
      CountOfKiakira.text(`${$multiItems["k4"][$lang]} ${$acquisitionsCount[$lang]}：${count.kirakira}`);
    }
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
      $(`${key}`).attr('alt', value[$lang].replace("&#42;","*").replace("&#43;","+"));
    }

    for(let [key, value] of Object.entries($tablesTh)){
      $(`${key}`).text(value[$lang]);
    }

    $("#lists").find('img').each(function(){
      let item = $(this)
      $(this).attr('alt', $iconsImages[`#${item.attr('id')}`][$lang].replace("&#42;","*").replace("&#43;","+"))
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