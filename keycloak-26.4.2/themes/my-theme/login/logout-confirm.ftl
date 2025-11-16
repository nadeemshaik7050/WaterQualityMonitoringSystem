<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Confirm Logout</title>
  <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css" />
</head>
<body>
  <div style="text-align:center; margin-top:100px;">
    <h1>Are you sure you want to log out?</h1>
    <form action="${url.logoutAction}" method="post">
      <button type="submit" name="confirmLogout" value="true">Yes</button>
      <button type="submit" name="confirmLogout" value="false">No</button>
    </form>
  </div>
</body>
</html>
