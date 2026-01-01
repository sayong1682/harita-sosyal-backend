console.log("login.js yüklendi");

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    username: formData.get("sayong"),
    password: formData.get("4528192yusuf"),
  };

  console.log("Giriş denemesi:", data);

  try {
    const response = await fetch("https://harita-sosyal-backend.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Giriş başarısız: " + response.status);
    }

    const result = await response.json();
    alert(result.message || "Giriş başarılı!");

    // Giriş başarılıysa yönlendirme (örnek: harita sayfası)
    // window.location.href = "map.html";
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu: " + error.message);
  }
});
