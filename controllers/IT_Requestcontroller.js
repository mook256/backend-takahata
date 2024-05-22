
// function IT_service_ID_gen(year, prefix, sequence){
//     const formattedYear = year.toString();
//     const formattedSequence = sequence.toString().padStart(4, '0');
//     return `${formattedYear}-${prefix}-${formattedSequence}`;
// }
// function formatDateTime(date) {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
    
//     const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
//     return formattedDateTime;
// }

// module.exports = async (req, res) =>{
//     try{const {en, name, section_id, tel, type, resource, detail, status} =req.body
//         const [section_result] = await conn.query('SELECT department.name from department where id = ?', String(section_id))
//         const section = section_result[0]

//         //IT service ID generate
//         const currentYear = new Date().getFullYear();
//         const prefix = 'R';
        
//         const job_no = IT_service_ID_gen(currentYear, prefix, num1);
//         num1 ++;

//         //Date time generate
//         const currentDate = new Date();
//         const date = formatDateTime(currentDate);

//         //Print output
//         console.log(job_no);
//         console.log(en);
//         console.log(name);
//         console.log(section.name);
//         console.log(tel);
//         console.log(date);
//         console.log(type);
//         console.log(resource);
//         console.log(detail);

//         //Insert data to database
//         conn.query(
//             "INSERT INTO it_service_data(job_no, en,requester, department, tel, create_date, type, resource, reason, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?,	?, ?) ", 
//             [job_no, en, name, section.name, tel, date, type, resource, detail, status],
//         )

//     } catch (error){
//         res.status(500).json({
//             message: "Server Error",
//             error
//         })
//         console.log(error)        
//     }
    
        
    

// }
