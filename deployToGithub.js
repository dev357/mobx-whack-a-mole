const exec = require('child_process').execSync;

exec(`npm run build`);
exec(`cp ./build/index.html ./build/404.html`);
exec(`git commit -am "Save local changes"`);
exec(`git checkout -B gh-pages`);
exec(`git add -f build`);
exec(`git commit -am "Rebuild website"`);
exec(`git filter-branch -f --prune-empty --subdirectory-filter build`);
exec(`git push -f origin gh-pages`);
exec(`git checkout -`);
