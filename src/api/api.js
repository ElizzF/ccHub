/* eslint-disable */
import axios from './axios'

axios.interceptors.request.use(
    config => {
        if (
            config.headers["Content-Type"].includes("x-www-form-urlencoded") ||
            config.headers["Content-Type"].includes("multipart/form-data")
        ) {
            let formData = new FormData();
            for (let item in config.data) {
                if (
                    typeof config.data[item] == "object" &&
                    config.data[item].length > 0
                )
                    for (let i of config.data[item]) formData.append(item, i);
                else formData.append(item, config.data[item]);
            }
            config.data = formData;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

export class Team{
    static async GetMyTeams(){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:'/team/joined',
                headers:{
                    "Content-Type":""
                }
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async GetDetail(teamid){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/team/${teamid}`,
                headers:{
                    "Content-Type":""
                }
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async DealRequest(messageid,deal){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'post',
                url:`/team/dealRequest/${messageid}/${deal}`,
                headers:{
                    "Content-Type":""
                }
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async Create(contestId,teamName,description){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'post',
                url:`/team/create/${contestId}`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{teamName,description}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async JoinTeam(teamId,requestText){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'post',
                url:`/team/join/${teamId}`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{requestText}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async GetContestTeam(contestId){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/team/get/${contestId}`,
                headers:{
                    "Content-Type":"application/json"
                },
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }
}

export class Contest{
    static async GetContestById(contestId){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/contest/${contestId}`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }
}

export class Message{
    static async GetMessageList(){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/message/list`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async GetMessageDetail(messageid,read=2){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/message/get/${messageid}?read=${read}`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }
}

export class User{
    static async GetUserInfoById(userId){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'get',
                url:`/user/getInfo/${userId}`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }

    static async Login(phone,password){
        return await new Promise((resolve,reject)=>{
            let options = {
                method: 'post',
                url:`/user/login`,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{phone,password}
            }
            axios(options).then(res=>{
                resolve(res.data)
                return res.data
            }).catch(err =>{
                if (err.response && err.response.data)
                    reject(err.response.data)
                else
                    reject(err)
            })
        })
    }
}