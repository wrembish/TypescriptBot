export default class sfAuth {
    public access_token : string = ''
    public instance_url : string = ''
    public id : string = ''
    public token_type : string = ''
    public issued_at : string = ''
    public signature : string = ''

    constructor() { this.auth() }

    public async checkAuth() : Promise<void> {
        const response : any = await this.query('SELECT+Id+from+Lead+LIMIT+1')
        if((response && !response.totalSize) || !response) {
            await this.auth()
        }
    }

    public async auth() : Promise<void> {
        await fetch('https://login.salesforce.com/services/oauth2/token', {
            method  : 'POST',
            headers : { 'Content-Type' : 'application/x-www-form-urlencoded', },
            body    :
                'grant_type=password' +
                `&client_id=${process.env.SF_CONSUMER_KEY}` +
                `&client_secret=${process.env.SF_CONSUMER_SECRET}` +
                `&username=${process.env.SF_USERNAME}` +
                `&password=${process.env.SF_PASSWORD}${process.env.SF_SECURITY_TOKEN}`
        })  .then((response : Response) : any => response.json())
            .then((data : any) : void => {
                console.log('Successfully Connected to Salesforce!')
                this.access_token = data.access_token
                this.instance_url = data.instance_url
                this.id = data.id
                this.token_type = data.token_type
                this.issued_at = data.issued_at
                this.signature = data.signature
            })
            .catch((error : any) : void => { console.error('Error: ', error) })
    }

    
    public async query(queryStr : string) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/services/data/v54.0/query/?q=${queryStr}`, {
            method : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            }
        })  .then((response : Response) : any => response.json())
            .then((data : any) : void => { result = data })
            .catch((error : any) : void => {
                console.error('Error: ', error)
            })
        return result
    }

    public async insert(object : string, body : any) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/services/data/v54.0/sobjects/${object}`, {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then((response : Response) : any => response.json())
            .then((data : any) : void => { result = data })
            .catch((error : any) : void => { console.error('Error: ', error) })
        return result
    }

    public async update(object : string, id : string, body : any) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method  : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then((response : Response) : void => { result = response })
            .catch((error : any) : void => { console.error('Error: ', error) })
        return result
    }
    
    public async upsert(object : string, externalIdFieldName : string, externalId : string, body : any) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/services/data/v54.0/sobjects/${object}/${externalIdFieldName}/${externalId}`, {
            method  : 'PATCH',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then((response : Response) => response.json())
            .then((data : any) => { result = data })
            .catch((error : any) => { console.error('Error: ', error) })
        return result
    }
    
    public async delete(object : string, id : string) : Promise<any> {
        let success : boolean = false
        await fetch(`${this.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method  : 'DELETE',
            headers : {
                'Authorization' : `${this.token_type} ${this.access_token}`
            }
        })  .then((data : Response) : void => { if(data.hasOwnProperty('No Content')) success = true })
            .catch((error : any) : void => { console.error('Error: ', error) })
        return success
    }

    public async getRecordById(object : string, id : string) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/services/data/v54.0/sobjects/${object}/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            }
        })  .then((response : Response) : any => response.json())
            .then((data : any) : void => { result = data })
            .catch((error : any) => { console.error('Error: ', error) })
        return result
    }

    public async doPost(endpoint : string, body : any) : Promise<any> {
        let result : any
        await fetch(`${this.instance_url}/${endpoint}`, {
            method  : 'POST',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            },
            body    : JSON.stringify(body)
        })  .then(async (response : Response) : Promise<any> => response.json())
            .then((data : any) : void => { result = data })
            .catch((error : any) : void => { console.error('Error: ', error) })

        return result
    }

    public async doGet(endpoint : string) : Promise<void> {
        await fetch(`${this.instance_url}/${endpoint}`, {
            method  : 'GET',
            headers : {
                'Content-Type'  : 'application/json',
                'Authorization' : `${this.token_type} ${this.access_token}`
            }
        })  .then((response : Response) : any => response.json())
            .then((data : any) : void => { console.log(data) })
    }
}