import redis
from decouple import config

LIMIT = int(config('LIMIT'))
TTL = int(config('TTL'))

client = redis.Redis(host="redis-server")


def limiter(key, limit):
    req = client.incr(key)

    if req == 1:
        client.expire(key, TTL)
        ttl = TTL
    else:
        ttl = client.ttl(key)

    if req > limit:
        return {"call": False, "remain_cnt": 0, "ttl": ttl}
    else:
        return {"call": True, "remain_cnt": LIMIT - req, "ttl": ttl}
    

def checker(key):
    cnt = client.get(key)
    
    if cnt is None:
        return {"remain_cnt": LIMIT, "ttl": TTL}
    
    return {"remain_cnt": LIMIT - int(cnt), "ttl": client.ttl(key)}
        