let all_choices = [ "· User Login", "- User E-mail", "User Internet", "UserERP&MRP", "Desktop PC", "Notebook", "Printer", "Barcode Scanner", "CCTV", "Smartphone&Tablet", "Other", "Microsoft Office", "AutoCAD", "Jancom-(ACC)",
 "Tiger-HER (HRD)", "Other", "Real-Time", "DCS", "FOXPRO", "SAP", "Folder", "Authentication", "Quota", "Restore Data",
 "Wire Network (LAN)", "Wireless (WiFi)", "Internet", "VPN", "Telephone"]


module.exports = async (req, res) =>{
    //const {data} = req.body
    try{
        const [results] = await conn.query('SELECT * FROM request_data1')

/*        let x
        results.forEach(j => {
            j.selected_choices += `,${j.detail_user}`
            j.selected_choices += `,${j.detail_file}`
            j.selected_choices += `,${j.detail}`
            x = j.selected_choices 
        })

        let y = x.split(',').map(String);
        
        for (let i = 0; i < y.length-3; i++) {
            if(y[i] != 0){
                y[i] = all_choices[i]
            }
        }

        results.forEach(k => {
            k.selected_choices = y.toString() 
        })*/

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