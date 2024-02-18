const express = require('express'); 
const fs = require('fs'); 
const app = express(); 


//Q-3 Answer --> http://localhost:5500/

app.get('/', (req, res) => { 
	res.sendFile(__dirname + '/video.html'); 
}) 

app.get('/videoplayer', (req, res) => { 
	const range = req.headers.range 
	const videoPath ="Tom_And_Jerry.mp4"; 
	const videoSize = fs.statSync(videoPath).size 
	const chunkSize = 10 ** 6; 
	const start = Number(range.replace(/\D/g, "")) 
	const end = Math.min(start + chunkSize, videoSize - 1) 
	const contentLength = end - start + 1; 
	const headers = { 
		"Content-Range": `bytes ${start}-${end}/${videoSize}`, 
		"Accept-Ranges": "bytes", 
		"Content-Length": contentLength, 
		"Content-Type": "video/mp4"
	} 
	res.writeHead(206, headers) 
	const stream = fs.createReadStream(videoPath, { 
		start, 
		end 
	}) 
	stream.pipe(res) 
}) 
app.listen(5500);
