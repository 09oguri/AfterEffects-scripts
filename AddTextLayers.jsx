// 次の行のコメントを解除するとダブルクリックでスクリプトが実行できる
// #target aftereffects


// #### 設定 ####
// テキスト表示位置
var X = 1280 * 0.5;
var Y = 720 * 0.9;


// #### 処理 ####
var text = [];

main();

function main() {
	// アクティブなアイテムを取得
	var activeComp = app.project.activeItem;

	// 取得したアイテムがコンポジションでない場合は終了
	if ((activeComp == null) || !(activeComp instanceof CompItem)) {
		alert("テキストを作成したいコンポジションをアクティブにして下さい");
		return;
	}

	var isLoaded = loadFile();
	if (isLoaded < 0) {
		return;
	}

	app.beginUndoGroup("script: AddTextLayers");

	// テキストレイヤーを追加
	for (var i = 0; i < text.length; i++) {
		activeComp.layers.addText(text[i]);
		activeComp.selectedLayers[0].position.setValue([X, Y]);
	}

	app.endUndoGroup();
}

//テキストファイルを行毎に読み込む
function loadFile() {
	try {
		var filename = File.openDialog("テキストファイルを指定してください");
		if (!filename) {
			throw new Error("ファイルが指定されていません");
		}

		var fileObj = new File(filename);
		var isOpened = fileObj.open("r");
		if (!isOpened) {
			throw new Error("ファイルを開けませんでした");
		}

		var count = 0;
		while (!fileObj.eof) {
			line = fileObj.readln();

			// 空行を無視
			if (line == "") {
				continue;
			}

			text.push(line);
			count++;
		}
		fileObj.close();

		return count;
	} catch(e) {
		alert(e);
		return -1;
	}
}
