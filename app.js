(function() {
  
'use strict';
  
  
//フォームのボタンがクリックされたら、またはエンターキーが押されたら
document.search.btn.addEventListener('click', function(e) {
  e.preventDefault();  //画面更新をキャンセル
  
  
  fetch( createURL(document.search.key.value) )
  .then( function( data ) {
    return data.json();  //JSONデータとして取得する
  })
  .then( function( json ) {
    
    createImage( json );
    
  })
})

  
  
//リクエスト用のURLを生成する
function createURL( value ) {
  var API_KEY = '【 APIキー 】';
  var baseUrl = 'https://pixabay.com/api/?key=' + API_KEY;
  var keyword = '&q=' + encodeURIComponent( value );
  var option = '&orientation=horizontal&per_page=40';
  var URL = baseUrl + keyword + option;
  
  return URL;
}
 
  
//画像のJSONデータを画面に表示する
function createImage( json ) {
  var result = document.getElementById('result');

  result.innerHTML = '';  //検索するごとに画面をリセットする

  //該当する画像があれば
  if( json.totalHits > 0 ) {
    json.hits.forEach( function( value ) {
      var img = document.createElement('img');
      var a = document.createElement('a');

      a.href = value.pageURL;  //ダウンロード用のサイトURL
      a.target = '_blank';
      img.src = value.previewURL;  //プレビュー用の画像URL
      
      a.appendChild( img );
      result.appendChild( a );
    })
  }
  else {
    alert('該当する写真がありません');
  }
}
  
})();
