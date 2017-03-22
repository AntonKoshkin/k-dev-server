const express = require('express');

module.exports = app => {
	app.get('/assets/img/:imgName', (req, res) => {
		console.log(req.params);
		
		res.end();
	});
};
