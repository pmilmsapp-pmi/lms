Git push

git add .
git commit -m "fix: perbaikan index koneksi ke mongo"
git commit -m "fix: perbaikan tampilan chat bug dan pengajuan"

git push origin main



bersihkan chatbug : curl -X DELETE http://localhost:4000/api/chat/nuke -H "Authorization: Bearer MASUKANTOKENLOGIN"
