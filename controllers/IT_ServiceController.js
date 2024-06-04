
function IT_service_ID_gen(year, prefix, sequence){
    const formattedYear = year.toString();
    const formattedSequence = sequence.toString().padStart(4, '0');
    return `${formattedYear}-${prefix}-${formattedSequence}`;
}
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

function formatDateTime1(date1) {
    const year = date1.getFullYear();
    const month = (date1.getMonth() + 1).toString().padStart(2, '0');
    const day = date1.getDate().toString().padStart(2, '0');
    const hours = date1.getHours().toString().padStart(2, '0');
    const minutes = date1.getMinutes().toString().padStart(2, '0');
    const seconds = date1.getSeconds().toString().padStart(2, '0');
    
    const formattedDateTime1 = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime1;
}


module.exports = async (req, res) =>{
    try{const {en, name, section_id, branch ,tel, service_type ,catalog_type, detail, status , level , technician , dueby_time } =req.body
        const [section_result] = await conn.query('SELECT department.name from department where id = ?', String(section_id))
        const section = section_result[0]

        //IT service ID generate
        const currentYear = new Date().getFullYear();
        const prefix = 'S';
        
        const job_no = IT_service_ID_gen(currentYear, prefix, num1);
        num1 ++;

        //Date time generate
        const currentDate = new Date();
        const date = formatDateTime(currentDate);
        const date1 = formatDateTime1(currentDate);

        //Print output
        console.log(job_no);
        console.log(en);
        console.log(name);
        console.log(section.name);
        console.log(branch);
        console.log(tel);
        console.log(date);
        console.log(date1);
        console.log(catalog_type);
        console.log(service_type);
        console.log(detail);
        console.log(technician);
        console.log(dueby_time);


        //Insert data to database
        conn.query(
            "INSERT INTO services_data(job_no, en, requester,section,branch, tel, create_date,  service_type ,catalog_type, detail, status , level , technician , dueby_time ) VALUES(?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,?,?,?) ", 
            [job_no, en, name, section.name, branch ,tel, date, service_type ,catalog_type, detail, status , level , technician , date1 ],
        )

    } catch (error){
        res.status(500).json({
            message: "Server Error",
            error
        })
        console.log(error)        
    }
    
        
    

}
