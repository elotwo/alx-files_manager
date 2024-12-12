const { MongoClient } = require('mongodb');

class DBClient {
	constructor (){
		const uri = 'mongodb://localhost:27017';

		new MongoClient(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		this.isconnected = false;
		this.client.on('open', () =>{
			console.log('mongodb client connected');
		});
		this.client.on('close', () =>{
			console.log('mongodb client disconnected');
		});
		this.cliient.on('error' (err) =>{
			console.log('mongodb client erro:', err);
		});
		this.client.connect().catch((err) => {
			console.error('failled to connect to mongodb:', err);
		});
	}
	isAlive() {
		return this.isconnected;
	}
	db(files_manager) {
		if (!this.isconnected) {
			throw new Error('MOngodb client is not connected');
		}
		return this.client.close();
	}
}




