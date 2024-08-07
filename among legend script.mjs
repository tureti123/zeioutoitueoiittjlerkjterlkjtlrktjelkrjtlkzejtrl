
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongodb from 'mongodb';
import { readdir } from 'fs';
import { promisify } from 'util';
const { MongoClient } = mongodb;

let count=0
let user = {};

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
    socket.imparti=0
    socket.IDroide=''

    socket.on('disconnect', () => {});

    socket.on("disconnecting", () => {
        if (collec !== null && collec !== undefined) {
            disconnecting(socket);
        }
    });

    socket.on('pseudo', async (n) => {
      
        socket.pseudo = n;
      //  user[socket.id] = n;
       
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

    /*socket.on('ve', () => {
        let ndpe = Object.keys(user).length;
        socket.emit('val', ndpe < 10);
    });*/

    socket.on('t12', async (h,reco) => {
       
        let mace = await collec.countDocuments({ 'team':`T${h}` });
//modifiable mace< 5 ||reco==="reco"
        if (mace< 5 ||reco==="reco") {
            t12(socket, h);
        }
        infosave(socket.pseudo, 'team', `T${h}`);
    });

    socket.on('vt',async (four,reco) => {
        let roomSize = await collec.countDocuments({ 'team':`T${four}` });
       
//modifiable roomSize<5 || reco==="reco"
        if (roomSize<5 || reco==="reco"){
            socket.emit('val2', true);
        }
        else{
            socket.emit('val2', false);
        }
       
    });

    socket.on('nb',async () => {
        let T1 = await collec.countDocuments({ 'team':`T1` });
        let T0 = await collec.countDocuments({ 'team':`T0` });
        //modifiable T1 === 5 && T0===5
        if (T1 === 5 && T0===5) {
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
       
        lunch = t;
        ;//['imposteur'] 
        
        //pour les deux teams
        for (let b = 0; b < 2; b++) {
            let identity = ['doubleface','droide','serpentin', 'romeo','superhero',  ];
            let ni = ['imposteur']
            let k = 0;
            //modifiable
            for(let m=0;m<4;m++) {
                let choix = Math.floor((Math.random() * identity.length)-0,1);
                let nv = identity.splice(choix, 1);
                ni.push(nv[0]);
            }
            
            global[`T${b}`]=await collec.find({'team':`T${b}`}).toArray()
            let idt=global[`T${b}`].map(dpc=>dpc.id)
           
           

            for (const userid in idt){
                infosaveid(idt[userid], 'role', ni[k]);
                infosaveid(idt[userid],'point',0)
                infosaveid(idt[userid],'ordre',[])
                infosaveid(idt[userid],'position',userid)
                //modifiable
                if (k !== 5 && idt[userid] !== socket.id) {
                    socket.to(idt[userid]).emit('message', ni[k],b);
                    
                } else {
                    socket.emit('message', ni[k],b);
                }
                //global[ni[k]].add(userid);
                
                k++;
            };
        }
        
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
        console.log('salam')
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

    socket.on('bjr', (t,x) => {
        console.log(t+'ou est le messsage')
        console.log(x)
    });

    socket.on('jt',async(h)=>{
    
        socket.emit('gh',global[`T${h}`])
    })

    socket.on("elu",async(p,id,h)=>{
     
        let attribution= await collec.findOne({ id:global[`T${h}`][p].id});
        console.log(global[`T${h}`])
        console.log(global[`T${h}`][p])
        console.log(global[`T${h}`][p].id)
        console.log(attribution)
        console.log(attribution.role)
        console.log(identityup[id])
        if (attribution.role===identityup[id]){
          
            socket.point+=1
            infosave(socket.pseudo,'point',socket.point)
        }
        count++
       
        if(count===40){
           
           let chacal =await collec.find({point:{$exists:true}}).sort({point:-1}).toArray()

        
            io.emit('resultat',chacal)
        }
        
    })
    socket.on('delu',async(opt,opt1,h)=>{
        console.log(opt,opt1,"un peu plus loin"+h)
        let chasseur=await collec.findOne({ role:'serpentin',team:`T${h}`});
        let hero=await collec.findOne({ role:'superhero',team:`T${h}`});
       console.log(hero)
       console.log(chasseur)
       if (chasseur!==null && chasseur!==undefined){
        if (chasseur.pseudo===opt1){
            socket.point+=1
            infosave(chasseur.pseudo,'point',socket.point)
        }}
        if(hero!==null && hero!==undefined){

        
        if (hero.pseudo===opt){
            socket.point+=1
            infosave(hero.pseudo,'point',socket.point)
        }}
    })

    socket.on('savetab',(disco,t)=>{
        infosave(socket.pseudo,disco,t)
    })

    socket.on('clear',async()=>{
        
       const execution= await collec.deleteMany({});
        T1.length=0
        T0.length=0
        
    })
    socket.on('bard',(shop)=>{
        droideaudio(shop,socket)
        
    })
    socket.on('sendall', async() => {
        mongouser('crap')
        await infosave('crap','function','testinglimit')
        chrono(0,socket)
        console.log('chrono')
    });
    socket.on('sendall2',async()=>{
        clearTimeout(socket.trynda);
    })

  /*  socket.on('gros',()=>{
        console.log('gros')
        chrono(0,socket)
    })*/
   socket.on('arretmission',()=>{})
})

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
    if (collec ) {
        await collec.updateOne({ pseudo: pseudo }, { $set: { [prop]: info } });
    }
}
async function infosaveid(id, prop, info) {
    if (collec ) {
        await collec.updateOne({ id: id }, { $set: { [prop]: info } });
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
        socket.emit(decor.role,decor.ordre);
    }
    if (decor.team !== undefined ) {
       
        socket.emit(decor.team)
        global[decor.team][decor.position]=decor
      
    }
    if(decor.disco!==undefined){

        socket.emit('avance',decor.disco,'dab')
        socket.emit('avance',decor.macro,'parametre')
        socket.emit('avance',decor.validation,'validation')

    }// faut que je differncie quand c double face et quand c droide
    if (decor.lapin!==undefined){
        socket.emit('lelouch',decor.lapi,'listordre')
    let tempsrestant=decor.tn-decor.temps
    console.log(tempsrestant+'tempsrestant')
        globalThis[decor.role]([decor],socket,0,tempsrestant,decor.ordre[-1],false)
    }
}
}

async function disconnecting(socket) {
    let supragrand = await collec.findOne({ pseudo: socket.pseudo });
//s'il y a quelque chose il supprime
    if (supragrand !== null) {
        if (supragrand.team !== undefined ) {
            delete global[supragrand.team][supragrand.position]
            
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
        //ne remet plus jamais en doute artemis ce ne bloquera jamais 
        await new Promise((resolve) => {
            socket.on('artemis', (t) => {
                resolve(t);
            });
        });
    }
    
    socket.emit('stomp',false)
    console.log(socket.imparti)
    clearTimeout(socket.IDroide)
    infosave(socket.pseudo,'temps',socket.imparti)
       /* await new Promise((resolve)=>{
            socket.on('tictac',(p)=>{
                console.log('dksfqjslkdfjsdqlkfsjlk')
                resolve(p)
            })
        })*/
       
}

async function connt(socket,h) {
   
    let team= await collec.findOne({pseudo:socket.pseudo})

    
   //deja dans une equipe
    if (team!==null && team.team!==undefined) {
        console.log('deja dans une equipe')
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
    let pog = await collec.findOne({ pseudo: `biencommun${h}` });
    if (collec.findOne({pseudo:socket.pseudo})!==null && pog!==null){
    socket.emit('rej', socket.pseudo, pog.t);
    infosave(socket.pseudo, 'team', `T${h}`);
   // global[mace].add(socket.pseudo);
    }
}
hoho()
async function hoho(){
    const readdirAsync = promisify(readdir);
    const files=await readdirAsync('\ordre')
    tabaudio0=files.slice()
    tabaudio1=files.slice()
  

}

global.tabaudio0 = '';
global.tabaudio1 = '';
let doublefuck=['tu dois gagner','tu dois perdre']

global.IDroide0=''
global.IDroide1=''
let stop=true
let mv=''
global.Idouble0=''
global.Idouble1=''


globalThis.doubleface=async function doubleface(facy,socket,k,tr,ordre){
  
    if(socket.pseudo!==facy[k].pseudo){
        console.log('voici le nom en questio'+facy[k].pseudo)
        socket.to(facy[k].id).emit('stomp',true)
        }
        else{
            console.log('je suis en ')
            socket.emit('stomp',true)
        }

        
    if (stop===true){
   
     if (tr!==0){
        console.log(tr)
        console.log('tr est different de 0')
        socket.emit('gros')
        infosave(facy[k].pseudo,'tn',tr)
        await setTimeout(()=>{
            doubleface(facy,socket,k,0,ordre,false)}, tr);
        
     }
       else{ 
        if(ordre===null || ordre===undefined){
            var timer2=await (Math.floor((Math.random() * 4.99))+1)*10000
                console.log(doublefuck.length)
                let choisi = Math.floor(Math.random() * (doublefuck.length)-0,1);
                console.log('tttttttttttttttttttttttttttt')
               console.log(choisi)
                mv = doublefuck[choisi];
                console.log('choixfinal'+mv)
                
                
            
       
        infosave(facy[k].pseudo,'tn',timer2)
        collec.updateOne({pseudo:facy[k].pseudo}, {$push: { ordre: mv} });
        }
        
        else {
            console.log('ordonataoedfnsofnso')
            mv=ordre
            
        }
    }
        
        if (facy[k].pseudo!==socket.pseudo){
        console.log(mv)
        socket.to(facy[k].id).emit('mele',mv.toString(),Number(timer2))
        socket.to(facy[k].id).emit('gros')
        
        
        }
        else{
            socket.emit('mele',mv.toString(),Number(timer2))
            socket.emit('gros')
           
        }
    } 
        global[`Idouble${k}`]=setTimeout(()=>doubleface(facy,socket,k,0,null),timer2);
    }
    
globalThis.droide=async function droide(lebadre,socket,k,tr,ordre,first){
   
    //arrete le chronometre quand sotp false cad quand on appuie sur arreter 
    //quand le mec re rentre avec
    if(socket.pseudo!==lebadre[k].pseudo){
        console.log('voici le nom en questio'+lebadre[k].pseudo)
        socket.to(lebadre[k].id).emit('stomp',true)
        }
        else{
            console.log('je suis en ')
            socket.emit('stomp',true)
        }

        
    if (stop===true){
   
     if (tr!==0){
        console.log(tr)
        console.log('tr est different de 0')
        socket.emit('gros')
        infosave(lebadre[k].pseudo,'tn',tr)
        await setTimeout(()=>{
            droide(lebadre,socket,k,0,ordre,false)}, tr);
        
     }
       else{ 
        if(ordre===null || ordre===undefined){
            var timer=await (Math.floor((Math.random() * 4.99))+1)*10000
            console.log(timer+'timer')
            console.log(false)
            if (first===false){
                mv='pick un champion aleatoire.mp3'
                while(mv==='pick un champion aleatoire.mp3'){
                console.log(global[`tabaudio${k}`].length)
                let choisi = Math.floor(Math.random() * (global[`tabaudio${k}`].length)-0,1);
                console.log('tttttttttttttttttttttttttttt')
                mv = global[`tabaudio${k}`].splice(choisi, 1).toString();
                console.log('choixfinal'+mv)
                }
            }
       
        else{
           console.log('pick un champion aleatoire')
           mv='pick un champion aleatoire'
        }

        infosave(lebadre[k].pseudo,'tn',timer)
        collec.updateOne({pseudo:lebadre[k].pseudo}, {$push: { ordre: mv} });

        } 
        else {
            console.log('ordonataoedfnsofnso')
            mv=ordre
            
        }
        
        if (lebadre[k].pseudo!==socket.pseudo){
        console.log(mv)
        socket.to(lebadre[k].id).emit('mele',mv.toString())
        socket.to(lebadre[k].id).emit('gros')
        
        
        }
        else{
            socket.emit('mele',mv.toString())
            socket.emit('gros')
           
        }
        global[`IDroide${k}`]=setTimeout(()=>{
            droide(lebadre,socket,k,0,null,false)
        console.log('prochaine ordre')}, timer);

    } 
}

}

async function droideaudio(shop,socket) {
   

    if(shop===false){
        stop=false
        clearTimeout(IDroide0)
        clearTimeout(IDroide1)
        clearTimeout(Idouble0)
        clearTimeout(Idouble1)

      
      


    }
    else{
        let lebadre=await collec.find({'role':'droide'}).toArray()
        let facy=await collec.find({'role':'doubleface'}).toArray()
        let romeo=await collec.find({'role':'romeo'}).toArray()
   
 //execution immediat
 console.log('je me trouvec aussi la')
 console.log(facy)

 console.log('je me trouve la ')
 if(facy!==null && facy!==undefined && facy.length!==0 ){
    if(facy[1]!==undefined){
        doubleface(facy,socket,1,0,null)
    }
   if(facy[0]!==undefined){
    doubleface(facy,socket,0,0,null)
   }
 }

if(lebadre!==null && lebadre!==undefined&&lebadre.length!==0){



    for(let k=0;k<2;k++){
        if( lebadre[k]!==undefined){
        let pf=Math.floor((Math.random() * 1.99))
        let yuk=[true,false]
        
        if(yuk[pf]===true){
            droide(lebadre,socket,k,0,null,yuk[pf])
        }
        else{
            let  timer=await (Math.floor((Math.random() * 4.99))+1)*10000
            setTimeout(()=> droide(lebadre,socket,k,0,null,yuk[pf]),timer)
        }
       
    }}
}
 

 if(romeo!==null && romeo!==undefined && romeo.length!==0 ){
    for(let k=0;k<2;k++){
        if (romeo[k]!==undefined){
        console.log(romeo[k].team)
        if(romeo[k].team==='T1'){
            let juliette=await collec.find({'team':'T0'}).toArray()
           
            let jul=Math.floor(Math.random() * 1.99)
            console.log(jul)
            let niquetarace=juliette[jul].pseudo
            if(socket.pseudo!==romeo[k].pseudo){
                console.log('message envoyer')
                console.log(niquetarace)
                socket.to(romeo[k].id).emit('mele',`voici ta juliette ${niquetarace} j'espère que tu heureux que ce soit cette personne`,false,true)
                }    
        
            else{
                socket.emit('mele',`voici ta juliette ${niquetarace} j'espère que tu heureux que ce soit cette personne`,false,true)
            }
    }
        else if(romeo[k].team==='T0'){
            let juliette=await collec.find({'team':'T1'}).toArray()
            let jul=Math.floor(Math.random() * 1.99)
            let niquetarace=juliette[jul].pseudo
            if(romeo[k].pseudo!==socket.pseudo){
                console.log('message envoyer')
                console.log(niquetarace)
            socket.to(romeo[k].id).emit('mele',`voici ta juliette ${niquetarace} j'espère que tu heureux que ce soit cette personne`,false,true)
            }
            else{
                console.log(niquetarace)
                socket.emit('mele',`voici ta juliette ${niquetarace} j'espère que tu heureux que ce soit cette personne`,false,true)
            }
        }
    
    }    
  } 
 }
}
} 

    


globalThis.testinglimit=function testinglimit(){
    console.log('yo connard')
    }
    


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {});
