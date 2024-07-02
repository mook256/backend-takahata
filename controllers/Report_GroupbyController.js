module.exports = async (req, res) =>{
    //const {data} = req.body W
    try{
        const {topic} = req.body
        let results;
        if(topic == "IT-Service"){
            const [q_results] = await conn.query('SELECT * FROM report_group_by WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 12) ')
            results = q_results
        }else if(topic == "IT-Request"){
            const [q_results] = await conn.query('SELECT * FROM report_group_by WHERE id IN (9, 1, 11, 3, 4, 10, 12) ORDER BY FIELD(id, 9, 1, 11, 3, 4, 10, 12) ')
            results = q_results            
        }else if(topic == "Select All"){
            const [q_results] = await conn.query('SELECT * FROM report_group_by WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12) ')
            results = q_results   
        }
        else{
            results = []
        }
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