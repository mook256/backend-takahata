

// //check string from choosing status in table before update database
// module.exports = async (req, res) => {
//     try {
        
//         const {data, job_no} = req.body//ตัวแปร data เก็บข้อมูลจาก front end
//         console.log(job_no)// แสดงข้อมูลที่ผู้ใช้เลือกมากจากข้างนอก
//         if (String(data) == 'Open' || String(data) == 'Open' || String(data) == 'Close' || String(data) == 'In Process'){
//             console.log(data)
//             conn.query('UPDATE it_service_data SET status = ? WHERE job_no = ?', [String(data), job_no])
//         }else{
//             console.log("wrong")
//             res.json({
//                 message: "ข้อความผิดพลาด"
//             })

//         }     
//     } catch (error) {
//         res.status(500).json({
//             message: 'Server Error'
//         })
//         console.log(error)
//     }
// }