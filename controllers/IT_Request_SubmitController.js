function IT_service_ID_gen(year, prefix, sequence) {
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

let all_choices = ["User Login", "User E-mail", "User Internet", "UserERP&MRP", "Desktop PC", "Notebook", "Printer", "Barcode Scanner", "CCTV", "Smartphone&Tablet", "Other", "Microsoft Office", "AutoCAD", "Jancom-(ACC)",
    "Tiger-HER (HRD)", "Other", "Real-Time", "DCS", "FOXPRO", "SAP", "Folder", "Authentication", "Quota", "Restore Data",
    "Wire Network (LAN)", "Wireless (WiFi)", "Internet", "VPN", "Telephone"]

module.exports = async (req, res) => {
    try {
        const { en, name, section_id, branch, tel, selected_choices, detail_user, detail_file, detail, status, level } = req.body
        //Fetch section name
        const [section_result] = await conn.query('SELECT department.name from department where id = ?', String(section_id))
        const section = section_result[0]

        //IT service ID generate
        const currentYear = new Date().getFullYear();
        const prefix = 'R';

        const job_no = IT_service_ID_gen(currentYear, prefix, num2);
        num2++;

        //Date time generate
        const currentDate = new Date();
        const date = formatDateTime(currentDate);

        const request_approval = 'Wait'

        //Filter selected choices
        let user_account_choices = [], hardware_choices = [], software_license_choices = [];
        let erp_mrp_choices = [], file_server_choices = [], installation = [];

        let selected = selected_choices;

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] != 0) {
                switch (true) {
                    case (i >= 0 && i <= 3):
                        user_account_choices.push(all_choices[i]);
                        break;
                    case (i >= 4 && i <= 10):
                        hardware_choices.push(all_choices[i]);
                        break;
                    case (i >= 11 && i <= 15):
                        software_license_choices.push(all_choices[i]);
                        break;
                    case (i >= 16 && i <= 20):
                        erp_mrp_choices.push(all_choices[i]);
                        break;
                    case (i >= 21 && i <= 23):
                        file_server_choices.push(all_choices[i]);
                        break;
                    case (i >= 24 && i <= 28):
                        installation.push(all_choices[i]);
                        break;
                    default:
                        console.log("Invalid Value");
                        break;
                }
            }
        }
        user_account_choices = user_account_choices.toString();
        hardware_choices = hardware_choices.toString();
        software_license_choices = software_license_choices.toString();
        erp_mrp_choices = erp_mrp_choices.toString();
        file_server_choices = file_server_choices.toString();
        installation = installation.toString();

        //Print output
        console.log(job_no);
        console.log(en);
        console.log(name);//requester
        console.log(section.name);
        console.log(branch);
        console.log(tel);
        console.log(date);//create_date
        console.log(detail_user);
        console.log(detail_file)
        console.log(detail);
        console.log(status);
        console.log(level);
        console.log(user_account_choices + ' | ' + hardware_choices + ' | ' + software_license_choices + ' | ' + erp_mrp_choices + ' | ' + file_server_choices + ' | ' + installation);

        //Insert data to database request_data
        conn.query(
            "INSERT INTO request_data1(job_no, en, requester, section, branch, tel, create_date, detail, detail_user, detail_file, status , level, request_approval, user_account, hardware, software_license, erp_mrp, file_server, installation) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
            [job_no, en, name, section.name, branch, tel, date, detail, detail_user, detail_file, status, level, request_approval, user_account_choices, hardware_choices, software_license_choices, erp_mrp_choices, file_server_choices, installation],
        )

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
        console.log(error)
    }





}