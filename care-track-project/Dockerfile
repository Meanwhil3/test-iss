# เลือก Base Image เป็น Node.js เวอร์ชัน 20
FROM node:20

# ตั้งค่า directory ของแอปใน container เป็น /app
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยัง container
COPY . /app/

# ติดตั้ง dependencies (ขั้นตอนนี้จะถูก cache ถ้าไฟล์ package.json ไม่เปลี่ยน)
RUN npm install

RUN npm run build

# เปิดพอร์ต 3000 เพื่อให้สามารถเข้าถึงแอปได้จากภายนอก
EXPOSE 3000

# คำสั่งเพื่อรัน Next.js server ในโหมดพัฒนา kuy na
CMD ["npm", "run", "start"]
