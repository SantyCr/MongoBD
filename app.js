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
    .find( {autor:  /.*ro.*/} )
    .and([{autor: 'Grover'}, {publicado: true}])
    .skip( (numeroPage - 1)* sizePage)
    .limit(10)
    .sort({autor : -1})
    console.log(curso)
}
listarCurso();

async function actualizarCurso (id){
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
    const resutado = await Curso.findByIdAndDelete(id)
    console.log(resutado);
}
