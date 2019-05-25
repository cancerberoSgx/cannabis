npm run build-dev
http-server docs & 
while inotifywait -r -e modify src; do
  npm run build-dev
done