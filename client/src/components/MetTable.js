export function calculate(objExc) {
    
 
    const outputValues = {};
    var height = objExc.height;
    var weight = objExc.weight;
    var age = objExc.age;
    var time = objExc.duration;
    var mets =  MetTable.filter( (item) => item.name===objExc.activity)[0].MET;
    
    var v;
    if (objExc.gender === 'male')
        v = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
    else
        v = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);

    v = (v * mets) / 24;
    outputValues['HOURLY_VALUE'] = Math.round(v);
    const duration = new Date(time);
    const intervalSeconds = (duration.getMinutes() + (duration.getSeconds() * 60) );
    
    v = v * intervalSeconds / 60;
    console.log (intervalSeconds);
    outputValues['INTERVAL_VALUE'] = Math.round(v);
    outputValues['SELECTED_ACTIVITY'] = objExc.activity;
    outputValues['INTERVAL_LENGTH'] = time;
    console.log (outputValues);

    return outputValues.INTERVAL_VALUE;
}



const MetTable = [{
        "name": "aerobics",
        "MET": "6.83",
        "user": "false"
    },
    {
        "name": "baseball",
        "MET": "5",
        "user": "false"
    }, {
        "name": "basketball",
        "MET": "8",
        "user": "false"
    }, {
        "name": "billiards",
        "MET": "2.5",
        "user": "false"
    }, {
        "name": "boating",
        "MET": "4.64",
        "user": "false"
    }, {
        "name": "bowling",
        "MET": "3",
        "user": "false"
    }, {
        "name": "climbing",
        "MET": "8",
        "user": "false"
    }, {
        "name": "Bike",
        "MET": "9.5",
        "user": "false"
    }, {
        "name": "dancing",
        "MET": "4.5",
        "user": "false"
    }, {
        "name": "equestrian sports",
        "MET": "5.33",
        "user": "false"
    }, {
        "name": "fencing",
        "MET": "6",
        "user": "false"
    }, {
        "name": "fishing",
        "MET": "4.5",
        "user": "false"
    }, {
        "name": "american football",
        "MET": "8",
        "user": "false"
    }, {
        "name": "soccer",
        "MET": "7",
        "user": "false"
    }, {
        "name": "golfing",
        "MET": "3.75",
        "user": "false"
    }, {
        "name": "gymnastics",
        "MET": "4",
        "user": "false"
    }, {
        "name": "hiking",
        "MET": "6",
        "user": "false"
    }, {
        "name": "hockey",
        "MET": "8",
        "user": "false"
    }, {
        "name": "ice skating",
        "MET": "7",
        "user": "false"
    }, {
        "name": "windsurfing",
        "MET": "11",
        "user": "false"
    }, {
        "name": "martial arts",
        "MET": "10",
        "user": "false"
    }, {
        "name": "racquet sports",
        "MET": "8.5",
        "user": "false"
    }, {
        "name": "rollerblading",
        "MET": "6",
        "user": "false"
    }, {
        "name": "rugby",
        "MET": "10",
        "user": "false"
    }, {
        "name": "running",
        "MET": "9.8",
        "user": "false"
    }, {
        "name": "sex",
        "MET": "5.8",
        "user": "false"
    }, {
        "name": "skiing",
        "MET": "7",
        "user": "false"
    }, {
        "name": "sleeping",
        "MET": "1",
        "user": "false"
    }, {
        "name": "swimming",
        "MET": "8",
        "user": "false"
    }, {
        "name": "volleyball",
        "MET": "5.5",
        "user": "false"
    }, {
        "name": "walking",
        "MET": "3.8",
        "user": "false"
    }, {
        "name": "watching tv",
        "MET": "1",
        "user": "false"
    }, {
        "name": "water sports",
        "MET": "5.22",
        "user": "false"
    }, {
        "name": "weightlifting / strength training",
        "MET": "3",
        "user": "false"
    }, {
        "name": "wrestling",
        "MET": "6",
        "user": "false"
    },
    {
        "name": "Yoga",
        "MET": "2.5",
        "user": "false"
    }

];


export default MetTable;
