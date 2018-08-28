const fs = require('fs');

const comando = process.argv[2];
const entrada = process.argv[3];
let listatarefas = [];

fs.readFile('tarefas.json', {encoding:'UTF-8'}, function(err, dados){
    
    
    if (!err){
        listatarefas = JSON.parse(dados);
        
    }
    
    if(comando === 'inserir'){
        let tarefa = {
            conteudo: entrada,
            feita: false
        }
        listatarefas.push(tarefa);
        
        let listatarefasString = JSON.stringify(listatarefas);
        
        fs.writeFile('tarefas.json',listatarefasString, function(err){
            if (err){
                console.log ('erro ao gravar');
                return;
            }
        });
        
        
    } else if(comando === 'listar'){
        
        for (let i=0; i<listatarefas.length; i++){
            let tarefa = listatarefas[i];
            let status = tarefa.feita ? "feita" : "n feita";
            
            console.log (`${i+1} - ${tarefa.conteudo} - ${status}`);
        }
        
    } else if(comando === 'fazer'){
        
        for (let i=0; i<listatarefas.length; i++){
            let tarefa = listatarefas[i];
            if (tarefa.conteudo === entrada){
                tarefa.feita = true;
            }
        }
        
        let listatarefasString = JSON.stringify(listatarefas);

        fs.writeFile('tarefas.json',listatarefasString, function(err){
            if (err){
                console.log ('erro ao gravar');
                return;
            }
        });
    }
});
