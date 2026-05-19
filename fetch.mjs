import https from 'https';

https.get('https://raw.githubusercontent.com/ferbaez/hitster-ai/main/src/index.css', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
}).on('error', (err) => console.error(err.message));
