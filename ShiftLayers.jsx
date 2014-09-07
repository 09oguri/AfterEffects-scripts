// 次の行のコメントを解除するとダブルクリックでスクリプトが実行できる
// #target aftereffects


// #### 処理 ####
main();

function main() {
	// アクティブなアイテムを取得
	var comp = app.project.activeItem;

	// 取得したアイテムがコンポジションでない場合は終了
	if ((comp == null) || !(comp instanceof CompItem)) {
		alert("移動させたいレイヤーを選択して下さい");
		return;
	}

	app.beginUndoGroup("script: ShiftLayers");

	// 選択されているレイヤーを取得
	var selectedLayers = comp.selectedLayers;
	// 最初に選択されたレイヤーから移動量を計算
	var offset = comp.time - selectedLayers[0].inPoint;
	for (var i = 0; i < selectedLayers.length; i++) {
		// レイヤーのスタートタイムを変更
		var startTime = selectedLayers[i].inPoint + offset;
		selectedLayers[i].startTime = startTime;
	}

	app.endUndoGroup();
}