const {ApolloServer, gql, UserInputError} = require('apollo-server')
const {v1: uuid} = require('uuid')
let daoPerson = require('./db')


const typeDefs = gql`
    type Address{
        """
        calle
        """
        street: String!
        city: String!
    }

    type Person{
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query{
        personCount: Int!
        allPersons: [Person!]!
        findPerson(name: String!): Person
    }

    type Mutation{
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editNumber(
            name: String!
            phone: String!
        ): Person
    }

`


const resolvers = {
    Query:{
        personCount:  () =>  daoPerson.getAll().length,
        allPersons:  () =>   daoPerson.getAll(),
        findPerson:  (root, args) =>  daoPerson.getOne(args.name)
            
    },
    Person:{
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }, 
    Mutation: {
        addPerson: async (root, args) => {
            if(daoPerson.getOne(args.name)){
                throw new UserInputError('nombre debe ser unico',{
                    invalidArgs: args.name
                })
            }
            const person = {...args, id: uuid()}
            const newPerson = await daoPerson.save(person)
            return newPerson
        },
        editNumber: async (root, args) => {
            const persona = daoPerson.getOne(args.name)
            console.log(persona)
            if(!persona){
                return null
            }
            const person = {...persona, phone: args.phone}
            const newPerson = await daoPerson.update(person)
            return newPerson
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) =>{
    console.log(`Server ${url}`)
})