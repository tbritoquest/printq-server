

exports.paginatedResults = model => {
    return (req,res,next) => {
        
      let page = parseInt(req.query.page)
      let limit = parseInt(req.query.limit)
      let startIndex = (page-1)*limit
      let endIndex = page*limit

      const results = {}

      model.findAll()
        .then(data => {
          results.results = data.slice(startIndex,endIndex)

          if(endIndex< data.length){
              results.next ={
                  page: page+1,
                  limit
              }
          }

          if(startIndex>0){
              results.previous = {
                  page: page-1,
                  limit
              }
          }

          results.numOfPages = Math.ceil(data.length/limit)

          res.paginatedResults = results
          next()
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          })
        })
      }
}



