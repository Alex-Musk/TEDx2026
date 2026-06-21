/* eslint-disable no-undef */
const buttonContainer = document.getElementById("button-container");
const contentContainer = document.getElementById("content-container");
let isOpen = false;
// DÁN LINK GOOGLE APPS SCRIPT BẠN VỪA COPY Ở BƯỚC 1 VÀO ĐÂY
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzV-qUI6xtrZT9blTdzg_Qy4YLRPi2C7E0UUBH_HpUztdg7zUT1nXxYjZPZNa1mX1vi/exec"; 

let config = {
  RETURN_URL: "http://localhost:3030/success.html",
  ELEMENT_ID: "embeded-payment-container",
  CHECKOUT_URL: "",
  embedded: true,
  
  // Khi thanh toán thành công, hàm này sẽ tự động chạy
  onSuccess: async (event) => {
    console.log("Thanh toán thành công! Đang tiến hành gom data đẩy lên Google Sheets...");

    // 1. Gom dữ liệu khách hàng từ các ô Input và giao diện
    const nameInput = document.querySelector(".left-panel .form-group:nth-child(2) input").value;
    const phoneInput = document.querySelector(".left-panel .form-group:nth-child(3) input").value;
    const emailInput = document.querySelector(".left-panel .form-group:nth-child(4) input").value;
    const seatsSelected = document.getElementById("modalSeats").innerText;

    const customerData = {
      name: nameInput,
      phone: phoneInput,
      email: emailInput,
      seats: seatsSelected
    };

    try {
      // 2. Bắn data thẳng qua Google Apps Script bằng lệnh fetch POST
      await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        mode: "no-cors", // Bắt buộc phải có chế độ này để không bị lỗi bảo mật CORS của Google
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customerData)
      });
      console.log("🚀 Đã đẩy dữ liệu lên Google Sheets thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi data lên Sheets từ Frontend:", error);
    }

    // 3. Xử lý xong thì chuyển hướng trang sang success.html
    window.location.href = "http://localhost:3030/success.html";
  },
};
buttonContainer.addEventListener("click", async (event) => {
  const fullname = document.querySelector(
    ".left-panel .form-group:nth-child(2) input"
  ).value.trim();

  const phone = document.querySelector(
    ".left-panel .form-group:nth-child(3) input"
  ).value.trim();

  const email = document.querySelector(
    ".left-panel .form-group:nth-child(4) input"
  ).value.trim();

  if (!fullname || !phone || !email) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Email không hợp lệ!");
    return;
  }
  if (isOpen) {
    const { exit } = PayOSCheckout.usePayOS(config);
    exit();
 
  } else {
    const checkoutUrl = await getPaymentLink();
    console.log("👉 Link thanh toán nhận được:", checkoutUrl); // Tạm thời thêm dòng này để test
    
    if (!checkoutUrl) {
        alert("Lỗi: Không lấy được link thanh toán hợp lệ!");
        return;
    }
    
    config = {
      ...config,
      CHECKOUT_URL: checkoutUrl,
    };
    const { open } = PayOSCheckout.usePayOS(config);
    open();
}
});

const getPaymentLink = async () => {
  try {
    const response = await fetch(
      "http://localhost:3030/create-embedded-payment-link",
      {
        method: "POST",
      }
    );
    
    if (!response.ok) {
      console.log("Server không phản hồi thành công!");
      return null;
    }
    
    const result = await response.json();
    console.log("Dữ liệu gốc thực tế:", result);
    
    // TRƯỜNG HỢP 1: Nếu dữ liệu phẳng (checkoutUrl nằm ngay ngoài cùng)
    if (result && result.checkoutUrl) {
        return result.checkoutUrl;
    }
    
    // TRƯỜNG HỢP 2: Nếu dữ liệu bọc trong .data (Chuẩn SDK)
    if (result && result.data && result.data.checkoutUrl) {
        return result.data.checkoutUrl;
    }
    
    // TRƯỜNG HỢP 3: Dự phòng nếu Backend trả về trường tên là 'paymentUrl' thay vì 'checkoutUrl'
    if (result && result.paymentUrl) return result.paymentUrl;
    if (result && result.data && result.data.paymentUrl) return result.data.paymentUrl;
    
    return null;
  } catch (error) {
    console.error("Lỗi kết nối từ Frontend tới Backend:", error);
    return null;
  }
};
