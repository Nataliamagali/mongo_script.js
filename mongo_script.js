// se crea la base de datos
   my_first_db

// se crea  la colección 'estudiantes'
db.createCollection('estudiantes')

// 5 documentos en la colección 'estudiantes'
db.estudiantes.insertMany([
    { name: "Juan", home_state: "California", lucky_number: 7, birthday: { month: 5, day: 15, year: 2000 } },
    { name: "Ana", home_state: "Washington", lucky_number: 3, birthday: { month: 8, day: 22, year: 1998 } },
    { name: "Luis", home_state: "California", lucky_number: 5, birthday: { month: 11, day: 30, year: 1999 } },
    { name: "Maria", home_state: "Texas", lucky_number: 9, birthday: { month: 1, day: 10, year: 2001 } },
    { name: "Carlos", home_state: "Washington", lucky_number: 2, birthday: { month: 7, day: 6, year: 1997 } }
])

// se obtiene todos los estudiantes
print("Todos los estudiantes:");
db.estudiantes.find().pretty()

// se recupera a todos los estudiantes que son de California o Washington
print("Estudiantes de California o Washington:");
db.estudiantes.find({ home_state: { $in: ["California", "Washington"] } }).pretty()

// se obtiene todos los estudiantes cuyo número de la suerte sea mayor que 3
print("Estudiantes con número de la suerte mayor que 3:");
db.estudiantes.find({ lucky_number: { $gt: 3 } }).pretty()

// se obtiene  todos los estudiantes cuyo número de la suerte sea menor o igual a 10
print("Estudiantes con número de la suerte menor o igual a 10:");
db.estudiantes.find({ lucky_number: { $lte: 10 } }).pretty()

// se obtiene  todos los estudiantes cuyo número de la suerte esté entre 1 y 9 (inclusive)
print("Estudiantes con número de la suerte entre 1 y 9 (inclusive):");
db.estudiantes.find({ lucky_number: { $gte: 1, $lte: 9 } }).pretty()

// se agrega  un campo 'intereses' con valores predeterminados a cada documento
db.estudiantes.updateMany(
    {},
    { $set: { intereses: ['codificación', 'brunch', 'MongoDB'] } }
)

// se agrega los intereses únicos para cada estudiante
db.estudiantes.updateOne(
    { name: "Juan" },
    { $push: { intereses: { $each: ['juegos', 'ciclismo'] } } }
)
db.estudiantes.updateOne(
    { name: "Ana" },
    { $push: { intereses: { $each: ['lectura', 'café'] } } }
)
db.estudiantes.updateOne(
    { name: "Luis" },
    { $push: { intereses: { $each: ['viajes', 'música'] } } }
)
db.estudiantes.updateOne(
    { name: "Maria" },
    { $push: { intereses: { $each: ['películas', 'arte'] } } }
)
db.estudiantes.updateOne(
    { name: "Carlos" },
    { $push: { intereses: { $each: ['deportes', 'cocina'] } } }
)

// se agrega 'impuestos' a la matriz de intereses de un estudiante
db.estudiantes.updateOne(
    { name: "Juan" },
    { $push: { intereses: 'impuestos' } }
)

//  se elimina el interés 'impuestos' de la matriz de intereses de Juan
db.estudiantes.updateOne(
    { name: "Juan" },
    { $pull: { intereses: 'impuestos' } }
)

// se elimina  a todos los estudiantes que son de California
db.estudiantes.deleteMany({ home_state: "California" })

// se elimina  a un estudiante por su nombre (ejemplo: "Luis")
db.estudiantes.deleteOne({ name: "Luis" })

// se elimina  un estudiante cuyo número de la suerte sea mayor que 5 (SOLO UNO)
db.estudiantes.deleteOne({ lucky_number: { $gt: 5 } })

// se agrega un campo 'number_of_belts' y establecerlo en 0
db.estudiantes.updateMany(
    {},
    { $set: { number_of_belts: 0 } }
)

//  se Incrementa el campo 'number_of_belts' en 1 para todos los estudiantes en Washington
db.estudiantes.updateMany(
    { home_state: "Washington" },
    { $inc: { number_of_belts: 1 } }
)

// se cambio el nombre del campo 'number_of_belts' a 'belts_earned'
db.estudiantes.updateMany(
    {},
    { $rename: { number_of_belts: 'belts_earned' } }
)

// se elimina el campo 'lucky_number'
db.estudiantes.updateMany(
    {},
    { $unset: { lucky_number: "" } }
)

// se agrega  un campo 'updated_on' y establecer el valor como la fecha actual
db.estudiantes.updateMany(
    {},
    { $set: { updated_on: new Date() } }
)
