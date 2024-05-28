

//check string from choosing status in table before update database
module.exports = async (req, res) => {
    try {
        const {data1, job_no} = req.body//ตัวแปร data เก็บข้อมูลจาก front end
        console.log(job_no)// แสดงข้อมูลที่ผู้ใช้เลือกมากจากข้างนอก
        console.log(data1)
        if (String(data1) == 'Waiting for approval' || String(data1) == 'Approve' || String(data1) == 'Cancel' ){
            console.log(data1)
            conn.query('UPDATE request_data1 SET request_approval = ? WHERE job_no = ?', [String(data1), job_no])
        }else{
            console.log("wrong1")//ข้อความที่เลือกไม่ตรงกับตัวเลือกเงื่อนไขข้างบน
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