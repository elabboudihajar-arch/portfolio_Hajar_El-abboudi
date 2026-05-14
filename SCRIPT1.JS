function bookCar(carName, price){

    let confirmBooking = confirm(
        "Do you want to reserve " + carName +
        " for " + price + " MAD/day ?"
    );

    if(confirmBooking){

        alert(
            "Reservation completed successfully for : " +
            carName
        );

    }else{

        alert("Reservation canceled");

    }
}