module.exports = async (req, res) => {
    try { 
            
            const [results] = await conn.query('SELECT resource.name FROM resource JOIN type ON resource.type = type.id WHERE type.name = ?', String(type))

        res.json({
            results: results
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
        //console.log(error)
        throw error
    }


}