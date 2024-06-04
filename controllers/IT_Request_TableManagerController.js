


module.exports = async (req, res) =>{
    const {manager_section,manager_role} = req.body
    let results;
    try{
        console.log("IT_Request_TableManagerController is Working now...", manager_role)
        if(manager_role == 2) {
            console.log("Manager 3")
            const [q_results] = await conn.query('SELECT * FROM request_data1 JOIN department ON request_data1.section = department.name  WHERE department.id = ? AND role = 1', [String(manager_section)])
            results = q_results;
        }
        else if(manager_role == 3){
            console.log("Manager 2")
            const [q_results] = await conn.query(
                `SELECT * FROM request_data1 
                 JOIN department ON request_data1.section = department.name  
                 WHERE (department.id = ? AND role = 1) OR (department.id = 2 AND role = 2) AND NOT (department.id = 2 AND role = 1)`, 
                [String(manager_section)]
            );            
            results = q_results;
        }
        else if(manager_role == 4){
            console.log("Manager 1")
            const [q_results] = await conn.query(
                `SELECT * FROM request_data1 
                 JOIN department ON request_data1.section = department.name  
                 WHERE (department.id = ? AND role = 1) OR role = 3`, 
                [String(manager_section)]
            );
            results = q_results;
        }
        else if(manager_role == 5){
            console.log("Vice President")
            const [q_results] = await conn.query(
                `SELECT * FROM request_data1 
                 JOIN department ON request_data1.section = department.name  
                 WHERE (department.id = ? AND role = 1) OR role = 4`, 
                [String(manager_section)]
            );
            results = q_results;
        }
        else{
            console.log("You are not manager.")
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