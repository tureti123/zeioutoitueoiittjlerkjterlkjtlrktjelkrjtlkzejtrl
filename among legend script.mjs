import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;


let user = {};
global.usu0 = [];
global.usu1 = [];
let imposteur = {};
let serpentin = {};
let superheros = {};
let romeo = {};
let droide = {};
let doubleface = {};

global.T1 = []
global.T0 = []

 let i = 2;
 let k = 0;
let mace = '';
let lunch = false;

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

let collec = '';
const url = 'mongodb+srv://tureti:db7dm8mf@cluster0.tvkiecu.mongodb.net/votreBaseDeDonnées?retryWrites=true&w=majority';

async function connectWithMongoClient() {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db('votreBaseDeDonnées');
    collec = database.collection('user');
}

io.on('connection', (socket) => {
    connectWithMongoClient();

    socket.on('disconnect', () => {});

    socket.on("disconnecting", () => {
        if (collec !== null && collec !== undefined) {
            disconnecting(socket);
        }
    });

    socket.on('pseudo', async (n) => {
      
        socket.pseudo = n;
        user[socket.id] = n;
       
           if (lunch === true) {
           soitajour(socket)
           reco(socket,n);
           
        }
                 
        else{
         
            await mongouser(n)
            soitajour(socket)

        }
       infosave(socket.pseudo,'id',socket.id);
        
        
        
    });

    socket.on('ve', () => {
        let ndpe = Object.keys(user).length;
        socket.emit('val', ndpe < 10);
    });

    socket.on('t12', async (h,reco) => {
       
        let mace = await collec.countDocuments({ 'team':`T${h}` });

        if (mace< 2 ||reco==="reco") {
            t12(socket, h);
        }
        infosave(socket.pseudo, 'team', `T${h}`);
    });

    socket.on('vt',async (four,reco) => {
        let roomSize = await collec.countDocuments({ 'team':`T${four}` });
        console.log(roomSize)

        if (roomSize<2 || reco==="reco"){
            socket.emit('val2', true);
        }
        else{
            socket.emit('val2', false);
        }
       
    });

    socket.on('nb',async () => {
        let T1 = await collec.countDocuments({ 'team':`T1` });
        let T0 = await collec.countDocuments({ 'team':`T0` });
        if (T1 === 2 /*&& T0===3*/) {
            socket.emit('enough', true);
        }
    });

    socket.on('qt', (t, nplace, su,th) => {
        if (t === 'T1') {
            infosave(socket.pseudo,'team',`T1`)
            //infodel(socket.pseudo,'team')
          
        } else {
            infosave(socket.pseudo,'team',`T0`)
            //infodel(socket.pseudo,'team')
        }
        infosave(socket.pseudo, 'teamate', nplace);
        infosave(socket.pseudo, 'supprimer', su);
        infosave("biencommun1", 't', th+1);
    });

    socket.on('saveteamate', (l, s) => {
        infosave(socket.pseudo, 'teamate', `t${l}${s}`);
        infosave(socket.pseudo, 'supprimer', `teamate${l}${s}`);
        console.log(`teamate${l}${s}`)
        infosave('biencommun1', 't', s + 1);
        infosave('biencommun0', 't', s + 1);
    });

    socket.on('recup', () => {
        pecor(socket);
    });

    socket.on('conn', (h) => {
        
        connt(socket,h);
        
    });

    socket.on('giverole',async (t) => {
        console.log('giverole')
        lunch = t;
        let ni = [];
        let identity = ['serpentin', 'imposteur'];
        

        while (identity.length !== 0) {
            let choix = Math.floor(Math.random() * identity.length);

            let nv = identity.splice(choix, 1);
            ni.push(nv[0]);
            i--;
        }

        for (let b = 0; b < 2; b++) {
            
            global[`T${b}`]=await collec.find({'team':`T${b}`}).toArray()
            let idt=global[`T${b}`].map(dpc=>dpc.id)
            console.log(idt)
            console.log(global[`T${b}`])
           

            for (const userid of idt){
                console.log(b+'kjmmmmlllklmjjjjjjjjj')
                if (k !== 2 && userid !== socket.id) {
                    socket.to(userid).emit('message', ni[k],b);
                } else {
                    socket.emit('message', ni[k],b);
                }
                console.log(ni[k])
                console.log(userid)
                //global[ni[k]].add(userid);
                infosaveid(userid, 'role', ni[k]);
                k++;
            };
        }
    });

    socket.on('sendall', (m) => {
        let choque = new Promise((resolve) => {
            resolve(testons());
        }).then(() => {
            io.emit('sendata', choque);
        });
    });

    socket.on('racket', (f, a1, a2, a3, a4, a5, a6, a7) => {
        io.emit('falldo', f, a1, a2, a3, a4, a5, a6, a7);
    });

    socket.on('resolue', (h, opt, opt2, t) => {
        socket.emit('cfait', h, t);
        infosave('biencommun1', 'table', opt);
        infosave('biencommun0', 'table', opt2);
    });

    socket.on('disconnecting2', (l1, l0) => {
        infosave('biencommun1', 'table', l1);
        infosave('biencommun0', 'table', l0);
        
        io.emit('maj', l1, l0);
    });

    socket.on('failure', () => {
        disconnecting(socket);
    });

    socket.on('omaewa', (v1, v2, v3, v4) => {});

    socket.on('biencommun', (un, zero) => {
        infosave("biencommun1",'table', un);
        infosave( "biencommun0",'table', zero);
        socket.emit('artemis', true);
    });

    socket.on('bjr', (t) => {
        console.log(t)
    });
    socket.on('jt',async(h)=>{
       console.log(global[`T${h}`])
        socket.emit('gh',global[`T${h}`])
    })
});

async function testons() {
    let testing = await collec.findOne({ skip: 'trahison' });
    return testing;
}

async function pecor(socket) {
    let pecor = await collec.findOne({ pseudo: socket.pseudo });
    let mecor = await collec.findOne({ pseudo: 'biencommun1' });

    if (pecor.teamate !== undefined) {
        socket.emit('recap', pecor.teamate, pecor.supprimer, mecor.t);
    }
}

async function infosave(pseudo, prop, info) {
    if (collec !== undefined) {
        await collec.updateOne({ pseudo: pseudo }, { $set: { [prop]: info } });
    }
}
async function infosaveid(id, prop, info) {
    if (collec !== undefined) {
        await collec.updateOne({ id: id }, { $set: { [prop]: info } });
    }
}
async function infodel(pseudo,prop,v){
    if (v===false){
        infosave(pseudo,prop,'')
    }
    else{
        await delete collec.prop
    }
    
}

async function mongouser(pseudo) {
    let us = { pseudo: pseudo };
    await collec.insertOne(us);
}



async function reco(socket, n) {
    console.log('turututut')
    let decor = await collec.findOne({ pseudo: n });
    console.log(decor)
        if (decor!==null){
    if (decor.role !== undefined ) {
        console.log('siuuuuuuuuuuuuuuu')
      //  global[decor.role].add(n);
      console.log(decor.role)
        socket.emit(decor.role);
    }

    if (decor.team !== undefined ) {
        console.log('fsfsdkjflskjflskqjskq')
        socket.emit(decor.team)
       // global[decor.team].add(n);
    }
}
}

async function disconnecting(socket) {
    let supragrand = await collec.findOne({ pseudo: socket.pseudo });
//s'il y a quelque chose il supprime
    if (supragrand !== null) {
        if (supragrand.team !== undefined ) {
           // global[supragrand.team].delete(socket.pseudo);
           if (lunch===false){
            
            delete supragrand.team
           }
         
          

        }

        if (supragrand.role !== undefined && supragrand.role !== null) {
           // global[supragrand.role].delete(socket.pseudo);
           if(lunch===false){
            delete supragrand.role
           }
        } 
        else {
            //quand on se deconnecte je supprime ton profil
            await collec.deleteOne({ pseudo: socket.pseudo });
        }

        await new Promise((resolve) => {
            socket.on('artemis', (t) => {
                resolve(t);
            });
        });
    }
}

async function connt(socket,h) {
    console.log('imoroblem')
    let team= await collec.findOne({pseudo:socket.pseudo})
    console.log(team)
    
   //deja dans une equipe
    if (team!==null && team.team!==undefined) {
        socket.emit('cringe', true, socket.pseudo);
    }
    //trouve pas de team 
    else {
        console.log(false)
        socket.emit('cringe', false, socket.pseudo);
    }
   
}

async function soitajour(socket) {  
   
    let cecor = await collec.findOne({ pseudo: 'biencommun1' });
    let secor = await collec.findOne({ pseudo: 'biencommun0' });
    console.log(cecor,secor)

    if (cecor !== undefined || secor !== undefined) {
        if (cecor !== null || secor !== null) {
            socket.emit('maj', cecor.table, secor.table);
        } 
        else {
        
            mongouser('biencommun0');
            await mongouser('biencommun1');  
           await infosave('biencommun1', 't', 0);
        }
    }
}

async function t12(socket, h) {
    let pog = await collec.findOne({ pseudo: 'biencommun1' });
    socket.emit('rej', socket.pseudo, pog.t);
    infosave(socket.pseudo, 'team', `T${h}`);
   // global[mace].add(socket.pseudo);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {});