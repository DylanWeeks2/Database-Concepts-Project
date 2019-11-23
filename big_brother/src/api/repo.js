/* eslint eqeqeq: "off" */
import axios from 'axios';

import { StorageManager } from './../app/StorageManager';

export class Repo {
    storage = new StorageManager();

    url = "localhost:3000"
    config = {
        headers: {
            Authorization: "hdonofrio"
        }
    };

    testApi() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
            .then(resp => console.log(resp))
            .catch(resp => console.log(resp));

        });
    }

}