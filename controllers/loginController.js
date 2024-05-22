const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    try {
        const { user, password } = req.body

        const [results] = await conn.query('select * from employee where user = ?', String(user))
        //result คือ เก็บค่าผลการค้นหาจาก Database
        if (!results[0]) {
            res.status(401).json({
                message: "ไม่พบผู้ใช้"
            })
            return false
        }

        const userData = results[0]
        const valid = await bcrypt.compare(password, userData.password)

        if (!valid) {
            res.status(401).json({
                message: "รหัสผ่านไม่ถูกต้อง"
            })
            return false
        }

        // sign jwt
        const token = jwt.sign({
            userId: userData.en,
            name: userData.title_name + ' ' + userData.name + ' ' + userData.last_name,
            email: userData.e_mail,
            department: userData.department_id,
            tel: userData.tel,
            role: userData.role,
            branch:userData.branch
        
        }, process.env.SECRET, { expiresIn: '1h' })

        res.cookie('token', token)

        res.json({
            message: 'OK'
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
        console.log(error)
    }
}