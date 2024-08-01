<<<<<<< HEAD
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let count=0
let user = {};
global.usu0 = [];
global.usu1 = [];
let imposteur = {};
let serpentin = {};
let superheros = {};
let romeo = {};
let droide = {};
let doubleface = {};
let identityup=['imposteur','serpentin','superhero','doubleface','roméo','droide']

global.T1 = []
global.T0 = []

 

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
    socket.point=0

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
        if (T1 === 2 && T0===2) {
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
        
        for (let b = 0; b < 2; b++) {
            let i = 2;
            let k = 0;
            while (identity.length !== 0) {
                let choix = Math.floor(Math.random() * identity.length);
                let nv = identity.splice(choix, 1);
                ni.push(nv[0]);
                i--;
            }
            
            global[`T${b}`]=await collec.find({'team':`T${b}`}).toArray()
            let idt=global[`T${b}`].map(dpc=>dpc.id)
           
           

            for (const userid of idt){
                infosaveid(userid, 'role', ni[k]);
                infosaveid(userid,'point',0)
                
                if (k !== 2 && userid !== socket.id) {
                    socket.to(userid).emit('message', ni[k],b);
                    
                } else {
                    socket.emit('message', ni[k],b);
                }
                //global[ni[k]].add(userid);
                
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
    socket.on("elu",async(p,id,h)=>{
        
    
     
        let attribution= await collec.findOne({ id:global[`T${h}`][p].id});
        

        if (attribution.role===identityup[id]){
          
            socket.point+=1
            infosave(socket.pseudo,'point',socket.point)
        }
        count++
       
        if(count===8){
           
           let chacal =await collec.find({point:{$exists:true}}).sort({point:-1}).toArray()

        
            io.emit('resultat',chacal)
        }
        
    })
    socket.on('savetab',(t)=>{
        infosave(socket.pseudo,'disco',t)
    })

    socket.on('clear',async()=>{
        
       const execution= await collec.deleteMany({});
        T1.length=0
        T0.length=0
        
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
  
    let decor = await collec.findOne({ pseudo: n });
  
        if (decor!==null){
    if (decor.role !== undefined ) {
       
      //  global[decor.role].add(n);
   
        socket.emit(decor.role);
    }

    if (decor.team !== undefined ) {
       
        socket.emit(decor.team)
       // global[decor.team].add(n);
    }
    if(decor.disco!==undefined){

   
        socket.emit('avance',decor.disco)
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
   
    let team= await collec.findOne({pseudo:socket.pseudo})

    
   //deja dans une equipe
    if (team!==null && team.team!==undefined) {
        socket.emit('cringe', true, socket.pseudo);
    }
    //trouve pas de team 
    else {
       
        socket.emit('cringe', false, socket.pseudo);
    }
   
}

async function soitajour(socket) {  
   
    let cecor = await collec.findOne({ pseudo: 'biencommun1' });
    let secor = await collec.findOne({ pseudo: 'biencommun0' });
    

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
=======
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;

let yliuxestraciste
let user = {};
global.usu0 = [];
global.usu1 = [];
let imposteur = {};
let serpentin = {};
let superheros = {};
let romeo = {};
let droide = {};
let doubleface = {};

global.T1 = new Set([]);
global.T0 = new Set([]);

 let i = 3;
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
let rec = '';
const url = 'mongodb+srv://tureti:db7dm8mf@cluster0.tvkiecu.mongodb.net/votreBaseDeDonnées?retryWrites=true&w=majority';

async function connectWithMongoClient() {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db('votreBaseDeDonnées');
    collec = database.collection('user');
}

io.on('connection', (socket) => {
    connectWithMongoClient();

    socket.on('chocolat', () => {
        soitajour(socket);
    });

    socket.on('disconnect', () => {});

    socket.on("disconnecting", () => {
        if (collec !== null && collec !== undefined) {
            disconnecting(socket);
        }
    });

    socket.on('pseudo', (n) => {
        let fuck = Object.keys(user);
        if (fuck.length !== 0) {
            for (let k of Object.keys(user)) {
                if (user[k] === n) {
                    delete user[k];
                    if (lunch === true) {
                        reco(socket, n);
                    }
                }
            }
        }
        socket.pseudo = n;
        user[socket.id] = n;
        rec = socket.pseudo;
        mongouser(n);
    });

    socket.on('ve', () => {
        let ndpe = Object.keys(user).length;
        socket.emit('val', ndpe < 10);
    });

    socket.on('t12', (h) => {
        mace = `T${h}`;
        if (global[mace].size < 3) {
            t12(socket, h);
        }
    });

    socket.on('vt', (four) => {
        let roomSize = global[`T${four}`].size;
        socket.emit('val2', roomSize < 3);
    });

    socket.on('nb', () => {
        if (T1.size === 3) {
            socket.emit('enough', true);
        }
    });

    socket.on('qt', (t, nplace, su) => {
        if (t === 'T0') {
            T1.delete(socket.pseudo);
            T0.add(socket.pseudo);
        } else {
            T0.delete(socket.pseudo);
            T1.add(socket.pseudo);
        }
        infosave(socket.pseudo, 'teamate', nplace);
        infosave(socket.pseudo, 'supprimer', su);
    });

    socket.on('saveteamate', (l, s) => {
        infosave(socket.pseudo, 'teamate', `t${l}${s}`);
        infosave(socket.pseudo, 'supprimer', `teamate${l}${s}`);
        infosave('biencommun1', 't', s + 1);
        infosave('biencommun0', 't', s + 1);
    });

    socket.on('recup', () => {
        pecor(socket);
    });

    socket.on('conn', (h) => {
        infosave(socket.pseudo, 'team', `T${h}`);
        connt(socket);
    });

    socket.on('giverole', (t) => {
        lunch = t;
        let ni = [];
        let identity = ['serpentin', 'droide', 'imposteur'];

        while (identity.length !== 0) {
            let choix = Math.floor(Math.random() * identity.length);
            let nv = identity.splice(choix, 1);
            ni.push(nv[0]);
            i--;
        }

        for (let b = 0; b < 2; b++) {
            `T${b}`.forEach(userid => {
                if (k !== 3 && userid !== socket.id) {
                    socket.to(userid).emit('message', ni[k]);
                } else {
                    socket.emit('message', ni[k]);
                }
                global[ni[k]].append(userid);
                infosave(pseudo, 'role', ni[k]);
                k++;
            });
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

    socket.on('bjr', () => {});
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

async function mongouser(pseudo) {
    let us = { pseudo: pseudo };
    await collec.insertOne(us);
}

async function reco(socket, n) {
    let decor = await collec.findOne({ pseudo: n });

    if (decor.role !== undefined) {
        global[decor.role].add(n);
        socket.emit(decor.role);
    }

    if (decor.team !== undefined) {
        let decoy = decor.teamate[1].toString();
        let decon = Number(decor.team[1]);
        socket.emit(decor.team, decon, decoy);
        global[decor.team].add(n);
    }
}

async function disconnecting(socket) {
    let supragrand = await collec.findOne({ pseudo: socket.pseudo });

    if (supragrand !== null) {
        if (global[supragrand.team] !== undefined) {
            global[supragrand.team].delete(socket.pseudo);
        }

        if (global[supragrand.role] !== undefined && global[supragrand.role] !== null) {
            global[supragrand.role].delete(socket.pseudo);
        } else {
            await collec.deleteOne({ pseudo: socket.pseudo });
        }

        await new Promise((resolve) => {
            socket.on('artemis', (t) => {
                resolve(t);
            });
        });
    }
}

async function connt(socket) {
    if (T0.has(socket.pseudo) || T1.has(socket.pseudo)) {
        socket.emit('cringe', true, socket.pseudo);
    } else {
        socket.emit('cringe', false, socket.pseudo);
    }
}

async function soitajour(socket) {
    console.log('estuleprobleme')
    let cecor = await collec.findOne({ pseudo: 'biencommun1' });
    let secor = await collec.findOne({ pseudo: 'biencommun0' });

    if (cecor !== undefined || secor !== undefined) {
        if (cecor !== null || secor !== null) {
            socket.emit('maj', cecor.table, secor.table);
        } else {
            console.log('jesuispassé2fois')
            mongouser('biencommun0');
            mongouser('biencommun1');
            infosave('biencommun1', 't', 0);
        }
    }
}

async function t12(socket, h) {
    let pog = await collec.findOne({ pseudo: 'biencommun1' });
    socket.emit('rej', socket.pseudo, pog.t);
    infosave(socket.pseudo, 'team', `T${h}`);
    global[mace].add(socket.pseudo);
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {});
>>>>>>> f6e491471c4db0e7a0978b796f2698fb5cd4e63d
