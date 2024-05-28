module.exports = async (req , res) =>{
    try{
        const{ job_no , manager_note} = req.body
        console.log(job_no)
        console.log(manager_note)
        conn.query('UPDATE request_data1 SET detail_manager = ? WHERE job_no =?',[String(manager_note),job_no])
    
    }
    catch (error){
        res.status(500).json({
            message: 'Server Error'
        })
        console.log(error)

    }
}