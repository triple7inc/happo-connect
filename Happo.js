class Happo extends EventTarget{
    static instance=new Happo()
    static isListening=!1
    static async connect(){
        return new Promise((resolve,reject)=>{
            const W=window.open("https://www.happo.gg/connect","_blank","width=390,height=390")
            if(!W||W.closed){
                this.instance.dispatchEvent(new Event("error"))
                return(reject("Popup blocked or closed immediately"))
            }
            const checkInterval=setInterval(()=>{
                if(W.closed){
                    clearInterval(checkInterval)
                    this.instance.dispatchEvent(new Event("error"))
                    reject("Popup closed before authentication")
                }
            },500)
            const listener=async(e)=>{
                if(e.origin!=="https://www.happo.gg")return
                if(!e.data.success)return
                clearInterval(checkInterval)
                window.removeEventListener("message",listener) // Remove listener
                Happo.isListening=false
                W.close()
                try{
                    const R=e.data.user
                    const user={
                        id:R.accountId,
                        name:R.name,
                        motto:R.motto,
                        email:R.email,
                        figure:R.figureString,
                        club:R.habboClubMember,
                        rank:R.rank,
                        session:R.sessionKey,
                        timestamp:e.data.timestamp
                    }
                    this.instance.dispatchEvent(new CustomEvent("connect",{detail:user}))
                    resolve(user)
                }catch(ex){
                    this.instance.dispatchEvent(new Event("error"))
                    reject("Invalid user data")
                }
            }
            if(!this.isListening){
                window.addEventListener("message",listener,{once:true})
                this.isListening=true
            }
        })
    }
    static onConnect(callback){
        this.instance.addEventListener("connect",e=>callback(e.detail))
    }
    static onError(callback){
        this.instance.addEventListener("error",callback)
    }
}
