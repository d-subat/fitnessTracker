
export function calculate(objExcercise) {

 var height = this.fields.getValue('height');
 var weight = this.fields.getValue('weight');
 var age = this.fields.getValue('age');
 var time = this.fields.getValue('activity-interval');;
 var mets = this.activityValues[this.fields.getValue('activity-type')];

 var v;
 if (this.fields.getValue('height')==='man') 
v = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
 else
v = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);

 v = (v * mets)/24;
 this.outputValues['HOURLY_VALUE'] = Math.round(v);
 v = v*time/60;

 this.outputValues['INTERVAL_VALUE'] = Math.round(v);
 this.outputValues['SELECTED_ACTIVITY'] = this.translations.ACTIVITY[this.fields.getValue('activity-type')];
 this.outputValues['INTERVAL_LENGTH'] = time;
}



const MetTable = [
    {
        "name": "aerobics",
        "MET": "6.83"
    },
    {
        "name": "baseball",
        "MET": "5"
    }, {
        "name": "basketball",
        "MET": "8"
    }, {
        "name": "billiards",
        "MET": "2.5"
    }, {
        "name": "boating",
        "MET": "4.64"
    }, {
        "name": "bowling",
        "MET": "3"
    }, {
        "name": "climbing",
        "MET": "8"
    }, {
        "name": "cycling",
        "MET": "9.5"
    }, {
        "name": "dancing",
        "MET": "4.5"
    }, {
        "name": "equestrian sports",
        "MET": "5.33"
    }, {
        "name": "fencing",
        "MET": "6"
    }, {
        "name": "fishing",
        "MET": "4.5"
    }, {
        "name": "american football",
        "MET": "8"
    }, {
        "name": "soccer",
        "MET": "7"
    }, {
        "name": "golfing",
        "MET": "3.75"
    }, {
        "name": "gymnastics",
        "MET": "4"
    }, {
        "name": "hiking",
        "MET": "6"
    }, {
        "name": "hockey",
        "MET": "8"
    }, {
        "name": "ice skating",
        "MET": "7"
    }, {
        "name": "windsurfing",
        "MET": "11"
    }, {
        "name": "martial arts",
        "MET": "10"
    }, {
        "name": "racquet sports",
        "MET": "8.5"
    }, {
        "name": "rollerblading",
        "MET": "6"
    }, {
        "name": "rugby",
        "MET": "10"
    }, {
        "name": "running",
        "MET": "9.8"
    }, {
        "name": "sex",
        "MET": "5.8"
    }, {
        "name": "skiing",
        "MET": "7"
    }, {
        "name": "sleeping",
        "MET": "1"
    }, {
        "name": "swimming",
        "MET": "8"
    }, {
        "name": "volleyball",
        "MET": "5.5"
    }, {
        "name": "walking",
        "MET": "3.8"
    }, {
        "name": "watching tv",
        "MET": "1"
    }, {
        "name": "water sports",
        "MET": "5.22"
    }, {
        "name": "weightlifting / strength training",
        "MET": "3"
    }, {
        "name": "wrestling",
        "MET": "6"
    },
    {
        "name": "Yoga",
        "MET": "2.5"
    }

];


export default MetTable;