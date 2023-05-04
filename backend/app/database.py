import motor.motor_asyncio
from decouple import config
import certifi

ca = certifi.where()

MONGODB_URI = config("MONGODB_URI")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URI, tlsCAFile=ca)
db = client.dbEarlyDev

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)