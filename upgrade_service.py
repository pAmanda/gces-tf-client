import os
import requests
import json
import time
import sys
serviceName = os.environ['RANCHER_SERVICE_NAME']
newImage = 'docker:'+os.environ['DOCKER_USERNAME']+'/'+os.environ['SERVICE_IMAGE']+':'+os.environ['TAG_NAME']

# Find stack based on their name
r = requests.get(os.environ['RANCHER_URL_SERVICES'],
                 auth=(os.environ['RANCHER_API_ACCESS_KEY'], os.environ['RANCHER_API_SECRET_KEY']))


for i in r.json()['data']:
    if i['name'] == os.environ['RANCHER_SERVICE_NAME']:
        service = i

launchConfig = service['launchConfig']

# Update launchConfig with newImage
launchConfig['imageUuid'] = newImage

# Construct payload for upgrade
payload = {
    'inServiceStrategy': {
        'batchSize': 1,
        'intervalMillis': 2000,
        'startFirst': False,
        'launchConfig': launchConfig
    }
}
headers = {'content-type': 'application/json'}

# Upgrade the service with payload
r = requests.post(os.environ['RANCHER_URL_SERVICES'] + '/' + service['id'] +'?action=upgrade',
                  data=json.dumps(payload), headers=headers,
                  auth=(os.environ['RANCHER_API_ACCESS_KEY'], os.environ['RANCHER_API_SECRET_KEY']))

# Pool service upgrade status
state = 'upgrading'
sleep = 30
retry = 10

while (state != 'upgraded'):
    print("service: " + service['name'] + " [upgrading]")
    time.sleep(sleep)
    r = requests.get(os.environ['RANCHER_URL_SERVICES'] + '/' + service['id'],
                     auth=(os.environ['RANCHER_API_ACCESS_KEY'], os.environ['RANCHER_API_SECRET_KEY']))
    state = r.json()['state']
    retry -= 1
    if (retry <= 0): sys.exit()

print("service: " + service['name'] + " [upgraded]")

# Finish Upgrade
r = requests.post(os.environ['RANCHER_URL_SERVICES'] + '/' + service['id'] + '/?action=finishupgrade',
                  headers=headers, auth=(os.environ['RANCHER_API_ACCESS_KEY'], os.environ['RANCHER_API_SECRET_KEY']))