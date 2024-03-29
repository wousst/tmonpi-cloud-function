tmonpi Cloud Function
=====================
This Pub/Sub cloud function triggers when temperature data receives at the Pub/Sub, and then store the current value into firebase database. 

### 1. Cheat Sheet

```
$ gcloud auth login
$ gcloud config set project <your-project>
$ cd <your-cloud-function-directory>
$ npm install -g firebase-tools
$ gcloud functions deploy tmonpi --runtime nodejs8 --trigger-topic tmonpi-topic --region asia-east2
```

### 2. Generate Account Key

Navigate to service account [here][1]. Then click ***Generate New Private Key***. This action will create a JSON file that contains your service's account credentials, which will use to initialize the Firebase SDK. 

[IMAGE][TODO]

Note: This credential file is best to be kept in local machine or in private repository **ONLY**.

[1]: https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk

### Deploy Cloud Function in Local Machine

1. Open Google Cloud SDK Shell terminal. Then go into your cloud function directory. 

```
$ cd "C:\Users\hdx\Documents\GitHub\tmonpi-cloud-function"
```

2. Check the name of cloud function by inspecting the similar code section below. In this case, the name of cloud function is ***tmonpiCloudFunction***. 

```
exports.tmonpiCloudFunction = ....
```

3. Deploy your cloud function. 

```
$ gcloud functions deploy tmonpiCloudFunction --runtime nodejs8 --trigger-topic tmonpi-topic --region asia-east2
```

4. If the deployment returns successful, you may see the similar output as below:

```
...
status: ACTIVE
timeout: 60s
updateTime: 'XXXX-XX-XXXXX:XX:XXX'
versionId: '3'
```

### Deploy Cloud Functions from Source Control. 

1. The details is described [here][1]. 

[1]: https://cloud.google.com/functions/docs/deploying/repo

Author
------
hadrihl &copy; 2019. // hadrihilmi[at]gmail[dot]com 
