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

module.exports = async (req, res) =>{
    try{
        const {en, name, section_id, branch ,tel, selected_choices, detail_user, detail_file, detail, status, level} = req.body
        //Fetch section name
        const [section_result] = await conn.query('SELECT department.name from department where id = ?', String(section_id))
        const section = section_result[0] 

        //IT service ID generate
        const currentYear = new Date().getFullYear() ; 
        const prefix = 'R';  
        
        const job_no = IT_service_ID_gen(currentYear, prefix, num1);
        num2 ++;

        //Date time generate
        const currentDate = new Date();
        const date = formatDateTime(currentDate);

        let selected = selected_choices;
        selected = selected.toString();
        //selected_choices = selected_choices.toString();

        //Print output
        console.log(job_no);
        console.log(en);
        console.log(name);//requester
        console.log(section.name);
        console.log(branch);
        console.log(tel);
        console.log(date);//create_date
        console.log(selected);
        console.log(detail_user);
        console.log(detail_file)
        console.log(detail);
        console.log(status);
        console.log(level);

        //Insert data to database request_data
      conn.query(
            "INSERT INTO request_data1(job_no, en, requester, section, branch, tel, create_date, selected_choices, detail, detail_user, detail_file, status , level) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ", 
            [job_no, en, name, section.name, branch ,tel, date, selected, detail, detail_user, detail_file, status , level],
        )

    } catch (error){
        res.status(500).json({
            message: "Server Error",
            error
        })
        console.log(error)        
    }
    

        
    

}