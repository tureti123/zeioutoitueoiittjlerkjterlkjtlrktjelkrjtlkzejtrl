
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
let user={}
global.use1=[]
global.use2=[] 
let i=3
let k=0
let mace=''
let imposteur={}
let serpentin={}
let superheros={}
let romeo={}
let droide={}
let doubleface={}
let T1={}
let T2={}

//function

// Obtenir le répertoire du fichier courant
const __dirname = dirname(fileURLToPath(import.meta.url));

// Créer une instance de l'application Express
const app = express();

// Créer un serveur HTTP basé sur l'application Express
const server = createServer(app);

// Initialiser Socket.io pour le serveur HTTP
const io = new Server(server);

// Servir les fichiers statiques de l'application (y compris index.html)
app.use(express.static(__dirname));

// Définir une route pour servir la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/among legend.html");  

 
});
let collec=''
let rec=''
const url = 'mongodb+srv://tureti:db7dm8mf@cluster0.tvkiecu.mongodb.net/votreBaseDeDonnées?retryWrites=true&w=majority';

async function connectWithMongoClient() {
    
    const client = new MongoClient(url);
      await client.connect();
      const database = client.db('votreBaseDeDonnées');
      collec =  database.collection('user');
      
  }


io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté')
    console.log(socket.id);
    socket.pseudo='chablagou'
    connectWithMongoClient()
    
    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
        
    });
    socket.on("disconnecting", () => {
        console.log('je balance tout')
        console.log(socket.rooms);
        console.log(socket.rooms.size)
        infosave(socket.pseudo,'room',socket.rooms)
        let agrandir=socket.rooms.size
        if (agrandir<3){
            rec=socket.pseudo
        }
            
      });
    
    socket.on('pseudo',(n)=>{
        let fuck=Object.keys(user)
        if (fuck.length!==0){
        for (let k of Object.keys(user)){
            //probleme s'ils commencent a faire les cons et a prendre les memes pseudos
            if(user[k]===n){
            delete user[k]
            }
            user[socket.id]=n
            socket.pseudo=n
            mongouser(socket.id,n)
            
        }}
        
        else{
        user[socket.id]=n
            socket.pseudo=n
            mongouser(socket.id,n)
        }
        //recupere depuis la base de donnée
        //qu est ce qu c est que cette merde
        let deco =collec.findOne({pseudo:n})
        deco.room.forEach( element=>{
            //dans le cas de double face et droide pour afficher la page de role
            socket.emit(element)
            socket.join(element)

    })
        
})
    socket.on('ve',()=>{
        let ndpe=Object.keys(user).length
        if (ndpe>=10){
            socket.emit('val',false)
        }
        else{
            socket.emit('val',true)
        }
    })
    socket.on('t12',(h)=>{
            socket.join(`t${h}`)
            socket.emit('rej',user[socket.id])
            infosave(socket.pseudo,'team', 'T1')
            console.log(io.sockets.adapter.rooms.get(`t${h}`))
            mace=`use${h}`
            if (global[mace].length!==3){
            global[mace].push(socket.id)
           console.log( global[mace])
            
            }
            
})
         


 
    socket.on('vt',(four)=>{
        const roomSize = io.sockets.adapter.rooms.get(`t${four}`)?.size || 0;
        if (roomSize<5){
            socket.emit('val2',true)
        }
        else{
            socket.emit('val2',false)
        }
        
       
    })
    socket.on ('nb',()=>{
        if (io.sockets.adapter.rooms.get('t1')?.size || 0===3){
            socket.emit('enough',true)
        }
    })
    socket.on('giverole',()=>{
        let ni=[]
        let identity=['serpentin','droide','imposteur'/*,'doubleface','superheros','romeo'*/]
        while (0!==identity.length){
            let choix=Math.floor(Math.random()*identity.length )
            let nv=identity.splice(choix,1)
            ni.push(nv[0])
            i--
            console.log(identity)
            console.log(nv)
        }
        console.log(ni)
        user2.forEach(userid => {
            if (k!==3 &&userid!==socket.id){
            console.log(userid)
            socket.to(userid).emit('message',ni[k],userid)

            console.log(ni[k])
            }
            else{
                socket.emit('message',ni[k])
            }
            //infosave(user[userid],room,ni[k])
            k++
        })
       console.log('fini')
    })
    socket.on('conn',()=>{
        let trouver=collec.findOne( {pseudo:pseudo},{room:T1})
        console.log('sdgfdsssssgdfssssssss')
        socket.emit('cringe',trouver)
    })
   
});
async function infosave(pseudo,prop,info){
    await collec.updateOne({ pseudo: pseudo }, { $set: { [prop]: info } });

}

async function mongouser(pseudo){
 let us={ pseudo :pseudo}
await collec.insertOne(us)
 console.log('haha')
}


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
    console.log('relance a chaque fois que tu modifies le server')
    
});