module.exports = ((ATA)=>{
	
	const i18n = (value, lang="en")=>{
		return value;
	};
	
	const Random = ()=>{
		return 10000 + Math.floor(Math.random() * 90000);
	};
	
	const Version = "1.0.0";
	
	const StaticRandom = Random();
	
	const time = (new Date()).getTime();
	
	const period = 1000 * 60 * 60 * 24 * 30;
	const cycled_key = (Math.floor((new Date()).getTime() / period) * 168297) % 1000;
	
	return{
		//...
		time,
		period,
		i18n,
		Version,
		Random,
		StaticRandom,
	};
})(ATA());