Git push

git add .
git commit -m "fix: perbaikan index koneksi ke mongo"
git commit -m "fix: perbaikan tampilan chat bug dan pengajuan"
git commit -m "fix: content editor kurikulum sama studen play"
git commit -m "fix: installan 1"
git commit -m "fix: update content editor"
git commit -m "fix: update koneksi tresshold ke mongosh di index.ts backend"




git push origin main



bersihkan chatbug : curl -X DELETE http://localhost:4000/api/chat/nuke -H "Authorization: Bearer MASUKANTOKENLOGIN"






{
  "name": "lms-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@hello-pangea/dnd": "^18.0.1",
    "archiver": "^7.0.1",
    "autoprefixer": "^10.4.20",
    "axios": "^1.13.2",
    "emoji-picker-react": "^4.16.1",
    "lucide-react": "^0.562.0",
    "moment": "^2.30.1",
    "next": "^14.2.13",
    "postcss": "^8.4.31",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-native-fs": "^2.20.0",
    "react-native-qrcode-svg": "^6.3.21",
    "react-native-share": "^12.2.4",
    "react-native-view-shot": "^4.0.3",
    "react-qr-code": "^2.0.18",
    "react-quill": "^2.0.0",
    "sweetalert2": "^11.26.17",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3"
  },
  "devDependencies": {
    "@types/archiver": "^7.0.0",
    "@types/node": "^20.17.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1"
  }
}
