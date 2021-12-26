const axios = require('axios');

axios.get('https://www.google.com.tr/search?q=dolar+tl').then(res => {
	var data = res.data;
	var splN = data.toString().split('\n');
	var kur = splN[10].substring(4761, 4766);
	console.log(kur);
});
