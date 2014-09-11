// 次の行のコメントを解除するとダブルクリックでスクリプトが実行できる
// #target aftereffects


// #### 設定 ####
FPS = 24


// #### 処理 ####
main();

function main() {
	var inputWindow = new Window("dialog","コンポの時間を統一",[0, 0, 180, 80]);
	inputWindow.center();

	inputWindow.add("statictext", [0, 0, 100, 20], "コンポジションの時間");
	var inputSec = inputWindow.add("edittext", [0, 25, 50, 45], "0");
	inputWindow.add("statictext", [55, 25, 80, 45], "秒 + ");
	var inputFrame = inputWindow.add("edittext", [85, 25, 135, 45], "0");
	inputWindow.add("statictext", [140, 25, 180, 45], "フレーム");

	var buttonOK = inputWindow.add('button', [70, 50, 120, 70], 'OK' );
	var buttonCancel = inputWindow.add('button', [ 125,  50,  175,  70], 'Cancel' );

	// キャンセルされた場合は終了
	if (inputWindow.show() != 1) {
		return;
	}

	// 入力からコンポの時間を計算
	var duration = 0;
	if (isNumber(inputSec.text) && isNumber(inputFrame.text)) {
		duration = parseInt(inputSec.text) + parseInt(inputFrame.text) / FPS;
	} else {
		alert("入力が不正です");
		return;
	}

	app.beginUndoGroup("script: SetCompTimeAll");

	// コンポの時間を変更
	for (var i=1; i < app.project.items.length + 1; i++) {
		var item = app.project.item(i);
		if ((item != null) && item instanceof CompItem) {
			item.duration = duration;
		}
	}

	app.endUndoGroup();
}

// 入力をチェック
function isNumber(time) {
	if (time && !isNaN(parseInt(time))) {
		return true;
	}
	return false;
}
