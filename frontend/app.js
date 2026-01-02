console.log("app.js yüklendi");

// Kayıt formu
document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log("Kayıt formu gönderildi:", data);

  try {
    const response = await fetch("https://harita-sosyal-backend.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Sunucu hatası: " + response.status);

    const result = await response.json();
    alert(result.message || "Kayıt başarılı!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu: " + error.message);
  }
});

// Giriş formu
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log("Giriş formu gönderildi:", data);

  try {
    const response = await fetch("https://harita-sosyal-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Sunucu hatası: " + response.status);

    const result = await response.json();
    console.log("Backend yanıtı:", result);

    if (result.token) {
      alert("Giriş başarılı!");
      // Token'i localStorage'a kaydet
      localStorage.setItem("token", result.token);
      // Otomatik yönlendirme
      window.location.href = "events.html";
    } else {
      alert(result.message || "Giriş başarısız!");
    }
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu: " + error.message);
  }
});

// Etkinlik oluşturma formu
document.getElementById("eventForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    title: formData.get("title"),
    date: formData.get("date"),
    location: formData.get("location"),
    description: formData.get("description"),
  };

  console.log("Etkinlik formu gönderildi:", data);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Önce giriş yapmalısınız!");
      return;
    }

    const response = await fetch("https://harita-sosyal-backend.onrender.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Sunucu hatası: " + response.status);

    const result = await response.json();
    alert(result.message || "Etkinlik başarıyla oluşturuldu!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu: " + error.message);
  }
});