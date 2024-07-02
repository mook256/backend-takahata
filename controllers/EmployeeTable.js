const mapSection = {
    1: "ACC",
    2: "CRC",
    3: "HRD",
    4: "BOL",
    5: "PUS",
    6: "DCC",
    7: "CTS",
    8: "PLN",
    9: "STA",
    10: "QAT",
    11: "REC",
    12: "NMD",
    13: "PRD",
    14: "PMF",
    15: "MMT",
    16: "TEC",
    17: "WHC",
    18: "ASY",
    19: "admin",
    20: "Vice President",
};

function mapInputSection(input) {
    return mapSection[input] || null; // ถ้าไม่พบ mapping ให้คืนค่า null
}

module.exports = async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM employee');
        
        // แปลง department_id ด้วย mapInputSection
        results.forEach(result => {
            result.department_id = mapInputSection(result.department_id);
        });
        console.log(results)

        res.json({
            results: results,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        });
        throw error;
    }
}
