// 次の行のコメントを解除するとダブルクリックでスクリプトが実行できる
// #target aftereffects


// #### 設定 ####
// レイヤー名を表示するx座標
X = 180;
// レイヤー名を表示するy座標
Y = 60;
// 拡張子を除去するかどうか
removedExt = true;


// #### 処理 ####
main();

function main() {
	// アクティブなアイテムを取得
	var sourceComp = app.project.activeItem;

	// 取得したアイテムがコンポジションでない場合は終了
	if ((sourceComp == null) || !(sourceComp instanceof CompItem)) {
		alert("表示したいレイヤーを含むコンポジションをアクティブにして下さい");
		return;
	}

	app.beginUndoGroup("script: DisplayLayerName");

	// 1番目にテキストレイヤーを追加していくのでiは2ずつ増加させる
	for (var i = 1; i < sourceComp.layers.length + 1; i = i + 2) {
		var layerName = sourceComp.layer(i).name;
		// レイヤー名に含まれる拡張子を除去
		if (removedExt) {
			layerName = removeFileExt(layerName);
		}
		// レイヤー名を設定
		sourceComp.layers.addText(layerName);
		// 位置を設定
		sourceComp.layer(1).position.setValue([X, Y]);
		// インポイント・アウトポイントを設定
		sourceComp.layer(1).inPoint = sourceComp.layer(i + 1).inPoint;
		sourceComp.layer(1).outPoint = sourceComp.layer(i + 1).outPoint;
	}

	app.endUndoGroup();
}

// 引数で与えられた文字列から拡張子を除去
function removeFileExt(layerName) {
	var extIndex = layerName.lastIndexOf(".");
	if (extIndex == -1) {
		return layerName;
	}
	return layerName.slice(0, extIndex)
}
