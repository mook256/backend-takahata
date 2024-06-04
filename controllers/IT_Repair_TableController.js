module.exports = async (req, res) =>{
    const {data} = req.body
    try{
        const [results] = await conn.query('SELECT * FROM services_data')
        
        res.json({
            results: results
        })
    } catch{
        res.status(500).json({
            message: 'Server Error'
        })
        //console.log(error)
        throw error
    }

}