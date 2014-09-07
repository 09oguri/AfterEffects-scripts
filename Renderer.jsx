// 次の行のコメントを解除するとダブルクリックでスクリプトが実行できる
// #target aftereffects


// #### 設定 ####
// レンダリングした後にプロジェクトを保存するかどうか
isSaved = true;


// #### 処理 ####
projectFilePaths = [];

main();

function main() {
	var isLoaded = loadFile();
	if (isLoaded < 0) {
		return;
	}

	app.beginSuppressDialogs();

	for (var i = 0; i < projectFilePaths.length; i++) {
		try {
			var projectFile = new File(projectFilePaths[i]);
			app.open(projectFile);
		} catch(e) {
			alert("プロジェクトを開けませんでした");
			return;
		}

		var queueLength = app.project.renderQueue.items.length;
		for (var j = 0; j < queueLength; j++) {
			app.project.renderQueue.render();
		}

		// プロジェクトを閉じる際に保存するかどうか
		if (isSaved) {
			app.project.close(CloseOptions.SAVE_CHANGES);
		} else {
			app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
		}
	}

	app.endSuppressDialogs(false);
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
			projectFilePath = fileObj.readln();

			// 空行を無視
			if (projectFilePath == "") {
				continue;
			}

			// パス名の前後に"が含まれていたら除去
			if (projectFilePath.indexOf("\"") == 0) {
				projectFilePath = projectFilePath.slice(1);
			}
			if (projectFilePath.lastIndexOf("\"") == projectFilePath.length - 1) {
				projectFilePath = projectFilePath.slice(0, projectFilePath.length - 1);
			}

			projectFilePaths.push(projectFilePath);
			count++;
		}
		fileObj.close();

		return count;
	} catch(e) {
		alert(e);
		return -1;
	}
}
