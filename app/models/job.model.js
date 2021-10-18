module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
        printSpecs: {
            type: Sequelize.JSON ,
            validate:{
                notEmpty: true,
            },
        },
        notes: {
            type: Sequelize.TEXT,
        },
        sampleDate: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
        
    })


    return Job
}