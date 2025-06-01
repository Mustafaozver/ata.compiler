#!/usr/bin/env node

((ATA)=>{
	const Express = ATA.Require("express");
	const PORT = 8050;
	
	const Setup = (fromPath, toPath, pack)=>{
		const App = Express();
		
		App.use(Express.static(ATA.Path.join(toPath, "./HTML/"), {
			index: "index.html",
		}));
		
		App.use(Express.static(ATA.Path.join(toPath, "./ROOT/")));
		App.use(Express.static(ATA.Path.join(toPath, "./JS/")));
		App.use(Express.static(ATA.Path.join(toPath, "./CSS/")));
		
		App.listen(PORT, ()=>{
			console.log("Server is running on port " + PORT);
		});
	};
	
	ATA.Setups.push(() => {
		const fromPath = ATA.Path.join(ATA.CWD, "./Source/");
		const toPath = ATA.Path.join(ATA.CWD, "./Interface/");
		const pack = ATA.Require(ATA.Path.join(ATA.CWD, "./Source/.compile.ata.js"));
		
		Setup(fromPath, toPath, pack);
	});
})(require('ata.js')());