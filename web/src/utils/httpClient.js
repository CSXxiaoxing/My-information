
import request from 'superagent';

const LOCAL_SERVER = WANJI_ALL_URL;

const DEV_SERVER = '';
const PRO_SERVER = '';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    if(path == '/select'){
        path == 'http://localhost:999/select'
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        var req = request
            .get(getUrl(path))
            .query(query)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(res)
                    resolve(res.body);
                }
            });
    }),

    post: (path, formdata, query, vm) => new Promise((resolve, reject) => {
        
        if(vm){ vm['loading'] = true }
    	
        if (formdata) {
            formdata['token'] = localStorage.oxToken || '' ;
            formdata['uid'] = localStorage.oxUid || '' ;
        }
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(res)
                    resolve(res.body);
                }
                if(vm)(vm['loading'] = false)
            });
    })
};

export default HttpClient;