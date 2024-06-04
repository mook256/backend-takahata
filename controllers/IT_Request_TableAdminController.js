
module.exports = async (req, res) =>{
    //const {data} = req.body W
    try{
        const [results] = await conn.query('SELECT * FROM request_data1 WHERE request_approval != "Wait" AND detail_manager IS NOT NULL AND detail_manager != "" ')

        console.log(results)
        console.log("---------------------------------------------------------------------------")

        res.json({
            results: results
        })
    } catch(error){
        res.status(500).json({
            message: 'Server Error'
        })
       console.log(error)
        throw error
    }

}