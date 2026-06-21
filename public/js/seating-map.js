const seatContainer =
document.getElementById("seatContainer");
const rows = "ABCDEFGHIJ";
const selectedSeats = [];
const pricePerSeat = 100000;
const soldSeats = [
"A3",
"A4",
"B6",
"C7",
"D5",
"F3",
"H8"
];

let countdownInterval;


for(let r=0;r<10;r++){

    const row =
    document.createElement("div");

    row.className="row";

    for(let c=1;c<=12;c++){

        if(c===7){

            const aisle =
            document.createElement("div");

            aisle.className="aisle";

            row.appendChild(aisle);
        }

        const seatCode =
        rows[r] + c;

        const seat = document.createElement("div");
        seat.className="seat";
        seat.dataset.code =seatCode;
        seat.innerText =seatCode;

        if(
            soldSeats.includes(
                seatCode
            )
        ){
            seat.classList.add(
                "sold"
            );
        }

        seat.addEventListener(
            "click",
            ()=>{

            if(
                seat.classList.contains(
                    "sold"
                )
            ){
                return;
            }

            seat.classList.toggle(
                "selected"
            );

            if(
                selectedSeats.includes(
                    seatCode
                )
            ){

                const i =
                selectedSeats.indexOf(
                    seatCode
                );

                selectedSeats.splice(
                    i,
                    1
                );

            }else{

                selectedSeats.push(
                    seatCode
                );

            }

            updateTotal();

        });

        row.appendChild(
            seat
        );

    }

    seatContainer.appendChild(
        row
    );

}
function updateTotal(){

    const total =
        selectedSeats.length *
        pricePerSeat;

    document
    .getElementById(
        "selectedSeatsInfo"
    )
    .innerHTML = selectedSeats.length
    ? 'Số ghế: <b style="font-weight: 800;">' + selectedSeats.join(", ") + "</b>"
    : "Số ghế:";

    document
    .getElementById(
        "totalPrice"
    )
    .innerText =
    "Tổng: " + total.toLocaleString("vi-VN")
    + " đ";
}
function openCheckout(){

    if(selectedSeats.length === 0){
        alert("Vui lòng chọn ghế");
        return;
    }

    document.getElementById("modalSeats").innerText =
        selectedSeats.join(", ");

    document.getElementById("modalQuantity").innerText =
        selectedSeats.length;

    currentTotal = selectedSeats.length * pricePerSeat;

    document.getElementById("modalTotal").innerHTML =
        '<span style="font-weight:700;">Tổng:</span> ' +
        currentTotal.toLocaleString("vi-VN") + " đ";

    document.getElementById("totalPriceLabel").innerHTML =
        '<span style="font-weight:700;">Tổng giá vé:</span> ' +
        currentTotal.toLocaleString("vi-VN") + " đ";
    document.getElementById("checkoutModal")
        .classList.add("show");
}

function closeModal(){

    document
    .getElementById(
        "checkoutModal"
    )
    .classList.remove(
        "show"
    );

}
function validateAndShowQR() {
    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!fullname || !phone || !email) {
        // alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {
        // alert("Số điện thoại phải gồm 10 chữ số!");
        return;
    }

    if (!emailRegex.test(email)) {
        // alert("Email không hợp lệ!");
        return;
    }

    showQR();
}

function showQR(){

    document
        .getElementById("qrBox")
        .style.display = "block";

    startCountdown(15);
}

/* PAN + ZOOM */

let scale = 1;
let posX = 0;
let posY = 0;

let isDragging = false;

let startX;
let startY;

function updateTransform(){

    seatContainer.style.transform =
    `
    translate(
        calc(-50% + ${posX}px),
        calc(-50% + ${posY}px)
    )
    scale(${scale})
    `;

}

seatContainer.addEventListener(
"mousedown",
e=>{

    isDragging = true;

    startX = e.clientX;

    startY = e.clientY;

});

window.addEventListener(
"mouseup",
()=>{

    isDragging = false;

});

window.addEventListener(
"mousemove",
e=>{

    if(!isDragging) return;

    posX +=
    e.clientX - startX;

    posY +=
    e.clientY - startY;

    startX =
    e.clientX;

    startY =
    e.clientY;

    updateTransform();

});

document
.getElementById("wrapper")
.addEventListener(
"wheel",
e=>{

    e.preventDefault();

    if(e.deltaY < 0){

        scale += 0.1;

    }else{

        scale -= 0.1;

    }

    scale =
    Math.max(
        0.5,
        Math.min(
            scale,
            4
        )
    );

    updateTransform();

});

updateTransform();


function startCountdown(minutes = 15){

    clearInterval(countdownInterval);

    let timeLeft = minutes * 60;

    countdownInterval = setInterval(() => {

        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        document.getElementById("countdown").innerText =
            `${String(minutesLeft).padStart(2,"0")}:${String(secondsLeft).padStart(2,"0")}`;

        if(timeLeft <= 0){
            clearInterval(countdownInterval);

            alert("Mã thanh toán đã hết hạn!");

            document.getElementById("qrBox").style.display = "none";
        }

        timeLeft--;

    }, 1000);
}

const coupons = {
    TEDX10: 10,
    TEDX20: 20,
    TEDX50: 50
};

document
.getElementById("applyCouponBtn")
.addEventListener("click", () => {

    const code = document
        .getElementById("coupon")
        .value
        .trim()
        .toUpperCase();

    if(!coupons[code]){
        alert("Mã giảm giá không hợp lệ!");
        return;
    }

const discountPercent = coupons[code];

const discountAmount =
    currentTotal * discountPercent / 100;

const finalPrice =
    currentTotal - discountAmount;

    document.getElementById("discountLabel").innerHTML =
        `Giảm giá: -${discountAmount.toLocaleString("vi-VN")} đ`;

    document.getElementById("modalTotal").innerHTML =
        `<span style="font-weight:700;">Tổng:</span>
        ${finalPrice.toLocaleString("vi-VN")} đ`;

    document.getElementById("discountLabel").style.display = "block";

    // alert(
    //     `Áp dụng thành công mã ${code} (-${discountPercent}%)`
    // );
});