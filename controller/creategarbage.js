const Garbage = require('../models/Garbagemodel')

exports.creategarbage = async () => {
    const papergarbage = new Garbage({
        category: "Paper",
        subcatagory: [{
            name: "NewsPaper",
            rate: 8,
            quntityin: "Kg"
        }, {
            name: "Books",
            rate: 10,
            quntityin: "Kg"
        }, {
            name: "Carton(House)",
            rate: 5,
            quntityin: "Kg"
        }, {
            name: "Magazines",
            rate: 5,
            quntityin: "Kg"
        }, {
            name: "White Papers",
            rate: 6.5,
            quntityin: "Kg"
        }, {
            name: "Grey Board",
            rate: 2,
            quntityin: "Kg"
        }, {
            name: "Record Paper",
            rate: 7,
            quntityin: "Kg"
        }, {
            name: "Carton(Shop)",
            rate: 8,
            quntityin: "Kg"
        }]
    })

    const plasticgarbage = new Garbage({
        category: "Plastic",
        subcatagory: [{
            name: "Soft Plastic",
            rate: 7,
            quntityin: "Kg"
        }, {
            name: "Hard Plastic",
            rate: 5,
            quntityin: "Kg"
        }, {
            name: "Mix Plastic",
            rate: 8,
            quntityin: "Kg"
        }, {
            name: "Milk Covers",
            rate: 30,
            quntityin: "Kg"
        }, {
            name: "Polythene (Mix)",
            rate: 25,
            quntityin: "Kg"
        }, {
            name: "Plastic Jar(15 ltr)",
            rate: 10,
            quntityin: "piece",
            defaultWeight:0.5
        }, {
            name: "Fibre",
            rate: 8,
            quntityin: "Kg"
        }, {
            name: "Plastic Jar(5 ltr)",
            rate: 15,
            quntityin: "piece",
            defaultWeight:0.2
        }, {
            name: "Plastic Bori",
            rate: 8,
            quntityin: "Kg"
        }]
    })

    const metalgarbage = new Garbage({
        category: "Metal",
        subcatagory: [{
            name: "Iron",
            rate: 16,
            quntityin: "Kg"
        }, {
            name: "Steel",
            rate: 10,
            quntityin: "Kg"
        }, {
            name: "Teen",
            rate: 20,
            quntityin: "Kg"
        }, {
            name: "Brass",
            rate: 180,
            quntityin: "Kg"
        }, {
            name: "Copper",
            rate: 230,
            quntityin: "Kg"
        }, {
            name: "Aluminium",
            rate: 65,
            quntityin: "Kg"
        }, {
            name: "Oil Tin(15 ltr fresh)",
            rate: 20,
            quntityin: "piece",
            defaultWeight:1
        }, {
            name: "Oil Tin(15 ltr scrap)",
            rate: 10,
            quntityin: "piece",
            defaultWeight:1
        }, {
            name: "Casting Aluminium",
            rate: 45,
            quntityin: "Kg"
        }]
    })

    const ewastegarbage = new Garbage({
        category: "E-Waste",
        subcatagory: [{
            name: "Home Appliances",
            rate: 20,
            quntityin: "Kg"
        }, {
            name: "Monitors",
            rate: 400,
            quntityin: "piece",
            defaultWeight:4
        }, {
            name: "Circuit boards",
            rate: 15,
            quntityin: "Kg"
        }, {
            name: "DVDs",
            rate: 15,
            quntityin: "Kg"
        }, {
            name: "Printers",
            rate: 300,
            quntityin: "piece",
            defaultWeight:8
        }]
    })

    const othergarbage = new Garbage({
        category: "Other",
        subcatagory: [{
            name: "Mix-Waste",
            rate: 10,
            quntityin: "Kg"
        }, {
            name: "Battries",
            rate: 40,
            quntityin: "Kg"
        }, {
            name: "Tyre",
            rate: 15,
            quntityin: "piece",
            defaultWeight:2
        }]
    })

    await papergarbage.save()
    await plasticgarbage.save()
    await metalgarbage.save()
    await ewastegarbage.save()
    await othergarbage.save()

}
