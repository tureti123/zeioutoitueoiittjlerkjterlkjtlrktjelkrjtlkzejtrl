import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
let user={}
global.usu0=[]
global.usu1=[]
let imposteur={}
let serpentin={}
let superheros={}
let romeo={}
let droide={}
let doubleface={}
//a quoi serve T1 et T0
global.T1=new Set([])
global.T0=new Set([])
let i=3
let k=0
let mace=''
global

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
      collec = database.collection('user');
      
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
        if (collec!==null && collec!==undefined)   {
        console.log('je balance tout')
       disconnecting(socket)
        }

            
      });
    
    socket.on('pseudo',(n)=>{
        let fuck=Object.keys(user)
        if (fuck.length!==0){
        for (let k of Object.keys(user)){
            //probleme s'ils commencent a faire les cons et a prendre les memes pseudos
            if(user[k]===n){
            console.log('je suis entrain de faire de la merde')
            delete user[k]
            reco(socket,n)
            }
        }}
        socket.pseudo=n
        user[socket.id]=n
            
            rec=socket.pseudo
            mongouser(n)
      
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
            console.log('youpitralalayoupitralalayoupitralala')
            socket.emit('rej',socket.pseudo)
            infosave(socket.pseudo,'team',`T${h}`)
            mace=`T${h}`
            if (global[mace].size!==3){
            global[mace].add(socket.pseudo)
           console.log( global[mace])
            
            }
            
})
         


 
    socket.on('vt',(four)=>{
        //a check vu que j utilise plus les rooms
        console.log(four)
        console.log('cracaraarara')
       // console.log(global[`T${four}`])
        //let roomSize = global[`T${four}`].size
        let roomSize=global[`T${four}`].size
        console.log(roomSize)
        if (roomSize<5){
            socket.emit('val2',true)
        }
        else{  
            socket.emit('val2',false)
        }
        
       
    })
    //verifie la taille dela salle
    socket.on ('nb',()=>{
        if (T1.size===3 /*&& T0.size===3*/){
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
        //remet dans un ordre aleatoir les roles
        console.log(ni)
        //pour les deux teams
        for (let b=0;b<2;b++){
        `T${b}`.forEach(userid => {
            //envoi pour trois joueurs et faut pas que ce soit le meme id sinon socket.to.emit marche pas
            if (k!==3 &&userid!==socket.id){
            console.log(userid)
            socket.to(userid).emit('message',ni[k])
            
            console.log(ni[k])
            }
            else{
                socket.emit('message',ni[k])
            }
            global[ni[k]].append(userid)
            infosave(pseudo,'role',ni[k])
            k++
        })
       console.log('fini')
    }
    })
    // je sais toujours pas comment organiser en room ou en team
    socket.on('conn',(h)=>{
        infosave(socket.pseudo,'team',`T${h}`)
        connt(socket)
       
    })
    socket.on('qt',(t,teael)=>{
        console.log(teael)
        //verifie s il est ddans l equipe T0
        console.log(t)
        if (t==='T0'){
            T1.delete(socket.pseudo)
            T0.add(socket.pseudo)
            console.log('je l ai enlevé de l equipe1')
        }
        else{
            T0.delete(socket.pseudo)
            T1.add(socket.pseudo)
            console.log('je l ai enlevé de l equipe0')
        }
        console.log(teael+'pppppppppppppppppppppppp')
        infosave(socket.pseudo,'teamate',teael)
        console.log('T1')
        console.log(T1)
        console.log('T0')
        console.log(T0)
    })
    
    socket.on('saveteamate',(l,teael)=>{
        //sauvegarde les anciennes infos
        
        console.log(`t${l}`+'this is my nex design')

        infosave(socket.pseudo,'teamate',`${l}`)
        infosave(socket.pseudo,'teas',teael)
    })
        
   socket.on('recup',()=>{
    pecor(socket)
    
   })
});
async function pecor(socket){
    console.log('raya')
    let pecor=await collec.findOne({pseudo:socket.pseudo})
    console.log(pecor)
    if (pecor.teamate!==undefined){
        console.log(pecor.teamate)
        socket.emit('recap',pecor.teamate)
        
    }
}

async function infosave(pseudo,prop,info){
    await collec.updateOne({ pseudo: pseudo }, { $set: { [prop]: info } });

}

async function mongouser(pseudo){
 let us={ pseudo :pseudo}
await collec.insertOne(us)
 console.log('haha')
}
async function reco(socket,n) {
        //recupere depuis la base de donnée
        //qu est ce qu c est que cette merde

        let decor=await collec.findOne({pseudo:n})
        console.log(decor+'bonchalakalaka')
        console.log(decor.role)
        console.log(decor.team)
        console.log(decor.teamate)
        
        if (decor.role!==undefined){
            global[decor.role].add(n)
            socket.emit(decor.role)
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        }
        //il faut qu il rejoigne son role et son equipe
        //dans le cas de double face et droide pour afficher la page de role
        if(decor.team!==undefined){
            let decoy=decor.teamate[1].toString()
            let decon=Number(decor.team[1])
            console.log(decoy)
            console.log(decon)
            socket.emit(decor.team,decon,decoy)
            global[decor.team].add(n)   
            console.log(T1)
            console.log(T0)
            console.log('je suis sur la connexion')
        }
        
    
        
      
}
async function disconnecting(socket){
    console.log(T1)
            console.log(T0)
     //faut donc differencier les roles et les salles
        // c pour verifier s'il a un role et enlever des ensembles roles/teams 
        //commetn il peut socket.pseudo
        
        let supragrand=await collec.findOne({pseudo:socket.pseudo})
        console.log(supragrand+'gagagagagag')
        if(supragrand!==null ){
        console.log('moussssssssssssssssssssssss')
       
        if ( global[supragrand.role]!==undefined){
            global[supragrand.role].delete(socket.pseudo)

        }
        if ( global[supragrand.team]!==undefined){
            global[supragrand.team].delete(socket.pseudo)
            console.log('j ai enlevé')
            console.log(global[supragrand.team])
            console.log(T1)
            console.log(T0)

        }
        //ca fait en sorte de faire quitter le role 
        //pourquoi je me fais chier a faire quitter le roole 
        console.log(supragrand.pseudo)
        console.log(supragrand.role)
  
        //chai pas trop pourquoi rec
            
        }
    
}
async function connt(socket){
    //let trouver=await collec.findOne({pseudo:socket.pseudo,team:'T1'})
    //est dans une equipe
    console.log(T0)
    console.log(T1)
    if (T0.has(socket.pseudo) || T1.has(socket.pseudo)){
    console.log('sdgfdsssssgdfssssssss')
    socket.emit('cringe',true,socket.pseudo)
    }
    else {
        //pas dans une equipe
        socket.emit('cringe',false,socket.pseudo)
    }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
    console.log('relance a chaque fois que tu modifies le server')
    
});
