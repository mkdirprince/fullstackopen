const mongoose = require('mongoose')


if (process.argv.length < 3 || process.argv.length > 5) {
  console.log("Usage: node mongo.js yourpassword or node mongo.js yourpassword name number ")
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://mkdirprince:${password}@cluster0.56vgdyn.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model("Person", personSchema)


if (process.argv.length == 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

else {

  const person = new Person({
    name: name,
    number: number
  })
  
  person.save().then(result => {
    console.log("Person saved")
    mongoose.connection.close()
  })

}


