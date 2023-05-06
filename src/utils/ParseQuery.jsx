const validKeys = ["cuisine", "excludeCuisine", "diet", "intolerences", "carbs", "calories"]

const parseData = (data) => {
    const dataArr = data.match(/(?:[^\s"]+|"[^"]*")+/g);
    console.log(dataArr);
    const dataObj = {};
    dataObj["query"] = "";
    dataArr.forEach(d => {
        if (d.includes(":")) {
            const keyVal = d.split(":");
            if (validKeys.includes(keyVal[0])) {
                if (keyVal[0] === "carbs" || keyVal[0] === "calories") {
                    const newVal = keyVal[0].charAt(0).toUpperCase() + keyVal[0].slice(1);
                    if (keyVal[1].charAt(0) === ">") {
                        dataObj["min" + newVal] = keyVal[1].substring(1);
                    }
                    if (keyVal[1].charAt(0) === "<") {
                        dataObj["max" + newVal] = keyVal[1].substring(1);
                    }
                }
                else{
                dataObj[keyVal[0]] = keyVal[1];
                }
            }
        }
        else {
            dataObj["query"] += d;
        }
    })
    console.log(dataObj);
    let paramString = "";

    for (const key in dataObj) {
        if (dataObj[key] !== "") {
            paramString += `&${key}=${dataObj[key]}`;
        }
    }
    return paramString;
}


const queryData = async (query) => {
    const paramString = parseData(query);
    console.log(paramString)
    const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12` + paramString
    );
    return api;
}

export default { queryData };