const xml2js = require('xml2js');
const axios = require('axios');

axios.get('https://www.tcmb.gov.tr/kurlar/today.xml').then(res => {
	var data = res.data;
	xml2js.parseString(data, (err, res) => {
		if(err){ console.log(err) } else {
			var kur = JSON.stringify(res.Tarih_Date.Currency[0].ForexBuying);
			console.log(`Dolar-Tl kur: ${kur.substring(2, kur.length-2)}\nTarih: ${res.Tarih_Date.$.Tarih}`);
		}
	});
});
