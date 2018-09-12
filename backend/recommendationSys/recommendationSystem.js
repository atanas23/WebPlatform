const ug = require('ug')

class RecommendationSys {

    constructor() {}

    generateGraph(users, events, donations, noDonations, userID, callback) {
        let graph = new ug.Graph()

        graph.nodes('user').createIndex('uIndex')
        graph.nodes('event').createIndex('eventID')

        users.forEach(user => {
            graph.createNode('user', user)
        })

        events.forEach(event => {
            graph.createNode('event', event)
        })
        
        donations.forEach(donatedTo => {
            graph.createEdge('donatedTo').link(
                graph.nodes('user').find(donatedTo.uIndex),
               graph.nodes('event').find(donatedTo.eventID)
            ).setDistance(1)
        })

        noDonations.forEach(noDon => {
            graph.createEdge('noDon').link(
                graph.nodes('user').find(noDon.uIndex),
                graph.nodes('event').find(noDon.eventID)
            ).setDistance(4)
        })
        graph.save(__dirname + '/recommendations.ugd', () => {
            console.log('graph is saved!')
            
            this.recommend(graph.nodes('user').find(userID), (recommendNodes) => {
                callback(recommendNodes)
            }) 
        })
    }

    recommend(node, callback) {
        let graph = new ug.Graph()
        let recommendNodes

        graph.load(__dirname + '/recommendations.ugd', 
        () => {
            if (graph) {
                let options = {
                    compare: (node) => {
                        return node.entity === 'event'
                    },
                    minDepth: 3
                }

                let result = graph.closest(node, options)
                

                recommendNodes = result.map((path) => {
                    return path.end()
                }) 
                callback(recommendNodes)
            }
        })
    }
}



module.exports = RecommendationSys