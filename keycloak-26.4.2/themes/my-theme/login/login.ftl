<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Login | Water Quality Portal</title>
  <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css" />
  <style>
    body {
      background: linear-gradient(135deg, #7da2caff, #00d4ff);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .login-card {
      background: white;
      padding: 2rem 3rem;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
      width: 350px;
    }
    .login-card h1 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #007bff;
      font-size: 1.6rem;
    }
    .login-card label {
      display: block;
      margin-bottom: 0.3rem;
      font-weight: 500;
      color: #333;
    }
    .login-card input {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    .login-card button,
    .login-card a.register-btn {
      width: 100%;
      display: block;
      text-align: center;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.7rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
      text-decoration: none;
      margin-top: 0.5rem;
    }
    .login-card button:hover,
    .login-card a.register-btn:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="login-card">
    <h1>Water Quality Monitoring Login</h1>
    <form action="${url.loginAction}" method="post">
      <label>Username</label>
      <input type="text" name="username" autofocus />

      <label>Password</label>
      <input type="password" name="password" />

      <input type="hidden" name="client_id" value="${client.clientId}" />

      <button type="submit">Login</button>
    </form>

    <!-- Register Button -->
    <a href="http://localhost:3000/register" class="register-btn">Register</a>
  </div>
</body>
</html>
