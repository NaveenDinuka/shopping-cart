import config from 'config';
import redis from 'redis';
import bluebird from 'bluebird';
import Logger from '../core/Logger';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let instance = null;
class RedisCache {
	static getInstance () {
		if (instance === null) {
			instance = new RedisCache();
		}
		
		return instance;
	}

	/**
	 * Initialize Redis Client
	 * */
	async initializeRedis() {
		const { host, port } = config.cache.redis;
		const redisClient = redis.createClient({ host: process.env.REDIS_HOST || host, port });
		
		try {
			await redisClient.onAsync('connect');
			this.redisClient = redisClient;
		} catch (error) {
			Logger.LOG_ERROR('RedisCache', { status: 'Error occurred while connecting to Redis cache', error });
		}
	}

	/**
	 * Set cache key: value
	 * @param key:String Cache key
	 * @param value:String Cache value
	 * @param exSecond:Int Cache key expire time in seconds
	 * */
	set(key, value, exSecond) {
		const { redisClient } = this;
		
		if (exSecond) {
			redisClient.set(key, value, 'EX', exSecond);
			return;
		}
		
		redisClient.set(key, value, 'EX', exSecond);
	}

	/**
	 * Get cache value by key
	 * @param key:String Cache Key
	 * @return value:String
	 * */
	async get(key) {
		const { redisClient } = this;
		try {
			return await redisClient.getAsync(key);
		} catch (error) {
			Logger.LOG_ERROR('RedisCache', { status: 'Error occurred while reading cache data', error });
		}
	}

	/**
	 * Delete cache key
	 * @param key:String Cache key
	 * @return null;
	 * */
	del(key) {
		const { redisClient } = this;
		redisClient.del(key);
	}
}

export default RedisCache;
