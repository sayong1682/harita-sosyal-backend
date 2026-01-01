console.log("app.js yüklendi");

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log("Form gönderildi:", data);

  try {
    const response = await fetch("https://harita-sosyal-backend.onrender.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Sunucu hatası: " + response.status);
    }

    const result = await response.json();
    alert(result.message || "Kayıt başarılı!");
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu: " + error.message);
  }
});
