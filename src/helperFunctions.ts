module.exports = {
    async auth() : Promise<any> {
        let sf : any
        await fetch('https://login.salesforce.com/services/oauth2/token', {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body    :
                'grant_type=password' +
                `&client_id=${process.env.SF_CONSUMER_KEY}` +
                `&client_secret=${process.env.SF_CONSUMER_SECRET}` +
                `&username=${process.env.SF_USERNAME}` +
                `&password=${process.env.SF_PASSWORD}${process.env.SF_SECURITY_TOKEN}`
        })  .then((response : Response) => response.json())
            .then(data => {
                console.log('Successfully Connected to Salesforce!')
                sf = data
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
        return sf
    },
    async soql(queryStr : string, sf : any) : Promise<any> {
        let result : any
        await fetch(`${sf.instance_url}/services/data/v54.0/query/?q=${queryStr}`, {
            method : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            }
        })  .then((response : Response) => { response.json() })
            .then(async(data : any) => {
                result = data
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return result
    },
    async insert(object : string, body : any, sf : any) : Promise<any> {
        let result : any
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}`, {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then((response : Response) => { response.json() })
            .then(async (data : any) => {
                result = data
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return result
    },
    async update(object : string, id : string, body : any, sf : any) : Promise<any> {
        let result : any
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method  : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then(async (data : any) => {
                result = data
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return result
    },
    async upsert(object : string, externalIdFieldName : string, externalId : string, body : any, sf : any) : Promise<any> {
        let result : any
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}/${externalIdFieldName}/${externalId}`, {
            method  : 'PATCH',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then((response : Response) => { response.json() })
            .then(async (data : any) => {
                result = data
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return result
    },
    async delete(object : string, id : string, sf : any) : Promise<any> {
        let success : boolean = false
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method  : 'DELETE',
            headers : {
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            }
        })  .then(async (data : Response) => {
                if(data.hasOwnProperty('No Content')) success = true
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return success
    },
    async getRecordById(object : string, id : string, sf : any) : Promise<any> {
        let result : any
        await fetch(`${sf.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${sf.token_type} ${sf.access_token}`
            }
        })  .then((response : Response) => { response.json() })
            .then(async(data : any) => {
                result = data
            })
            .catch((error : any) => {
                console.log('Error: ', error)
            })
        return result
    },
    async getMap(sf : any) : Promise<Map<string, string[]>> {
        const queryStr : string = `SELECT+Id,Name,Char__c+from+Emoji__c`
        let records : any = await this.soql(queryStr, sf)
        let map : Map<string, string[]> = new Map<string, string[]>()
        if(records.totalSize > 0) {
            records.records.forEach((record : any) => {
                const key : string = record.Char__c
                if(map.has(key)) {
                    const emojis : string[] | undefined = map.get(key)
                    if(emojis) {
                        emojis.push(record.Name)
                        map.set(key, emojis)
                    }
                } else {
                    map.set(key, [record.Name])
                }
            })
        }

        return map
    },
    async convert(str : string, conversionMap : Map<string, string[]>, sf : any) : Promise<any> {
        let output : any = {
            update_map : false,
            map : new Map<string, string[]>(),
            message : ''
        }
        if(!conversionMap) {
            output.update_map = true
            output.map = await this.getMap(sf)
        }

        const map : Map<string, string[]> = output.update_map ? output.map : conversionMap
        
        str = str.toLowerCase()
        for(const c of str.split('')) {
            if(c === ' ') {
                output.message += '    '
            } else {
                const emojis : string[] | undefined = map.get(c)
                if(emojis) {
                    output.message += map.get(c)?.at(Math.floor(Math.random() * emojis.length)) + ' '
                }
            }
        }

        return output
    }
}