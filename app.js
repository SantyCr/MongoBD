const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo')
    .then(() => console.log('Conectado ha MongoBD'))
    .catch( err=> console.log('No se pudo conectar con MongoBD', err))

const cursoShema = new mongoose.Schema({
    nombre : String,
    autor : String,
    etiquetas : [String],
    fecha : {type: Date, default : Date.now},
    publicado : Boolean
})

const Curso = mongoose.model('Curso',cursoShema);

async function crearCurso(){
    const curso = new Curso({
        nombre: 'JavaScript',
        autor: 'Grover',
        etiquetas: ['desarrolo web', 'front end'],
        publicado: true,
        precio: 11
    })
    const resultado = await curso.save();
    console.log(resultado);
}
crearCurso();

//Llamar
const numeroPage = 2;
const sizePage = 10;

async function listarCurso (){
    const curso = await Curso
    //.find({autor : 'Grover'})
    //.find({precio: {$gte:10, $lte : 30 }})
    .find({precio: {$in: [10, 25, 30] }})

    //OPERADORES LOGICOS
    //.or([{autor: 'Grover'}, {publicado: true}])
    .and([{autor: 'Grover'}, {publicado: true}])

    //EXPRECCIONES REGULARES

    /* //EMPIECE CON LA PALABRA Gro
    .find({ autor: /^Gro/})
    
    //TERMINA CON LA PALABRA ver
    .find({ autor: /ver$/ }) */

    //Cuando un campo tiene un contenido  especifico
    .find( {autor:  /.*ro.*/} )
    .skip( (numeroPage - 1)* sizePage)
    .limit(10)
    .sort({autor : -1})
    console.log(curso)
}
listarCurso();

async function actualizarCurso (id){
    /* const curso = await Curso.findById(id)
    if(!curso) {console.log('El curso no existe')
    return;}

    // FORMA ONE
    curso.publicado = false;
    curso.autor = 'Grover'; 

    // FORMA TWO
    curso.set({
        publicado: false,
        autor: "Grove vazquez"
    }) 


    const resultado = await curso.save(); */
    
    //FORMA TREE
    /* const resultado = await Curso.update({ _id: id},{
        $set: {
            autor: "Grover2",
            publicado: true
        }
    }) */

    const resultado = await Curso.findByIdAndUpdate(id,{
        $set: {
            autor: "Luis Perez",
            publicado: false
        }
    })
    console.log(resultado);
}

actualizarCurso("61f42532fdc55c9312fff7ae");

async function eliminarDocumento (){
    const resutado = await Curso.deleteOne({ _id: id})
    //const resutado = await Curso.findByIdAndDelete(id)
    console.log(resutado);
}