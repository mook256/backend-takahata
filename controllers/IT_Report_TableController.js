function swapDateFormat(dateString) {
    let parts = dateString.split('-');
    let year = parts[0];
    let month = parts[1];
    let day = parts[2];
    let formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

const inputMapping = {
    "Hardware": "hardware",
    "Software License": "software_license",
    "ERP&MRP": "erp_mrp",
    "File Server": "file_server",
    "User Account": "user_account",
    "Installation": "installation",
};

function mapGroup(input) {
    return inputMapping[input] || null; // ถ้าไม่พบ mapping ให้คืนค่า null
}

module.exports = async (req, res) => {
    try {
        const { report_by, group_by, start_date, end_date } = req.body
        let select_by1 = 'Service'
        let group_by1 = 'Software'
        let results = []
        console.log(report_by)
        console.log(group_by)


        //start-end date
        let start = swapDateFormat(start_date);
        let end = swapDateFormat(end_date)
        end = `${end} 23:59:59`

        console.log(start)
        console.log(end)

        let group = mapGroup(group_by)

        //const [qresults] = await conn.query('SELECT * FROM report');


        if (String(report_by) == 'Select All') {
            console.log('Select All')
            if (group_by == 'All') {
                console.log('condition All')
                const [qresults] = await conn.query(`
                    SELECT * FROM report 
                    WHERE STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                    BETWEEN STR_TO_DATE('${start}', '%d-%m-%Y') 
                    AND STR_TO_DATE('${end}', '%d-%m-%Y %H:%i:%s')
                    ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                `);
                results = qresults
            } else {
                console.log('condition', group_by)
                const [qa_results] = await conn.query(`
                    SELECT * FROM report 
                    WHERE service_type LIKE ?
                    AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                    BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                    AND STR_TO_DATE(?, '%d-%m-%Y')
                    ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                `, [`%${group_by}%`, start, end]);

                if (group != null) {
                    console.log('before sql')
                    const [qb_results] = await conn.query(`
                        SELECT * FROM report 
                        WHERE ${group} != '' 
                        AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                        BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                        AND STR_TO_DATE(?, '%d-%m-%Y') 
                        ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                    `, [start, end]);
                    console.log('after sql', qb_results)
                    qresults = [...qa_results, ...qb_results];
                    qresults.sort((a, b) => {
                        const dateA = new Date(a.create_date);
                        const dateB = new Date(b.create_date);
                        return dateB - dateA;
                    });
                    results = qresults
                } else {
                    console.log('no qb')
                    qresults = qa_results
                    results = qresults
                }
            }
        }
        else if (String(report_by) == 'IT-Service') {
            console.log('IT-Service')
            if (group_by == 'All') {
                console.log('condition All')
                const [qresults] = await conn.query(`
                        SELECT * FROM report
                        WHERE service_type != ''
                        AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                        BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                        AND STR_TO_DATE(?, '%d-%m-%Y')
                        ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                    `, [start, end]);
                results = qresults
            } else {
                console.log('condition', group_by)
                const [qresults] = await conn.query(`
                        SELECT * FROM report
                        WHERE service_type LIKE ? 
                        AND service_type != ''
                        AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                        BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                        AND STR_TO_DATE(?, '%d-%m-%Y')
                        ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                    `, [`%${group_by}%`, start, end]);
                results = qresults
            }
        }
        else if (String(report_by) == 'IT-Request') {
            console.log('IT-Request')
            if (group_by == 'All') {
                console.log("condition all")
                const [qresults] = await conn.query(`
                        SELECT * FROM report 
                        WHERE service_type = ""
                        AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                        BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                        AND STR_TO_DATE(?, '%d-%m-%Y') 
                        ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                    `, [start, end]);
                console.log(qresults)
                results = qresults
            } else {
                console.log('condition', group_by)
                const [qresults] = await conn.query(`
                        SELECT * FROM report 
                        WHERE ${group} != '' 
                        AND STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') 
                        BETWEEN STR_TO_DATE(?, '%d-%m-%Y') 
                        AND STR_TO_DATE(?, '%d-%m-%Y') 
                        ORDER BY STR_TO_DATE(create_date, '%d-%m-%Y %H:%i:%s') DESC
                    `, [start, end]);
                results = qresults
            }
        }
        
        //results = qresults
        console.log(results)
        res.json({
            results: results
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
        console.log(error)
        throw error
    }

}