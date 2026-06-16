(function () {
  const ADMIN_HOST = 'admin.techlearners.in';
  const ADMIN_LOGIN_PATH = '/pages/admin/admin-login.html';
  const ADMIN_PATH_PREFIX = '/pages/admin/';
  const host = location.hostname.toLowerCase();
  const path = location.pathname;

  if (host === ADMIN_HOST && !path.startsWith(ADMIN_PATH_PREFIX)) {
    location.replace(`https://${ADMIN_HOST}${ADMIN_LOGIN_PATH}`);
    return;
  }

  // Keep direct public admin URLs usable until the admin subdomain DNS is live.
})();
