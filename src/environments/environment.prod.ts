export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000'
};


// RewriteEngine On
// # For existing assets or directories, no redirection is required
// RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
// RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
// RewriteRule ^ - [L]
// # if the requested resource doesn't exist, use index.html
// RewriteRule ^ /index.html