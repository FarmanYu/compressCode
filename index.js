var nopt = require("nopt"),
	path = require("path"),
	knownOpts = {
		"path": path
	}, 
	shortHands = {}, 
	parsed = nopt(knownOpts, shortHands, process.argv, 2);

if(!parsed.path){
	console.log("Must be have project path!");
	console.log("For example: [ node index.js --path 'd://demo//demo' ] .");
	return;
}
var fs = require("fs"),
	exec = require("child_process").exec;
	fs.writeFileSync("config.json", JSON.stringify(parsed, null, 4),"utf-8");
	
exec("gulp", function (error, stdout, stderr) {
	console.log(stdout);
	if(stderr){
		console.log('stderr: ' + stderr);
	}
    if (error !== null) {
      console.log('exec error: ' + error);
    }
})
