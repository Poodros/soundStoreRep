daniel:
module.exports =
    {
    'db': 'mongodb+srv://daniel:adminDan123@cluster0.7osnc.mongodb.net/soundStoreTest?retryWrites=true&w=majority',
        ids: {
        'google': {
            clientID: '297161181201-4qa1ipqr5i1ctdv5ifnb9resiehkqm52.apps.googleusercontent.com',
            clientSecret: 'FfTH_tT0P_V7YaeDvorSQoPG',
            callbackURL: 'http://localhost:3000/google/callback'
            //callbackURL: 'https://task-manager-the2nd.herokuapp.com/google/callback'
        },
            /*'facebook': {
                clientID: '284983652946610',
                clientSecret: '3dff81e1932f00fe9d6cb0f5e22d89ca',
                callbackURL: 'http://localhost:3000/facebook/callback'
                //callbackURL: 'nodemon'
            },*/

           /* 'github': {
                clientID: '',
                clientSecret: '',
                callbackURL: 'http://localhost:3000/github/callback'
                //callbackURL: 'nodemon'
            }*/
        }
}