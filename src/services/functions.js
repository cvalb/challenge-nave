
export const changeDisplay = (modalReceived, display) => {
    const transparentLayer = document.getElementById("transparent");
    const modal = document.getElementById(modalReceived);

    transparentLayer.style.display = display;
    modal.style.display = display;
}

export function handleDate(value){
    var dateTimeSplit = value.split("T");

    var fullDate = dateTimeSplit[0];
    return fullDate;
}

export function requestDate(value){
    var arrayDate = value.split("-");
    arrayDate = [arrayDate[2], arrayDate[1], arrayDate[0]].join("/");

    return arrayDate;
}

export function calcYears(unformattedDate){
    const today = new Date();
    const todayYear = today.getFullYear();

    const date = new Date(unformattedDate);
    const dateYear = date.getFullYear();

    let years = todayYear - dateYear;
    years = parseInt(years);

    let message;

    if(years >= 1){
        message = years + " ano";
    }
    if(years > 1){
        message = message + "s";
    }
    if(years < 1){
        message = "Menos de 1 ano";
    }

    return message;
}