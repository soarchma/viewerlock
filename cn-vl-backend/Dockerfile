FROM node:16-alpine

# 앱 디렉터리 생성
WORKDIR /usr/src/cn-vl-backend

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json /usr/src/cn-vl-backend

RUN npm install

# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

COPY . /usr/src/cn-vl-backend

RUN npm run build

# CMD [ "npm" , "run" , "dev"]
CMD [ "npm" , "run" , "start"]