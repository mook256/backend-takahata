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

//check string from choosing status in table before update database
module.exports = async (req, res) => {
    try {
        
        const {data, job_no, admin_name} = req.body//ตัวแปร data เก็บข้อมูลจาก front end
        console.log(job_no)// แสดงข้อมูลที่ผู้ใช้เลือกมากจากข้างนอก
        if (String(data) == 'Wait' || String(data) == 'Open' || String(data) == 'Close' || String(data) == 'In Process'){
            console.log(data)
            conn.query('UPDATE services_data SET status = ? WHERE job_no = ?', [String(data), job_no])
            conn.query('UPDATE report SET status = ? WHERE job_no = ?', [String(data), job_no])

            if(String(data) == 'Close'){
                console.log(admin_name,data)
                conn.query('UPDATE services_data SET technician = ? WHERE status = ? AND job_no = ?', [String(admin_name), data, job_no])
                conn.query('UPDATE report SET technician = ? WHERE status = ? AND job_no = ?', [String(admin_name), data, job_no])
                //Date time generate
                const currentDate = new Date();
                const date = formatDateTime(currentDate);
                conn.query('UPDATE services_data SET closed_date = ? WHERE status = ? AND job_no = ?', [String(date), data, job_no])
                conn.query('UPDATE report SET closed_date = ? WHERE status = ? AND job_no = ?', [String(date), data, job_no])
            }
            else{
                console.log("Not close")
                conn.query('UPDATE services_data SET technician = ? WHERE job_no = ?', ['', job_no])
                conn.query('UPDATE services_data SET closed_date = ? WHERE job_no = ?', ['', job_no])
                conn.query('UPDATE report SET technician = ? WHERE job_no = ?', ['', job_no])
                conn.query('UPDATE report SET closed_date = ? WHERE job_no = ?', ['', job_no])
            }
        }else{
            console.log("wrong")//ข้อความที่เลือกไม่ตรงกับตัวเลือกเงื่อนไขข้างบน
            res.json({
                message: "ข้อความผิดพลาด"
            })

        }     
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
        console.log(error)
    }
}