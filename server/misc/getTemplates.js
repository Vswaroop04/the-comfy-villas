const fetch = require('node-fetch');

const apiKey = 'NDczMjY0NTI2ZTQ1MzA3NjQ0MzgzODc2NGEzNDZkNzM=';
const url = `https://api.textlocal.in/get_templates/?apiKey=${apiKey}`;

const main = async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

main();