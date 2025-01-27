```
ffmpeg -re -i https://sb.err.ee/live/etv.m3u8 -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -ar 44100 -f flv rtmps://live.cloudflare.com:443/live/0c5c311f472d6910b234146d98ba1beak7f9a35aa63f1b17357b29b3c303b639d
```

```
ffmpeg -re -f lavfi -i color=c=black:s=1280x720:r=30:d=3600 -vf "drawtext=text='%{localtime}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2:font=monospace" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -c:a aac -b:a 128k -f flv rtmps://live.cloudflare.com:443/live/0c5c311f472d6910b234146d98ba1beak7f9a35aa63f1b17357b29b3c303b639d
```
