import {createClient } from 'redis';
class RedisClient {
	conasructor() {
		this.client = createClient();

		this.isConnected = false;
		this.client.on('connect', () => {
			console.log('Redis client connected');
			this.isConnected = true;
		});
		this.client.on('end', () => {
			console.log('Redis client disconnected');
			this.isConnected = false;
		});

		this.client.connect().catch((err) => {
			console.error('Failed to connect to Redis:', err);
		});
	}
	isAlive() {
		return this.isConnected;
	}
	async getkey(key){
		try{
			return await this.client.get(key);
		}
		catch(err){
			console.error('Error getting value from Redis:', err);
			return null;
		}
	}
	async set(key, value, duration) {
		try {
			await this.client.set(key, value, {
				EX: duration,
			});
		} catch (err) {
			console.error('Error setting value in Redis:', err);
		}
	}
	async del(key) {
		try {
			await this.client.del(key);
		}
		catch (err) {
			console.error('Error deleting value from Redis:', err);
		}
	}
}

const redisClient = new RedisClient();
export default redisClient;
