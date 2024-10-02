#!/usr/bin/env node

((ATA)=>{
	const {
		CompileEJSFile,
		CompileTSFile,
		CompileSASSFile,
	} = ATA.Require(ATA.Path.join(__dirname, "../Core/Renderer.js"));
	
	const render_data = {
		ATA,
	};
	
	const render_data_ejs = {};
	const render_data_ts = {};
	const render_data_cs = {};
	
	const ScanEJS = (fromPath, toPath, pack)=>{
		const regex = /^(?<name>\S+)\.ejs$/g;
		if(!ATA.FS.existsSync(fromPath))return;
		ATA.FS.mkdirSync(toPath, { recursive: true });
		return Promise.all(ATA.FS.readdirSync(fromPath).map((filename)=>{
			const fromFilePath = ATA.Path.join(fromPath, filename);
			if(ATA.FS.statSync(fromFilePath).isDirectory() || !(new RegExp(regex)).test(filename))return filename;
			const fileName = (new RegExp(regex)).exec(filename).groups.name;
			const toFilePath = ATA.Path.join(toPath, fileName + ".HTML");
			console.log("Compiling EJS File " + fileName);
			return new Promise((resolve)=>{
				CompileEJSFile(fromFilePath, {
					...render_data,
					...render_data_ejs,
					...pack,
				}).then((data)=>{
					ATA.FS.writeFile(toFilePath, data, {
						flag: "w",
						encoding: "UTF8"
					}, (err)=>{
						if(err)console.error("Compiling EJS File Write Error " + fileName);
						else console.info("Compiling EJS File is DONE " + fileName);
						resolve(fileName);
					});
				});
			});
		}));
	};
	
	const ScanTS = (fromPath, toPath, pack)=>{
		if(!ATA.FS.existsSync(fromPath))return;
		ATA.FS.mkdirSync(toPath, { recursive: true });
		const regex = /^(?<name>\S+)\.(j|t)s$/g;
		return Promise.all(ATA.FS.readdirSync(fromPath).map((filename)=>{
			const fromFilePath = ATA.Path.join(fromPath, filename);
			if(ATA.FS.statSync(fromFilePath).isDirectory() || !(new RegExp(regex)).test(filename))return filename;
			const fileName = (new RegExp(regex)).exec(filename).groups.name;
			const toFilePath = ATA.Path.join(toPath, fileName + ".JS");
			console.log("Compiling JS/TS File " + fileName);
			return new Promise((resolve)=>{
				CompileTSFile(fromFilePath, {
					...render_data,
					...render_data_ts,
					...pack,
				}).then((data)=>{
					ATA.FS.writeFile(toFilePath, data, {
						flag: "w",
						encoding: "UTF8"
					}, (err)=>{
						if(err)console.error("Compiling JS/TS File Write Error " + fileName);
						else console.info("Compiling JS/TS File is DONE " + fileName);
						resolve(fileName);
					});
				});
			});
		}));
	};
	
	const ScanSASS = (fromPath, toPath, pack)=>{
		if(!ATA.FS.existsSync(fromPath))return;
		ATA.FS.mkdirSync(toPath, { recursive: true });
		const regex = /^(?<name>\S+)\.(c|sa)ss$/g;
		return Promise.all(ATA.FS.readdirSync(fromPath).map((filename)=>{
			const fromFilePath = ATA.Path.join(fromPath, filename);
			if(ATA.FS.statSync(fromFilePath).isDirectory() || !(new RegExp(regex)).test(filename))return filename;
			const fileName = (new RegExp(regex)).exec(filename).groups.name;
			const toFilePath = ATA.Path.join(toPath, fileName + ".CSS");
			console.log("Compiling CSS/SASS File " + fileName);
			return new Promise((resolve)=>{
				CompileSASSFile(fromFilePath, {
					...render_data,
					...render_data_cs,
					...pack,
				}).then((data)=>{
					ATA.FS.writeFile(toFilePath, data, {
						flag: "w",
						encoding: "UTF8"
					}, (err)=>{
						if(err)console.error("Compiling CSS/SASS File Write Error " + fileName);
						else console.info("Compiling CSS/SASS File is DONE " + fileName);
						resolve(fileName);
					});
				});
			});
		}));
		
	};
	
	const Setup = (fromPath, toPath, pack)=>{
		const arr = [];
		
		arr.push(ScanEJS(ATA.Path.join(fromPath, "./EJS/"), ATA.Path.join(toPath, "./HTML/"), pack));
		arr.push(ScanTS(ATA.Path.join(fromPath, "./TS/"), ATA.Path.join(toPath, "./JS/"), pack));
		arr.push(ScanSASS(ATA.Path.join(fromPath, "./SASS/"), ATA.Path.join(toPath, "./CSS/"), pack));
		
		Promise.all(arr).then((data)=>{
			console.log("Compiling is DONE");
			Exit();
		});
	};
	
	ATA.Setups.push(() => {
		const fromPath = ATA.Path.join(ATA.CWD, "./Source/");
		const toPath = ATA.Path.join(ATA.CWD, "./Interface/");
		const pack = ATA.Require(ATA.Path.join(ATA.CWD, "./Source/.compile.ata.js"));
		
		Setup(fromPath, toPath, pack);
	});
})(require('ata.js')());