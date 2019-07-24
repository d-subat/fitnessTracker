
import AxiosRequest from "./AxiosRequest";


const Calculate = {

    calories: async (objExc) => {
        const outputValues = {};

        const height = objExc.height;
        const weight = objExc.weight;
        const age = objExc.age;
        const time = objExc.duration;

        const activities = await AxiosRequest.getActivities();

        const mets = activities.filter((item) => item.name === objExc.activity)[0].MET;


        console.log(mets);
        var v;
        if (objExc.gender === 'male')
            v = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
        else
            v = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);

        v = (v * mets) / 24;
        outputValues['HOURLY_VALUE'] = Math.round(v);
        const duration = new Date(time);
        const intervalSeconds = (duration.getMinutes() + (duration.getSeconds() * 60));

        v = v * intervalSeconds / 60;
        console.log(intervalSeconds);
        outputValues['INTERVAL_VALUE'] = Math.round(v);
        outputValues['SELECTED_ACTIVITY'] = objExc.activity;
        outputValues['INTERVAL_LENGTH'] = time;
        console.log(outputValues);

        return outputValues.INTERVAL_VALUE
    }



}
export default Calculate;